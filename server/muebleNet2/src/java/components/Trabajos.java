package components;

import conexion.Conexion;
import conexion.ConexionPostgres;
import java.io.IOException;
import java.sql.SQLException;
import java.util.UUID;
import javax.websocket.Session;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import socket.sessions;

public class Trabajos {

    public Trabajos(JSONObject data, Session session) throws JSONException {
        try {
            if (!data.isNull("type")) {
                switch (data.getString("type")) {
                    case "getAreaTrabajoPagosSalario": {
                        getAreaTrabajoPagosSalario(data, session);
                        break;
                    }
                    case "pagoSalarioCancelado": {
                        pagoSalarioCancelado(data, session);
                        break;
                    }
                    case "getSalarioFecha": {
                        getSalarioFecha(data, session);
                        break;
                    }
                    case "addSalarioPersona": {
                        addSalarioPersona(data, session);
                        break;
                    }
                }
            } else {
                data.put("error", "No existe el campo type");
            }
//            session.getBasicRemote().sendText(data.toString());
        } catch (Exception ex) {
            try {
                session.getBasicRemote().sendText("{estado:'error' ,error:'" + ex.getLocalizedMessage() + "'}");
            } catch (IOException ex1) {
                System.out.println("Error en en constructor de la class Login.java");
            }
        }
    }

    private void addSalarioPersona(JSONObject data, Session session) throws JSONException, SQLException, IOException {
        JSONObject datat = data.getJSONObject("data");
        JSONObject dataCompras = data.getJSONObject("data").getJSONObject("compras");
        Conexion conPg = ConexionPostgres.getInstance();
        String compras_ingreso = null;
        String compras = null;
        JSONObject pagoCaja = new JSONObject();
        JSONObject pagoadmin = new JSONObject();
        pagoCaja.put("key", UUID.randomUUID());
        pagoadmin.put("key", UUID.randomUUID());
        pagoCaja.put("estado", 1);
        pagoadmin.put("estado", 1);
        pagoCaja.put("key_persona", datat.getString("key_persona"));
        pagoadmin.put("key_persona", datat.getString("key_persona_usuario"));
        String ingreso = "ingreso ";
        String ingresoAdmin = "egreso ";
        if (dataCompras.getBoolean("ingreso")) {
            pagoCaja.put("debe", dataCompras.getInt("precio"));
            pagoCaja.put("haber", 0);
            pagoadmin.put("debe", 0);
            pagoadmin.put("haber", dataCompras.getInt("precio"));
        } else {
            pagoCaja.put("haber", dataCompras.getInt("precio"));
            pagoCaja.put("debe", 0);
            pagoadmin.put("debe", dataCompras.getInt("precio"));
            pagoadmin.put("haber", 0);
            ingreso = "egreso ";
            ingresoAdmin = "ingreso";
        }
        pagoCaja.put("descripcion", ingreso + " - " + datat.getString("cuenta") + " -> " + datat.getString("descripcion"));
        pagoadmin.put("descripcion", ingresoAdmin + " - " + datat.getString("cuentaAdmin") + " -> " + datat.getString("descripcionAd"));
        pagoCaja.put("cancelado", true);
        pagoadmin.put("cancelado", true);
        pagoCaja.put("fecha_on", datat.getString("fecha_on"));
        pagoadmin.put("fecha_on", datat.getString("fecha_on"));
        conPg.Transacction();

        try {
            if (datat.getBoolean("admin")) {
                String pago = conPg.insertar("pago_salario", new JSONArray().put(pagoCaja));
            } else {
                String pago = conPg.insertar("pago_salario", new JSONArray().put(pagoCaja));
                String pagoad = conPg.insertar("pago_salario", new JSONArray().put(pagoadmin));
            }

            conPg.commit();
        } catch (Exception e) {
            conPg.rollback();
        }
        conPg.Transacction_end();
        data.put("estado", "exito");
        data.put("error", false);
        return;
    }

    private void getSalarioFecha(JSONObject data, Session session) throws JSONException, SQLException {
        JSONObject datat = data.getJSONObject("data");
        Conexion con = ConexionPostgres.getInstance();
        String consulta2 = "select json_agg(row_to_json(pago_salarios.*)) as json\n"
                + "from(\n"
                + "	select  pago_salario.* \n"
                + "	from pago_salario \n"
                + "	where pago_salario.key_persona ='" + datat.getString("key_persona") + "' \n"
                + " 	and EXTRACT(MONTH FROM pago_salario.fecha_on) = " + datat.getInt("mes") + "\n"
                + "and EXTRACT(YEAR FROM pago_salario.fecha_on) = " + datat.getInt("anos") + "\n"
                + ") pago_salarios";
        JSONArray arr = con.ejecutarConsultaArray(consulta2);
        data.put("data", arr);
        data.put("estado", "exito");
    }

    private void getAreaTrabajoPagosSalario(JSONObject data, Session session) throws SQLException, JSONException {
        JSONObject datat = data.getJSONObject("data");
        String key_area_trabajo = datat.getString("key_area_trabajo");
        Conexion con = ConexionPostgres.getInstance();
        String consulta = "select json_agg(row_to_json(area_trabajo.*)) as json from (\n"
                + "select p.*, json_agg(row_to_json(ps.*)) as pago_salario\n"
                + "from pago_salario ps \n"
                + "join persona p on p.key=ps.key_persona\n"
                + "where p.key_area_trabajo = '" + key_area_trabajo + "'\n"
                + "GROUP by p.key\n"
                + ")area_trabajo";
        JSONArray arr = con.ejecutarConsultaArray(consulta);
        data.put("data", arr);
        data.put("estado", "exito");
    }

    private void pagoSalarioCancelado(JSONObject data, Session session) throws SQLException, JSONException {
        JSONObject datat = data.getJSONObject("data");
        Conexion con = ConexionPostgres.getInstance();
        //      JSONObject personaPago = new JSONObject();
        //       personaPago.put("key", UUID.randomUUID());
//        personaPago.put("estado", 1);
//        personaPago.put("descripcion", datat.getString("descripcion"));
//        personaPago.put("key_persona", datat.getString("key_persona"));
//        personaPago.put("haber", datat.getInt("haber"));
//        personaPago.put("debe", datat.getInt("debe"));
//        personaPago.put("fecha_on", datat.getString("fecha_on"));
//        personaPago.put("cancelado", true);
        String consulta = "UPDATE public.pago_salario\n"
                + "SET cancelado=" + true
                + " ,haber=0"
                + " , debe=" + datat.getInt("debe")
                + " WHERE pago_salario.key='" + datat.getString("key_pago_salario") + "'";
        JSONObject libroCaja = new JSONObject();
        libroCaja.put("key", UUID.randomUUID());
        libroCaja.put("estado", 1);
        libroCaja.put("descripcion", "se realizo un pago a " + datat.getString("nombre"));
        libroCaja.put("key_persona", datat.getString("key_admin"));
        libroCaja.put("haber", datat.getInt("debe"));
        libroCaja.put("debe", datat.getInt("haber"));
        libroCaja.put("cancelado", true);
        libroCaja.put("fecha_on", datat.getString("fecha_on"));
        con.Transacction();
        try {
            boolean key = con.updateData(consulta);
            //         String pago = con.insertar("pago_salario", new JSONArray().put(personaPago));
            String pagos = con.insertar("pago_salario", new JSONArray().put(libroCaja));
            con.commit();
        } catch (Exception e) {
            con.rollback();
        }
        con.Transacction_end();

        data.put("estado", "exito");
    }

    private void send(JSONObject data, Session session) throws JSONException, JSONException, SQLException {
        JSONObject datat = data;
        datat.put("estado", "actualizar");
        Conexion con = ConexionPostgres.getInstance();
        JSONObject usuario = con.getSessionUser(session.getId());
        if (!usuario.isNull("key")) {
            String consulta = "  select json_agg(row_to_json(session.*)) as json\n"
                    + "                    from session\n"
                    + "                    where  session.fecha_off is null \n"
                    + "					and session.key_usuario is not null \n"
                    + "					and session.key_usuario <> '" + usuario.getString("key") + "'";
            JSONArray sessiones = con.ejecutarConsultaArray(consulta);
            JSONObject _session;
            for (int i = 0; i < sessiones.length(); i++) {
                _session = sessiones.getJSONObject(i);
                try {
                    sessions.users.get(_session.getString("key_usuario")).get(_session.getString("key_socket")).getBasicRemote().sendText(datat.toString());
                } catch (Exception e) {
                    con.apagarSession(_session.getString("key_socket"));
                    sessions.users.get(_session.getString("key_usuario")).remove(_session.getString("key_socket"));
                }
            }
        }

    }

}

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

public class Compras {

    public Compras(JSONObject data, Session session) throws JSONException {
        try {
            if (!data.isNull("type")) {
                switch (data.getString("type")) {
                    case "addCompras": {
                        addCompras(data, session);
                        break;
                    }
                    case "addLibroCompras": {
                        addLibroCompras(data, session);
                        break;
                    }
                    case "addLibroComprasIngreso": {
                        addLibroComprasIngreso(data, session);
                        break;
                    }
                    case "finalizarLibroComprasIngreso": {
                        finalizarLibroComprasIngreso(data, session);
                        break;
                    }
                    case "getComprasFecha": {
                        getComprasFecha(data, session);
                        break;
                    }
                    case "getAllLibroComprasPendiente": {
                        getAllLibroComprasPendiente(data, session);
                        break;
                    }
                    case "getAllLibroComprasPendienteUsuario": {
                        getAllLibroComprasPendienteUsuario(data, session);
                        break;
                    }
                }
            } else {
                data.put("error", "No existe el campo type");
            }
            //   session.getBasicRemote().sendText(data.toString());
        } catch (Exception ex) {
            try {
                session.getBasicRemote().sendText("{estado:'error' ,error:'" + ex.getLocalizedMessage() + "'}");
            } catch (IOException ex1) {
                System.out.println("Error en en constructor de la class Login.java");
            }
        }
    }

    private void addCompras(JSONObject data, Session session) throws JSONException, SQLException, IOException {
        JSONObject datat = data.getJSONObject("data");
        datat.put("key", UUID.randomUUID());
        datat.put("estado", 1);
        Conexion conPg = ConexionPostgres.getInstance();
        String compra = null;

        conPg.Transacction();
        try {
            compra = conPg.insertar("compras", new JSONArray().put(datat));
            conPg.commit();
        } catch (Exception e) {
            conPg.rollback();
        }
        conPg.Transacction_end();
        sendAdministrador(session, data);
        data.put("estado", "exito");
        data.put("error", false);
        return;
    }

    private void addLibroCompras(JSONObject data, Session session) throws JSONException, SQLException, IOException {
        JSONObject datat = data.getJSONObject("data");
        JSONObject dataComprasLibro = data.getJSONObject("data").getJSONObject("compras_libro");
        JSONObject dataComprasIngreso = data.getJSONObject("data").getJSONObject("compras_ingreso");
        JSONObject dataCompras = data.getJSONObject("data").getJSONObject("compras");
        dataComprasLibro.put("key", UUID.randomUUID());
        dataComprasLibro.put("estado", 1);

        dataComprasIngreso.put("key", UUID.randomUUID());
        dataComprasIngreso.put("estado", 1);
        dataCompras.put("key", UUID.randomUUID());
        dataCompras.put("estado", 1);
        Conexion conPg = ConexionPostgres.getInstance();
        String compraLibro = null;
        String compraingreso = null;
        String compras = null;

        JSONObject pagoCaja = new JSONObject();
        pagoCaja.put("key", UUID.randomUUID());
        pagoCaja.put("estado", 1);
        String ingreso = "egreso ";
        pagoCaja.put("haber", dataCompras.getInt("precio"));
        pagoCaja.put("debe", 0);
        pagoCaja.put("descripcion", ingreso + datat.getString("cuenta") + " -> " + datat.getString("descripcion"));
        pagoCaja.put("key_persona", datat.getString("key_persona_usuario"));
        pagoCaja.put("haber", dataCompras.getInt("precio"));
        pagoCaja.put("debe", 0);
        pagoCaja.put("cancelado", true);
        pagoCaja.put("fecha_on", datat.getString("fecha_on"));
        conPg.Transacction();
        try {
            compraLibro = conPg.insertar("compras_libro", new JSONArray().put(dataComprasLibro));
            dataComprasIngreso.put("key_compras_libro", compraLibro);
            dataCompras.put("key_compras_libro", compraLibro);
            compraingreso = conPg.insertar("compras_ingreso", new JSONArray().put(dataComprasIngreso));
            compras = conPg.insertar("compras", new JSONArray().put(dataCompras));
            String pago = conPg.insertar("pago_salario", new JSONArray().put(pagoCaja));
            conPg.commit();
        } catch (Exception e) {
            conPg.rollback();
        }
        conPg.Transacction_end();
        sendComprador(dataComprasLibro.get("key_persona").toString(), data);
        data.put("estado", "exito");
        data.put("error", false);
        return;
    }

    private void addLibroComprasIngreso(JSONObject data, Session session) throws JSONException, SQLException, IOException {
        JSONObject datat = data.getJSONObject("data");
        JSONObject dataCompras = data.getJSONObject("data").getJSONObject("compras");
        dataCompras.put("key", UUID.randomUUID());
        dataCompras.put("estado", 1);
        JSONObject dataComprasIngreso = data.getJSONObject("data").getJSONObject("compras_ingreso");
        dataComprasIngreso.put("key", UUID.randomUUID());
        dataComprasIngreso.put("estado", 1);
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
        pagoadmin.put("descripcion", ingresoAdmin + " - " + datat.getString("cuentaAdmin") + " -> " + datat.getString("descripcionAd") + " a " + datat.getString("nombreAdmin"));
        pagoCaja.put("cancelado", true);
        pagoadmin.put("cancelado", true);
        pagoCaja.put("fecha_on", datat.getString("fecha_on"));
        pagoadmin.put("fecha_on", datat.getString("fecha_on"));

        conPg.Transacction();
        try {
            compras_ingreso = conPg.insertar("compras_ingreso", new JSONArray().put(dataComprasIngreso));
            compras = conPg.insertar("compras", new JSONArray().put(dataCompras));
            String pago = conPg.insertar("pago_salario", new JSONArray().put(pagoCaja));
            String pagoAd = conPg.insertar("pago_salario", new JSONArray().put(pagoadmin));
            conPg.commit();
        } catch (Exception e) {
            conPg.rollback();
        }
        conPg.Transacction_end();
        sendComprador(datat.get("key_persona").toString(), data);
        data.put("estado", "exito");
        data.put("error", false);
        return;
    }

    private void finalizarLibroComprasIngreso(JSONObject data, Session session) throws JSONException, SQLException, IOException {
        JSONObject datat = data.getJSONObject("data");
        JSONObject dataCompras = data.getJSONObject("data").getJSONObject("compras");
        JSONObject compras_libro = data.getJSONObject("data").getJSONObject("compras_libro");
        dataCompras.put("key", UUID.randomUUID());
        dataCompras.put("estado", 1);
        Conexion conPg = ConexionPostgres.getInstance();
        String compras_ingreso = null;
        String compras = null;
        String consulta = "update public.compras_libro"
                + " set compras_finalizado = " + true + " "
                + "where key = '" + compras_libro.getString("key_compras_libro")
                + "' ";
        JSONObject pagoadmin = new JSONObject();

        if (dataCompras.getInt("precio") > 0) {
            pagoadmin.put("key", UUID.randomUUID());
            pagoadmin.put("estado", 1);
            pagoadmin.put("key_persona", datat.getString("key_persona"));
            String ingreso = "ingreso ";
            String ingresoAdmin = "egreso ";
            if (dataCompras.getBoolean("ingreso")) {
                pagoadmin.put("debe", 0);
                pagoadmin.put("haber", dataCompras.getInt("precio"));
            } else {
                pagoadmin.put("debe", dataCompras.getInt("precio"));
                pagoadmin.put("haber", 0);
                ingresoAdmin = "ingreso";
            }
            pagoadmin.put("descripcion", ingresoAdmin + " - " + datat.getString("cuentaAdmin") + " -> " + datat.getString("descripcionAd") + " a " + datat.getString("nombreUsuario"));
            pagoadmin.put("cancelado", true);
            pagoadmin.put("fecha_on", datat.getString("fecha_on"));
        }
        conPg.Transacction();
        try {
            String pago = conPg.insertar("pago_salario", new JSONArray().put(pagoadmin));
            conPg.EjecutarUpdate(consulta);
            compras = conPg.insertar("compras", new JSONArray().put(dataCompras));
            conPg.commit();
        } catch (Exception e) {
            conPg.rollback();
        }
        conPg.Transacction_end();
        sendComprador(datat.get("key_persona").toString(), data);
        data.put("estado", "exito");
        data.put("error", false);
        return;
    }

    private void getAllCompras(JSONObject data, Session session) throws SQLException, JSONException {
        Conexion con = ConexionPostgres.getInstance();
        String consulta = "select json_agg(row_to_json(fecha_comprass.*)) as json from (\n"
                + "SELECT * from compras where fecha_compra >  CURRENT_DATE - INTERVAL '3 months'\n"
                + ")fecha_comprass";
        JSONArray arr = con.ejecutarConsultaArray(consulta);
        data.put("data", arr);
        data.put("estado", "exito");
    }

    private void getComprasFecha(JSONObject data, Session session) throws SQLException, JSONException {
        JSONObject datat = data.getJSONObject("data");
        Conexion con = ConexionPostgres.getInstance();
        String consulta = "select json_agg(row_to_json(compras.*)) as json \n"
                + "from compras\n"
                + "where  compras.estado = 1"
                + " and fecha_on BETWEEN '" + datat.getString("mesDiaInicio") + "' AND '" + datat.getString("mesDiaFinal") + "'";
        JSONArray arr = con.ejecutarConsultaArray(consulta);
        data.put("data", arr);
        data.put("estado", "exito");
    }

    private void getAllLibroComprasPendiente(JSONObject data, Session session) throws SQLException, JSONException {
        Conexion con = ConexionPostgres.getInstance();
        String consulta = "select json_agg(row_to_json(libro.*)) as json\n"
                + "from (\n"
                + "	select cl.*,\n"
                + "	(\n"
                + "		select json_agg(row_to_json(c.*)) \n"
                + "		from compras c\n"
                + "		where c.key_compras_libro=cl.key\n"
                + "	) as compra ,\n"
                + "	(\n"
                + "		select json_agg(row_to_json(ci.*)) \n"
                + "		from compras_ingreso ci\n"
                + "		where ci.key_compras_libro=cl.key\n"
                + "	) as  ingreso\n"
                + "	from compras_libro cl\n"
                + "	where cl.compras_finalizado = false\n"
                + ") as libro";
        JSONArray arr = con.ejecutarConsultaArray(consulta);
        data.put("data", arr);
        data.put("estado", "exito");
    }

    private void getAllLibroComprasPendienteUsuario(JSONObject data, Session session) throws SQLException, JSONException {
        JSONObject datat = data.getJSONObject("data");
        String key_persona = data.getJSONObject("data").getString("key_persona");

        Conexion con = ConexionPostgres.getInstance();
        String consulta = "select json_agg(row_to_json(libro.*)) as json\n"
                + "from (\n"
                + "	select cl.*,\n"
                + "	(\n"
                + "		select json_agg(row_to_json(c.*)) \n"
                + "		from compras c\n"
                + "		where c.key_compras_libro=cl.key\n"
                + "	) as compra ,\n"
                + "	(\n"
                + "		select json_agg(row_to_json(ci.*)) \n"
                + "		from compras_ingreso ci\n"
                + "		where ci.key_compras_libro=cl.key\n"
                + "	) as  ingreso\n"
                + "	from compras_libro cl\n"
                + "	where cl.compras_finalizado = false"
                + "     and cl.key_persona='" + key_persona
                + "'\n and estado=1"
                + ") as libro";
        JSONArray arr = con.ejecutarConsultaArray(consulta);
        data.put("data", arr);
        data.put("estado", "exito");
    }

    private void sendAdministrador(Session session, JSONObject data) throws JSONException, JSONException, SQLException {
        JSONObject datat = data;
        datat.put("estado", "actualizar");
        Conexion con = ConexionPostgres.getInstance();
        String consulta = "  select json_agg(row_to_json(s.*)) as json\n"
                + "			from session s\n"
                + "			join usuario u on u.key=s.key_usuario\n"
                + "			join persona p on p.key=u.key_persona\n"
                + "			join area_trabajo at on  at.key=p.key_area_trabajo \n"
                + "			where at.nombre = 'administrador'\n"
                + "			and s.fecha_off ISNULL";
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

    private void sendComprador(String key_persona, JSONObject data) throws JSONException, JSONException, SQLException {
        JSONObject datat = data;
        datat.put("estado", "actualizar");
        Conexion con = ConexionPostgres.getInstance();
        String consulta = "  select json_agg(row_to_json(s.*)) as json\n"
                + "			from session s\n"
                + "			join usuario u on u.key=s.key_usuario\n"
                + "			where u.key_persona= '" + key_persona + "'\n"
                + "			and s.fecha_off ISNULL";
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

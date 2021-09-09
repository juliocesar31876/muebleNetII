package components;

import conexion.Conexion;
import conexion.ConexionPostgres;
import java.io.IOException;
import java.sql.SQLException;
import static java.time.Instant.now;
import java.util.UUID;
import javax.websocket.Session;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import socket.sessions;

public class Persona {

    public Persona(JSONObject data, Session session) throws JSONException {
        try {
            if (!data.isNull("type")) {
                switch (data.getString("type")) {
                    case "addPersona": {
                        addPersona(data, session);
                        break;
                    }
                    case "getAllPersona": {
                        getAllPersona(data, session);
                        break;
                    }
                    case "addPagos": {
                        addPagos(data, session);
                        break;
                    }
                    case "getAllPagosSalario": {
                        getAllPagosSalario(data, session);
                        break;
                    }
                    case "getPersonaPago": {
                        getPersonaPago(data, session);
                        break;
                    }
                    case "addTrabajoEnpleado": {
                        addTrabajoEnpleado(data, session);
                        break;
                    }
                    case "getPersonaTrabajo": {
                        getPersonaTrabajo(data, session);
                        break;
                    }
                    case "getTrabajoPendiente": {
                        getTrabajoPendiente(data, session);
                        break;
                    }
                    case "terminarTrabajoPendiente": {
                        terminarTrabajoPendiente(data, session);
                        break;
                    }
                    case "PagoTrabajoPendiente": {
                        PagoTrabajoPendiente(data, session);
                        break;
                    }
                    case "getPagoAreaPendiente": {
                        getPagoAreaPendiente(data, session);
                        break;
                    }
                    case "getAllPagoPendientePersona": {
                        getAllPagoPendientePersona(data, session);
                        break;
                    }
                    case "getPagoSalario": {
                        getPagoSalario(data, session);
                        break;
                    }
                }
            } else {
                data.put("error", "No existe el campo type");
            }
            session.getBasicRemote().sendText(data.toString());
        } catch (Exception ex) {
            try {
                session.getBasicRemote().sendText("{estado:'error' ,error:'" + ex.getLocalizedMessage() + "'}");
            } catch (IOException ex1) {
                System.out.println("Error en en constructor de la class Login.java");
            }
        }
    }

    private void addTrabajoEnpleado(JSONObject data, Session session) throws JSONException, SQLException, IOException {
        JSONObject datat = data.getJSONObject("data").getJSONObject("datos");
        int cantidad_producto = data.getJSONObject("data").getInt("cantidad_producto");

        Conexion conPg = ConexionPostgres.getInstance();
        String trabajo = null;
        //       JSONObject addPersonas = conPg.ejecutarConsultaObject(""
        //             + "select row_to_json(persona.*) as json "
        //           + "from persona "
        //         + "where persona.key = '" + datat.getString("key_persona") + "'");
        //   if (!addPersonas.isNull("key")) {
        conPg.Transacction();
        for (int i = 0; i < cantidad_producto; i++) {
            try {
                datat.put("key", UUID.randomUUID());
                datat.put("estado", 1);
                trabajo = conPg.insertar("trabajo_producto", new JSONArray().put(datat));
                //updateProducto(data, session);
                conPg.commit();
            } catch (Exception e) {
                conPg.rollback();
                session.getBasicRemote().sendText("{estado:'error' ,error:'" + e.getLocalizedMessage() + "'}");
                return;
            }
        }
        conPg.Transacction_end();
        send(data, session);
        data.put("estado", "exito");
        data.put("error", false);
        //   } else {
        //     data.put("estado", "error");
        //    data.put("error", "existe ");
        // }
        return;
    }

    private void updateProducto(JSONObject data, Session session) throws SQLException, JSONException {
        String key_producto = data.getJSONObject("data").getJSONObject("datos").getString("key_producto");
        int cantidad = data.getJSONObject("data").getJSONObject("datos").getInt("cantidad");
        int cantidad_producto = data.getJSONObject("data").getInt("cantidad_producto");
        int totalCantidad = cantidad + cantidad_producto;
        Conexion con = ConexionPostgres.getInstance();
        String consulta = "UPDATE public.productos\n"
                + "SET cantidad=" + totalCantidad
                + ",fecha_on='" + now() + "'\n"
                + "WHERE productos.key='" + key_producto + "'";
        boolean key = con.updateData(consulta);
        data.put("estado", "exito");
    }

    private void addPersona(JSONObject data, Session session) throws JSONException, SQLException, IOException {
        JSONObject datat = data.getJSONObject("data");
        datat.put("key", UUID.randomUUID());
        datat.put("fecha_on", now());
        Conexion conPg = ConexionPostgres.getInstance();
        String area_trabajo = null;
        JSONObject addPersonas = conPg.ejecutarConsultaObject(""
                + "select row_to_json(persona.*) as json "
                + "from persona "
                + "where persona.ci = '" + datat.getString("ci") + "'");
        if (addPersonas.isNull("key")) {
            conPg.Transacction();
            try {
                area_trabajo = conPg.insertar("persona", new JSONArray().put(datat));
                conPg.commit();
            } catch (Exception e) {
                conPg.rollback();
            }
            conPg.Transacction_end();
            send(data, session);
            data.put("estado", "exito");
            data.put("error", false);
        } else {
            data.put("estado", "error");
            data.put("error", "existe ");
        }
        return;
    }

    private void addPagos(JSONObject data, Session session) throws JSONException, SQLException, IOException {
        JSONObject datat = data.getJSONObject("data");
        datat.put("key", UUID.randomUUID());
        datat.put("fecha_on", now());
        datat.put("estado", 1);
        Conexion conPg = ConexionPostgres.getInstance();
        String pagos = null;
        JSONObject addPersonas = conPg.ejecutarConsultaObject(""
                + "select row_to_json(persona.*) as json "
                + "from persona "
                + "where persona.key = '" + datat.getString("key_persona") + "'");
        if (!addPersonas.isNull("key")) {
            conPg.Transacction();
            try {
                pagos = conPg.insertar("pagos_salario", new JSONArray().put(datat));
                conPg.commit();
            } catch (Exception e) {
                conPg.rollback();
            }
            conPg.Transacction_end();
            send(data, session);
            data.put("estado", "exito");
            data.put("error", false);
        } else {
            data.put("estado", "error");
            data.put("error", "existe ");
        }
        return;
    }

    private void getAllPersona(JSONObject data, Session session) throws SQLException, JSONException {
        Conexion con = ConexionPostgres.getInstance();
        String consulta = "select json_agg(row_to_json(personas.*)) as json from (\n"
                + "                select persona.*\n"
                + "                from persona\n"
                + "                where persona.estado = 1)personas";
        JSONArray arr = con.ejecutarConsultaArray(consulta);
        data.put("data", arr);
        data.put("estado", "exito");
    }

    private void getAllPagosSalario(JSONObject data, Session session) throws SQLException, JSONException {
        Conexion con = ConexionPostgres.getInstance();
        String consulta = "select json_agg(row_to_json(pagos_salarios.*)) as json from (\n"
                + "                select pagos_salario.*\n"
                + "                from pagos_salario\n"
                + "                where pagos_salario.estado = 1)pagos_salarios";
        JSONArray arr = con.ejecutarConsultaArray(consulta);
        data.put("data", arr);
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

    private void getPersonaPago(JSONObject data, Session session) throws JSONException, SQLException {
        JSONObject datat = data.getJSONObject("data");
        Conexion con = ConexionPostgres.getInstance();
        String consulta = "select json_agg(row_to_json(pagos_salario.*)) as json \n"
                + "from pagos_salario\n"
                + "where pagos_salario.key_persona = '" + datat.getString("key_persona") + "'and pagos_salario.estado = 1";
        String consulta2 = "select json_agg(row_to_json(pagos_salario.*)) as json \n"
                + "from pagos_salario\n"
                + "where pagos_salario.key_persona = '" + datat.getString("key_persona") + "'and pagos_salario.estado = 1"
                + " and fecha_on BETWEEN '" + datat.getString("mesDiaInicio") + "' AND '" + datat.getString("mesDiaFinal") + "'";
        JSONArray arr = con.ejecutarConsultaArray(consulta2);
        data.put("data", arr);
        data.put("estado", "exito");

    }

    private void getPersonaTrabajo(JSONObject data, Session session) throws JSONException, SQLException {
        JSONObject datat = data.getJSONObject("data");
        Conexion con = ConexionPostgres.getInstance();
        String consulta2 = "select json_agg(row_to_json(trabajo_producto.*)) as json from(\n"
                + "select  s.key,p.key_tipo_producto,p.nombre , s.cantidad ,s.fecha_on \n"
                + "	from trabajo_producto s\n"
                + "	join productos p on p.key=s.key_producto\n"
                + "where s.key_persona = '" + datat.getString("key_persona") + "'\n"
                + "	and s.estado = 1\n"
                + " and s.fecha_on BETWEEN '" + datat.getString("mesDiaInicio") + "' AND '" + datat.getString("mesDiaFinal") + "'"
                + ")trabajo_producto";
        JSONArray arr = con.ejecutarConsultaArray(consulta2);
        data.put("data", arr);
        data.put("estado", "exito");

    }

    private void getPagoSalario(JSONObject data, Session session) throws JSONException, SQLException {
        JSONObject datat = data.getJSONObject("data");
        Conexion con = ConexionPostgres.getInstance();
        String consulta2 = "select json_agg(row_to_json(pago_salarios.*)) as json\n"
                + "from(\n"
                + "	select  pago_salario.* \n"
                + "	from pago_salario \n"
                + "	where pago_salario.key_persona ='" + datat.getString("key_persona") + "' \n"
                + " 	and EXTRACT(MONTH FROM pago_salario.fecha_on) = EXTRACT(MONTH FROM CURRENT_DATE)\n"
                + ") pago_salarios";
        JSONArray arr = con.ejecutarConsultaArray(consulta2);
        data.put("data", arr);
        data.put("estado", "exito");
    }

    private void getTrabajoPendiente(JSONObject data, Session session) throws JSONException, SQLException {
        JSONObject datat = data.getJSONObject("data");
        String areaTrabajo = datat.getString("area");
        String consulta2 = "select json_agg(row_to_json(trabajo_producto.*)) as json from(\n"
                + "	select tp.*,p.key as key_producto\n"
                + "	from trabajo_producto tp"
                + "     join productos p on p.nombre=tp.nombre\n"
                + "	where tp.producto_terminado = false\n"
                + "	and tp.key_persona_trabajo='" + datat.getString("key_persona") + "'"
                + ")trabajo_producto";
        if (areaTrabajo.equals("limpieza")) {
            consulta2 = "select json_agg(row_to_json(trabajo_producto.*)) as json from(\n"
                    + "	select tp.*,p.key as key_producto\n"
                    + "	from trabajo_producto tp"
                    + "     join productos p on p.nombre=tp.nombre\n"
                    + "	where tp.trabajo_limpieza_realizado = false\n"
                    + "	and tp.producto_terminado= true \n"
                    + "	and tp.key_persona_limpieza='" + datat.getString("key_persona") + "'"
                    + ")trabajo_producto";
        }
        Conexion con = ConexionPostgres.getInstance();

        JSONArray arr = con.ejecutarConsultaArray(consulta2);
        data.put("data", arr);
        data.put("estado", "exito");

    }

    private void terminarTrabajoPendiente(JSONObject data, Session session) throws JSONException, SQLException {
        JSONObject datat = data.getJSONObject("data");
        String areaTrabajo = datat.getString("areaTrabajo");
        String key_trabajo = datat.getString("key_trabajo_producto");
        String nombre = datat.getString("nombre_producto");
        Conexion conPg = ConexionPostgres.getInstance();
        String consulta = "UPDATE public.trabajo_producto\n"
                + "SET producto_terminado=" + true
                + " WHERE trabajo_producto.key='" + key_trabajo + "'";

        String consul = "select row_to_json(productos.*) as json FROM productos \n"
                + "where nombre = '" + nombre + "'";
        JSONObject objproducto = conPg.ejecutarConsultaObjet(consul);

        JSONObject pagosArmador = new JSONObject();
        pagosArmador.put("key", UUID.randomUUID());
        pagosArmador.put("estado", 1);
        pagosArmador.put("descripcion", "Pago pendiente mueble " + nombre);
        pagosArmador.put("key_persona", datat.getString("key_persona_trabajo"));
        pagosArmador.put("haber", datat.getInt("trabajo_precio"));
        pagosArmador.put("debe", 0);
        pagosArmador.put("cancelado", false);
        pagosArmador.put("fecha_on", datat.getString("fecha_on"));

        JSONObject pagoCompra = new JSONObject();
        pagoCompra.put("key", UUID.randomUUID());
        pagoCompra.put("estado", 1);
        pagoCompra.put("descripcion", "Pago pendiente mueble " + nombre);
        pagoCompra.put("key_persona", datat.getString("key_persona_compra"));
        pagoCompra.put("haber", objproducto.getInt("encargado_compra"));
        pagoCompra.put("debe", 0);
        pagoCompra.put("cancelado", false);
        pagoCompra.put("fecha_on", datat.getString("fecha_on"));
        String pago = null;
        String pagos = null;
        conPg.Transacction();
        try {
            if (areaTrabajo.equals("limpieza")) {
                consulta = "UPDATE public.trabajo_producto\n"
                        + "SET trabajo_limpieza_realizado=" + true
                        + " WHERE trabajo_producto.key='" + key_trabajo + "'";
            } else {
                pagos = conPg.insertar("pago_salario", new JSONArray().put(pagoCompra));
            }
            boolean key = conPg.updateData(consulta);
            pago = conPg.insertar("pago_salario", new JSONArray().put(pagosArmador));

            conPg.commit();
        } catch (Exception e) {
            conPg.rollback();
        }
        conPg.Transacction_end();
        data.put("objTrabajo", pagosArmador);
        data.put("estado", "exito");
    }

    private void terminarPagosPendiente(JSONObject data, Session session) throws JSONException, SQLException {
        JSONObject datat = data.getJSONObject("data");
        String key_trabajo = datat.getString("key_trabajo_producto");
        String area = datat.getString("area");
        Conexion con = ConexionPostgres.getInstance();
        String consulta = "UPDATE public.trabajo_producto\n"
                + "SET " + area + "=" + true
                + " WHERE trabajo_producto.key='" + key_trabajo + "'";
        boolean key = con.updateData(consulta);
        data.put("estado", "exito");
    }

    private void PagoTrabajoPendiente(JSONObject data, Session session) throws JSONException, SQLException {
        JSONObject datat = data.getJSONObject("data");
        String key_persona = datat.getString("key_persona");
        Conexion con = ConexionPostgres.getInstance();
        String consulta = "";
        String consultaArmador = "select json_agg(row_to_json(trabajo_producto.*)) as json from(\n"
                + "	select tp.*,p.key as key_producto\n"
                + "	from trabajo_producto tp"
                + "     join productos p on p.nombre=tp.nombre\n"
                + "	where tp.producto_terminado = true\n"
                + "	and tp.key_persona_trabajo='" + key_persona + "'"
                + ")trabajo_producto";
        String consultaComprador = "select json_agg(row_to_json(trabajo_producto.*)) as json from(\n"
                + "	select tp.*,p.key as key_producto\n"
                + "	from trabajo_producto tp"
                + "     join productos p on p.nombre=tp.nombre\n"
                + "	where tp.producto_terminado = true\n"
                + "	and tp.pago_recibido= false "
                + "	and tp.key_persona_compra='" + key_persona + "'"
                + ")trabajo_producto";
        String consultaLimpieza = "select json_agg(row_to_json(trabajo_producto.*)) as json from(\n"
                + "	select trabajo_producto.*,productos.key as key_producto\n"
                + "	from trabajo_producto     \n"
                + "	join productos on productos.nombre=trabajo_producto.nombre\n"
                + "	where trabajo_producto.trabajo_limpieza_realizado = false\n"
                + "	and trabajo_producto.key_persona_limpieza='" + key_persona + "')trabajo_producto";

        if (datat.getString("area").equals("compras")) {
            consulta = consultaComprador;
        }
        if (datat.getString("area").equals("armador mueble")) {
            consulta = consultaComprador;
        }
        if (datat.getString("area").equals("limpieza")) {
            consulta = consultaLimpieza;
        }
        JSONArray arr = con.ejecutarConsultaArray(consulta);
        data.put("data", arr);
        data.put("estado", "exito");

    }

    private void getAllPagoPendientePersona(JSONObject data, Session session) throws JSONException, SQLException {
        Conexion con = ConexionPostgres.getInstance();
        String consulta = "select json_agg(row_to_json(trabajo_producto.*)) as json\n"
                + "from(\n"
                + "	select  (\n"
                + "		select json_agg(row_to_json(tp.*)) \n"
                + "		from trabajo_producto tp \n"
                + "		where tp.key_persona_compra = p.key\n"
                + "		and tp.producto_terminado=true\n"
                + "	) as trabajo_producto,p.*\n"
                + "	from persona p\n"
                + ") trabajo_producto";
        JSONArray arr = con.ejecutarConsultaArray(consulta);
        data.put("data", arr);
        data.put("estado", "exito");
    }

    private void getPagoAreaPendiente(JSONObject data, Session session) throws JSONException, SQLException {
        JSONObject datat = data.getJSONObject("data");
        String area = datat.getString("area");
        Conexion con = ConexionPostgres.getInstance();
        String consulta = "";
        String consultaArmador = "select json_agg(row_to_json(trabajo_producto.*)) as json\n"
                + "from(\n"
                + "	select  tp.*,\n"
                + "	(\n"
                + "		select row_to_json(p.*) \n"
                + "		from persona p \n"
                + "		where tp.key_persona_compra = p.key\n"
                + "	) as persona\n"
                + "	from trabajo_producto tp\n"
                + "	where tp.producto_terminado = true\n"
                + "		and tp.pago_recibido = false\n"
                + ") trabajo_producto";
        String consultaComprador = "select json_agg(row_to_json(trabajo_producto.*)) as json\n"
                + "from(\n"
                + "	select tp.*,\n"
                + "	(\n"
                + "		select row_to_json(p.*) \n"
                + "		from persona p \n"
                + "		where tp.key_persona_compra = p.key\n"
                + "	) as persona\n"
                + "	from trabajo_producto tp\n"
                + "	where tp.producto_terminado = true\n"
                + "		and tp.pago_compra_recibido = false\n"
                + ") trabajo_producto";
        String consultaLimpieza = "select json_agg(row_to_json(trabajo_producto.*)) as json\n"
                + "from(\n"
                + "	select  tp.*,\n"
                + "	(\n"
                + "		select row_to_json(p.*) \n"
                + "		from persona p \n"
                + "		where tp.key_persona_compra = p.key\n"
                + "	) as persona_limpieza\n"
                + "	from trabajo_producto tp\n"
                + "	where tp.producto_terminado = true\n"
                + "		and tp.pago_compra_recibido = false\n"
                + ") trabajo_producto";

        if (area.equals("compras")) {
            consulta = consultaArmador;
        }
        if (area.equals("armador mueble")) {
            consulta = consultaComprador;
        }
        if (area.equals("limpieza")) {
            consulta = consultaLimpieza;
        }
        JSONArray arr = con.ejecutarConsultaArray(consulta);
        data.put("data", arr);
        data.put("estado", "exito");

    }
}

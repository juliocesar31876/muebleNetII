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

public class Productos {

    public Productos(JSONObject data, Session session) throws JSONException {
        try {
            if (!data.isNull("type")) {
                switch (data.getString("type")) {
                    case "addProducto": {
                        addProducto(data, session);
                        break;
                    }
                    case "addTipoProducto": {
                        addTipoProducto(data, session);
                        break;
                    }
                    case "addCosteProduccion": {
                        addCosteProduccion(data, session);
                        break;
                    }
                    case "getAllTipoProducto": {
                        getAllTipoProducto(data, session);
                        break;
                    }
                    case "getAllProducto": {
                        getAllProducto(data, session);
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

    private void addProducto(JSONObject data, Session session) throws JSONException, SQLException, IOException {
        JSONObject datat = data.getJSONObject("data");
        datat.put("key", UUID.randomUUID());
        datat.put("fecha_on", now());
        Conexion conPg = ConexionPostgres.getInstance();
        String producto = null;
        JSONObject addproducto = conPg.ejecutarConsultaObject(""
                + "select row_to_json(productos.*) as json "
                + "from productos "
                + "where productos.nombre = '" + datat.getString("nombre") + "'");
        if (addproducto.isNull("key")) {
            conPg.Transacction();
            try {
                producto = conPg.insertar("productos", new JSONArray().put(datat));
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
            data.put("error", "existe tipo producto");
        }

        return;

    }

    private void addTipoProducto(JSONObject data, Session session) throws JSONException, SQLException, IOException {
        data.getJSONObject("data").put("key", UUID.randomUUID());
        JSONObject datat = data.getJSONObject("data");
        Conexion conPg = ConexionPostgres.getInstance();
        String producto = null;
        JSONObject tipoProducto = conPg.ejecutarConsultaObject(""
                + "select row_to_json(tipo_producto.*) as json "
                + "from tipo_producto "
                + "where tipo_producto.nombre = '" + datat.getString("nombre") + "'");
        if (tipoProducto.isNull("key")) {
            conPg.Transacction();
            try {
                producto = conPg.insertar("tipo_producto", new JSONArray().put(datat));
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
            data.put("error", "existe tipo producto");
        }

        return;

    }

    private void addCosteProduccion(JSONObject data, Session session) throws JSONException, SQLException, IOException {
        JSONObject datat = data.getJSONObject("data");
        datat.put("key", UUID.randomUUID());
        datat.put("estado", 1);
        datat.put("fecha_on", now());
        Conexion conPg = ConexionPostgres.getInstance();
        String costeProduccion = null;
        conPg.Transacction();
        try {
            costeProduccion = conPg.insertar("coste_produccion", new JSONArray().put(datat));
            conPg.commit();
        } catch (Exception e) {
            conPg.rollback();
        }
        conPg.Transacction_end();
        send(data, session);
        data.put("estado", "exito");
        data.put("error", false);

        return;

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

    private void getAllTipoProducto(JSONObject data, Session session) throws SQLException, JSONException {
        Conexion con = ConexionPostgres.getInstance();
        String consulta = "select json_agg(row_to_json(tipo_producto.*)) as json from (\n"
                + "                select tipo_producto.*\n"
                + "                from tipo_producto\n"
                + "                where tipo_producto.estado = 1)tipo_producto";
        JSONArray arr = con.ejecutarConsultaArray(consulta);
        data.put("data", arr);
        data.put("estado", "exito");
    }

    private void getAllProducto(JSONObject data, Session session) throws SQLException, JSONException {
        Conexion con = ConexionPostgres.getInstance();
        String consulta = "select json_agg(row_to_json(producto.*)) as json from (\n"
                + "                select p.*,\n"
                + "		(\n"
                + "		select json_agg(row_to_json(cp.*)) \n"
                + "			from coste_produccion cp\n"
                + "			where cp.key_producto=p.key \n"
                + "		) as coste_produccion\n"
                + "                from productos p \n"
                + "                where p.estado = 1\n"
                + ")producto";
        JSONArray arr = con.ejecutarConsultaArray(consulta);
        data.put("data", arr);
        data.put("estado", "exito");
    }

}

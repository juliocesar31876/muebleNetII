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

public class Material {

    public Material(JSONObject data, Session session) throws JSONException {
        try {
            if (!data.isNull("type")) {
                switch (data.getString("type")) {
                    case "addMaterial": {
                        addMaterial(data, session);
                        break;
                    }
                    case "addTipoMaterial": {
                        addTipoMaterial(data, session);
                        break;
                    }
                    case "getAllMaterial": {
                        getAllMaterial(data, session);
                        break;
                    }
                    case "getAllTipoMaterial": {
                        getAllTipoMaterial(data, session);
                        break;
                    }
                    case "updateMaterial": {
                        updateMaterial(data, session);
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

    private void addMaterial(JSONObject data, Session session) throws JSONException, SQLException, IOException {
        JSONObject datat = data.getJSONObject("data");
        datat.put("key", UUID.randomUUID());
        datat.put("fecha_on", now());
        Conexion conPg = ConexionPostgres.getInstance();
        String material = null;
        conPg.Transacction();
        try {
            material = conPg.insertar("material", new JSONArray().put(datat));
            conPg.commit();
        } catch (Exception e) {
            conPg.rollback();
            data.put("estado", "error");
            return;
        }
        conPg.Transacction_end();
        send(data, session);
        data.put("estado", "exito");
        data.put("error", false);
        return;
    }

    private void addTipoMaterial(JSONObject data, Session session) throws JSONException, SQLException, IOException {
        JSONObject datat = data.getJSONObject("data");
        datat.put("key", UUID.randomUUID());
        Conexion conPg = ConexionPostgres.getInstance();
        String material = null;
        conPg.Transacction();
        try {
            material = conPg.insertar("tipo_material", new JSONArray().put(datat));
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
    private void getAllMaterial(JSONObject data, Session session) throws SQLException, JSONException {
        Conexion con = ConexionPostgres.getInstance();
        String consulta = "select json_agg(row_to_json(materiales.*)) as json from (\n"
                + "                select material.*\n"
                + "                from material\n"
                + "                where material.estado = 1)materiales";
        JSONArray arr = con.ejecutarConsultaArray(consulta);
        data.put("data", arr);
        data.put("estado", "exito");
    }

    private void getAllTipoMaterial(JSONObject data, Session session) throws SQLException, JSONException {
        Conexion con = ConexionPostgres.getInstance();
        String consulta = "select json_agg(row_to_json(tipo_materiales.*)) as json from (\n"
                + "                select tipo_material.*\n"
                + "                from tipo_material)tipo_materiales";
        JSONArray arr = con.ejecutarConsultaArray(consulta);
        data.put("data", arr);
        data.put("estado", "exito");
    }

    private void updateMaterial(JSONObject data, Session session) throws SQLException, JSONException {
        Conexion con = ConexionPostgres.getInstance();
        int cantidadAnterior= data.getJSONObject("data").getInt("cantidad_material");
        int cantidad= data.getJSONObject("data").getInt("cantidadTotal");
        String consulta = "UPDATE public.material\n"
                + "SET cantidad=" + cantidad
                + ", fecha_on='" + now() + "', cantidad_anterior=" + cantidadAnterior + "\n"
                + "	WHERE material.key='" + data.getJSONObject("data").getString("key_material") + "'";
        boolean key = con.updateData(consulta);
        data.put("estado", "exito");
    }
}

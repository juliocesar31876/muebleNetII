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
public class AreaTrabajo {
    public AreaTrabajo(JSONObject data, Session session) throws JSONException {
        try {
            if (!data.isNull("type")) {
                switch (data.getString("type")) {
                    
                    case "addAreaTrabajo": {
                        addAreaTrabajo(data, session);
                        break;
                    }
                    case "getAllAreaTrabajo": {
                        getAllAreaTrabajo(data, session);
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
    private void addAreaTrabajo(JSONObject data, Session session) throws JSONException, SQLException, IOException {
        JSONObject datat = data.getJSONObject("data");
        datat.put("key", UUID.randomUUID());
        datat.put("fecha_on", now());
        Conexion conPg = ConexionPostgres.getInstance();
        String area_trabajo = null;
        JSONObject addArea = conPg.ejecutarConsultaObject(""
                + "select row_to_json(area_trabajo.*) as json "
                + "from area_trabajo "
                + "where area_trabajo.nombre = '" + datat.getString("nombre") + "'");
        if (addArea.isNull("key")) {
            conPg.Transacction();
            try {
                area_trabajo = conPg.insertar("area_trabajo", new JSONArray().put(datat));
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
            data.put("error", "existe Area");
        }
        return;
    }
        private void send( JSONObject data, Session session) throws JSONException, JSONException, SQLException {
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
    private void getAllAreaTrabajo(JSONObject data, Session session) throws SQLException, JSONException {
        Conexion con = ConexionPostgres.getInstance();
        String consulta = "select json_agg(row_to_json(area_trabajo.*)) as json from (\n"
                + "                select area_trabajo.*\n"
                + "                from area_trabajo\n"
                + "                where area_trabajo.estado = 1)area_trabajo";
        JSONArray arr = con.ejecutarConsultaArray(consulta);
        data.put("data", arr);
        data.put("estado", "exito");
    }
}

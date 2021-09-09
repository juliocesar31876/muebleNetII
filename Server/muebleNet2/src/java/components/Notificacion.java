package components;

import conexion.Conexion;
import conexion.ConexionPostgres;
import java.io.IOException;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.UUID;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.websocket.Session;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import socket.sessions;



public class Notificacion {
        
    public static void send(String key, JSONObject obj){
        try {
            Conexion con = ConexionPostgres.getInstance();
            String consulta = "select json_agg(row_to_json(session.*)) as json\n"
                    + "from session\n"
                    + "where session.key_usuario = '" + key + "'\n"
                    + "and session.fecha_off is null";
            JSONArray sessiones = con.ejecutarConsultaArray(consulta);
            JSONObject _session;
            
        
            for (int i = 0; i < sessiones.length(); i++) {
                _session = sessiones.getJSONObject(i);
                try {
                    sessions.users.get(key).get(_session.getString("key_socket")).getBasicRemote().sendText(obj.toString());
                } catch (Exception e) {
                    con.apagarSession(_session.getString("key_socket"));
                    sessions.users.get(key).remove(_session.getString("key_socket"));
                }
            }
        } catch (JSONException ex) {
            Logger.getLogger(Notificacion.class.getName()).log(Level.SEVERE, null, ex);
        } catch (SQLException ex) {
            Logger.getLogger(Notificacion.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
    public static void sendConocidos(String key, JSONObject obj){
        try {
            Conexion con = ConexionPostgres.getInstance();
            String consulta = "select json_agg(row_to_json(session.*)) as json\n" +
                                "from session\n" +
                                "where session.fecha_off is null\n" +
                                "and session.key_usuario in (\n" +
                                "select  distinct usuario.key\n" +
                                "from grupo_to_usuario,\n" +
                                "grupo,\n" +
                                "grupo_to_usuario gtu2,\n" +
                                "usuario\n" +
                                "where grupo_to_usuario.key_usuario = '"+key+"'\n" +
                                "and grupo.key = grupo_to_usuario.key_grupo\n" +
                                "and grupo.key = gtu2.key_grupo\n" +
                                "and grupo.estado = 1\n" +
                                "and gtu2.key_usuario = usuario.key\n" +
                                ")";
            JSONArray sessiones = con.ejecutarConsultaArray(consulta);
            JSONObject _session;
            
            boolean meEnvio =  false;
            
            for (int i = 0; i < sessiones.length(); i++) {
                _session = sessiones.getJSONObject(i);
                if(_session.getString("key_usuario").equals(key)) meEnvio=true;
                try {
                    sessions.users.get(_session.getString("key_usuario")).get(_session.getString("key_socket")).getBasicRemote().sendText(obj.toString());
                } catch (Exception e) {
                    con.apagarSession(_session.getString("key_socket"));
                    //sessions.users.get(_session.getString("key_usuario")).remove(_session.getString("key_socket"));
                }
            }
            
            if(!meEnvio){
                Notificacion.send(key, obj);
            }
            
        } catch (JSONException ex) {
            Logger.getLogger(Notificacion.class.getName()).log(Level.SEVERE, null, ex);
        } catch (SQLException ex) {
            Logger.getLogger(Notificacion.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    public Notificacion(JSONObject data, Session session) {
        try {
            if (!data.isNull("type")) {
                switch (data.getString("type")) {
                    case "getAll": {
                        getAll(data, session);
                        break;
                    }
                    case "setVista": {
                        setVista(data, session);
                        break;
                    }
                }
            } else {
                data.put("error", "No existe el campo type");
            }
        } catch (Exception ex) {
            try {
                session.getBasicRemote().sendText("{estado:'error' ,error:'" + ex.getLocalizedMessage() + "'}");
            } catch (IOException ex1) {
                System.out.println("Error en en constructor de la class Login.java");
            }
        }
    }
    
    public static void sendToGroup(String keu_grupo, JSONObject obj) throws SQLException, JSONException{
        Conexion con = ConexionPostgres.getInstance();
        JSONArray sessiones = con.ejecutarConsultaArray("select json_agg(row_to_json(session.*)) as json\n"
                + "from grupo_to_usuario, session\n"
                + "where grupo_to_usuario.key_grupo = '"+keu_grupo+"'\n"
                + "and session.key_usuario = grupo_to_usuario.key_usuario\n"
                + "and session.fecha_off is null");
        JSONObject _session;
        for (int i = 0; i < sessiones.length(); i++) {
            _session = sessiones.getJSONObject(i);
            try {
                sessions.users.get(_session.getString("key_usuario")).get(_session.getString("key_socket")).getBasicRemote().sendText(obj.toString());
            } catch (Exception e) {
                con.apagarSession(_session.getString("key_socket"));
                //sessions.users.get(_session.getString("key_usuario")).remove(_session.getString("key_socket"));
            }
        }
    }
    
    public static void push(
            int tipo, 
            String key_usr_from, 
            String key_usr_to, 
            String titulo, 
            String descripcion) throws JSONException, SQLException{
        Conexion con = ConexionPostgres.getInstance();
        JSONObject notificacion = new JSONObject();
        notificacion.put("key", UUID.randomUUID());
        notificacion.put("titulo", titulo);
        notificacion.put("descripcion", descripcion);
        notificacion.put("key_usuario", key_usr_to);
        notificacion.put("key_usuario_from", key_usr_from);
        JSONObject persona = con.getPersona(key_usr_from);
        notificacion.put("nombres", persona.getString("nombres"));
        notificacion.put("apellidos", persona.getString("apellidos"));
        notificacion.put("tipo", tipo);
        notificacion.put("fecha", "now()");
        notificacion.put("estado", 1);
        con.insertar("notificacion", new JSONArray().put(notificacion));
        SimpleDateFormat formato = new SimpleDateFormat("yyyy-MM-dd kk:mm:ss");
        notificacion.put("fecha", formato.format(new Date()));
        
        send(notificacion); 
    }

    private static void send(JSONObject notificacion) {
        try {
            Conexion con = ConexionPostgres.getInstance();
            String consulta = "select json_agg(row_to_json(session.*)) as json\n"
                    + "from session\n"
                    + "where session.key_usuario = '" + notificacion.getString("key_usuario") + "'\n"
                    + "and session.fecha_off is null";
            JSONArray sessiones = con.ejecutarConsultaArray(consulta);
            JSONObject _session;
            
            JSONObject send = new JSONObject();
            send.put("component", "notificacion");
            send.put("type", "nueva");
            send.put("data", notificacion);
        
            for (int i = 0; i < sessiones.length(); i++) {
                _session = sessiones.getJSONObject(i);
                try {
                    sessions.users.get(notificacion.getString("key_usuario")).get(_session.getString("key_socket")).getBasicRemote().sendText(send.toString());
                } catch (Exception e) {
                    con.apagarSession(_session.getString("key_socket"));
                    sessions.users.get(notificacion.getString("key_usuario")).remove(_session.getString("key_socket"));
                }
            }
        } catch (JSONException ex) {
            Logger.getLogger(Notificacion.class.getName()).log(Level.SEVERE, null, ex);
        } catch (SQLException ex) {
            Logger.getLogger(Notificacion.class.getName()).log(Level.SEVERE, null, ex);
        }
    }    

    private void getAll(JSONObject data, Session session) throws SQLException, JSONException {
        Conexion con = ConexionPostgres.getInstance();
        JSONObject usuario = con.getSessionUser(session.getId());
        
        String consulta = "SELECT row_to_json(tabla.*) as json\n" +
                            "from(\n" +
                            "select tabla.json as notificaciones, cantidad.cant as cantidad\n" +
                            "from (\n" +
                            "    select json_agg(row_to_json(tabla.*)) as json\n" +
                            "    from (\n" +
                            "    select notificacion.*,persona.nombres, persona.apellidos\n" +
                            "    from notificacion, usuario, persona\n" +
                            "    where notificacion.key_usuario = '" + usuario.getString("key") + "'\n" +
                            "    and notificacion.key_usuario_from = usuario.key\n" +
                            "    and usuario.key_persona = persona.key\n" +
                            "    order by notificacion.fecha desc limit 20\n" +
                            "    ) tabla\n" +
                            ") tabla ,\n" +
                            "(\n" +
                            "    select count(*) as cant\n" +
                            "    from notificacion\n" +
                            "    where key_usuario = '" + usuario.getString("key") + "'\n" +
                            "    and estado = 1\n" +
                            ") cantidad\n" +
                            ") as tabla\n";
        JSONObject obj = con.ejecutarConsultaObject(consulta);
        data.put("data",obj);
        data.put("estado", "exito");
    }
    private void setVista(JSONObject data, Session session) throws SQLException, JSONException {
        Conexion con = ConexionPostgres.getInstance();
        JSONObject usuario = con.getSessionUser(session.getId());
        con.EjecutarSentencia("update notificacion set estado = 0 where key_usuario = '"+usuario.getString("key")+"'");
        data.put("estado", "exito");
    }
}

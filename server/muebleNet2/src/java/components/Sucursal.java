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

public class Sucursal {

    public Sucursal(JSONObject data, Session session) throws JSONException {
        try {
            if (!data.isNull("type")) {
                switch (data.getString("type")) {
                    case "getAllSucursal": {
                        getAllSucursal(data, session);
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
    private void getAllSucursal(JSONObject data, Session session) throws SQLException, JSONException {
        Conexion con = ConexionPostgres.getInstance();
        String consulta = "select json_agg(row_to_json(sucursal.*)) as json from (\n" +
"                                select sucursales.*\n" +
"                                from sucursales\n" +
"                                where sucursales.estado = 1)sucursal";
        JSONArray arr = con.ejecutarConsultaArray(consulta);
        data.put("data", arr);
        data.put("estado", "exito");
    }

}

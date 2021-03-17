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

public class CuentaContable {

    public CuentaContable(JSONObject data, Session session) throws JSONException {
        try {
            if (!data.isNull("type")) {
                switch (data.getString("type")) {

                    case "addcuentaContable": {
                        addcuentaContable(data, session);
                        break;
                    }

                    case "getAllCuentaContable": {
                        getAllCuentaContable(data, session);
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

    private void addcuentaContable(JSONObject data, Session session) throws SQLException, JSONException {
        JSONObject datat = data.getJSONObject("data");
        datat.put("key", UUID.randomUUID());
        datat.put("estado", 1);
        Conexion conPg = ConexionPostgres.getInstance();
        String cuenta = null;
        conPg.Transacction();
        try {
            cuenta = conPg.insertar("cuenta_contable", new JSONArray().put(datat));
            conPg.commit();
        } catch (Exception e) {
            conPg.rollback();
        }
        conPg.Transacction_end();
        data.put("estado", "exito");
        data.put("error", false);
        return;
    }

    private void getAllCuentaContable(JSONObject data, Session session) throws SQLException, JSONException {
        Conexion con = ConexionPostgres.getInstance();
        String consulta = "select json_agg(row_to_json(cuenta_contables.*)) as json from (\n"
                + "                select persona.*\n"
                + "                from persona\n"
                + "                where persona.estado = 1)cuenta_contables";
        JSONArray arr = con.ejecutarConsultaArray(consulta);
        data.put("data", arr);
        data.put("estado", "exito");
    }
}

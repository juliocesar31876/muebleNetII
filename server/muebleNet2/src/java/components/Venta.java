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

public class Venta {

    public Venta(JSONObject data, Session session) throws JSONException {
        try {
            if (!data.isNull("type")) {
                switch (data.getString("type")) {

                    case "addVentaTrabajo": {
                        addVentaTrabajo(data, session);
                        break;
                    }
                    case "getVentaDatosRellenar": {
                        getVentaDatosRellenar(data, session);
                        break;
                    }
                    case "getVentaDatosRellenado": {
                        getVentaDatosRellenado(data, session);
                        break;
                    }
                    case "getAllCompraPendienteVenta": {
                        getAllCompraPendienteVenta(data, session);
                        break;
                    }
                    case "getVentaPendiente": {
                        getVentaPendiente(data, session);
                        break;
                    }
                    case "finalizarVenta": {
                        finalizarVenta(data, session);
                        break;
                    }
                    case "getVentaFinalizado": {
                        getVentaFinalizado(data, session);
                        break;
                    }
                    case "getVentaFecha": {
                        getVentaFecha(data, session);
                        break;
                    }
                    case "addVenta": {
                        addVenta(data, session);
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

    private void getVentaFinalizado(JSONObject data, Session session) throws JSONException, SQLException {
        Conexion con = ConexionPostgres.getInstance();
        String consulta2 = "select json_agg(row_to_json(venta.*)) as json \n"
                + "from(\n"
                + "select v.*,(\n"
                + "	select array_to_json(array_agg(d.*))\n"
                + "	from venta_detalle d\n"
                + "		where d.key_venta=v.key\n"
                + "	) as detalle\n"
                + "	from ventas v\n"
                + "	where v.entrega = true\n"
                + "	and v.estado=1\n"
                + "	and v.fecha_on >  CURRENT_DATE - INTERVAL '1 months'\n"
                + ") venta";
        JSONArray arr = con.ejecutarConsultaArray(consulta2);
        data.put("data", arr);
        data.put("estado", "exito");
    }

    private void getVentaFecha(JSONObject data, Session session) throws JSONException, SQLException {
        JSONObject datat = data.getJSONObject("data");
        Conexion con = ConexionPostgres.getInstance();
        String consulta2 = "select json_agg(row_to_json(venta.*)) as json  from(\n"
                + "select v.*,(\n"
                + "	select array_to_json(array_agg(d.*))\n"
                + "	from venta_detalle d\n"
                + "		where d.key_venta=v.key\n"
                + "	) as detalle\n"
                + "	from ventas v\n"
                + "	where v.entrega = true\n"
                + "	and v.estado=1\n"
                + "	and v.fecha_on BETWEEN '" + datat.getString("mesDiaInicio") + "' AND '" + datat.getString("mesDiaFinal") + "'\n"
                + ") venta";
        JSONArray arr = con.ejecutarConsultaArray(consulta2);
        data.put("data", arr);
        data.put("estado", "exito");

    }

    private void getVentaPendiente(JSONObject data, Session session) throws SQLException, JSONException {
        Conexion con = ConexionPostgres.getInstance();
        String consulta2 = "select json_agg(row_to_json(venta.*)) as json \n"
                + "from(\n"
                + "select v.*,(\n"
                + "	select array_to_json(array_agg(d.*)) from venta_detalle d\n"
                + "		where d.key_venta=v.key\n"
                + "	) as detalle\n"
                + "	from ventas v\n"
                + "	where v.entrega = false\n"
                + "	and v.estado=1\n"
                + ") venta";
        JSONArray arr = con.ejecutarConsultaArray(consulta2);
        data.put("data", arr);
        data.put("estado", "exito");
    }

    private void getAllCompraPendienteVenta(JSONObject data, Session session) throws SQLException, JSONException {
        Conexion con = ConexionPostgres.getInstance();
        JSONObject datat = data.getJSONObject("data");
        String key_persona = datat.getString("key_persona");
        String consulta2 = "select json_agg(row_to_json(venta_cargo_compras)) as json from(\n"
                + "select vcc.key ,p.nombre,p.paterno,p.materno,vcc.key_venta,p.key as key_persona ,vcc.monto,vcc.fecha_on,(\n"
                + "select row_to_json(v.*) from ventas v\n"
                + "	where v.key=vcc.key_venta \n"
                + ") as venta\n"
                + "from venta_cargo_compra vcc\n"
                + "join persona p on p.key=vcc.key_persona\n"
                + "where vcc.key_persona='" + key_persona + "'\n"
                + "	)venta_cargo_compras";
        JSONArray arr = con.ejecutarConsultaArray(consulta2);
        data.put("data", arr);
        data.put("estado", "exito");
    }

    private void getVentaDatosRellenar(JSONObject data, Session session) throws SQLException, JSONException {
        Conexion con = ConexionPostgres.getInstance();
        String consulta2 = "select json_agg(row_to_json(venta.*)) as json \n"
                + "from(\n"
                + "select v.*,(\n"
                + "	select array_to_json(array_agg(d.*)) from venta_detalle d\n"
                + "		where d.key_venta=v.key\n"
                + "	) as detalle\n"
                + "	from ventas v\n"
                + "	where v.datos_completo= false\n"
                + "	and v.estado=1\n"
                + ") venta";
        JSONArray arr = con.ejecutarConsultaArray(consulta2);
        data.put("data", arr);
        data.put("estado", "exito");
    }

    private void getVentaDatosRellenado(JSONObject data, Session session) throws SQLException, JSONException {
        Conexion con = ConexionPostgres.getInstance();
        ////////////extrae los datos rellenado de la venta trabajador,compras,
        String consulta = "select json_agg(row_to_json(venta.*)) as json \n"
                + "from (\n"
                + "select v.*,\n"
                + "	(\n"
                + "	select array_to_json(array_agg(deta.*)) \n"
                + "		from (\n"
                + "			select d.*,\n"
                + "			(\n"
                + "				select array_to_json(array_agg(cp.*)) \n"
                + "				from coste_produccion cp\n"
                + "				where cp.key_producto=d.key_producto\n"
                + "			) as costeProduccion\n"
                + "			from venta_detalle d\n"
                + "			where d.key_venta=v.key\n"
                + "		) as deta\n"
                + "	) as detalle,\n"
                + "	(\n"
                + "	select array_to_json(array_agg(vt.*)) \n"
                + "		from (\n"
                + "		select vt.*,(\n"
                + "		select array_agg(tp.*) as trabajos from trabajo_producto tp\n"
                + "			where tp.key= vt.key_trabajo_producto\n"
                + "		)\n"
                + "		from venta_trabajo vt\n"
                + "		where vt.key_venta=v.key \n"
                + "		) vt\n"
                + "	) as ventaTrabajo\n"
                + "	from ventas v\n"
                + "	where v.datos_completo= true\n"
                + "	and v.estado=1\n"
                + ") venta";
        JSONArray arr = con.ejecutarConsultaArray(consulta);
        data.put("data", arr);
        data.put("estado", "exito");
    }

    private void addVentaTrabajo(JSONObject data, Session session) throws JSONException, SQLException, IOException {
        JSONObject datat = data.getJSONObject("data");
        JSONArray dataTrabajo = data.getJSONObject("data").getJSONArray("armadores");
        JSONObject compras = data.getJSONObject("data").getJSONObject("compras");
        Conexion conPg = ConexionPostgres.getInstance();

        for (int i = 0; i < dataTrabajo.length(); i++) {
            JSONObject producto = dataTrabajo.getJSONObject(i);
            JSONObject armador = producto.getJSONObject("armador");
            for (int j = 0; j < armador.length(); j++) {
                String key = (j + 1) + "";
                JSONObject objArmador = (JSONObject) armador.get(key);
                addTrabajoVenta(objArmador, producto, datat, compras);
            }

        }
        //JSONObject comprador = new JSONObject();
        //comprador.put("key", UUID.randomUUID());
        //  comprador.put("key_venta", datat.getString("key_venta"));
        //    comprador.put("key_persona", compras.getString("key_persona"));
        //      comprador.put("monto", compras.getInt("monto"));
//        comprador.put("estado", 1);
        //comprador.put("fecha_on", datat.getString("fecha_on"));
        //   conPg.Transacction();
        //    try {
        //         String key_cargoVenta = conPg.insertar("venta_cargo_compra", new JSONArray().put(comprador));
        //          conPg.commit();
        //       } catch (Exception e) {
        //          conPg.rollback();
//        }
        boolean dat = false;
        String consulta = "UPDATE public.ventas\n"
                + "SET datos_completo=" + true
                + "	WHERE ventas.key='" + datat.getString("key_venta") + "'";
        conPg.Transacction();
        try {
            dat = conPg.updateData(consulta);
            conPg.commit();
        } catch (Exception e) {
            conPg.rollback();
        }
        data.put("estado", "exito");
        data.put("error", false);
        return;
    }

    private void addTrabajoVenta(JSONObject objArmador, JSONObject producto, JSONObject datat, JSONObject compras) throws JSONException, SQLException {
        Conexion conPg = ConexionPostgres.getInstance();
        String nombre_producto = producto.getString("nombre_producto");
        int cantidad = objArmador.getInt("cantidad");
        JSONObject objLimpieza = datat.getJSONObject("limpieza");
        String consulta2 = "select json_agg(row_to_json(venta.*)) as json  from(\n"
                + "select * from trabajo_producto\n"
                + "where fecha_off isnull\n"
                + "and estado =1\n"
                + "and key_persona_trabajo ='" + objArmador.getString("key_persona") + "'\n"
                + "and producto_terminado = false \n"
                + "and nombre = '" + nombre_producto + "'\n"
                + "	) venta";
        JSONArray arr = conPg.ejecutarConsultaArray(consulta2);
        int tamanoArr = arr.length();
        if (tamanoArr >= cantidad) {
            int cant = 1;
            for (int i = 0; i < tamanoArr; i++) {
                if (cantidad >= cant) {
                    JSONObject trabajo_producto = arr.getJSONObject(i);
                    JSONObject obj = new JSONObject();
                    obj.put("key", UUID.randomUUID());
                    obj.put("key_venta", datat.getString("key_venta"));
                    obj.put("key_trabajo_producto", trabajo_producto.getString("key"));
                    obj.put("estado", 1);
                    obj.put("fecha_on", datat.getString("fecha_on"));
                    conPg.Transacction();
                    try {
                        String key_trabajo = conPg.insertar("venta_trabajo", new JSONArray().put(obj));
                        conPg.commit();
                    } catch (Exception e) {
                        conPg.rollback();
                    }
                    cant++;
                    continue;
                }
                break;
            }
        } else {
            for (int i = 0; i < tamanoArr; i++) {
                cantidad--;
                JSONObject trabajo_producto = arr.getJSONObject(i);
                JSONObject obj = new JSONObject();
                obj.put("key", UUID.randomUUID());
                obj.put("key_trabajo_producto", trabajo_producto.getString("key"));
                obj.put("key_venta", datat.getString("key_venta"));
                obj.put("estado", 1);
                obj.put("fecha_on", datat.getString("fecha_on"));
                conPg.Transacction();
                try {
                    String key_trabajo = conPg.insertar("venta_trabajo", new JSONArray().put(obj));
                    conPg.commit();
                } catch (Exception e) {
                    conPg.rollback();
                }
            }
            String consul = "select row_to_json(productos.*) as json FROM productos \n"
                    + "where nombre = '" + nombre_producto + "'";
            String person = "select row_to_json(persona.*) as json FROM persona \n"
                    + "where key = '" + objArmador.get("key_persona") + "'";
            JSONObject objproducto = conPg.ejecutarConsultaObjet(consul);
            JSONObject objpersona = conPg.ejecutarConsultaObjet(person);

            for (int i = 0; i < cantidad; i++) {
                ////////////////////////////////////////////////////////////////////objTrabajoProducto
                JSONObject objTrabajoProducto = new JSONObject();
                objTrabajoProducto.put("key", UUID.randomUUID());
                objTrabajoProducto.put("key_persona_trabajo", objArmador.get("key_persona"));
                objTrabajoProducto.put("trabajo_precio", objproducto.get("precio_armador"));
                objTrabajoProducto.put("producto_terminado", false);

                objTrabajoProducto.put("key_persona_compra", compras.get("key_persona"));
                objTrabajoProducto.put("compra_realizado", false);
                objTrabajoProducto.put("encargado_compra_pago", objproducto.get("encargado_compra"));
                objTrabajoProducto.put("pago_compra_recibido", false);

                objTrabajoProducto.put("key_persona_limpieza", objLimpieza.getString("key_persona"));
                objTrabajoProducto.put("trabajo_limpieza_realizado", false);
                objTrabajoProducto.put("pago_limpieza", producto.getInt("pago_limpieza"));

                objTrabajoProducto.put("key_sucursal", objpersona.get("key_sucursal"));
                objTrabajoProducto.put("nombre", nombre_producto);
                objTrabajoProducto.put("pago_recibido", false);
                objTrabajoProducto.put("pago_recibido", false);
                objTrabajoProducto.put("estado", 1);
                objTrabajoProducto.put("fecha_on", datat.getString("fecha_on"));
                ////////////////////////////////////////////////////////////////////
                JSONObject objCargoCompra = new JSONObject();
                ///////////////////////////////////////
                conPg.Transacction();
                try {
                    String key_trabajo_producto = conPg.insertar("trabajo_producto", new JSONArray().put(objTrabajoProducto));
                    JSONObject obj = new JSONObject();
                    obj.put("key", UUID.randomUUID());
                    obj.put("key_venta", datat.getString("key_venta"));
                    obj.put("key_trabajo_producto", key_trabajo_producto);
                    obj.put("estado", 1);
                    obj.put("fecha_on", datat.getString("fecha_on"));
                    String key_trabajo = conPg.insertar("venta_trabajo", new JSONArray().put(obj));
                    conPg.commit();
                } catch (Exception e) {
                    conPg.rollback();
                }
            }

        }

    }

    private void addVenta(JSONObject data, Session session) throws JSONException, SQLException, IOException {
        JSONObject dataVenta = data.getJSONObject("data").getJSONObject("venta");
        JSONObject datat = data.getJSONObject("data");
        dataVenta.put("key", UUID.randomUUID());
        dataVenta.put("estado", 1);
        JSONArray dataDetalle = data.getJSONObject("data").getJSONArray("detalle");
        Conexion conPg = ConexionPostgres.getInstance();
        String key_venta = null;
        JSONObject pagoCaja = new JSONObject();

        if (dataVenta.getInt("adelanto") > 0) {
            String nit = datat.getString("nit");
            pagoCaja.put("key", UUID.randomUUID());
            pagoCaja.put("estado", 1);
            pagoCaja.put("descripcion", "Se realizo un un adelanto de venta "+datat.getString("nit"));
            pagoCaja.put("key_persona", datat.getString("key_persona_usuario"));
            pagoCaja.put("haber", 0);
            pagoCaja.put("debe", dataVenta.getInt("adelanto"));
            pagoCaja.put("cancelado", true);
            pagoCaja.put("fecha_on", datat.getString("fecha_on"));

        }
        conPg.Transacction();
        try {
            String pago = conPg.insertar("pago_salario", new JSONArray().put(pagoCaja));
            key_venta = conPg.insertar("ventas", new JSONArray().put(dataVenta));
            addDetalleVenta(dataDetalle, session, key_venta);
            conPg.commit();
        } catch (Exception e) {
            conPg.rollback();
        }
        conPg.Transacction_end();
        data.put("estado", "exito");
        data.put("error", false);
        return;
    }

    private boolean addDetalleVenta(JSONArray dataDetalle, Session session, String key_venta) throws JSONException, SQLException, IOException {
        Conexion conPg = ConexionPostgres.getInstance();

        conPg.Transacction();
        try {
            for (int i = 0; i < dataDetalle.length(); i++) {
                JSONObject objDetalle = dataDetalle.getJSONObject(i);
                objDetalle.put("key", UUID.randomUUID());
                objDetalle.put("estado", 1);
                objDetalle.put("key_venta", key_venta);
                String key = conPg.insertar("venta_detalle", new JSONArray().put(objDetalle));
            }
            conPg.commit();
        } catch (Exception e) {
            conPg.rollback();
        }

        return true;
    }

    private boolean updateProducto(String key_producto, int cantidadVenta, int cantidadProducto) throws JSONException, SQLException, IOException {
        Conexion conPg = ConexionPostgres.getInstance();
        boolean dat = false;
        String consulta = "UPDATE public.productos\n"
                + "SET cantidad=" + (cantidadProducto - cantidadVenta)
                + "	WHERE productos.key='" + key_producto + "'";
        dat = conPg.updateData(consulta);
        return dat;
    }

    private void finalizarVenta(JSONObject data, Session session) throws JSONException, SQLException, IOException {
        JSONObject datat = data.getJSONObject("data");
        Conexion conPg = ConexionPostgres.getInstance();
        boolean dat = false;
        String consulta = "UPDATE public.ventas\n"
                + "SET entrega=" + true
                + "	WHERE ventas.key='" + datat.getString("key_venta") + "'";
        conPg.Transacction();
        try {
            dat = conPg.updateData(consulta);
            conPg.commit();
        } catch (Exception e) {
            conPg.rollback();
        }
        data.put("estado", "exito");
        data.put("error", false);
    }

}

import React from 'react';
import {
    View,
    AsyncStorage,
} from 'react-native';
import { connect } from 'react-redux';
import * as areaTrabajoActions from '../../Actions/areaTrabajoActions'
import * as personaActions from '../../Actions/personaActions'
import * as productoActions from '../../Actions/productoActions'
import * as sucursalActions from '../../Actions/sucursalActions'
import * as materialActions from '../../Actions/materialActions'
import * as ventaActions from '../../Actions/ventaActions'
import * as comprasActions from '../../Actions/comprasActions'

const Carga = (props) => {
    const [obj, setObj] = React.useState(false);
    const ShowPage = () => {
        return (
            <View>

            </View>
        );
    }
    if (obj) {
        if (!props.state.socketReducer.socket) {
            return <View />
        }


        if (!props.state.usuarioReducer.usuarioLog) {
            props.state.usuarioReducer.estado = ""
            props.state.navigationReducer.replace("LoginPage");
            return <ShowPage />
        }
        if (props.state.areaTrabajoReducer.estado === "cargando" && props.state.areaTrabajoReducer.type === "getAllAreaTrabajo") {
            return <View />
        }
        if (!props.state.areaTrabajoReducer.dataAreaTrabajo) {
            props.getAllAreaTrabajo(props.state.socketReducer.socket);
            return <View />
        }
        if (props.state.sucursalReducer.estado === "cargando" && props.state.sucursalReducer.type === "getAllSucursal") {
            return <View />
        }
        if (!props.state.sucursalReducer.dataSucursal) {
            props.getAllSucursal(props.state.socketReducer.socket);
            return <View />
        }
        /////////////area compras<
        if (props.state.areaTrabajoReducer.dataAreaTrabajo[props.state.usuarioReducer.usuarioLog.persona.key_area_trabajo].nombre === "compras") {
            if (props.state.comprasReducer.estado === "cargando" && props.state.comprasReducer.type === "getAllLibroComprasPendienteUsuario") {
                return <View />
            }
            if (!props.state.comprasReducer.dataLibroComprasPendiente) {
                props.getAllLibroComprasPendienteUsuario(props.state.socketReducer.socket,
                    { key_persona: props.state.usuarioReducer.usuarioLog.persona.key });
                return <View />
            }
            props.state.navigationReducer.replace("InicioCompraPage");
            return <View />
        }
        /////////////area compras>


        if (props.state.productosReducer.estado === "cargando" && props.state.productosReducer.type === "getAllProducto") {
            return <View />
        }
        if (!props.state.productosReducer.dataProducto) {
            props.getAllProducto(props.state.socketReducer.socket);
            return <View />
        }
        if (props.state.personaReducer.estado === "cargando" && props.state.personaReducer.type === "getAllPersona") {
            return <View />
        }
        if (!props.state.personaReducer.dataPersonas) {
            props.getAllPersona(props.state.socketReducer.socket);
            return <View />
        }
        if (props.state.productosReducer.estado === "cargando" && props.state.productosReducer.type === "getAllTipoProducto") {
            return <View />
        }
        if (!props.state.productosReducer.dataTipoProducto) {
            props.getAllTipoProducto(props.state.socketReducer.socket);
            return <View />
        }
        
        if (props.state.materialReducer.estado === "cargando" && props.state.materialReducer.type === "getAllTipoMaterial") {
            return <View />
        }
        if (!props.state.materialReducer.dataTipoMaterial) {
            props.getAllTipoMaterial(props.state.socketReducer.socket);
            return <View />
        }
        if (props.state.materialReducer.estado === "cargando" && props.state.materialReducer.type === "getAllMaterial") {
            return <View />
        }
        if (!props.state.materialReducer.dataMaterial) {
            props.getAllMaterial(props.state.socketReducer.socket);
            return <View />
        }
        if (props.state.ventaReducer.estado === "cargando" && props.state.ventaReducer.type === "getVentaPendiente") {
            return <View />
        }
        if (!props.state.ventaReducer.dataVentaPendiente) {
            props.getVentaPendiente(props.state.socketReducer.socket);
            return <View />
        }
        if (props.state.ventaReducer.estado === "cargando" && props.state.ventaReducer.type === "getVentaDatosRellenar") {
            return <View />
        }
        if (props.state.ventaReducer.estado === "cargando" && props.state.ventaReducer.type === "getVentaFinalizado") {
            return <View />
        }

        if (!props.state.ventaReducer.dataVentaFinalizado) {
            props.getVentaFinalizado(props.state.socketReducer.socket);
            return <View />
        }
        if (!props.state.ventaReducer.dataVentaDatosPendiente) {
            props.getVentaDatosRellenar(props.state.socketReducer.socket);
            return <View />
        }
        if (props.state.ventaReducer.estado === "cargando" && props.state.ventaReducer.type === "getVentaDatosRellenado") {
            return <View />
        }

        if (!props.state.ventaReducer.dataVentaDatosFinalizado) {
            props.getVentaDatosRellenado(props.state.socketReducer.socket);
            return <View />
        }
        if (props.state.comprasReducer.estado === "cargando" && props.state.comprasReducer.type === "getAllLibroComprasPendiente") {
            return <View />
        }
        if (!props.state.comprasReducer.dataLibroComprasPendiente) {
            props.getAllLibroComprasPendiente(props.state.socketReducer.socket);
            return <View />
        }
        props.state.navigationReducer.replace("InicioPage");

    } else {
        const delay = ms => new Promise(res => setTimeout(res, ms));
        const yourFunction = async () => {
            await delay(1000);
            setObj(true);
            return <View />;
        };
        AsyncStorage.getItem("usuario").then((value) => {
            if (!value) {
                props.state.usuarioReducer.usuarioLog = false
                yourFunction();
                return;
            }
            if (value.length <= 0) {
                yourFunction();
                return;

            }
            props.state.usuarioReducer.usuarioLog = JSON.parse(value)
            yourFunction();

        });
    }
    return (
        <ShowPage />
    );
}
const initStates = (state) => {
    return { state }
};
const initActions = ({
    ...areaTrabajoActions,
    ...personaActions,
    ...productoActions,
    ...sucursalActions,
    ...materialActions,
    ...ventaActions,
    ...comprasActions

});
export default connect(initStates, initActions)(Carga);
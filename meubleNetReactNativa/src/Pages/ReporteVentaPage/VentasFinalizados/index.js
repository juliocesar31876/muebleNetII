import moment from 'moment';
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import * as ventaActions from '../../../Actions/ventaActions'
import * as sucursalActions from '../../../Actions/sucursalActions'
import * as popupActions from '../../../Actions/popupActions'
import * as popupCalendarioActions from '../../../Actions/popupCalendarioActions'
import Estado from '../../../Component/Estado';
import Svg from '../../../Svg';

const VentasFinalizados = (props) => {
    const [state, setState] = React.useState({
        fecha: {
            value: "",
            fechaInicio: false,
            fechaFin: false
        },
    })
    if (props.state.sucursalReducer.estado === "cargando" && props.state.sucursalReducer.type === "getAllSucursal") {
        return <Estado estado={"cargando"} />
    }
    if (!props.state.sucursalReducer.dataSucursal) {
        props.getAllSucursal(props.state.socketReducer.socket);
        return <View />
    }
    if (props.state.ventaReducer.estado === "cargando" && props.state.ventaReducer.type === "getVentaFinalizado") {
        return <Estado estado={"cargando"} />
    }
    if (props.state.ventaReducer.estado === "exito" && props.state.ventaReducer.type === "finalizarVenta") {
        props.state.ventaReducer.estado = ""
    }
    if (!props.state.ventaReducer.dataVentaFinalizado) {
        props.getVentaFinalizado(props.state.socketReducer.socket);
        return <View />
    }

    const popupCalendario = () => {
        props.abrirPopupCalendario((fechaSelecionada) => {
            state.fecha.value = fechaSelecionada.format('MMMM').toUpperCase()
            state.fecha.fechaInicio = fechaSelecionada.format('YYYY-MM') + "-01"
            state.fecha.fechaFin = moment(state.fecha.fechaInicio).subtract(0, 'months').endOf('month').format('YYYY-MM-DD');

            props.getVentaFecha(props.state.socketReducer.socket,
                {
                    mesDiaInicio: state.fecha.fechaInicio,
                    mesDiaFinal: state.fecha.fechaFin,
                });
            setState({ ...state })
            props.cerrarPopupCalendario()
            return <View />
        }, "mes")
        return <View />
    }
    const popupDetalleVenta = (venta) => {
        var total = 0
        venta.detalle.map((obj) => {
            total = total + (obj.cantidad * obj.precio)
        })

        props.abrirPopup(() => {
            return (
                <View style={{
                    width: "90%",
                    height: "80%",
                    backgroundColor: "#ffffff99",
                    borderRadius: 10,
                    alignItems: 'center',
                }}>
                    <View style={{
                        width: "90%",
                        marginTop: 20,
                        height: 60,
                        borderRadius: 10,
                        borderWidth: 3,
                        borderColor: "#fff",
                        alignItems: 'center',
                        backgroundColor: "#000",
                    }}>
                        <Text style={{ color: "#fff", fontSize: 11, margin: 5, textAlign: 'center', fontWeight: 'bold', }}>DETALLE VENTA </Text>
                        <View style={{ flex: 1, flexDirection: 'row', width: "100%", }}>
                            <Text style={{ color: "#fff", fontSize: 11, margin: 5, flex: 1, textAlign: 'center', fontWeight: 'bold', }}>Cliente: {venta.cliente} </Text>
                            <Text style={{ color: "#fff", fontSize: 11, margin: 5, textAlign: 'center', flex: 0.7 }}> Total  :{total} Bs </Text>
                        </View>
                    </View>
                    <ScrollView style={{ flex: 1, width: "100%", }}>
                        <View style={{
                            flex: 1,
                            alignItems: 'center',
                        }}>
                            {venta.detalle.map((obj) => {

                                return (
                                    <View
                                        style={{
                                            margin: 5,
                                            width: "90%",
                                            borderRadius: 10,
                                            borderWidth: 3,
                                            flexDirection: 'row',
                                            borderColor: "#fff",
                                            alignItems: 'center',
                                            backgroundColor: "#000",
                                        }}>
                                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
                                            <Text style={{ color: "#fff", fontSize: 11, margin: 5, fontWeight: 'bold', }}> Producto </Text>
                                            <Text style={{ color: "#fff", fontSize: 11, margin: 5, }}> {obj.producto} </Text>
                                        </View>

                                        <View style={{ flex: 1, }}>
                                            <Text style={{ color: "#fff", fontSize: 11, flex: 1, margin: 5, }}> Cantidad :   {obj.cantidad} </Text>
                                            <Text style={{ color: "#fff", fontSize: 11, flex: 1, margin: 5, }}> Precio :   {obj.precio} Bs </Text>
                                            <Text style={{ color: "#fff", fontSize: 11, flex: 1, margin: 5, }}> Total :   {(obj.cantidad * obj.precio)} Bs </Text>
                                        </View>
                                    </View>
                                )
                            })}
                        </View>
                    </ScrollView>

                </View>)
        })
    }
    return (
        <View style={{ flex: 1, width: "100%", marginTop: 20, alignItems: 'center', }}>

            <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>
                <Text style={{ color: "#fff", fontSize: 25, margin: 5, fontWeight: 'bold', }}> VENTAS REALIZADO </Text>
                <TouchableOpacity
                    onPress={() => {
                        props.getVentaFinalizado(props.state.socketReducer.socket);
                        state.fecha.value = ""
                        state.fecha.value = false
                        state.fecha.value = false
                        setState({ ...state })
                    }}
                    style={{ width: 40, height: 40, }}>
                    <Svg name={"actualizarVista"}
                        style={{
                            width: 30,
                            height: 30,
                            fill: "#fff",
                            margin: 5,
                        }} />
                </TouchableOpacity>
            </View>
            <View style={{ width: "90%", alignItems: 'center', justifyContent: 'center', flexDirection: 'row', marginTop: 20, }}>
                <Text style={{ color: "#fff", flex: 0.7, margin: 5, textAlign: "center" }}>Mes venta:</Text>
                <TouchableOpacity
                    onPress={() => popupCalendario()}
                    style={{ flex: 1, width: 100, height: 40, borderWidth: 2, borderColor: "#fff", borderRadius: 10, alignItems: 'center', justifyContent: 'center', }}>
                    <Text style={{ color: "#fff", fontSize: 10, }}> {state.fecha.value} </Text>
                </TouchableOpacity>
            </View>
            <ScrollView style={{ flex: 1, width: "100%", }}>
                <View style={{ width: "100%", margin: 5, flex: 1, alignItems: 'center', }}>
                    {Object.keys(props.state.ventaReducer.dataVentaFinalizado).map((key) => {
                        var obj = props.state.ventaReducer.dataVentaFinalizado[key]
                        var fecha = moment(obj.fecha_on, "YYYY-MM-DD").format("DD/MM/YYYY");
                        var sucursal = props.state.sucursalReducer.dataSucursal[obj.key_sucursal].direccion
                        return (
                            <TouchableOpacity
                                onPress={() => popupDetalleVenta(obj)}
                                style={{ width: "90%", borderBottomWidth: 2, borderColor: "#666", margin: 5, borderRadius: 10, flexDirection: 'row', }}>
                                <View style={{ flex: 1, }}>
                                    <Text style={{ color: "#fff", fontSize: 11, flex: 1, margin: 5, }}> Cliente :   {obj.cliente} </Text>
                                    <View style={{ flex: 1, }}>
                                        <Text style={{ color: "#fff", fontSize: 11, flex: 1, margin: 5, }}> Direccion :  </Text>
                                        <Text style={{ color: "#fff", fontSize: 10, flex: 1, margin: 5, }}> {obj.direccion} </Text>
                                    </View>
                                    <Text style={{ color: "#fff", fontSize: 11, flex: 1, margin: 5, }}> Sucursal :   {sucursal} </Text>
                                </View>
                                <View style={{ flex: 0.6, }}>
                                    <Text style={{ color: "#fff", fontSize: 11, margin: 5, }}> adelanto :   {obj.adelanto} </Text>
                                    <Text style={{ color: "#fff", fontSize: 11, margin: 5, }}> Descuento :   {obj.descuento} </Text>
                                    <Text style={{ color: "#fff", fontSize: 11, margin: 5, }}> Fecha :   {fecha} </Text>
                                </View>
                            </TouchableOpacity>
                        )
                    })}
                </View>
            </ScrollView>
        </View>
    )
}
const initActions = ({
    ...ventaActions,
    ...sucursalActions,
    ...popupActions,
    ...popupCalendarioActions
});
const initStates = (state) => {
    return { state }
};
export default connect(initStates, initActions)(VentasFinalizados);


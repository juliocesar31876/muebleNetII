import moment from 'moment';
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import * as ventaActions from '../../../Actions/ventaActions'
import * as sucursalActions from '../../../Actions/sucursalActions'
import * as popupActions from '../../../Actions/popupActions'
import Svg from '../../../Svg';

const VentasPendiente = (props) => {
   
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
                    <TouchableOpacity
                        onPress={() => {
                            props.finalizarVenta(props.state.socketReducer.socket, { key_venta: venta.key })
                            props.cerrarPopup()
                        }}
                        style={{
                            width: 150,
                            height: 50,
                            borderWidth: 2,
                            backgroundColor: "#000",
                            borderRadius: 10,
                            borderColor: "#fff",
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                        <Text style={{ color: "#fff", fontSize: 15, margin: 5, textAlign: 'center', fontWeight: 'bold', }}>Finalizar entrega </Text>
                    </TouchableOpacity>
                </View>)
        })
    }
    return (
        <View style={{ flex: 1, width: "100%", marginTop: 20, alignItems: 'center', }}>
            <TouchableOpacity
                onPress={() => {
                    props.getVentaPendiente(props.state.socketReducer.socket);
                }}
                style={{ width: 40, height: 40, position: "absolute", top: 4, right: 10 }}>
                <Svg name={"actualizarVista"}
                    style={{
                        width: 30,
                        height: 30,
                        fill: "#fff",
                        margin: 5,
                    }} />
            </TouchableOpacity>
            <Text style={{ color: "#fff", fontSize: 25, margin: 5, fontWeight: 'bold', }}> Ventas por entregar </Text>
            <ScrollView style={{ flex: 1, width: "100%", }}>
                <View style={{ width: "100%", margin: 5, flex: 1, alignItems: 'center', }}>
                    {Object.keys(props.state.ventaReducer.dataVentaPendiente).map((key) => {
                        var obj = props.state.ventaReducer.dataVentaPendiente[key]
                        var fecha = moment(obj.fecha_on, "YYYY-MM-DD").format("DD/MM/YYYY");
                        var sucursal = props.state.sucursalReducer.dataSucursal[obj.key_sucursal].direccion
                        return (
                            <TouchableOpacity
                                onPress={() => popupDetalleVenta(obj)}
                                style={{ width: "90%", borderBottomWidth: 2, borderColor: "#666", margin: 5, borderRadius: 10, flexDirection: 'row', }}>
                                <View style={{ flex: 1, }}>
                                    <Text style={{ color: "#fff", fontSize: 11, flex: 1, margin: 5, }}> Cliente :   {obj.cliente} </Text>
                                    <Text style={{ color: "#fff", fontSize: 11, flex: 1, margin: 5, }}> Sucursal :   {sucursal} </Text>
                                    <View style={{ flex: 1, }}>
                                        <Text style={{ color: "#fff", fontSize: 11, flex: 1, margin: 5, }}> Direccion :  </Text>
                                        <Text style={{ color: "#fff", fontSize: 10, flex: 1, margin: 5, }}> {obj.direccion} </Text>
                                    </View>
                                </View>
                                <View style={{ flex: 0.6, }}>
                                    <Text style={{ color: "#fff", fontSize: 11, margin: 5, }}> adelanto :   {obj.adelanto} </Text>
                                    <Text style={{ color: "#fff", fontSize: 11, margin: 5, }}> Descuento :   {obj.descuento} </Text>
                                    <Text style={{ color: "#fff", fontSize: 11, margin: 5, }}> Fecha :   {fecha} </Text>
                                </View>
                                <View style={{
                                    width: 20,
                                    height: 20,
                                    position: "absolute",
                                    top: 5,
                                    right: 5,
                                    backgroundColor: "red",
                                    borderWidth: 2,
                                    borderRadius: 100,
                                }}>
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
    ...popupActions
});
const initStates = (state) => {
    return { state }
};
export default connect(initStates, initActions)(VentasPendiente);


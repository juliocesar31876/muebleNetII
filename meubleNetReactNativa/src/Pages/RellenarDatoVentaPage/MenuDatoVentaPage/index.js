import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import Barra from '../../../Component/Barra';
class MenuDatoVentaPage extends Component {
    static navigationOptions = {
        headerShown: false,
    }
    constructor(props) {
        super(props);
        console.log(props.navigation.state.params.venta);
        var totalDetalle = 0
        props.navigation.state.params.venta.detalle.map((objProducto) => {
            totalDetalle = totalDetalle + (objProducto.precio_venta * objProducto.cantidad)
        })
        this.state = {
            venta: props.navigation.state.params.venta,
            totalDetalle
        };
    }
    selectComponent(text) {
        text = text.toLowerCase()
        switch (text) {
            case 'venta compra':
                this.props.navigation.navigate("VentaCompraPage",{venta:this.state.venta})
                break
            case 'venta perdida':
                this.props.navigation.navigate("VentaPerdidaPage",{venta:this.state.venta})
                break
            case 'venta trabajo':
                this.props.navigation.navigate("VentaTrabajoPage",{venta:this.state.venta})
                break
            default:
                break;
        }



    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: "#000", alignItems: 'center', }}>
                <Barra titulo={"Menu datos ventas"} navigation={this.props.navigation} />
                <ScrollView style={{ flex: 1, width: "90%", }}>

                    <View style={{ width: "90%", margin: 5, borderColor: "#999", }}>
                        <Text style={{ fontWeight: 'bold', color: '#999', margin: 5, textAlign: 'center' }}>Datos Venta </Text>
                        <Text style={{ fontWeight: 'bold', color: '#fff', margin: 5 }}>Cliente : {this.state.venta.cliente} </Text>
                        <Text style={{ fontWeight: 'bold', color: '#fff', margin: 5 }}>Telefono : {this.state.venta.telefono}   Nit : {this.state.venta.nit}</Text>
                        <Text style={{ fontWeight: 'bold', color: '#fff', margin: 5 }}>Adelanto : {this.state.venta.adelanto} Bs</Text>
                        <Text style={{ fontWeight: 'bold', color: '#fff', margin: 5 }}>Total Venta : {this.state.totalDetalle} Bs</Text>
                        <Text style={{ fontWeight: 'bold', color: '#fff', margin: 5 }}>Direccion : {this.state.venta.direccion}</Text>

                    </View>
                    <Text style={{ fontWeight: 'bold', color: '#999', margin: 5,textAlign:'center' }}>Venta detalle</Text>

                    {this.state.venta.detalle.map((objProducto) => {
                        return (
                            <View style={{ width: "100%", flexDirection: 'row', borderBottomWidth: 1, borderColor: "#fff", alignItems: 'center', padding: 5 }}>
                                <View style={{ flex: 1, }}>
                                    <Text style={{ color: '#fff', margin: 2, fontSize: 12, }}>{objProducto.nombre.toUpperCase()}</Text>
                                    <Text style={{ color: '#fff', margin: 2, fontSize: 12 }}>Total : {(objProducto.precio_venta * objProducto.cantidad)} Bs</Text>
                                </View>
                                <View style={{ flex: 0.5, }}>
                                    <Text style={{ color: '#fff', margin: 2, fontSize: 12 }}>Prec : {objProducto.precio_venta} Bs</Text>
                                    <Text style={{ color: '#fff', margin: 2, fontSize: 12 }}>Cant : {objProducto.cantidad}</Text>
                                    <Text style={{ color: '#fff', margin: 2, fontSize: 12 }}>Desc : {objProducto.descuento} %</Text>
                                </View>
                            </View>
                        )
                    })}

                </ScrollView>
                <View style={{ flex: 0.2, alignItems: 'center', marginTop: 20, flexDirection: 'row', }}>
                    {["Venta Compra", "Venta Perdida", "Venta trabajo"].map((text) => {

                        return (
                            <TouchableOpacity
                                onPress={() => this.selectComponent(text)}
                                style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: 200, margin: 5, height: 60, borderRadius: 10, borderColor: "#fff", borderWidth: 1, }}>
                                <Text style={{ fontWeight: 'bold', color: '#fff', textAlign: 'center', fontSize: 12, }}>{text.toUpperCase()}</Text>
                            </TouchableOpacity>
                        )
                    })
                    }
                </View>
            </View>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(MenuDatoVentaPage);


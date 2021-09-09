import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ScrollView, BackHandler } from 'react-native';
import { connect } from 'react-redux';
import * as ventaActions from '../../../Actions/ventaActions'
import * as popupActions from '../../../Actions/popupActions'
import Barra from '../../../Component/Barra';
class MenuDatoVentaPage extends Component {
    static navigationOptions = {
        headerShown: false,
    }
    constructor(props) {
        super(props);
        ////back handler
        props.state.paginaReducer.paginaAnterior = props.state.paginaReducer.paginaActual
        props.state.paginaReducer.paginaActual = props.navigation.state.routeName
        props.navigation["paginaAnterior"] = props.state.paginaReducer.paginaAnterior
        props.state.paginaReducer.objNavigation[props.navigation.state.routeName] = props.navigation
        ////
        var totalDetalle = 0
        var mostrar = props.navigation.state.params.mostrar
        props.navigation.state.params.venta.detalle.map((objProducto) => {
            totalDetalle = totalDetalle + (objProducto.precio_venta * objProducto.cantidad)
        })
        this.state = {
            venta: props.navigation.state.params.venta,
            totalDetalle,
            mostrar
        };
    }
    selectComponent(text) {
        text = text.toLowerCase()
        switch (text) {
            case 'venta trabajo':
                this.props.navigation.navigate("VentaTrabajoPage", { venta: this.state.venta })
                break
        }
    }

    render() {
        if (this.props.state.ventaReducer.estado === "exito" && this.props.state.ventaReducer.type === "addVentaTrabajo") {
            this.props.state.ventaReducer.estado = ""
            this.props.getVentaDatosRellenado(this.props.state.socketReducer.socket);
            this.props.navigation.goBack()
            return <View />
        }
        return (
            <View style={{ flex: 1, backgroundColor: "#000", alignItems: 'center', }}>
                <Barra titulo={"Menu datos ventas"} navigation={this.props.navigation} />
                <ScrollView style={{ flex: 1, width: "90%", }}>
                    <View style={{ flex: 1, alignItems: 'center', }}>

                        <View style={{ width: "90%", margin: 5, borderColor: "#999", }}>
                            <Text style={{ fontWeight: 'bold', color: '#999', margin: 5, textAlign: 'center' }}>Datos Venta </Text>
                            <Text style={{ fontWeight: 'bold', color: '#fff', margin: 5 }}>Cliente : {this.state.venta.cliente} </Text>
                            <Text style={{ fontWeight: 'bold', color: '#fff', margin: 5 }}>Telefono : {this.state.venta.telefono}   Nit : {this.state.venta.nit}</Text>
                            <Text style={{ fontWeight: 'bold', color: '#fff', margin: 5 }}>Adelanto : {this.state.venta.adelanto} Bs</Text>
                            <Text style={{ fontWeight: 'bold', color: '#fff', margin: 5 }}>Total Venta : {this.state.totalDetalle} Bs</Text>
                            <Text style={{ fontWeight: 'bold', color: '#fff', margin: 5 }}>Direccion : {this.state.venta.direccion}</Text>

                        </View>
                        <Text style={{ fontWeight: 'bold', color: '#999', margin: 5, textAlign: 'center', fontSize: 18 }}>Venta detalle</Text>
                        {this.state.venta.detalle.map((objProducto) => {
                            return (
                                <View style={{ margin: 5, width: "100%", flexDirection: 'row', borderBottomWidth: 1, borderColor: "#fff", alignItems: 'center', padding: 5 }}>
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
                        <Text style={{ fontWeight: 'bold', color: '#999', margin: 5, textAlign: 'center', fontSize: 18 }}>Verificar coste produccion</Text>

                        {this.state.venta.detalle.map((objProducto) => {
                            return (
                                <View style={{ margin: 5, width: "100%", flexDirection: 'row', borderColor: "#fff", alignItems: 'center', padding: 5 }}>
                                    <View style={{ flex: 1, }}>
                                        <Text style={{ color: '#fff', margin: 2, fontSize: 12, }}>{objProducto.nombre.toUpperCase()}</Text>
                                    </View>
                                    <View
                                        style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
                                        <TouchableOpacity
                                            onPress={() => {
                                                if (objProducto.costeproduccion === null) {
                                                    alert("no contiene ningun coste de produccion agregado")
                                                    return <View />
                                                }
                                                if (objProducto.costeproduccion === undefined) {
                                                    alert("no contiene ningun coste de produccion agregado")
                                                    return <View />
                                                }
                                                this.props.navigation.navigate("VerificarCosteProduccionPage",
                                                    {
                                                        venta: this.state.venta,
                                                        costeproduccion: objProducto.costeproduccion,
                                                        nombre: objProducto.nombre
                                                    })
                                            }}
                                            style={{ width: 110, height: 40, borderBottomWidth: 1, borderColor: '#fff' }}>
                                            <Text style={{ color: '#fff', margin: 2, fontSize: 13, }}>Coste produccion</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )
                        })}
                        {this.state.mostrar
                            ? (
                                <TouchableOpacity
                                    onPress={() => this.props.navigation.navigate("VentaTrabajoPage", { venta: this.state.venta })
                                    }
                                    style={{ marginTop: 50, justifyContent: 'center', alignItems: 'center', width: 200, margin: 5, height: 60, borderRadius: 10, borderColor: "#fff", borderWidth: 1, }}>
                                    <Text style={{ fontWeight: 'bold', color: '#fff', textAlign: 'center', fontSize: 12, }}>Registrar datos de ventas</Text>
                                </TouchableOpacity>
                            ) : (
                                <View style={{ flex: 1, width: "100%", }}>

                                    <Text style={{ fontWeight: 'bold', color: '#999', margin: 5, textAlign: 'center', fontSize: 18 }}
                                    >Trabajo Muebles</Text>

                                    {this.state.venta.ventatrabajo.map((objVentaTrabajo) => {
                                        var persona = this.props.state.personaReducer.dataPersonas[objVentaTrabajo.trabajos.key_persona_trabajo]
                                        var persona_compra = this.props.state.personaReducer.dataPersonas[objVentaTrabajo.trabajos.key_persona_compra]
                                        var producto_terminado = "Terminado"
                                        if (!objVentaTrabajo.trabajos.producto_terminado) {
                                            producto_terminado = "Pendiente"
                                        }
                                        return (
                                            <View style={{ width: '100%', borderBottomWidth: 1, borderColor: "#fff", }}>
                                                <Text
                                                    style={{ color: '#fff', margin: 2, fontSize: 14, margin: 5, width: '100%', textAlign: 'right' }}
                                                > {objVentaTrabajo.trabajos.nombre.toUpperCase()} </Text>
                                                <Text style={{ color: '#fff', margin: 2, fontSize: 12, margin: 5, }}
                                                >Persona trabajo: {persona.nombre.toUpperCase() + " " + persona.paterno.toUpperCase()} </Text>
                                                <Text style={{ color: '#fff', margin: 2, fontSize: 12, margin: 5, }}
                                                >Persona compras: {persona_compra.nombre.toUpperCase() + " " + persona_compra.paterno.toUpperCase()} </Text>
                                                <Text
                                                    style={{ color: '#fff', margin: 2, fontSize: 12, margin: 5, }}
                                                >Mueble terminado : {producto_terminado} </Text>
                                            </View>
                                        )
                                    })
                                    }



                                </View>
                            )
                        }
                    </View>
                </ScrollView>

            </View>
        );
    }
}
const initStates = (state) => {
    return { state }
};
const initActions = ({
    ...ventaActions,
    ...popupActions
});
export default connect(initStates, initActions)(MenuDatoVentaPage);
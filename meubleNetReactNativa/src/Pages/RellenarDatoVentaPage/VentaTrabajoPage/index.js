import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import Barra from '../../../Component/Barra';
import * as ventaActions from '../../../Actions/ventaActions'
import * as popupActions from '../../../Actions/popupActions'
import Svg from '../../../Svg';
import moment from 'moment';

class VentaTrabajoPage extends Component {
    static navigationOptions = {
        headerShown: false,
    }
    constructor(props) {
        super(props);
        var venta = props.navigation.state.params.venta
        var dataTrabajo = []
        for (const key in venta.detalle) {
            var producto = venta.detalle[key]
            var obj = {
                nombre_producto: producto.nombre,
                cantidad: producto.cantidad,
                armador: {
                    1: {
                        key_persona: false,
                        nombre_persona: "selecione armador",
                        cantidad: ""
                    }
                }

            }
            dataTrabajo.push(obj)
        }

        this.state = {
            venta,
            compra: {
                nombrePersona: "Selecione Comprador",
                key_persona: false,
            },
            dataTrabajo
        };
    }
    popupPersona = (key_dataTrabajo, pasar, area, key2) => {
        const selecEmpleado = (persona) => {
            if (pasar) {
                this.state.compra.key_persona = persona.key
                this.state.compra.nombrePersona = persona.nombre + " " + persona.paterno
                this.setState({ ...this.state })
                this.props.cerrarPopup()
                return <View />
            }
            this.state.dataTrabajo[key_dataTrabajo].armador[key2].key_persona = persona.key
            this.state.dataTrabajo[key_dataTrabajo].armador[key2].nombre_persona = persona.nombre + " " + persona.paterno

            this.setState({ ...this.state })
            this.props.cerrarPopup()
        }
        this.props.abrirPopup(() => {
            return (
                <View style={{
                    width: "90%",
                    height: "80%",
                    backgroundColor: "#000",
                    borderWidth: 1,
                    borderColor: "#fff",
                    borderRadius: 10,
                }}>
                    <ScrollView style={{ flex: 1, }}>
                        <View style={{
                            flex: 1,
                            margin: 10,
                            width: "100%",
                            alignItems: 'center',
                        }}>
                            <Text style={{ margin: 4, color: "#fff", fontWeight: 'bold', fontSize: 20, }}>Armador mueble </Text>

                            {Object.keys(this.props.state.personaReducer.dataPersonas).map((key) => {
                                var obj = this.props.state.personaReducer.dataPersonas[key]
                                var area_trabajo = this.props.state.areaTrabajoReducer.dataAreaTrabajo[obj.key_area_trabajo]
                                if (area_trabajo.nombre !== area) {
                                    return <View />
                                }
                                return (
                                    <TouchableOpacity
                                        onPress={() => selecEmpleado(obj)}
                                        style={{
                                            margin: 5,
                                            width: "90%",
                                            height: 50,
                                            borderRadius: 10,
                                            borderWidth: 3,
                                            flexDirection: 'row',
                                            borderColor: "#fff",
                                            alignItems: 'center',
                                            backgroundColor: "#000",
                                        }}>
                                        <Text style={{ margin: 4, color: "#fff", fontSize: 12, textAlign: "center", flex: 1, }}>{obj.nombre} {obj.materno} </Text>
                                        <Text style={{ margin: 4, color: "#fff", fontSize: 12, textAlign: "center", flex: 1, }}> CI : {obj.ci} </Text>
                                    </TouchableOpacity>
                                )
                            })}
                        </View>
                    </ScrollView>
                </View>)
        })
    }
    enviarTrabajos() {
        var exito = true
        var error = ""
        this.state.dataTrabajo.map((obj, key) => {
            var num = 0
            Object.keys(obj.armador).map((key) => {
                var data = obj.armador[key]
                var cantidad = Number(data.cantidad)
                num = num + cantidad
                if ((cantidad + "") === "NaN") {
                    return <View />
                }
                if (data.nombre_persona === "selecione armador") {
                    exito = false
                    error = "armador"
                    return <View />
                }
            })
            if (num !== obj.cantidad) {
                error = "cantidad de producto no son exacto " + obj.nombre_producto
                exito = false
                return <View />
            }

        })
        if (!this.state.compra.key_persona) {
            error = "selecion comprador "
            exito = false
        }
        if (exito) {
            var fecha = moment()
                .format('YYYY-MM-DD');
            var hora = moment()
                .format('HH:mm:ss');
            var timeStam = fecha + "T" + hora
            var objSend = {
                fecha_on: timeStam,
                key_venta: this.state.venta.key,
                compras: this.state.compra,
                armadores: this.state.dataTrabajo
            }
            this.props.addVentaTrabajo(this.props.state.socketReducer.socket, objSend)
            return <View />
        }
        alert(error)

    }
    addArmador(obj, key) {
        if (obj.cantidad === 1) {
            return <View />
        }
        var num = Object.keys(obj.armador).length
        if (num === obj.cantidad) {
            return <View />
        }
        num = num + 1
        this.state.dataTrabajo[key].armador[num] = {
            key_persona: false,
            nombre_persona: "selecione armador",
            cantidad: ""
        }
        this.setState({ ...this.state })
        console.log(this.state.dataTrabajo[key].armador[num]);
    }
    render() {
        if (this.props.state.ventaReducer.estado === "exito" && this.props.state.ventaReducer.type === "addVentaTrabajo") {
            this.props.getVentaDatosRellenado(this.props.state.socketReducer.socket);
            this.props.navigation.goBack()
            return <View />
        }
        return (
            <View style={{ flex: 1, backgroundColor: "#000", }}>
                <Barra titulo={"Venta Trabajo"} navigation={this.props.navigation} />

                <ScrollView style={{ flex: 1, width: "100%", }}>
                    <View style={{ flex: 1, alignItems: 'center', }}>

                        {this.state.venta.detalle.map((objProducto) => {
                            return (
                                <View style={{ width: "100%", flexDirection: 'row', borderBottomWidth: 1, borderColor: "#fff", alignItems: 'center', padding: 5 }}>
                                    <View style={{ flex: 1, }}>
                                        <Text style={{ color: '#fff', margin: 2, fontSize: 12, }}>{objProducto.nombre.toUpperCase()}</Text>
                                        <Text style={{ color: '#fff', margin: 2, fontSize: 12 }}>PrecioVenta : {objProducto.precio_venta} Bs</Text>
                                        <Text style={{ color: '#fff', margin: 2, fontSize: 12 }}>PrecioProduccion : {objProducto.precio_produccion} Bs</Text>
                                    </View>
                                    <View style={{ flex: 0.7, }}>
                                        <Text style={{ color: '#fff', margin: 2, fontSize: 12 }}>Cant : {objProducto.cantidad}</Text>
                                        <Text style={{ color: '#fff', margin: 2, fontSize: 12 }}>Desc : {objProducto.descuento} %</Text>
                                        <Text style={{ color: '#fff', margin: 2, fontSize: 12 }}>Total : {(objProducto.precio_venta * objProducto.cantidad)} Bs</Text>
                                    </View>
                                </View>
                            )
                        })}

                        <Text style={{ color: '#fff', width: '100%', margin: 5, textAlign: 'center', fontWeight: 'bold', }}> Registro Armadores</Text>

                        {this.state.dataTrabajo.map((obj, key) => {
                            return (
                                <View style={{ width: '100%', alignItems: 'center', }}>
                                    <View style={{ width: '90%', flexDirection: 'row', justifyContent: 'center', margin: 5, alignItems: 'center', }}>
                                        <Text style={{ color: '#fff', fontWeight: 'bold', flex: 1, }}> {obj.nombre_producto.toUpperCase()} </Text>
                                        <Text style={{ color: '#fff', fontWeight: 'bold', flex: 1, }}> CANTIDAD: {obj.cantidad}    </Text>
                                        <TouchableOpacity
                                            onPress={() => this.addArmador(obj, key)}
                                            style={{
                                                flex: 0.2,
                                                borderRadius: 100,
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}>
                                            <Svg name={'add'}
                                                style={{
                                                    width: 30,
                                                    height: 30,
                                                    fill: "#999",
                                                    margin: 5,
                                                }} />
                                        </TouchableOpacity>
                                    </View>
                                    {Object.keys(obj.armador).map((key2) => {
                                        var data = obj.armador[key2]
                                        return (
                                            <View style={{ flex: 1, flexDirection: 'row', }}>
                                                <View style={{ flex: 1, alignItems: 'center', }}>
                                                    <Text style={{ color: '#fff', width: '80%', margin: 5, fontWeight: 'bold', }}> {obj.nombre_producto}</Text>
                                                    <TouchableOpacity
                                                        onPress={() => this.popupPersona(key, false, "armador mueble", key2)}
                                                        style={{ justifyContent: 'center', alignItems: 'center', width: '80%', height: 40, backgroundColor: "#fff", borderRadius: 10, }}>
                                                        <Text>{data.nombre_persona}</Text>
                                                    </TouchableOpacity>
                                                </View>
                                                <View style={{ flex: 0.5, alignItems: 'center', }}>
                                                    <Text style={{ color: '#fff', width: '80%', margin: 5, }}> Cantidad mueble</Text>
                                                    <TextInput
                                                        value={data.monto}
                                                        keyboardType={"numeric"}
                                                        onChangeText={text => {
                                                            this.state.dataTrabajo[key].armador[key2].cantidad = text
                                                            this.setState({ ...this.state })
                                                        }}
                                                        style={{ width: '80%', height: 40, backgroundColor: "#fff", borderRadius: 10, }} />

                                                </View>
                                            </View>
                                        )

                                    })

                                    }
                                </View>

                            )

                        })

                        }
                        <Text style={{ color: '#fff', width: '80%', margin: 5, }}> Comprador</Text>
                        <TouchableOpacity
                            onPress={() => this.popupPersona("", true, "compras")}
                            style={{ justifyContent: 'center', alignItems: 'center', width: '80%', height: 40, backgroundColor: "#fff", borderRadius: 10, }}>
                            <Text>{this.state.compra.nombrePersona}</Text>
                        </TouchableOpacity>
                    </View>

                </ScrollView>

                <TouchableOpacity
                    onPress={() => this.enviarTrabajos()}
                    style={{
                        width: 50,
                        height: 50,
                        margin: 5,
                        borderRadius: 100,
                        position: 'absolute',
                        bottom: 10,
                        right: 15,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                    <Svg name={'add'}
                        style={{
                            width: 50,
                            height: 50,
                            fill: "#999",
                            margin: 5,
                        }} />
                </TouchableOpacity>
            </View>
        );
    }
}
const initStates = (state) => {
    return { state }
};
const initActions = ({
    ...popupActions,
    ...ventaActions
});
export default connect(initStates, initActions)(VentaTrabajoPage);


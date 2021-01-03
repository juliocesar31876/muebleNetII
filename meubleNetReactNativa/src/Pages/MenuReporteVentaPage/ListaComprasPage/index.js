import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    View,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Text,
    TextInput
} from 'react-native';
import Svg from '../../../Svg';
import * as usuarioActions from '../../../Actions/usuarioActions'
import * as popupActions from '../../../Actions/popupActions'
import Barra from '../../../Component/Barra';
import moment from 'moment';
import MiCheckBox from '../../../Component/MiCheckBox';
class ListaComprasPage extends Component {
    static navigationOptions = {
        headerShown: false,
    }
    constructor(props) {
        super(props);
        var comprasLibro = props.navigation.state.params.comprasLibro
        var ingreso = props.navigation.state.params.comprasLibro.ingreso
        var compras = props.navigation.state.params.comprasLibro.compra
        var persona = props.navigation.state.params.persona
        var area = props.navigation.state.params.area
        var menu = ["Finzalizar libro", "Registrar ingreso"]
        if (area === "compras") {
            menu = ["Realizar Compras"]
        }
        if (compras === null) {
            compras = []
        }
        this.state = {
            titulo: "Informe compras",
            persona,
            area,
            comprasLibro,
            compras,
            ingreso,
            menu
        }
    }

    render() {
        return (
            <View style={{
                flex: 1,
                backgroundColor: '#000',
            }}>
                <Barra titulo={this.state.titulo} navigation={this.props.navigation} />

                <ScrollView style={{ flex: 1, width: "100%", }}>
                    <View style={{ width: "100%", margin: 5, flex: 1, alignItems: 'center', }}>
                        <Text style={{ color: '#999', fontWeight: 'bold', fontSize: 20, textAlign: 'center' }}> Muestra el libro de compras</Text>
                        <Text style={{ color: '#999', fontWeight: 'bold', fontSize: 15, margin: 5, width: '100%', }}>
                            Saldo disponible : {(this.state.comprasLibro.totalIngreso - this.state.comprasLibro.totalCompras)} </Text>
                        <Text style={{ color: '#999', fontWeight: 'bold', fontSize: 15, margin: 5, width: '100%', }}>
                            Fecha ingresado saldo  </Text>
                        <Text style={{ color: '#999', fontWeight: 'bold', fontSize: 15, margin: 5, width: '100%', }}>
                            Total Ingreso {this.state.comprasLibro.totalIngreso}  Bs</Text>
                        {this.state.ingreso.map((ingreso, key) => {
                            var pago = "efectivo"
                            if (ingreso.pago) {
                                pago = "Cuenta Bancaria"
                            }
                            var numero = (key + 1)
                            var fecha = ingreso.fecha_on.split("T")[0]
                            var hora = ingreso.fecha_on.split("T")[1]
                            return (
                                <TouchableOpacity
                                    style={{ width: "100%", borderBottomWidth: 2, borderColor: "#666", margin: 5, borderRadius: 10, height: 50, alignItems: 'center', justifyContent: 'center', }}>
                                    <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center', }}>
                                        <View style={{ flex: 1, width: '100%', flexDirection: 'row', }}>
                                            <Text style={{ flex: 0.6, color: '#fff', fontWeight: 'bold', margin: 5, }}> {fecha}  {pago}  </Text>
                                            <Text style={{
                                                flex: 0.4, color: '#fff', fontWeight: 'bold', margin: 5,
                                                textAlign: 'center', fontSize: 12,
                                            }}>{ingreso.monto} Bs    </Text>
                                        </View>

                                    </View>
                                </TouchableOpacity>
                            )
                        })}
                        <Text style={{ color: '#999', textAlign: 'center', fontWeight: 'bold', fontSize: 15, margin: 5, width: '100%', }}>
                            Compras Ingreo - egreso</Text>
                        <View style={{ width: '100%', flexDirection: 'row', marginTop: 10, alignItems: 'center', }}>

                            <View style={{ flex: 0.6, flexDirection: 'row', alignItems: 'center', }}>
                                <Text style={{ color: '#999', fontWeight: 'bold', textAlign: 'center', fontSize: 15, width: '100%', }}>
                                    Detalle  </Text>
                            </View>
                            <View style={{ flex: 0.2, flexDirection: 'row', alignItems: 'center', }}>
                                <Text style={{ width: '100%', color: '#999', fontWeight: 'bold', fontSize: 15, margin: 5, }}>
                                    ingreso </Text>
                            </View>
                            <View style={{ flex: 0.2, flexDirection: 'row', alignItems: 'center', }}>
                                <Text style={{ width: '90%', color: '#999', fontWeight: 'bold', fontSize: 15, margin: 5, }}>egreso </Text>

                            </View>
                        </View>
                        {this.state.compras.map((compras, key) => {
                            var ingreso = 0
                            var egreso = 0
                            var numero = (key + 1)
                            var fecha = compras.fecha_on.split("T")[0]
                            var hora = compras.fecha_on.split("T")[1]
                            var colors = "#fff"
                            var cantidad = 0
                            var precio = 0
                            var detalleCompra = ""
                            if (compras.ingreso) {
                                ingreso = egreso + (compras.cantidad * compras.precio)
                                colors = "#f02"
                            }
                            if (!compras.ingreso) {
                                egreso = egreso + (compras.cantidad * compras.precio)
                                cantidad = compras.cantidad
                                precio = compras.precio
                                detalleCompra = "  Cantidad : " + cantidad + "   Precio/U : " + precio
                            }
                            return (
                                <TouchableOpacity
                                    style={{ width: "95%", borderBottomWidth: 2, borderColor: colors, margin: 5, height: 50, alignItems: 'center', justifyContent: 'center', }}>
                                    <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center', }}>
                                        <View style={{ flex: 1, width: '100%', flexDirection: 'row', }}>
                                            <View style={{ flex: 0.6, }}>
                                                <Text style={{ fontSize: 13, color: '#fff', fontWeight: 'bold', margin: 5, }}
                                                >{numero}.-  {fecha}  {compras.detalle}  </Text>
                                                <Text style={{ fontSize: 13, color: '#fff', fontWeight: 'bold', }}
                                                >      {detalleCompra} </Text>
                                            </View>
                                            <Text style={{
                                                flex: 0.2, color: '#fff', fontWeight: 'bold', margin: 5,
                                                textAlign: 'right', fontSize: 12,
                                            }}>{ingreso} Bs    </Text>
                                            <Text style={{
                                                flex: 0.2, color: '#fff', fontWeight: 'bold', margin: 5
                                                , textAlign: 'center', fontSize: 12,
                                            }}>{egreso} Bs </Text>

                                        </View>

                                    </View>
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                </ScrollView>
                <View style={{ width: '100%', height: 80, alignItems: 'center', }}>
                    {this.state.menu.map((text) => {
                        return (
                            <View style={{ flex: 1, alignItems: 'center', height: 70, }}>
                                <TouchableOpacity
                                    onPress={() => {
                                        switch (text) {
                                            case "Realizar Compras":
                                                this.props.navigation.navigate("ComprasPage",
                                                    { key_compras_libro: this.state.comprasLibro.key, objCompralibro: this.state.comprasLibro })
                                                return <View />

                                            default:
                                                return <View />
                                        }
                                    }}
                                    style={{ width: 100, height: 50, margin: 5, borderRadius: 100, alignItems: 'center', }}>
                                    <Svg name={'add'}
                                        style={{
                                            width: 40,
                                            height: 40,
                                            fill: "#999",
                                            margin: 5,
                                        }} />
                                    <Text style={{
                                        color: '#fff', fontWeight: 'bold', margin: 5,
                                        fontSize: 10,
                                    }}> {text}    </Text>
                                </TouchableOpacity>

                            </View>
                        )
                    })}
                </View>
            </View>
        );
    }
};
const styles = StyleSheet.create({
    input: {
        backgroundColor: '#ffffff',
        color: '#000',
        marginTop: 10,
        borderRadius: 8,
        width: '100%',
        height: 40,
    },
    error: {
        borderWidth: 2,
        borderColor: "#f00",
        backgroundColor: '#ffffff',
        color: '#000',
        marginTop: 10,
        borderRadius: 8,
        width: '100%',
        height: 40,
    },
});
const initActions = ({
    ...usuarioActions,
    ...popupActions
});
const initStates = (state) => {
    return { state }
};
export default connect(initStates, initActions)(ListaComprasPage);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    View,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Text,
    TextInput,
    BackHandler
} from 'react-native';
import Svg from '../../Svg';
import * as comprasActions from '../../Actions/comprasActions'
import * as popupActions from '../../Actions/popupActions'
import Barra from '../../Component/Barra';
import MiCheckBox from '../../Component/MiCheckBox';
import Estado from '../../Component/Estado';

const initActions = ({
    ...comprasActions,
    ...popupActions
});
const initStates = (state) => {
    return { state }
};
class RegistrarPagosComprasPage extends Component {
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
        this.state = {
            titulo: "Registrar saldo comprador",
            menu: ["Reporte ventas", "Datos ventas faltante", "Informe venta"],
            obj: {
                pago_efectivo: false,
                pago_cuenta: false
            }
        }
    }
   
    popup(objPersona) {
        this.props.abrirPopup(() => {
            var pago = false
            return (
                <View style={{
                    width: "90%",
                    height: "80%",
                    backgroundColor: "#000",
                    borderWidth: 1,
                    borderColor: "#fff",
                    borderRadius: 10,
                    alignItems: 'center',
                }}>
                    <Text style={{ color: '#999', fontWeight: 'bold', fontSize: 20, }}> Cancelar monto comprador</Text>

                    <View style={{
                        flex: 1,
                        margin: 10,
                        width: "100%",
                        alignItems: 'center',

                    }}>
                        <Text style={{ flex: 0.3, color: '#999', fontWeight: 'bold', fontSize: 15, textAlign: 'center' }}> {objPersona.nombre + " " + objPersona.paterno}</Text>
                        <View style={{ width: '100%', flexDirection: 'row', margin: 5, alignItems: 'center', justifyContent: 'center', }}>
                            <Text style={{ flex: 0.3, color: '#999', fontWeight: 'bold', fontSize: 15, }}> Monto</Text>
                            <TextInput
                                style={{ flex: 0.5, width: 100, height: 35, backgroundColor: "#fff", borderRadius: 10, }}
                            />
                        </View>
                        <View style={{ width: '100%', flexDirection: 'row', }}>
                            <View style={{ flex: 1, alignItems: 'center', }}>
                                <Text style={{ color: '#999', fontWeight: 'bold', fontSize: 15, }}> efectivo</Text>
                                <MiCheckBox ischeck={pago} id={"pago_efectivo"}
                                    onChange={text => (
                                        pago = text
                                    )}
                                />
                            </View>
                        </View>
                        <TouchableOpacity style={{ marginTop: 30, width: 100, height: 40, borderRadius: 10, borderColor: '#fff', borderWidth: 1, justifyContent: 'center', alignItems: 'center', }}>
                            <Text style={{ color: '#999', fontWeight: 'bold', fontSize: 13, textAlign: 'center' }}> Realizar pago</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        })

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
                        <Text style={{ color: '#999', fontWeight: 'bold', fontSize: 20, textAlign: 'center' }}> Cancelar saldo para compras </Text>

                        {Object.keys(this.props.state.personaReducer.dataPersonas).map((key) => {
                            var persona = this.props.state.personaReducer.dataPersonas[key]
                            var area = this.props.state.areaTrabajoReducer.dataAreaTrabajo[persona.key_area_trabajo].nombre
                            if (area !== "compras") {
                                return <View />
                            }
                            return (
                                <TouchableOpacity
                                    onPress={() => this.props.navigation.navigate("VerLibroComprasPage", { persona, area })}
                                    style={{ width: "90%", borderBottomWidth: 2, borderColor: "#666", margin: 2, borderRadius: 10, padding: 5 }}>
                                    <Text style={{ color: '#fff', fontWeight: 'bold', margin: 5, }}>  {persona.nombre.toUpperCase() + " " + persona.paterno.toUpperCase()}</Text>
                                    <Text style={{ color: '#fff', fontWeight: 'bold', margin: 5, }}> CI :  {persona.ci}</Text>
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                </ScrollView>
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

export default connect(initStates, initActions)(RegistrarPagosComprasPage);

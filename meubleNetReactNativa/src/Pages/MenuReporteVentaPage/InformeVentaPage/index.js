import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    View,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Text
} from 'react-native';
import Svg from '../../../Svg';
import * as ventaActions from '../../../Actions/ventaActions'
import Barra from '../../../Component/Barra';
import moment from 'moment';
import Estado from '../../../Component/Estado';
class InformeVentaPage extends Component {
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
            titulo: "Informe venta",
        }
    }

    render() {
        if (this.props.state.ventaReducer.estado === "cargando" && this.props.state.ventaReducer.type === "getVentaDatosRellenado") {
            return <Estado estado={"cargando"} />
        }
        if (!this.props.state.ventaReducer.dataVentaDatosFinalizado) {
            this.props.getVentaDatosRellenado(this.props.state.socketReducer.socket);
            return <Estado estado={"cargando"} />
        }
        return (
            <View style={{
                flex: 1,
                backgroundColor: '#000',
                alignItems: 'center',
            }}>
                <Barra titulo={this.state.titulo} navigation={this.props.navigation} />
                <TouchableOpacity
                    onPress={() => {
                        this.props.getVentaDatosRellenado(this.props.state.socketReducer.socket);
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
                <ScrollView style={{ flex: 1, width: "100%", }}>
                    <View style={{ width: "100%", margin: 5, flex: 1, alignItems: 'center', }}>
                        {Object.keys(this.props.state.ventaReducer.dataVentaDatosFinalizado).map((key) => {
                            var obj = this.props.state.ventaReducer.dataVentaDatosFinalizado[key]
                            var fecha = moment(obj.fecha_on, "YYYY-MM-DD").format("DD/MM/YYYY");
                            return (
                                <TouchableOpacity
                                    onPress={() => this.props.navigation.navigate("MenuDatoVentaPage", { venta: obj, mostrar: false })}
                                    style={{ width: "90%", borderBottomWidth: 2, borderColor: "#666", margin: 5, borderRadius: 10, flexDirection: 'row', }}>
                                    <View style={{ flex: 1, }}>
                                        <Text style={{ color: "#fff", fontSize: 11, flex: 1, margin: 5, }}> Cliente :   {obj.cliente} </Text>
                                        <Text style={{ color: "#fff", fontSize: 11, flex: 1, margin: 5, }}> Nit :   {obj.nit} </Text>
                                    </View>
                                    <View style={{ flex: 0.8, }}>
                                        <Text style={{ color: "#fff", fontSize: 11, margin: 5, }}> adelanto :   {obj.adelanto} </Text>
                                        <Text style={{ color: "#fff", fontSize: 11, flex: 1, margin: 5, }}> Telefono :   {obj.telefono} </Text>
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
    ...ventaActions
});
const initStates = (state) => {
    return { state }
};
export default connect(initStates, initActions)(InformeVentaPage);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Text,
    View,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    ScrollView,
    BackHandler
} from 'react-native';
import * as usuarioActions from '../../Actions/usuarioActions'
import Barra from '../../Component/Barra';
class MenuReporteVentaPage extends Component {
    static navigationOptions = {
        headerShown: false,
    }
    constructor(props) {
        ////back handler
        props.state.paginaReducer.paginaAnterior = props.state.paginaReducer.paginaActual
        props.state.paginaReducer.paginaActual = props.navigation.state.routeName
        props.navigation["paginaAnterior"] = props.state.paginaReducer.paginaAnterior
        props.state.paginaReducer.objNavigation[props.navigation.state.routeName] = props.navigation
        ////
        super(props);
        this.state = {
            titulo: "Menu reporte ventas",
            menu: ["Datos ventas faltante", "Informe venta",]
        }
    }
    select(text) {
        switch (text) {
            case "Finalizar ventas":
                this.props.navigation.navigate("ReporteVentaPage")
                return <View />
                return <View />
            case "Datos ventas faltante":
                this.props.navigation.navigate("RellenarDatoVentaPage")
                return <View />
            case "Informe venta":
                this.props.navigation.navigate("InformeVentaPage")
                return <View />
            default:
                return <View />
        }
    }
   
    render() {
        return (
            <View style={{
                flex: 1,
                backgroundColor: '#000',
            }}>
                <Barra titulo={this.state.titulo} navigation={this.props.navigation} />
                <View style={{ flex: 1, width: '100%', alignItems: 'center', padding: 5, justifyContent: 'center', }}>
                    {this.state.menu.map((text) => {
                        return (
                            <TouchableOpacity
                                onPress={() => this.select(text)}
                                style={{ width: 200, height: 50, borderColor: '#fff', borderWidth: 2, margin: 5, borderRadius: 10, alignItems: 'center', justifyContent: 'center', }}>
                                <Text style={{ color: '#fff', fontWeight: 'bold', }}>{text}</Text>
                            </TouchableOpacity>
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
    ...usuarioActions
});
const initStates = (state) => {
    return { state }
};
export default connect(initStates, initActions)(MenuReporteVentaPage);
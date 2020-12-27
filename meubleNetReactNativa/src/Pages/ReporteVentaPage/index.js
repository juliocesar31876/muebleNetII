import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Text,
    View,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    ScrollView
} from 'react-native';
import Svg from '../../Svg';
import * as usuarioActions from '../../Actions/usuarioActions'
import Barra from '../../Component/Barra';
import VentasPendiente from './VentasPendiente';
import VentasFinalizados from './VentasFinalizados';
class ReporteVentaPage extends Component {
    static navigationOptions = {
        headerShown: false,
    }
    constructor(props) {
        super(props);
        this.state = {
            titulo: "Reporte de ventas",
            componet: "VENTAS PENDIENTE"

        }
    }
    select(text) {
        this.state.componet = text
        this.setState({ ...this.state })
    }
    selectComponet() {
        switch (this.state.componet) {
            case "VENTAS PENDIENTE":
                return <VentasPendiente />
            case "VENTAS FINALIZADOS":
                return <VentasFinalizados />
            case "Ventas al credito":
                return <View />
            default:
                return <View />
        }
    }
    barraMenu() {
        return (
            <View style={{
                width: "100%",
                height: 50,
                marginTop: 20,
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'center',
            }}>
                {["VENTAS PENDIENTE", "VENTAS FINALIZADOS"].map((text) => {
                    var color = "#fff"
                    if (this.state.componet === text) {
                        color = "#666"
                    }
                    return (
                        <TouchableOpacity
                            onPress={() => {
                                this.select(text)
                            }}
                            style={{
                                flex: 1,
                                height: "90%",
                                margin: 5,
                                borderWidth: 1,
                                borderRadius: 10,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderColor: color,
                            }}>
                            <Text style={{
                                color: color,
                                fontSize: 9,
                                textAlign: "center",
                                fontWeight: 'bold',
                            }}>{text}</Text>
                        </TouchableOpacity>
                    )
                })
                }
            </View>
        )
    }
    render() {
        return (
            <View style={{
                flex: 1,
                backgroundColor: '#000',
            }}>
                <Barra titulo={this.state.titulo} navigation={this.props.navigation} />
                {this.selectComponet()}
                {this.barraMenu()}
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
export default connect(initStates, initActions)(ReporteVentaPage);

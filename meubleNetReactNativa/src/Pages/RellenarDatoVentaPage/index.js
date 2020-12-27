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
import * as usuarioActions from '../../Actions/usuarioActions'
import Barra from '../../Component/Barra';
import Svg from '../../Svg';
import moment from 'moment';
class RellenarDatoVentaPage extends Component {
    static navigationOptions = {
        headerShown: false,
    }
    constructor(props) {
        super(props);
        this.state = {
            titulo: "Trabajos de venta",
        }
    }
    render() {
        return (
            <View style={{
                flex: 1,
                backgroundColor: '#000',
            }}>
                <Barra titulo={this.state.titulo} navigation={this.props.navigation} />
                <TouchableOpacity
                    onPress={() => {
                        this.props.getVentaPendiente(props.state.socketReducer.socket);
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
                        {Object.keys(this.props.state.ventaReducer.dataVentaPendiente).map((key) => {
                            var obj = this.props.state.ventaReducer.dataVentaPendiente[key]
                            var fecha = moment(obj.fecha_on, "YYYY-MM-DD").format("DD/MM/YYYY");
                            return (
                                <TouchableOpacity
                                    onPress={() => this.props.navigation.navigate("MenuDatoVentaPage", { venta: obj })}
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
    ...usuarioActions
});
const initStates = (state) => {
    return { state }
};
export default connect(initStates, initActions)(RellenarDatoVentaPage);

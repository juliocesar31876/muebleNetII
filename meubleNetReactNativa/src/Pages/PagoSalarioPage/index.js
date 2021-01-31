import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    AsyncStorage,
    ScrollView,
    FlatList,
    BackHandler
} from 'react-native';
import Barra from '../../Component/Barra';
import Estado from '../../Component/Estado';
import Svg from '../../Svg';
import * as personaActions from '../../Actions/personaActions'
import * as trabajoActions from '../../Actions/trabajoActions'
class PagoSalarioPage extends Component {
    static navigationOptions = {
        headerShown: false,
    }
    constructor(props) {
        super(props);
        var arayArea = []
        Object.keys(props.state.areaTrabajoReducer.dataAreaTrabajo).map((key) => {
            var obj = props.state.areaTrabajoReducer.dataAreaTrabajo[key]
            arayArea.push(obj)
        })
        var verLista = true
        if (!this.props.state.trabajoReducer.dataAreaPagoPendiente) {
            verLista = false
        }
        this.state = {
            index: 0,
            titulo: "Reporte Salarios",
            menu: ["armador mueble", "compras", "limpieza"],
            arayArea,
            verLista
        }
    }


    handleClick = (item) => {
        this.props.state.personaReducer.dataPagoAreaPendiente = false
        switch (item) {
            case "armador mueble":
                this.props.navigation.navigate("ListaPagosPage", { area: item })
                return <View />
            case "compras":
                this.props.navigation.navigate("ListaPagosPage", { area: item })
                return <View />
            case "limpieza":
                this.props.navigation.navigate("ListaPagosPage", { area: item })
                return <View />
            case "salir":
                AsyncStorage.removeItem('usuario')
                this.props.state.usuarioReducer.usuariolog = false;
                this.props.navigation.replace("CargaPage")
                return <View />
            default:
                return <View />
        }
    }
    ListaAreaTrabajo() {

        return (
            <ScrollView style={{ flex: 1, width: '100%', marginTop: 20, }}>
                {Object.keys(this.props.state.areaTrabajoReducer.dataAreaTrabajo).map((key) => {
                    var obj = this.props.state.areaTrabajoReducer.dataAreaTrabajo[key]
                    return (
                        <View style={{
                            width: '100%', height: 50, alignItems: 'center', justifyContent: 'center', margin: 8,
                        }}>
                            <TouchableOpacity
                                onPress={() => {
                                    this.state.verLista = true
                                    this.setState({ ...this.state })
                                    this.props.getAreaTrabajoPagosSalario(this.props.state.socketReducer.socket, {
                                        key_area_trabajo: obj.key
                                    })
                                }}
                                style={{
                                    flex: 1, width: 200,
                                    borderRadius: 8,
                                    alignItems: 'center', justifyContent: 'center',
                                    borderWidth: 1,
                                    borderColor: '#fff',
                                }}>
                                <Text style={{
                                    color: "#fff",
                                    fontSize: 14,
                                    fontWeight: 'bold',
                                }}>
                                    {obj.nombre.toUpperCase()}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )
                })}
            </ScrollView>
        )
    }
    ListaPersona() {
        if (this.props.state.trabajoReducer.estado === "cargando" &&
            this.props.state.trabajoReducer.type === "getAreaTrabajoPagosSalario") {
            return <Estado estado="cargando" />
        }
        if (!this.props.state.trabajoReducer.dataAreaPagoPendiente) {
            return <Estado estado="cargando" />
        }
        return (
            <ScrollView style={{ flex: 1, width: '100%', marginTop: 20, }}>
                <View style={{ flex: 1, alignItems: 'center', width: '100%', }}>

                </View>
                {Object.keys(this.props.state.trabajoReducer.dataAreaPagoPendiente).map((key) => {
                    var obj = this.props.state.trabajoReducer.dataAreaPagoPendiente[key]
                    return (
                        <TouchableOpacity
                            onPress={() => {
                                this.props.navigation.navigate("SalarioTrabajoPage", {
                                    pagina: "PagoSalarioPage",
                                    data: obj,
                                    admin:this.props.navigation.state.params.admin

                                })
                            }}
                            style={{
                                width: '90%', height: 50, justifyContent: 'center', margin: 8,
                                borderBottomWidth: 1, borderColor: '#fff',
                            }}>
                            <Text style={{
                                color: "#fff",
                                fontSize: 13,
                                fontWeight: 'bold',
                            }}>
                                {obj.nombre.toUpperCase() + " " + obj.paterno.toUpperCase() + " " + obj.materno.toUpperCase()}
                            </Text>
                            <Text style={{
                                color: "#fff",
                                fontSize: 13,
                                fontWeight: 'bold',
                            }}>
                                Libro de caja
                            </Text>
                        </TouchableOpacity>
                    )
                })}
            </ScrollView>
        )
    }
    render() {
        return (
            <View
                style={{
                    flex: 1,
                    width: "100%",
                    alignItems: 'center',
                    backgroundColor: "#000",
                }}>
                <Barra titulo={this.state.titulo} navigation={this.props.navigation} />
                <Text style={{
                    color: "#fff",
                    fontSize: 20,
                    fontWeight: 'bold',
                    borderBottomWidth: 2,
                    borderColor: '#fff',
                }}>
                    PAGOS AREA DE TRABAJO
                </Text>
                <View style={{ flex: 1, alignItems: 'center', width: '100%', justifyContent: 'center', }}>

                    {!this.state.verLista ?
                        (
                            this.ListaAreaTrabajo()
                        )
                        :
                        (

                            this.ListaPersona()
                        )}

                </View>

                {!this.state.verLista ?
                    (
                        <View />
                    )
                    :
                    (

                        <TouchableOpacity
                            onPress={() => {
                                this.state.verLista = !this.state.verLista
                                this.setState({ ...this.state })
                                this.props.state.trabajoReducer.dataAreaPagoPendiente = false
                            }}
                            style={{
                                width: 50,
                                height: 50,
                                borderRadius: 100,
                                borderWidth: 2,
                                borderColor: '#fff',
                                alignItems: 'center',
                                justifyContent: 'center',
                                position: 'absolute',
                                right: 10,
                                bottom: 10

                            }}>
                            <Text style={{
                                color: "#fff",
                                fontSize: 12,
                                fontWeight: 'bold',
                                borderBottomWidth: 2,
                                borderColor: '#fff',

                            }}>
                                volver
                            </Text>
                        </TouchableOpacity>
                    )}

            </View>
        );
    }
};

const initStates = (state) => {
    return { state }
};
const initActions = ({
    ...personaActions,
    ...trabajoActions
});

export default connect(initStates, initActions)(PagoSalarioPage);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    View,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Text,
    TextInput,
    Dimensions,
    BackHandler
} from 'react-native';
import Svg from '../../../Svg';
import * as comprasActions from '../../../Actions/comprasActions'
import * as popupActions from '../../../Actions/popupActions'
import Barra from '../../../Component/Barra';
import Estado from '../../../Component/Estado';
class VerLibroComprasPage extends Component {
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
        var persona = props.navigation.state.params.persona
        var area = props.navigation.state.params.area

        var personaUsuario = props.state.usuarioReducer.usuarioLog.persona
        var area_trabajo = props.state.areaTrabajoReducer.dataAreaTrabajo[personaUsuario.key_area_trabajo].nombre
        this.state = {
            titulo: "Ver libro compras",
            menu: ["Reporte ventas", "Datos ventas faltante", "Informe venta"],
            persona,
            area,
            area_trabajo
        }
    }

    render() {
        if (this.props.state.comprasReducer.estado === "cargando" && this.props.state.comprasReducer.type === "getAllLibroComprasPendiente") {
            return <Estado estado={"cargando"} />
        }
        if (!this.props.state.comprasReducer.dataLibroComprasPendiente) {
            this.props.getAllLibroComprasPendiente(this.props.state.socketReducer.socket);
            return <Estado estado={"cargando"} />
        }
        return (
            <View style={{
                flex: 1,
                backgroundColor: '#000',
            }}>
                <Barra titulo={this.state.titulo} navigation={this.props.navigation} />

                <ScrollView style={{ flex: 1, width: "100%", }}>
                    <View style={{ width: "100%", margin: 5, flex: 1, alignItems: 'center', }}>
                        <Text style={{ color: '#999', fontWeight: 'bold', fontSize: 20, textAlign: 'center' }}> Muestra el libro de compras</Text>
                        <Text style={{ width: '90%', color: '#999', fontWeight: 'bold', fontSize: 15, margin: 5, marginTop: 20, }}>
                            Lista de libro de compras  </Text>
                        {Object.keys(this.props.state.comprasReducer.dataLibroComprasPendiente).map((key) => {
                            var obj = this.props.state.comprasReducer.dataLibroComprasPendiente[key]
                            var fecha = obj.fecha_on.split("T")[0]
                            var hora = obj.fecha_on.split("T")[1]
                            if (this.state.persona.key !== obj.key_persona) {
                                return <View />
                            }
                            return (
                                <TouchableOpacity
                                    onPress={() => this.props.navigation.navigate("ListaComprasPage", {
                                        persona: this.state.persona,
                                        area: this.state.area,
                                        comprasLibro: obj,

                                    })}
                                    style={{
                                        width: "90%", borderBottomWidth: 2, borderColor: "#666", margin: 5, borderRadius: 10,
                                        height: 50, alignItems: 'center', justifyContent: 'center',
                                    }}>
                                    <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center', }}>
                                        <View style={{ flex: 1, justifyContent: 'center', }}>
                                            <Text style={{ color: '#fff', fontWeight: 'bold', margin: 5, fontSize: 12 }}> Fecha:  {fecha}   </Text>

                                        </View>
                                        <View>
                                            <Text style={{ color: '#fff', fontWeight: 'bold', margin: 5, }}> hora: {hora}   </Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                </ScrollView>
                {this.state.area_trabajo === "administrador" ?
                    (
                        <TouchableOpacity
                            onPress={() => {
                                this.props.state.comprasReducer.estado = ""
                                this.props.navigation.navigate("AddSaldoCompradorPage", {
                                    persona: this.state.persona,
                                    area: this.state.area,
                                    nuevo: true,
                                    finalizo: false,
                                })
                            }}
                            style={{ width: 50, height: 50, margin: 10, borderRadius: 100, position: 'absolute', right: 20, bottom: 50 }}>
                            <Svg name={'add'}
                                style={{
                                    width: 50,
                                    height: 50,
                                    fill: "#999",
                                    margin: 5,
                                }} />
                        </TouchableOpacity>
                    )
                    :
                    (
                        <View />
                    )}
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
    ...comprasActions,
    ...popupActions
});
const initStates = (state) => {
    return { state }
};
export default connect(initStates, initActions)(VerLibroComprasPage);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    FlatList,
    Image,
    TouchableHighlight,
    ActivityIndicator,
    Dimensions,
    BackHandler
} from 'react-native';
import Barra from '../../../Component/Barra';
import Svg from '../../../Svg';
import myPropsJulio from '../../../nativeSocket/myPropsServer.json';
import * as personaActions from '../../../Actions/personaActions'
import * as popupActions from '../../../Actions/popupActions'
import Swipeable from 'react-native-swipeable';
import moment from 'moment';
import Estado from '../../../Component/Estado';
import Foto from '../../../Component/Foto';

class TrabajosArmadorPage extends Component {
    static navigationOptions = {
        headerShown: false,
    }
    constructor(props) {
        super(props);
        var arrayMenu = []
        var arrayMenu = ["trabajos", "salario"];
        var areaTrabajo = props.navigation.state.params.areaTrabajo;
        var usuarioPersona = props.state.usuarioReducer.usuarioLog.persona
        ////back handler
        props.state.paginaReducer.paginaAnterior = props.state.paginaReducer.paginaActual
        props.state.paginaReducer.paginaActual = props.navigation.state.routeName
        props.navigation["paginaAnterior"] = props.state.paginaReducer.paginaAnterior
        props.state.paginaReducer.objNavigation[props.navigation.state.routeName] = props.navigation
        ////
        this.state = {
            titulo: "Trabajo armador  ",
            menu: arrayMenu,
            usuarioPersona,
            areaTrabajo
        }
    }
    popupNotificacion = (obj) => {

        this.props.abrirPopup(() => {
            return (
                <View style={{
                    width: Dimensions.get('window').width * 0.8,
                    height: Dimensions.get('window').height * 0.3,
                    backgroundColor: "#000",
                    borderColor: "#fff",
                    borderWidth: 2,
                    borderRadius: 10,
                    justifyContent: 'center',

                }}>
                    < Text style={{ textAlign: 'center', fontWeight: 'bold', color: "red", fontSize: 17, }}> ALERTA</Text>
                    < Text style={{ textAlign: 'center', fontWeight: 'bold', color: "#fff", fontSize: 12, }}> Esta seguro que desea terminar este mueble</Text>
                    <View style={{
                        width: '100%',
                        alignItems: 'center',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        marginTop: 10,
                    }}>
                        <TouchableOpacity
                            onPress={() => this.terminarTrabajo(obj)}
                            style={{
                                width: 100,
                                borderColor: "#fff",
                                height: 30,
                                borderWidth: 2,
                                borderRadius: 10,
                                margin: 5,
                            }}>
                            < Text style={{ textAlign: 'center', fontWeight: 'bold', color: "#fff", fontSize: 14, }}> Terminar</Text>

                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => this.props.cerrarPopup()}
                            style={{
                                width: 100,
                                margin: 5,
                                height: 30,
                                borderColor: "#fff",
                                borderWidth: 2,
                                borderRadius: 10,
                            }}>
                            < Text style={{ textAlign: 'center', fontWeight: 'bold', color: "#fff", fontSize: 14, }}> Cancelar</Text>

                        </TouchableOpacity>

                    </View>
                </View>
            )

        })
    }

    terminarTrabajo(obj) {
        var fecha = moment()
            .format('YYYY-MM-DD');
        var hora = moment()
            .format('HH:mm:ss');
        var fecha_on = fecha + "T" + hora
        var key_persona_trabajo = obj.key_persona_trabajo
        if (this.state.areaTrabajo === "limpieza") {
            key_persona_trabajo = obj.key_persona_limpieza
        }
        this.props.terminarTrabajoPendiente(this.props.state.socketReducer.socket, {
            key_trabajo_producto: obj.key,
            fecha_on,
            trabajo_precio: obj.trabajo_precio,
            encargado_compra_pago: obj.encargado_compra_pago,
            nombre_producto: obj.nombre,
            key_persona_trabajo,
            key_persona_compra: obj.key_persona_compra,
            areaTrabajo: this.state.areaTrabajo
        })
        this.props.cerrarPopup()
        return <View />
    }
    render() {

        if (this.props.state.personaReducer.estado === "cargando" && this.props.state.personaReducer.type === "getTrabajoPendiente") {
            return <Estado estado={"cargando"} />
        }
        return (
            <View
                style={{
                    flex: 1,
                    width: Dimensions.get("window").width,
                    height: Dimensions.get("window").height,
                    alignItems: 'center',
                    backgroundColor: "#000",
                }}>
                <Barra titulo={this.state.titulo} navigation={this.props.navigation} />

                <TouchableOpacity
                    onPress={() => {
                        this.props.getTrabajoPendiente(this.props.state.socketReducer.socket,
                            {
                                key_persona: this.props.state.usuarioReducer.usuarioLog.persona.key,
                                area: this.state.areaTrabajo
                            });

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
                <Text style={{
                    color: "#fff",
                    fontSize: 30,
                    fontWeight: 'bold',
                    margin: 10,
                }}>
                    Trabajos pendiente
                    </Text>
                <ScrollView style={{ flex: 1, width: '100%', }}>

                    <View style={{ flex: 1, alignItems: 'center', width: '100%', }}>

                        {Object.keys(this.props.state.personaReducer.dataTrabajoPersonaPendiente).map((key) => {
                            var obj = this.props.state.personaReducer.dataTrabajoPersonaPendiente[key]
                            var url = myPropsJulio.images.urlImage + obj.key_producto + ".png" + `?tipo=${"producto"}`
                            /*        var fecha = obj.fecha_entrega.split("T")[0]
                                   var fechas = moment(fecha, "YYYY-MM-DD").format("dddd DD  MMMM"); */

                            return (
                                <Swipeable rightButtons={
                                    [

                                        <TouchableHighlight style={{
                                            width: '100%',
                                            marginTop: 15,
                                            height: 60,
                                            justifyContent: 'center',
                                        }}>


                                            {this.props.state.personaReducer.estado === "cargando" && this.props.state.personaReducer.type === "terminarTrabajoPendiente" ? (
                                                <TouchableOpacity
                                                    style={{
                                                        flex: 1,
                                                        justifyContent: 'center',
                                                        width: '100%',
                                                        alignItems: 'flex-start',
                                                    }}>
                                                    <ActivityIndicator size="small" color="#fff" />
                                                </TouchableOpacity>
                                            ) : (
                                                    <TouchableOpacity
                                                        onPress={() => this.popupNotificacion(obj)}
                                                        style={{
                                                            flex: 1,
                                                            justifyContent: 'center',
                                                            width: '100%',
                                                        }}>
                                                        <Svg name={"terminarmueble"}
                                                            style={{
                                                                width: 35,
                                                                height: 35,
                                                                fill: "#fff",
                                                                margin: 5,
                                                            }} />
                                                        <Text style={{
                                                            color: "#fff",
                                                            fontSize: 10,
                                                            marginLeft: 1,
                                                            fontWeight: 'bold',
                                                        }}>
                                                            Finalizar
                                                </Text>
                                                    </TouchableOpacity>
                                                )
                                            }
                                        </TouchableHighlight>
                                    ]
                                }>
                                    <View
                                        style={{ margin: 10, flexDirection: 'row', width: '95%', height: 80, borderColor: "#fff", }}>
                                        <View style={{ margin: 2, flex: 0.3, borderRadius: 10, overflow: 'hidden', }}>

                                            <Image
                                                source={{ uri: myPropsJulio.images.urlImage + obj.key_producto + ".png" + `?tipo=${"producto"}` }}
                                                style={{ width: "100%", height: "100%", fill: "#000" }} />
                                        </View>
                                        <View style={{ flex: 0.7, margin: 5, justifyContent: 'center', flexDirection: 'column', }}>
                                            <Text style={{
                                                color: "#fff",
                                                fontSize: 16,
                                                fontWeight: 'bold',
                                            }}>
                                                {obj.nombre.toUpperCase()}
                                            </Text>
                                            <Text style={{
                                                color: "#fff",
                                                fontSize: 12,
                                                margin: 2,
                                                fontWeight: 'bold',
                                            }}>
                                                Pendiente
                    </Text>
                                        </View>
                                        <View style={{ margin: 2, flex: 0.3, alignItems: 'center', justifyContent: 'center', }}>
                                            <View style={{
                                                borderRadius: 100,
                                            }}>
                                                <Text style={{
                                                    color: "#999",
                                                    fontSize: 12,
                                                    margin: 2,
                                                    fontWeight: 'bold',
                                                }}>
                                                    {"<----"} Deslizar
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                </Swipeable>

                            )

                        })}

                    </View>
                </ScrollView>

            </View>

        );
    }
};
const initStates = (state) => {
    return { state }
};
const initActions = ({
    ...personaActions,
    ...popupActions
});
export default connect(initStates, initActions)(TrabajosArmadorPage);

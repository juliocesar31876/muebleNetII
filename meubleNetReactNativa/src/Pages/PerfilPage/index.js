import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Text,
    View,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    ScrollView,
    Dimensions,
    Image,
    TouchableHighlight,
    BackHandler
} from 'react-native';
import Svg from '../../Svg';
import * as fotoActions from '../../Actions/fotoActions'
import * as popupActions from '../../Actions/popupActions'
import * as usuarioActions from '../../Actions/usuarioActions'
import Barra from '../../Component/Barra';
import Foto from '../../Component/Foto';
import myPropsServer from '../../nativeSocket/myPropsServer.json';
import ImagePicker from '../../Component/ImagePicker';
import Swipeable from 'react-native-swipeable';
import moment from 'moment';

class PerfilPage extends Component {
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
        var usuario = props.state.usuarioReducer.usuarioLog
        var persona = props.state.usuarioReducer.usuarioLog.persona
        var telefono = props.state.usuarioReducer.usuarioLog.persona.telefono
        props.state.usuarioReducer.estado = ""

        this.state = {
            usuario,
            persona,
            popup: false,

        }
    }

    pickPhoto() {
        const response = (resp) => {
            console.log(resp);
        }
        this.props.state.imagePickerReducer.respose = response;
        this.props.state.imagePickerReducer.key = this.state.usuario.persona.key;
        this.props.state.imagePickerReducer.tipo = "persona";
        this.props.state.imagePickerReducer.key_usuario = this.state.usuario.key;
        this.props.state.imagePickerReducer.dispath = () => {
            this.props.actualizarFoto(this.props.state.imagePickerReducer);
        }
        /* this.props.state.imagePickerReducer.imagePicker(this.props.state.imagePickerReducer); */

        ImagePicker(this.props.state.imagePickerReducer)

    }
    popupNotificacion = (text, titulo) => {
        const actualizarData = (titulo, texto) => {

            switch (titulo) {
                case "user":
                    var data = {
                        usuario: this.state.usuario,
                        tabla: "usuario",
                        columna: "user",
                        wvalue: "'" + this.state.persona.key + "'",
                        value: "'" + texto + "'",
                        wcolumna: "key_persona",
                    }
                    this.props.state.usuarioReducer.usuarioLog.user = texto
                    this.props.editarPerfil(this.props.state.socketReducer.socket, data)
                    this.props.cerrarPopup();

                    break;
                case "fecha_nacimiento":
                    const Momen = moment(texto, "DD/MM/YYYY")
                    var fecha = Momen.format('YYYY-MM-DD');
                    if (fecha === "Fecha inválida") {
                        alert("su fecha es invalida")
                        return <View />
                    }
                    var data = {
                        usuario: this.state.usuario,
                        tabla: "persona",
                        columna: titulo,
                        value: texto,
                        wcolumna: "key",
                        value: "'" + texto + "'",
                        wvalue: "'" + this.state.persona.key + "'",
                    }
                    this.props.state.usuarioReducer.usuarioLog.user = texto
                    this.props.editarPerfil(this.props.state.socketReducer.socket, data)
                    this.props.cerrarPopup();

                    break;
                default:
                    var data = {
                        usuario: this.state.usuario,
                        tabla: "persona",
                        columna: titulo,
                        value: texto,
                        wcolumna: "key",
                        value: "'" + texto + "'",
                        wvalue: "'" + this.state.persona.key + "'",
                    }
                    this.props.state.usuarioReducer.usuarioLog.persona[titulo] = texto
                    this.props.editarPerfil(this.props.state.socketReducer.socket, data)
                    this.props.cerrarPopup();
            }
        }

        this.props.abrirPopup(() => {
            var plcace = ""
            var type = ""
            if (titulo === "fecha_nacimiento") {
                plcace = "10/05/2020"
                type = "phone-pad"
            }
            if (titulo === "telefono") {
                type = "phone-pad"
            }
            var texto = ""
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
                    < Text style={{ textAlign: 'center', fontWeight: 'bold', color: "red", fontSize: 17, }}>  {titulo}</Text>
                    <View style={{
                        flexDirection: 'row',
                        width: '100%',
                        alignItems: 'center',
                    }}>
                        < Text style={{ fontWeight: 'bold', textAlign: "center", color: "#fff", fontSize: 12, flex: 0.3, }}> Texto</Text>
                        <TextInput
                            autoCapitalize={"none"}
                            onChangeText={text => {
                                texto = text
                            }}
                            keyboardType={type}
                            placeholder={plcace}
                            style={{ flex: 0.5, height: 35, backgroundColor: "#fff", borderRadius: 10, }} />
                    </View>

                    <View style={{
                        width: '100%',
                        alignItems: 'center',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        marginTop: 10,
                    }}>
                        <TouchableOpacity
                            onPress={() => {
                                actualizarData(titulo, texto)
                            }}
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


                    </View>
                </View>
            )

        })
    }


    swipeable(text, titulo) {
        return (
            <Swipeable rightButtons={
                [

                    <TouchableOpacity
                        onPress={() => {
                            this.state.popup = true
                            this.setState(this.state)
                            this.popupNotificacion(this.state.usuario, titulo)
                        }

                        } style={{
                            width: '100%',
                            marginTop: 15,
                            height: 20,
                            justifyContent: 'center',
                        }}>


                        {this.props.state.usuarioReducer.estado === "cargando" && this.props.state.usuarioReducer.type === "editarPerfil" ? (
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
                                    onPress={() => {
                                        this.state.popup = true
                                        this.setState(this.state)
                                        this.popupNotificacion(this.state.usuario, titulo)
                                    }

                                    }
                                    style={{
                                        flex: 1,
                                        justifyContent: 'center',
                                        width: '100%',
                                    }}>
                                    <Svg name={"terminarmueble"}
                                        style={{
                                            width: 20,
                                            height: 20,
                                            fill: "#fff",
                                            margin: 5,
                                        }} />

                                </TouchableOpacity>
                            )
                        }
                    </TouchableOpacity>
                ]
            }>
                <View style={{ width: "100%", marginLeft: 10, margin: 5, flexDirection: 'row', }}>
                    <View style={{ width: "100%", marginLeft: 10, flex: 0.8, }}>
                        <Text style={{ color: '#999', fontSize: 10, margin: 2, }}>{titulo.toUpperCase()}</Text>
                        <Text style={{ marginLeft: 10, color: '#fff', fontSize: 17, }}>{text}</Text>
                    </View>
                    <View style={{ flex: 0.1, }}>
                        <Svg name={"editar"}
                            style={{
                                width: 15,
                                height: 15,
                                fill: "#fff",
                                margin: 5,
                            }} />
                    </View>
                </View>
            </Swipeable>
        )
    }

    render() {

        if (this.props.state.usuarioReducer.estado === "exito") {
            this.props.state.usuarioReducer.estado = ""
            this.setState({ ...this.state })
        }

        return (
            <View style={{
                flex: 1,
                alignItems: 'center',
                width: Dimensions.get("window").width,
                backgroundColor: "#000",
                height: Dimensions.get("window").height,
            }}>
                <Barra titulo={"Perfil"} navigation={this.props.navigation} />

                <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center', flex: 0.3, alignItems: 'center', }} >
                    <TouchableOpacity onPress={() => this.pickPhoto()}
                        style={{ alignItems: 'center', justifyContent: 'center', borderColor: '#999', borderWidth: 2, borderRadius: 100, width: 150, height: 150, overflow: "hidden" }}>
                        <Foto nombre={this.state.usuario.persona.key + ".png"} tipo={"persona"} />
                    </TouchableOpacity>
                    <View
                        style={{ position: "relative", top: 85, right: 10 }}>
                        <TouchableOpacity onPress={() => this.pickPhoto()}>
                            <View style={{ height: 35, width: 35, borderColor: "#999", borderRadius: 35, alignItems: "center", justifyContent: 'center', }}>
                                <Svg name={"camara"} style={{ width: 35, height: 35, justifyContent: 'center', fill: "#452161" }} />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{
                    width: "100%",
                    flex: 1,
                    justifyContent: 'center',
                }}>
                    {this.swipeable(this.state.usuario.user, "user")}
                    {this.swipeable(this.state.persona.nombre, "nombre")}
                    {this.swipeable(this.state.persona.paterno, "paterno")}
                    {this.swipeable(this.state.persona.materno, "materno")}
                    {this.swipeable(this.state.persona.telefono, "telefono")}
                    {this.swipeable(this.state.persona.fecha_nacimiento, "fecha_nacimiento")}
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
    ...fotoActions,
    ...usuarioActions,
    ...popupActions
});
const initStates = (state) => {
    return { state }
};
export default connect(initStates, initActions)(PerfilPage);

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
    Image,
    BackHandler
} from 'react-native';
import Barra from '../../Component/Barra';
import Svg from '../../Svg';
import * as paginaActions from '../../Actions/paginaActions'
import myPropsJulio from '../../nativeSocket/myPropsServer.json';
import Foto from '../../Component/Foto';
class InicioArmadorPage extends Component {
    static navigationOptions = {
        headerShown: false,
    }
    constructor(props) {
        super(props);
        arrayMenu = []
        arrayMenu = ["trabajos", "salario"];
        var admin = false
        var usuarioPersona = props.state.usuarioReducer.usuarioLog.persona
        var usuario = props.state.usuarioReducer.usuarioLog
        var key_area_trabajo = usuarioPersona.key_area_trabajo
        var areaTrabajo = props.state.areaTrabajoReducer.dataAreaTrabajo[key_area_trabajo].nombre
          ///////////InicioBack
          props.state.paginaReducer.paginaActual = props.navigation.state.routeName
          props.state.paginaReducer.objNavigation = {}
          props.state.paginaReducer.objNavigation[props.navigation.state.routeName] = props.navigation
          ///////////
        this.state = {
            titulo: "",
            menu: arrayMenu,
            usuarioPersona,
            admin,
            areaTrabajo,
            usuario,
            exitApp: true,
            rutaKey: props.navigation.state.key
        }
    }
    handleClick = (item) => {
        switch (item) {
            case "trabajos":
                this.state.exitApp = false
                this.setState({ ...this.state })
                this.props.navigation.navigate("TrabajosArmadorPage", {
                    routeName: "VerLibroComprasPage",
                    areaTrabajo: this.state.areaTrabajo
                })
                return <View />
            case "salario":
                this.state.exitApp = false
                this.setState({ ...this.state })
                this.props.navigation.navigate("SalarioTrabajoPage", {
                    routeName: "VerLibroComprasPage",
                    admin: false,
                    pagina: ""
                })
                return <View />
            case "Ver libro compras":
                this.state.exitApp = false
                this.setState({ ...this.state })
                this.props.navigation.navigate("VerLibroComprasPage", {
                    routeName: "VerLibroComprasPage",
                    persona: this.props.state.usuarioReducer.usuarioLog.persona,
                    area: this.state.areaTrabajo
                })
                return <View />
            case "salir":
                AsyncStorage.removeItem('usuario')
                this.props.state.usuarioReducer.usuariolog = false;
                this.props.state.personaReducer.dataPagoSalarioPersona = {
                    dataPago: false,
                    totalHaber: 0,
                    totalDebe: 0
                };
                this.props.state.personaReducer.dataPagoTrabajoPersonaPendiente = false;
                this.props.state.personaReducer.dataTrabajoPersonaPendiente = false;
                this.props.navigation.replace("CargaPage")
                return <View />
            default:
                return <View />
        }
    }
    Menu() {
        return (
            <View style={{
                width: "80%",
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <FlatList
                    style={{ width: "100%", paddingBottom: 10 }}
                    data={this.state.menu}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => { this.handleClick(item) }}
                            style={{
                                flex: 1,
                                height: 120,
                                margin: 10,
                                justifyContent: 'center',
                                borderWidth: 2,
                                borderColor: '#fff',
                                borderRadius: 10,
                                padding: 10,
                                alignItems: 'center',
                            }}>
                            <Svg name={item}
                                style={{
                                    width: 50,
                                    height: 50,
                                    fill: "#fff",
                                    margin: 5,
                                }} />
                            <Text style={{
                                fontSize: 12,
                                color: "#fff",
                                fontWeight: 'bold',
                                textAlign: 'center'
                            }}>{item.toLowerCase()}</Text>
                        </TouchableOpacity>
                    )}
                    numColumns={2}
                    keyExtractor={(index) => index.toString()}
                />
                <TouchableOpacity
                    style={{
                        width: "100%",
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderWidth: 1, margin: 10,
                        height: 50,
                        borderRadius: 10,
                        borderColor: "#fff",
                    }} onPress={() => { this.handleClick("salir") }}>

                    <Text style={{
                        marginLeft: 10,
                        fontSize: 20,
                        color: "red",
                        fontWeight: 'bold',
                    }}> Cerrar session</Text>
                </TouchableOpacity>
            </View>
        )
    }

    verificar() {
        var pagina = this.props.state.paginaReducer.paginaActual
        var objNavigation = this.props.state.paginaReducer.objNavigation
        if (pagina === "InicioArmadorPage") {
            BackHandler.exitApp()
            return <View />
        }
        for (const key in objNavigation) {
            var navigation = objNavigation[key]
            if (key === pagina) {
                navigation.goBack()
                this.props.state.paginaReducer.paginaActual = navigation.paginaAnterior
            }
        }
        return <View />

    }
    componentWillMount() {
        const handleBackButtonClick = () => {
            this.verificar()
            return true;
        }
        BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    }
    componentWillUnmount() {
        const handleBackButtonClick = () => {
            this.verificar()
            return true;
        }
        BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
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
                <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', marginTop: 20, }}>
                    <View style={{ flex: 1, }}>
                        <Text style={{ color: "#fff", fontSize: 40, fontWeight: 'bold', textAlign: 'center', width: "100%", }}>muebleNet</Text>
                    </View>
                    <View style={{ flex: 0.4, alignItems: 'center', }}>

                        <TouchableOpacity
                            onPress={() => {
                                this.props.navigation.navigate("PerfilPage")
                            }} style={{ borderColor: "#999", borderWidth: 1, width: 70, height: 70, borderRadius: 100, overflow: 'hidden', alignItems: 'center', }}>
                            <Foto nombre={this.state.usuario.persona.key + ".png"}  tipo={"persona"} />
                        </TouchableOpacity>
                        <Text style={{
                            color: "#fff", fontSize: 15,
                            fontWeight: 'bold', margin: 5,
                        }}>{this.props.state.usuarioReducer.usuarioLog.user}</Text>
                    </View>
                </View>
                <ScrollView style={{
                    flex: 1,
                    width: "100%",
                    marginTop: 50,
                }}>
                    <View style={{
                        flex: 1,
                        width: "100%",
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        {this.Menu()}
                    </View>
                </ScrollView>
            </View>
        );
    }
};
const styles = StyleSheet.create({
    sty: {
        height: 50,
        margin: 10,
        width: "100%",
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        justifyContent: 'center',
        borderRadius: 10,
        borderColor: "#fff",
    },
    contenedors: {
        position: "absolute",
        flex: 1,
        width: "50%",
        height: "100%",
        minHeight: 1000,
        backgroundColor: "#ffffff",
        justifyContent: "center",

        alignItems: "center",
    },
    menus: {
        justifyContent: 'center',
        alignItems: 'center',

    },
    contenedors2: {
        position: "absolute",
        width: "100%",
        right: 0,
        top: 0,
        height: "100%",
        minHeight: 1000,

        paddingTop: 50,


    },

});
const initStates = (state) => {
    return { state }
};
const initActions = ({
    ...paginaActions,
});
export default connect(initStates)(InicioArmadorPage);

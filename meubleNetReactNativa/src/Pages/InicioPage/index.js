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
    Image
} from 'react-native';
import Barra from '../../Component/Barra';
import Svg from '../../Svg';
import myPropsJulio from '../../nativeSocket/myPropsServer.json';
class InicioPage extends Component {
    static navigationOptions = {
        headerShown: false,
    }
    constructor(props) {
        super(props);
        var usuario = props.state.usuarioReducer.usuarioLog
        var key_area_trabajo = usuario.persona.key_area_trabajo
        var url = myPropsJulio.images.urlImage + usuario.persona.ci + ".png" + `?tipo=${"persona"}`
        var areaTrabajo = props.state.areaTrabajoReducer.dataAreaTrabajo[key_area_trabajo].nombre
        arrayMenu = []
        if (areaTrabajo === "administrador") {
            arrayMenu = ["realizar ventas", "productos", "personales", "reporte ventas", "compras", "salario","area trabajo"];
        }
        if (areaTrabajo === "compras") {
            arrayMenu = ["compras"];
        }
        if (areaTrabajo === "ventas") {
            arrayMenu = ["ventas"];
        }

        this.state = {
            isOpen: false,
            index: 0,
            titulo: "Inicio",
            menu: arrayMenu,
            url,
            usuarioPersona: usuario.persona
        }
    }
    handleChange = (num) => {
        if (num === -1) {
            this.state.isOpen = true;
            this.setState({ ...this.state })

            return;
        }
        this.state.index = num;
        switch (num) {
            case 0:
                this.state.isOpen = false;
                this.setState({ ...this.state })
                return;
            default: return
        }
    }
    handleClick = (item) => {
        switch (item) {
            case "productos":
                this.props.navigation.navigate("ProductosPage", { pagina: item })
                return <View />
            case "area trabajo":
                this.props.navigation.navigate("AreaTrabajoPage", { pagina: item })
                return <View />
            case "salario":
                this.props.navigation.navigate("PagoSalarioPage", { pagina: item })
                return <View />
            case "personales":
                this.props.navigation.navigate("PersonaPage", { pagina: item })
                return <View />
            case "compras":
                this.props.navigation.navigate("RegistrarPagosComprasPage")
                return <View />
            case "realizar ventas":
                this.props.navigation.navigate("VentasPage", { pagina: item })
                return <View />
            case "almacen":
                this.props.navigation.navigate("AlmacenPage", { pagina: item })
                return <View />
            case "reporte ventas":
                this.props.navigation.navigate("MenuReporteVentaPage", { pagina: item })
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
                <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', }}>
                    <View style={{ flex: 1, }}>
                        <Text style={{ color: "#fff", fontSize: 40, fontWeight: 'bold', textAlign: 'center', width: "100%", }}>muebleNet</Text>
                        <Text style={{ color: "#fff", fontSize: 15, fontWeight: 'bold', textAlign: 'center', width: "100%", }}>Administrador</Text>

                    </View>
                    <View style={{ flex: 0.4, alignItems: 'center', }}>
                        <View style={{ borderColor: "#999", borderWidth: 1, width: 70, height: 70, borderRadius: 100, overflow: 'hidden', alignItems: 'center', }}>
                            <Image source={{ uri: this.state.url }} style={{ width: "100%", height: "100%", fill: "#000" }} />
                        </View>
                        <Text style={{
                            color: "#fff", fontSize: 15,
                            fontWeight: 'bold', margin: 5,
                        }}>{this.state.usuarioPersona.nombre}</Text>
                    </View>
                </View>
                <ScrollView style={{
                    flex: 1,
                    width: "100%",
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

export default connect(initStates)(InicioPage);

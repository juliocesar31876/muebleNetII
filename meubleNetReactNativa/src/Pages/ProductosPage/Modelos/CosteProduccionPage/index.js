import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Text,
    View,
    StyleSheet,
    ScrollView,
    Image,
    TouchableOpacity,
    TextInput,
} from 'react-native';
import * as usuarioActions from '../../../../Actions/usuarioActions'
import * as popupActions from '../../../../Actions/popupActions'
import * as productoActions from '../../../../Actions/productoActions'
import Barra from '../../../../Component/Barra';
import myPropsJulio from '../../../../nativeSocket/myPropsServer.json'
import Svg from '../../../../Svg';
class CosteProduccionPage extends Component {
    static navigationOptions = {
        headerShown: false,
    }
    constructor(props) {
        super(props);
        var url = myPropsJulio.images.urlImage + props.navigation.state.params.producto.key + ".png" + `?tipo=${"producto"}&date=${Date.now()}`
        this.state = {
            titulo: props.navigation.state.params.pagina,
            producto: props.navigation.state.params.producto,
            componet: "Coste produccion",
            url,
            obj: {
                detalle: "",
                cantidad: "",
                precio: "",
            }
        }
    }
    popup = () => {
        const registrar = () => {
            var exito = true
            for (const key in this.state.obj) {
                var obj = this.state.obj[key]
                if (obj === "") {
                    exito = false
                }
            }
            if (exito) {
                this.state.obj["key_producto"] = this.state.producto.key
                var cantidad = Number(this.state.obj.cantidad)
                var precio = Number(this.state.obj.precio)
                this.state.obj.precio = precio
                this.state.obj.cantidad = cantidad
                this.props.addCosteProduccion(this.props.state.socketReducer.socket, this.state.obj)
                this.props.cerrarPopup()
            }
        }
        const handleChanges = (data) => {
            this.state.obj[data.id] = data.text
            this.setState({ ...this.state })
        }
        this.props.abrirPopup(() => {
            return (
                <View style={{
                    width: "90%",
                    height: "80%",
                    backgroundColor: "#000",
                    borderRadius: 10,
                    borderColor: '#fff',
                    borderWidth: 1,
                }}>
                    <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 15, textAlign: 'center' }
                    }>Agregar coste produccion</Text>
                    <ScrollView style={{ flex: 1, marginTop: 50, }}>
                        <View style={{
                            flex: 1,
                            margin: 10,
                            width: "100%",
                            alignItems: 'center',

                        }}>

                            <View style={{ flex: 1, width: '100%', alignItems: 'center', }}>
                                <View style={{ flex: 1, margin: 10, }}>
                                    <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 15, marginTop: 20, }
                                    }>Detalle</Text>
                                    <TextInput
                                        autoCapitalize={"none"}
                                        keyboardType={""}
                                        onChangeText={text => handleChanges({ text, id: "detalle" })}
                                        style={{ width: 200, height: 50, borderRadius: 15, backgroundColor: "#fff", }} />
                                </View>
                                <View style={{ flex: 1, margin: 10, }}>
                                    <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 15, }
                                    }>cantidad</Text>
                                    <TextInput
                                        onChangeText={text => handleChanges({ text, id: "cantidad" })}
                                        autoCapitalize={"none"}
                                        keyboardType={"numeric"}
                                        style={{ width: 200, height: 50, borderRadius: 15, backgroundColor: "#fff", }} />
                                </View>
                                <View style={{ flex: 1, margin: 10, }}>
                                    <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 15, }
                                    }>Precio unitario</Text>
                                    <TextInput
                                        onChangeText={text => handleChanges({ text, id: "precio" })}
                                        autoCapitalize={"none"}
                                        keyboardType={"numeric"}
                                        style={{ width: 100, height: 50, borderRadius: 15, backgroundColor: "#fff", }} />
                                </View>

                                <TouchableOpacity
                                    onPress={() => registrar()}
                                    style={{ alignItems: 'center', justifyContent: 'center', width: 100, height: 50, borderRadius: 10, borderColor: '#fff', borderWidth: 1, }}>
                                    <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 15, }
                                    }>Registrar</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </ScrollView>
                </View>
            )
        })
    }
    popupUpdate = (objCoste) => {
        const update = () => {
            var exito = true

            if (exito) {
                this.state.obj.precio = precio
                this.props.addCosteProduccion(this.props.state.socketReducer.socket, this.state.obj)
                this.props.cerrarPopup()
            }
        }
        const handleChanges = (data) => {
            this.state.obj[data.id] = data.text
            this.setState({ ...this.state })
        }
        this.props.abrirPopup(() => {
            return (
                <View style={{
                    width: "90%",
                    height: "60%",
                    backgroundColor: "#000",
                    borderRadius: 10,
                    borderColor: '#fff',
                    borderWidth: 1,
                }}>
                    <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 15, textAlign: 'center' }
                    }>Agregar coste produccion</Text>

                    <View style={{ flex: 1, width: '100%', alignItems: 'center', justifyContent: 'center', }}>
                    <View style={{ flex: 0.3, margin: 10, justifyContent: 'center',width: '80%', }}>
                            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 15, width: '90%',}
                            }>detalle : {objCoste.detalle}  </Text>
                            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 15, }
                            }>cantidad : {objCoste.cantidad}  </Text>

                        </View>
                        <View style={{ flex: 0.3, margin: 10, justifyContent: 'center', }}>
                            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 15, }
                            }>Precio unitario</Text>
                            <TextInput
                                onChangeText={text => handleChanges({ text, id: "precio" })}
                                autoCapitalize={"none"}
                                keyboardType={"numeric"}
                                style={{ width: 100, height: 50, borderRadius: 15, backgroundColor: "#fff", }} />
                        </View>

                        <TouchableOpacity
                            onPress={() => update()}
                            style={{ alignItems: 'center', justifyContent: 'center', width: 100, height: 50, borderRadius: 10, borderColor: '#fff', borderWidth: 1, }}>
                            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 15, }
                            }>Actualizar</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            )
        })
    }
    render() {
        if (this.props.state.productosReducer.estado === "exito" && this.props.state.productosReducer.type === "addCosteProduccion") {
            this.props.state.productosReducer.estado = ""
            this.props.state.productosReducer.type = ""
            this.props.cerrarPopup()
            return <View />

        }
        return (
            <View style={{
                backgroundColor: "#000",
                flex: 1,
                alignItems: 'center',

            }}>
                <Barra titulo={this.state.titulo} navigation={this.props.navigation} />
                <ScrollView style={{ flex: 1, width: '100%', }}>
                    <View style={{ flex: 1, alignItems: 'center', marginTop: 30, flexDirection: 'row', }}>
                        <View style={{
                            alignItems: 'center',
                            width: 100,
                            height: 100,
                            borderRadius: 10,
                            overflow: "hidden"
                        }} >
                            <Image source={{ uri: this.state.url }} style={{ width: "100%", height: "100%", fill: "#000" }} />
                        </View>


                        <View style={{ marginLeft: 10, width: '100%', flex: 1, }}>
                            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 15, }
                            }>{this.state.producto.nombre.toUpperCase()}</Text>
                            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 15, }
                            }>Coste de produccion actual :  {this.state.producto.totalCosteProduccion} bs</Text>
                        </View>
                    </View>
                    <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 20, textAlign: 'center' }
                    }>Detalle coste de produccion</Text>
                    <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 20, }
                    }>Detalle </Text>
                    {this.state.producto.coste_produccion.map((obj, key) => {
                        var num = key + 1
                        return (
                            <TouchableOpacity
                                onPress={() => this.popupUpdate(obj)}
                                style={{ flexDirection: 'row', width: '100%', borderColor: '#fff', borderBottomWidth: 1, margin: 5, }}>
                                <View style={{ flex: 1, justifyContent: 'center', }}>
                                    <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16, }
                                    }>{num}-.  {obj.detalle}  </Text>
                                </View>
                                <View style={{ flex: 1, justifyContent: 'center', }}>
                                    <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 15, }
                                    }>cantidad : {obj.cantidad} </Text>
                                    <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 15, }
                                    }>precio unitario {obj.precio} </Text>
                                    <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 15, }
                                    }>total {(obj.precio * obj.cantidad)} </Text>
                                </View>

                            </TouchableOpacity>
                        )

                    })
                    }


                </ScrollView>
                <TouchableOpacity
                    onPress={() => this.popup()}
                    style={{
                        alignItems: 'center',
                        width: 100,
                        height: 50,
                        borderRadius: 100,
                        position: 'absolute',
                        right: 10,
                        bottom: 12
                    }}>
                    <Svg name={"add"}
                        style={{
                            width: 50,
                            height: 50,
                            fill: "#fff",
                            margin: 5,
                        }} />
                </TouchableOpacity>
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
    ...usuarioActions,
    ...popupActions,
    ...productoActions
});
const initStates = (state) => {
    return { state }
};
export default connect(initStates, initActions)(CosteProduccionPage);

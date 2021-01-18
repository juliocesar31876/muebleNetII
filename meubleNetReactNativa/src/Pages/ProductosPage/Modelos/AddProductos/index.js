import React from 'react';
import {
    TextInput,
    View,
    StyleSheet,
    Text,
    ScrollView,
    TouchableOpacity,
    Image,
    ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';
import ImagePicker from 'react-native-image-picker';
import Svg from '../../../../Svg';
import * as productoActions from '../../../../Actions/productoActions'
import * as popupActions from '../../../../Actions/popupActions'
import * as sucursalActions from '../../../../Actions/sucursalActions'
//import myPropsJulio from '../../../../nativeSocket/myPropsJulio.json';
import myPropsJulio from '../../../../nativeSocket/myPropsServer.json';
import Estado from '../../../../Component/Estado';
const AddProductos = (props) => {
    const state2 = {
        obj: {
            nombre: {
                value: "",
                error: false
            },
            precio_produccion: {
                value: "",
                error: false
            },
            precio_venta: {
                value: "",
                error: false
            },
            precio_armador: {
                value: "",
                error: false
            },
            encargado_compra: {
                value: "",
                error: false
            },
            key_tipo_producto: {
                value: "Selecione Tipo",
                error: false
            },
            descripcion: {
                value: "",
                error: false
            },
        },
        foto: {
            source: false
        },
        enviandoFoto: true
    }
    const [state, setState] = React.useState({
        obj: {
            nombre: {
                value: "",
                error: false
            },
            precio_produccion: {
                value: "",
                error: false
            },
            precio_venta: {
                value: "",
                error: false
            },
            precio_armador: {
                value: "",
                error: false
            },
            encargado_compra: {
                value: "",
                error: false
            },
            key_tipo_producto: {
                value: "Selecione Tipo",
                error: false
            },
            descripcion: {
                value: "",
                error: false
            },
        },
        foto: {
            source: false
        },
        enviandoFoto: true
    })

    if (!props.state.socketReducer.socket) {
        return <Estado estado={"Reconectando"} />
    }
  
    const hanlechage = (data) => {
        state.obj[data.id] = {
            value: data.text,
            error: false,
        }
        setState({ ...state })
    }
    const addFoto = () => {
        ImagePicker.showImagePicker((response) => {
            if (response.didCancel) {
            } else if (response.error) {
            } else {
                state.foto.source = { uri: response.uri };
                setState({ ...state })
            }
        });
    }
    const enviarFoto = (data) => {
        var body = new FormData();
        body.append("archibo", data.archivo)
        body.append('type', "subirFoto");
        body.append('nombre', data.nombre);
        body.append('tipo', data.type);
        var myInit = {
            method: 'POST',
            body: body,
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        };
        var myRequest = new Request(myPropsJulio.images.url, myInit);
        fetch(myRequest)
            .then(function (response) {
                console.log("ENTGROooooooooooooooo");
                setState({ ...state2 })
            }).catch(error => console.error('Error:', error))
            .then(response => console.log('Success:', response));
    }
    if (props.state.productosReducer.estado === "exito" && props.state.productosReducer.type === "addProducto") {
        props.state.productosReducer.estado = ""
        props.state.productosReducer.type = ""
        var data = {
            type: "producto",
            nombre: props.state.productosReducer.foto,
            archivo: { uri: state.foto.source.uri, name: 'image.png', type: 'image/jpeg' }
        }
        state.enviandoFoto = false
        setState({ ...state })
        enviarFoto(data);
    }
    const agregarProducto = () => {
        var exito = true
        var data = {}
        for (const key in state.obj) {
            var obj = state.obj[key]
            if (key==="precio") {
                
            }
            if (obj.value === "") {
                exito = false
                state.obj[key].error = true
            } else {
                data[key] = obj.value
            }
        }
        if (!state.foto.source) {
            exito = false
            alert("su foto no a ingresado")
        }
        setState({ ...state })
        if (exito) {
            data["key_tipo_producto"] = state.obj.key_tipo_producto.data.key
            data["descuento"] =0
            data["estado"] = 1
            props.registrarProducto(props.state.socketReducer.socket, data)
        }
    }
    const popupTipo = () => {
        if (Object.keys(props.state.productosReducer.dataTipoProducto).length === 0) {
            alert("agregue un tipo de producto")
            return <View />
        }
        const selecTipo = (obj) => {
            state.obj.key_tipo_producto.value = obj.nombre
            state.obj.key_tipo_producto["data"] = obj
            state.obj.key_tipo_producto.error = false
            setState({ ...state })
            props.cerrarPopup()

        }
        props.abrirPopup(() => {
            return (
                <View style={{
                    width: "90%",
                    height: "80%",
                    backgroundColor: "#ffffff99",
                    borderRadius: 10,
                }}>
                    <ScrollView style={{ flex: 1, }}>
                        <View style={{
                            flex: 1,
                            margin: 10,
                            width: "100%",
                            alignItems: 'center',
                        }}>

                            {Object.keys(props.state.productosReducer.dataTipoProducto).map((key) => {
                                var obj = props.state.productosReducer.dataTipoProducto[key]
                                return (
                                    <TouchableOpacity
                                        onPress={() => selecTipo(obj)}
                                        style={{
                                            margin: 5,
                                            width: "90%",
                                            height: 50,
                                            borderRadius: 10,
                                            borderWidth: 3,
                                            flexDirection: 'row',
                                            borderColor: "#fff",
                                            alignItems: 'center',
                                            backgroundColor: "#000",

                                        }}>
                                        <Text style={{ margin: 4, color: "#666" }}>Tipo producto :</Text>
                                        <Text style={{ margin: 4, color: "#fff", fontSize: 12, textAlign: "center", flex: 1, }}>{obj.nombre}</Text>
                                    </TouchableOpacity>

                                )

                            })

                            }

                        </View>
                    </ScrollView>
                </View>


            )

        })
    }
    const esperandoRepuesta = () => {
        if (props.state.productosReducer.type === "addProducto" && props.state.productosReducer.estado === "cargando") {
            return <ActivityIndicator size="small" color="#fff" />
        }
        if (!state.enviandoFoto) {
            return <ActivityIndicator size="small" color="#fff" />
        }
        return (
            <TouchableOpacity onPress={() => agregarProducto()} style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
                <Svg name={'add'}
                    style={{
                        width: 50,
                        height: 50,
                        fill: "#999",
                        margin: 5,
                    }} />
            </TouchableOpacity>
        )
    }
    return (
        <View style={{
            flex: 1,
            width: "100%",
        }}>
            <ScrollView style={{ flex: 1, }}>
                <View style={{
                    flex: 1,
                    alignItems: 'center',
                }}>
                    {Object.keys(state.obj).map((key) => {
                        var data = state.obj[key]
                        var keyboardTyp = ""
                        if (key === "precio_venta"||key === "precio_produccion"||key === "encargado_compra"||key === "precio_armador") {
                            keyboardTyp = "phone-pad"
                        }
                        if (key === "descripcion") {
                            return (
                                <View style={{
                                    width: "80%",
                                    margin: 1,
                                }}>
                                    <Text style={{ fontSize: 12, color: "#fff", }}>{key.toUpperCase()}</Text>
                                    <TextInput
                                        multiline={true}
                                        onChangeText={text => hanlechage({ text: text, id: key })}
                                        value={data.value}
                                        style={(data.error ? styles.textAreaError : styles.textArea)} />
                                </View>
                            )
                        }
                        if (key === "key_tipo_producto") {
                            return (
                                <View style={{
                                    width: "80%",
                                    margin: 1,
                                }}>
                                    <Text style={{ fontSize: 12, color: "#fff", }}>TIPO PRODUCTO</Text>
                                    <TouchableOpacity
                                        onPress={() => popupTipo()}
                                        style={(data.error ? styles.error : styles.touc)}>
                                        <Text style={{ fontSize: 10, color: "#666", }}>{data.value.toUpperCase()}</Text>
                                    </TouchableOpacity>
                                </View>
                            )
                        }
                        return (
                            <View style={{
                                width: "80%",
                                margin: 1,
                            }}>
                                <Text style={{ fontSize: 12, color: "#fff", }}>{key.toUpperCase()}</Text>
                                <TextInput
                                    autoCapitalize={"none"}
                                    keyboardType={keyboardTyp}
                                    onChangeText={text => hanlechage({ text: text, id: key })}
                                    value={data.value}
                                    style={(data.error ? styles.error : styles.input)} />
                            </View>
                        )
                    })}
                    <TouchableOpacity
                        onPress={() => addFoto()}
                        style={{
                            margin: 5,
                            width: 150,
                            height: 150,
                            borderColor: "#fff",
                            borderRadius: 100,
                            borderWidth: 2,
                            alignItems: 'center',
                            justifyContent: 'center',
                            overflow: "hidden"
                        }}>
                        {state.foto.source ? (
                            <Image source={{ uri: state.foto.source.uri }} style={{ width: "100%", height: "100%", }} />
                        ) : (
                                <Svg name="camara"
                                    style={{
                                        width: 100,
                                        height: 100,
                                        fill: "#fff"
                                    }} />
                            )
                        }
                    </TouchableOpacity>
                    <Text style={{ color: "#fff" }}>Foto</Text>

                </View>

            </ScrollView>
            <TouchableOpacity
                style={{
                    width: 50,
                    height: 50,
                    margin: 5,
                    borderRadius: 100,
                    borderWidth: 3,
                    position: 'absolute',
                    bottom: 10,
                    right: 15,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderColor: '#fff',
                }}>

                {esperandoRepuesta()}
            </TouchableOpacity>
        </View>
    )
};
const styles = StyleSheet.create({
    touc: {
        backgroundColor: '#ffffff',
        color: '#000',
        marginTop: 10,
        borderRadius: 8,
        width: '100%',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        backgroundColor: '#ffffff',
        color: '#000',
        marginTop: 10,
        borderRadius: 8,
        width: '100%',
        height: 40,
    },
    textArea: {
        backgroundColor: '#ffffff',
        color: '#000',
        marginTop: 10,
        borderRadius: 8,
        width: '100%',
        height: 200,
    },
    textAreaError: {
        borderWidth: 2,
        borderColor: "#f00",
        backgroundColor: '#ffffff',
        color: '#000',
        marginTop: 10,
        borderRadius: 8,
        width: '100%',
        height: 200,
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
const initStates = (state) => {
    return { state }
};
const initActions = ({
    ...productoActions,
    ...popupActions,
    ...sucursalActions
});
export default connect(initStates, initActions)(AddProductos);


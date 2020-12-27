import React from 'react';
import * as comprasActions from '../../../Actions/comprasActions'
import * as sucursalActions from '../../../Actions/sucursalActions'
import { View, StyleSheet, Text, TouchableOpacity, TextInput, ScrollView, ActivityIndicator } from 'react-native';
import Estado from '../../../Component/Estado';
import * as popupActions from '../../../Actions/popupActions'
import { connect } from 'react-redux';
import moment from 'moment';
const AddCompras = (props) => {
    const state2 = {
        obj: {
            nombre: {
                value: "",
                error: false
            },
            descripcion: {
                value: "",
                error: false
            },
            precio: {
                value: "",
                error: false
            },
            cantidad: {
                value: "",
                error: false
            },
        },
        key_sucursal: {
            value: "Selecione sucursal",
            error: false
        },
    }
    const [state, setstate] = React.useState({
        obj: {
            nombre: {
                value: "",
                error: false
            },
            descripcion: {
                value: "",
                error: false
            },
            precio: {
                value: "",
                error: false
            },
            cantidad: {
                value: "",
                error: false
            },
        },
        key_sucursal: {
            value: "Selecione sucursal",
            error: false
        },
    })
    if (!props.state.socketReducer.socket) {
        return <Estado estado={"Reconectando"} />
    }
    if (props.state.comprasReducer.type === "addCompras") {
        if (props.state.comprasReducer.estado === "exito") {
            props.state.comprasReducer.estado = ""
            props.state.comprasReducer.type = ""
            setstate({ ...state2 })
        }
    }
    const popupSucursal = () => {
        if (Object.keys(props.state.sucursalReducer.dataSucursal).length === 0) {
            alert("agregue un tipo de producto")
            return <View />
        }
        const selecSucursal = (obj) => {
            state.key_sucursal.value = obj.direccion
            state.key_sucursal.error = false
            state.key_sucursal["data"] = obj
            setstate({ ...state })
            props.cerrarPopup()
        }
        props.abrirPopup(() => {
            return (
                <View style={{
                    width: "90%",
                    height: "80%",
                    backgroundColor: "#ffffff66",
                    borderRadius: 10,
                }}>
                    <ScrollView style={{ flex: 1, }}>
                        <View style={{
                            flex: 1,
                            margin: 10,
                            width: "100%",
                            alignItems: 'center',
                        }}>
                            {Object.keys(props.state.sucursalReducer.dataSucursal).map((key) => {
                                var obj = props.state.sucursalReducer.dataSucursal[key]
                                return (
                                    <TouchableOpacity
                                        onPress={() => selecSucursal(obj)}
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
                                        <Text style={{ margin: 4, color: "#666" }}>Sucursal :</Text>
                                        <Text style={{ margin: 4, color: "#fff", fontSize: 12, textAlign: "center", flex: 1, }}>{obj.direccion}</Text>
                                    </TouchableOpacity>
                                )
                            })}
                        </View>
                    </ScrollView>
                </View>
            )
        })
    }
    const hanlechage = (data) => {
        state.obj[data.id] = {
            value: data.text,
            error: false,
        }
        setstate({ ...state })
    }
    const addCompras = () => {
        var exito = true
        var data = {}
        data["fecha_compra"] = moment().format('YYYY-MM-DD');
        for (const key in state.obj) {
            var obj = state.obj[key]
            if (obj.value === "") {
                exito = false
                state.obj[key].error = true
            } else {
                data[key] = obj.value
            }
        }
        setstate({ ...state })
        if (exito) {
            data["key_persona"] = props.state.usuarioReducer.usuarioLog.persona.key
            data["key_sucursal"] = state.key_sucursal.data.key
            data["estado"] = 1
            props.addCompras(props.state.socketReducer.socket, data)
        }
    }
    return (
        <View style={{
            flex: 1,
            width: "80%",
            justifyContent: 'center',
        }}>
            <ScrollView style={{ flex: 1, }}>
                <View style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    {Object.keys(state.obj).map((key) => {
                        var data = state.obj[key]
                        var keyboardTyp = ""
                        if (key === "precio" || key === "cantidad") {
                            keyboardTyp = "phone-pad"
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
                    <View style={{
                        width: "80%",
                        margin: 1,
                    }}>
                        <Text style={{ fontSize: 12, color: "#fff", }}>SUCURSAL</Text>
                        <TouchableOpacity
                            onPress={() => popupSucursal()}
                            style={(state.key_sucursal.error ? styles.error : styles.touc)}>
                            <Text style={{ fontSize: 10, color: "#666", }}>{state.key_sucursal.value.toUpperCase()}</Text>
                        </TouchableOpacity>
                    </View>
                    <View
                        style={{
                            flex: 1,
                            margin: 10,
                            width: 130,
                            height: 50,
                            borderRadius: 10,
                            borderWidth: 2,
                            borderColor: "#fff",
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                        {props.state.comprasReducer.estado === "cargando" && props.state.comprasReducer.type === "addCompras" ? (
                            <ActivityIndicator size="small" color="#fff" />
                        ) : (
                                <TouchableOpacity onPress={() => addCompras()} style={{ flex: 1, alignItems: 'center',justifyContent: 'center',}}>
                                    <Text  style={{  color: "#fff", textAlign: "center", fontSize: 15, }}>Agreagar compras</Text>
                                </TouchableOpacity>
                            )
                        }
                    </View>
                </View>
            </ScrollView>
        </View >
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
    ...comprasActions,
    ...sucursalActions,
    ...popupActions

});
export default connect(initStates, initActions)(AddCompras);
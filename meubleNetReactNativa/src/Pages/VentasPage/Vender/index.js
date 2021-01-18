import React from 'react';
import { ScrollView, TextInput, View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import MiCheckBox from '../../../Component/MiCheckBox';
import * as popupActions from '../../../Actions/popupActions'
import * as productoActions from '../../../Actions/productoActions'
import * as ventaActions from '../../../Actions/ventaActions'
import moment from 'moment';

import { connect } from 'react-redux';
const Vender = (props) => {
    const [state, setState] = React.useState({
        obj: {
            cliente: {
                value: "----------",
                error: false
            },
            direccion: {
                value: "----------",
                error: false
            },
            telefono: {
                value: "76031878",
                error: false
            },
            nit: {
                value: "465465456",
                error: false
            },
            descuento: {
                value: "0",
                error: false
            },
            adelanto: {
                value: "0",
                error: false
            },
            key_sucursal: {
                value: "Selecion sucursal",
                error: false
            },
            entrega: {
                value: false,
            }
        },
        obj2: {
            cliente: {
                value: "----------",
                error: false
            },
            direccion: {
                value: "----------",
                error: false
            },
            telefono: {
                value: "76031878",
                error: false
            },
            nit: {
                value: "465465456",
                error: false
            },
            descuento: {
                value: "0",
                error: false
            },
            adelanto: {
                value: "0",
                error: false
            },
            key_sucursal: {
                value: "Selecion sucursal",
                error: false
            },
            entrega: {
                value: false,
            }
        },
    })
    const selecSucursal = (obj) => {
        state.obj.key_sucursal.value = obj.direccion
        state.obj.key_sucursal.error = false
        state.obj.key_sucursal["data"] = obj
        props.cerrarPopup()
    }
    const venderDetalle = () => {
        var exito = true
        var data = {}
        var objventa = {}
        for (const key in state.obj) {
            var obj = state.obj[key]
            if (key === "entrega") {
                data[key] = obj.value
                continue
            }
            if (key === "key_sucursal") {
                if (!obj.data) {
                    state.obj[key].error = true
                    exito = false
                    continue
                }
                data[key] = obj.data.key
                continue
            }
            if (obj.value === "") {
                exito = false
                state.obj[key].error = true
            } else {
                data[key] = obj.value
            }
        }
        if (Object.keys(props.state.ventaReducer.dataVentaProducto).length === 0) {
            setState({ ...state })
            alert("Vacio su registro de venta")
            return <View />
        }
        setState({ ...state })
        if (exito) {
            var fecha = moment()
                .format('YYYY-MM-DD');
            var hora = moment()
                .format('HH:mm:ss');
            data["fecha_on"] = fecha + "T" + hora
            var array = []
            for (const key in props.state.ventaReducer.dataVentaProducto) {
                var obj = props.state.ventaReducer.dataVentaProducto[key]
                if (!obj) {
                    continue
                }
                array.push(props.state.ventaReducer.dataVentaProducto[key])
            }
            data["datos_completo"] = false
            objventa = {
                venta: data,
                detalle: array
            }
            props.addVenta(props.state.socketReducer.socket, objventa)
            return <View />
        }
        alert("Complete su datos")
    }
    if (props.state.ventaReducer.estado === "exito" && props.state.ventaReducer.type === "addVenta") {
        props.state.ventaReducer.estado = "",
        props.getVentaDatosRellenar(props.state.socketReducer.socket);
        props.state.ventaReducer.data.detalle.map((item) => {
            props.actualizarProducto(item)
        })
        var data = state.obj2
        state.obj = data
        setState({ ...state })
    }
    const hanlechages = (data) => {
        state.obj[data.id] = {
            value: data.text,
            error: false,
        }
        props.hanlechage(data)
        setState({ ...state })
    }
    const popupSucursal = () => {
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
    return (
        <View style={{
            flex: 1,
            width: "100%",
            backgroundColor: "#000",
            alignItems: 'center',
        }}>
            <ScrollView style={{ flex: 1, width: "100%", }}>
                <View style={{
                    flex: 1,
                    width: "100%",
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    {Object.keys(state.obj).map((key) => {
                        var data = state.obj[key]
                        var keyboardTyp = ""
                        if (key === "telefono" || key === "nit" || key === "adelanto" || key === "descuento") {
                            keyboardTyp = "numeric"
                        }
                        if (key === "entrega") {
                            return (
                                <View style={{
                                    width: "80%",
                                    margin: 10,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexDirection: 'row',
                                }}>
                                    <Text style={{ fontSize: 12, color: "#fff", flex: 0.5, }}>{key.toUpperCase()}</Text>
                                    <MiCheckBox ischeck={data.value} id={key}
                                        onChange={text => hanlechages({ text: text, id: key })}
                                    />
                                </View>
                            )
                        }
                        if (key === "key_sucursal") {
                            return (
                                <View style={{
                                    width: "80%",
                                    margin: 10,
                                }}>
                                    <Text style={{ fontSize: 12, color: "#fff", }}>SUCURSAL</Text>
                                    <TouchableOpacity
                                        onPress={() => popupSucursal()}
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
                                    onChangeText={text => hanlechages({ text: text, id: key })}
                                    value={data.value}
                                    style={(data.error ? styles.error : styles.input)} />
                            </View>
                        )
                    })}
                </View>
            </ScrollView>
            <View style={{ width: "80%", flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>

                {props.state.ventaReducer.estado === "cargando" && props.state.ventaReducer.type === "addVenta" ? (
                    <TouchableOpacity
                        style={{ justifyContent: 'center', alignItems: 'center', flex: 1, height: 50, margin: 10, borderWidth: 2, borderColor: "#fff", borderRadius: 10, }}>
                        <ActivityIndicator size="small" color="#fff" />
                    </TouchableOpacity>
                ) : (
                        <TouchableOpacity
                            onPress={() => venderDetalle()}
                            style={{ justifyContent: 'center', alignItems: 'center', flex: 1, height: 50, margin: 10, borderWidth: 2, borderColor: "#fff", borderRadius: 10, }}>
                            <Text style={{ color: "#fff", }}>Agregar venta</Text>
                        </TouchableOpacity>
                    )
                }
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    vie: {
        flexDirection: 'row', margin: 4,
    },
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
const initState = (state) => {
    return { state }
}
const initActions = ({
    ...popupActions,
    ...productoActions,
    ...ventaActions
});
export default connect(initState, initActions)(Vender);

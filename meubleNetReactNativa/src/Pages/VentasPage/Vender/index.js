import React from 'react';
import { ScrollView, TextInput, View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Dimensions } from 'react-native';
import MiCheckBox from '../../../Component/MiCheckBox';
import * as popupActions from '../../../Actions/popupActions'
import * as popupCalendarioActions from '../../../Actions/popupCalendarioActions'
import * as productoActions from '../../../Actions/productoActions'
import * as ventaActions from '../../../Actions/ventaActions'
import moment from 'moment';
import { connect } from 'react-redux';
const initState = (state) => {
    return { state }
}
const initActions = ({
    ...popupCalendarioActions,
    ...popupActions,
    ...productoActions,
    ...ventaActions
});
const Vender = (props) => {
    const [state, setState] = React.useState({
        obj: {
            cliente: {
                value: "",
                error: false
            },
            direccion: {
                value: "",
                error: false
            },
            telefono: {
                value: "",
                error: false
            },
            nit: {
                value: "",
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
            fecha_entrega: {
                value: "selecione Fecha entrega",
                error: false
            },
            /* key_sucursal: {
                value: "Selecion sucursal",
                error: false
            }, */
            entrega: {
                value: false,
            }
        },
        obj2: {
            cliente: {
                value: "",
                error: false
            },
            direccion: {
                value: "",
                error: false
            },
            telefono: {
                value: "",
                error: false
            },
            nit: {
                value: "",
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
            fecha_entrega: {
                value: "selecione Fecha entrega",
                error: false
            },
            /* key_sucursal: {
                value: "Selecion sucursal",
                error: false
            }, */
            entrega: {
                value: false,
            },

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
        var usuarioKeyPersona = props.state.usuarioReducer.usuarioLog.key_persona
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
            var fecha_on = fecha + "T" + hora
            data["fecha_on"] = fecha_on
            data["key_persona_venta"] = usuarioKeyPersona
            var array = []
            for (const key in props.state.ventaReducer.dataVentaProducto) {
                var obj = props.state.ventaReducer.dataVentaProducto[key]
                if (!obj) {
                    continue
                }
                array.push(obj)
            }
            data["datos_completo"] = false
            data["key_sucursal"] = props.state.usuarioReducer.usuarioLog.persona.key_sucursal
            objventa = {
                venta: data,
                detalle: array,
                key_persona_usuario: usuarioKeyPersona,
                nit: state.obj.nit.value,
                fecha_on
            }
            props.addVenta(props.state.socketReducer.socket, objventa)
            return <View />
        }
        alert("Complete su datos")
    }
    if (props.state.ventaReducer.estado === "exito" && props.state.ventaReducer.type === "addVenta") {
        props.state.ventaReducer.estado = "",
        props.getVentaDatosRellenar(props.state.socketReducer.socket);
        props.update({}, "dataVentaProducto")

        var data = state.obj2
        state.obj = data
        setState({ ...state })
    }
    const hanlechages = (data) => {
        state.obj[data.id] = {
            value: data.text,
            error: false,
        }
/*         props.hanlechage(data)
 */        setState({ ...state })
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
    const popupCalendario = () => {
        props.abrirPopupCalendario((fechaSelecionada) => {
            hanlechages({ text: fechaSelecionada, id: "fecha_entrega" })
            props.cerrarPopupCalendario()
            return <View />
        }, "dia", "actual")
        return <View />
    }
    return (
        <View style={{
            flex: 1,
            width: Dimensions.get("window").width,
            height: Dimensions.get("window").height,
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
                        if (key === "fecha_entrega") {
                            return (
                                <View style={{
                                    width: "80%",
                                    margin: 10,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                    <Text style={{ fontSize: 12, color: "#fff", textAlign: 'left', width: '100%', }}>FECHA ENTREGA</Text>

                                    <TouchableOpacity onPress={() => popupCalendario()}
                                        style={(data.error ? styles.error : styles.touc)}>
                                        <Text style={{ fontSize: 10, color: "#666", }}>
                                            {data.value}</Text>
                                    </TouchableOpacity>
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
                                        <Text style={{ fontSize: 10, color: "#666", }}>
                                            {data.value.toUpperCase()}</Text>
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
                    {props.state.ventaReducer.estado === "cargando" && props.state.ventaReducer.type === "addVenta" ? (
                        <TouchableOpacity
                            style={{ justifyContent: 'center', alignItems: 'center', flex: 1, height: 50, margin: 10, borderWidth: 2, borderColor: "#fff", borderRadius: 10, }}>
                            <ActivityIndicator size="small" color="#fff" />
                        </TouchableOpacity>
                    ) : (
                            <TouchableOpacity
                                onPress={() => venderDetalle()}
                                style={{ justifyContent: 'center', alignItems: 'center', width: '50%', height: 50, margin: 10, borderWidth: 2, borderColor: "#fff", borderRadius: 10, }}>
                                <Text style={{ color: "#fff", }}>Agregar venta</Text>
                            </TouchableOpacity>
                        )
                    }
                </View>


            </ScrollView>

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

export default connect(initState, initActions)(Vender);

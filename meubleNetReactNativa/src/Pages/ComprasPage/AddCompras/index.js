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
            detalle: {
                value: "",
                error: false
            },
            cantidad: {
                value: "",
                error: false
            },
            precio: {
                value: "",
                error: false
            },
        },

    }
    const [state, setstate] = React.useState({
        obj: {

            detalle: {
                value: "",
                error: false
            },
            cantidad: {
                value: "",
                error: false
            },
            precio: {
                value: "",
                error: false
            },
        },

    })

    if (props.state.comprasReducer.type === "addCompras") {
        if (props.state.comprasReducer.estado === "exito") {
            props.state.comprasReducer.estado = ""
            props.state.comprasReducer.type = ""
            setstate({ ...state2 })
            props.navigation.goBack()
            return <View />
        }
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
        var fecha = moment()
            .format('YYYY-MM-DD');
        var hora = moment()
            .format('HH:mm:ss');
        var fecha_on = fecha + "T" + hora
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
        var total = (state.obj.cantidad.value * state.obj.precio.value)
        var saldo = props.params.objCompralibro.totalIngreso - props.params.objCompralibro.totalCompras

        if (exito) {
            if (total > saldo) {
                alert("No tiene saldo suficiente para realizar compras\n" + "Hable con el administrador para que realize un pago\nY seguir con sus compras")
                return <View />
            }
            data["fecha_on"] = fecha_on
            data["key_compras_libro"] = props.params.key_compras_libro
            data["ingreso"] = false
            props.state.comprasReducer.estado = "cargando";
            props.addCompras(props.state.socketReducer.socket, data)
        }
    }
    const verificarbutton = () => {
        if (props.state.comprasReducer.estado === "cargando") {
            return <Estado estado={""} />
        }

        if (!props.state.socketReducer.socket) {
            return <Estado estado={"Reconectando"} />
        }

        return (
            <TouchableOpacity onPress={() => addCompras()} style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
                <Text style={{ color: "#fff", textAlign: "center", fontSize: 12, }}>Agreagar compras</Text>
            </TouchableOpacity>
        )

    }
    return (
        <View style={{
            flex: 1,
            width: "90%",
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
                                width: "90%",
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
                        {verificarbutton()}
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
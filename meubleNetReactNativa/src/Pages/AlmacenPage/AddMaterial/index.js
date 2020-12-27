import React from 'react';
import * as sucursalActions from '../../../Actions/sucursalActions'
import * as popupActions from '../../../Actions/popupActions'
import * as materialActions from '../../../Actions/materialActions'
import { connect } from 'react-redux';
import { ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, } from 'react-native';
import Estado from '../../../Component/Estado';
const AddMaterial = (props) => {
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
            cantidad: {
                value: "",
                error: false
            },
        },
        key_sucursal: {
            value: "Selecione sucursal",
            error: false
        },
        key_tipo_material: {
            value: "Selecione tipo material",
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
            cantidad: {
                value: "",
                error: false
            },
        },
        key_sucursal: {
            value: "Selecione sucursal",
            error: false
        },
        key_tipo_material: {
            value: "Selecione tipo material",
            error: false
        },
    })

    if (!props.state.socketReducer.socket) {
        return <Estado estado={"Reconectando"} />
    }
    if (props.state.materialReducer.estado === "exito" && props.state.materialReducer.type === "addMaterial") {
        props.state.materialReducer.estado = ""
        setstate({ ...state2 })

    }
    const hanlechage = (data) => {
        state.obj[data.id] = {
            value: data.text,
            error: false,
        }
        setstate({ ...state })
    }
    const agreagarMaterial = () => {
        var exito = true
        var data = {}
        for (const key in state.obj) {
            var obj = state.obj[key]
            if (obj.value === "") {
                exito = false
                state.obj[key].error = true
            } else {
                data[key] = obj.value
            }
        }
        if (!state.key_tipo_material.data) {
            exito = false
            state.key_tipo_material.error = true
        }
        if (!state.key_sucursal.data) {
            state.key_sucursal.error = true
            exito = false
        }
        setstate({ ...state })
        if (exito) {
            data["key_tipo_material"] = state.key_tipo_material.data.key
            data["key_sucursal"] = state.key_sucursal.data.key
            data["estado"] = 1
            props.addMaterial(props.state.socketReducer.socket, data)
        }
    }
    const popupTipo = () => {
        if (Object.keys(props.state.materialReducer.dataTipoMaterial).length === 0) {
            alert("agregue un tipo de producto")
            return <View />
        }
        const selecTipo = (obj) => {
            state.key_tipo_material.value = obj.nombre
            state.key_tipo_material["data"] = obj
            state.key_tipo_material.error = false
            setstate({ ...state })
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

                            {Object.keys(props.state.materialReducer.dataTipoMaterial).map((key) => {
                                var obj = props.state.materialReducer.dataTipoMaterial[key]
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
                                        <Text style={{ margin: 4, color: "#666" }}>Tipo material :</Text>
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
    return (
        <View style={{
            flex: 1,
            width: "80%",
        }}>
            <ScrollView
                style={{ flex: 1, }}>
                <View style={{
                    flex: 1,
                    alignItems: 'center',
                }}>
                    {Object.keys(state.obj).map((key) => {
                        var data = state.obj[key]
                        var keyboardTyp = ""
                        if (key === "cantidad") {
                            keyboardTyp = "phone-pad"
                        }
                        return (
                            <View style={{
                                width: "90%",
                                margin: 2,
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
                        width: "90%",
                        margin: 2,
                    }}>
                        <Text style={{ fontSize: 12, color: "#fff", }}>SUCURSAL</Text>
                        <TouchableOpacity
                            onPress={() => popupSucursal()}
                            style={(state.key_sucursal.error ? styles.error : styles.touc)}>
                            <Text style={{ fontSize: 10, color: "#666", }}>{state.key_sucursal.value.toUpperCase()}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        width: "90%",
                        margin: 2,
                    }}>
                        <Text style={{ fontSize: 12, color: "#fff", }}>TIPO MATERIAL</Text>
                        <TouchableOpacity
                            onPress={() => popupTipo()}
                            style={(state.key_tipo_material.error ? styles.error : styles.touc)}>
                            <Text style={{ fontSize: 10, color: "#666", }}>{state.key_tipo_material.value.toUpperCase()}</Text>
                        </TouchableOpacity>
                    </View>
                    <View
                        style={{
                            marginTop: 30,
                            width: 130,
                            height: 50,
                            borderRadius: 10,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderWidth: 2,
                            borderColor: "#fff",
                        }}>
                        {props.state.materialReducer.type === "addMaterial" && props.state.materialReducer.estado === "cargando" ? (
                            <ActivityIndicator size="small" color="#fff" />
                        ) : (
                                <TouchableOpacity onPress={() => agreagarMaterial()}
                                    style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
                                    <Text style={{ color: "#fff", textAlign: "center", fontSize: 12, }}>Agreagar material</Text>

                                </TouchableOpacity>

                            )

                        }
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}
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
    ...sucursalActions,
    ...popupActions,
    ...materialActions

});
export default connect(initStates, initActions)(AddMaterial);

import React from 'react';
import { View, StyleSheet, Text, ScrollView, TextInput, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import * as sucursalActions from '../../../Actions/sucursalActions'
import * as areaTrabajoActions from '../../../Actions/areaTrabajoActions'
import * as personaActions from '../../../Actions/personaActions'
import { connect } from 'react-redux';
import Estado from '../../../Component/Estado';
import ImagePicker from 'react-native-image-picker';
import Svg from '../../../Svg';
import * as popupActions from '../../../Actions/popupActions'
import * as popupCalendarioActions from '../../../Actions/popupCalendarioActions'
import myPropsJulio from '../../../nativeSocket/myPropsServer.json';
const AddPersona = (props) => {
    const state2 = {
        obj: {
            nombre: {
                value: "",
                error: false
            },
            paterno: {
                value: "",
                error: false
            },
            materno: {
                value: "",
                error: false
            },
            telefono: {
                value: "",
                error: false
            },
            fecha_nacimiento: {
                value: "Selecione Fecha",
                error: false
            },
            ci: {
                value: "",
                error: false
            },
        },
        key_area_trabajo: {
            value: "Selecione area trabajo",
            error: false,
            data: false
        },
        key_sucursal: {
            value: "Selecione sucursal",
            error: false,
            data: false
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
            paterno: {
                value: "",
                error: false
            },
            materno: {
                value: "",
                error: false
            },
            telefono: {
                value: "",
                error: false
            },
            fecha_nacimiento: {
                value: "Selecione Fecha",
                error: false
            },
            ci: {
                value: "",
                error: false
            },
        },
        key_area_trabajo: {
            value: "Selecione area trabajo",
            error: false,
            data: false
        },
        key_sucursal: {
            value: "Selecione sucursal",
            error: false,
            data: false
        },
        foto: {
            source: false
        },
        enviandoFoto: true

    })
    if (!props.state.socketReducer.socket) {
        return <Estado estado={"Reconectando"} />
    }
    if (props.state.areaTrabajoReducer.estado === "cargando" && props.state.areaTrabajoReducer.type === "getAllAreaTrabajo") {
        return <Estado estado={"cargando"} />
    }
    if (props.state.sucursalReducer.estado === "cargando" && props.state.sucursalReducer.type === "getAllSucursal") {
        return <Estado estado={"cargando"} />
    }
    if (!props.state.areaTrabajoReducer.dataAreaTrabajo) {
        props.getAllAreaTrabajo(props.state.socketReducer.socket);
        return <View />
    }
    if (!props.state.sucursalReducer.dataSucursal) {
        props.getAllSucursal(props.state.socketReducer.socket);
        return <View />
    }
    const enviarFoto = (nameFoto, data) => {
        var body = new FormData();
        body.append("archibo", { uri: state.foto.source.uri, name: 'image.png', type: 'image/jpeg' })
        body.append('type', "subirFoto");
        body.append('nombre', nameFoto);
        body.append('tipo', "persona");
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
    const popupSucursal = () => {
        if (Object.keys(props.state.sucursalReducer.dataSucursal).length === 0) {
            alert("agregue un tipo de producto")
            return <View />
        }
        const selecSucursal = (obj) => {
            state.key_sucursal.value = obj.direccion
            state.key_sucursal.error = false
            state.key_sucursal["data"] = obj
            setState({ ...state })
            props.cerrarPopup()
        }
        props.abrirPopup(() => {
            return (
                <View style={{
                    width: "90%",
                    height: "80%",
                    backgroundColor: "#ffffff99",
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
    if (props.state.personaReducer.type === "addPersona") {
        if (props.state.personaReducer.estado === "exito") {
            props.state.personaReducer.estado = ""
            props.state.personaReducer.type = ""
            state.enviandoFoto=false
            setState({...state})
            enviarFoto(state.obj.ci.value)
        }
    }
    const popupCalendario = () => {
        props.abrirPopupCalendario((fechaSelecionada) => {
            hanlechage({ text: fechaSelecionada, id: "fecha_nacimiento" })
            props.cerrarPopupCalendario()
            return <View />
        }, "dia")
        return <View />
    }
    const popupArea = () => {
        if (Object.keys(props.state.areaTrabajoReducer.dataAreaTrabajo).length === 0) {
            alert("agregue un tipo de producto")
            return <View />
        }
        const selecArea = (obj) => {
            state.key_area_trabajo.value = obj.nombre
            state.key_area_trabajo.error = false
            state.key_area_trabajo.data = obj
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
                            {Object.keys(props.state.areaTrabajoReducer.dataAreaTrabajo).map((key) => {
                                var obj = props.state.areaTrabajoReducer.dataAreaTrabajo[key]
                                return (
                                    <TouchableOpacity
                                        onPress={() => selecArea(obj)}
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
                                        <Text style={{ margin: 4, color: "#666" }}>Area trabajo :</Text>
                                        <Text style={{ margin: 4, color: "#fff", fontSize: 12, textAlign: "center", flex: 1, }}>{obj.nombre}</Text>
                                    </TouchableOpacity>
                                )
                            })}
                        </View>
                    </ScrollView>
                </View>


            )

        })
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
    const hanlechage = (data) => {
        state.obj[data.id] = {
            value: data.text,
            error: false,
        }
        setState({ ...state })
    }
    const agregarPersona = () => {
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
        if (state.obj.ci.value.length < 7) {
            exito = false
            state.obj.ci.error = true
        }
        if (!state.key_area_trabajo.data) {
            state.key_area_trabajo.error = true
            exito = false
        }
        if (!state.key_sucursal.data) {
            exito = false
            state.key_sucursal.error = true
        }
        if (!state.foto.source) {
            exito = false
            alert("su foto no a ingresado")
        }
        setState({ ...state })
        if (exito) {
            data["key_area_trabajo"] = state.key_area_trabajo.data.key
            data["key_sucursal"] = state.key_sucursal.data.key
            data["estado"] = 1
            props.addPersona(props.state.socketReducer.socket, data)
        }
    }
    const esperandoRepuesta = () => {
        if (props.state.personaReducer.type === "addPersona" && props.state.personaReducer.estado === "cargando") {
            return <ActivityIndicator size="small" color="#fff" />
        }
        if (!state.enviandoFoto) {
            return <ActivityIndicator size="small" color="#fff" />
        }
        return (
            <TouchableOpacity onPress={() => agregarPersona()} style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
                <Text style={{ color: "#fff", textAlign: "center", fontSize: 15, }}>Agreagar Persona</Text>
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
                        if (key === "telefono" || key === "ci") {
                            keyboardTyp = "numeric"
                        }
                        return (
                            <View style={{
                                width: "80%",
                                margin: 5,
                            }}>
                                <Text style={{ fontSize: 12, color: "#fff", }}>{key.toUpperCase()}</Text>
                                {key === "fecha_nacimiento" ? (
                                    <TouchableOpacity onPress={() => popupCalendario()}
                                        style={(data.error ? styles.error : styles.touc)}>
                                        <Text>{data.value}</Text>
                                    </TouchableOpacity>
                                ) : (
                                        <TextInput
                                            autoCapitalize={"none"}
                                            keyboardType={keyboardTyp}
                                            onChangeText={text => hanlechage({ text: text, id: key })}
                                            value={data.value}
                                            style={(data.error ? styles.error : styles.input)} />
                                    )
                                }
                            </View>
                        )
                    })}
                    <View style={{
                        width: "80%",
                        margin: 5,
                    }}>
                        <Text style={{ fontSize: 12, color: "#fff", }}>Area Trabajo</Text>
                        <TouchableOpacity
                            onPress={() => popupArea()}
                            style={(state.key_area_trabajo.error ? styles.error : styles.touc)}>
                            <Text style={{ fontSize: 10, color: "#666", }}>{state.key_area_trabajo.value.toUpperCase()}</Text>
                        </TouchableOpacity>
                    </View>
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
                    <TouchableOpacity
                        style={{
                            width: 150,
                            height: 50,
                            margin: 5,
                            borderRadius: 10,
                            borderWidth: 3,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderColor: '#fff',
                        }}>
                        {esperandoRepuesta()}
                    </TouchableOpacity>
                </View>

            </ScrollView>
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
    ...areaTrabajoActions,
    ...personaActions,
    ...popupActions,
    ...popupCalendarioActions
});
export default connect(initStates, initActions)(AddPersona);
import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    ScrollView,
    TouchableOpacity,
    TextInput,
    ActivityIndicator,
} from 'react-native';
import * as personaActions from '../../../Actions/personaActions'
import * as popupActions from '../../../Actions/popupActions'
import * as areaTrabajoActions from '../../../Actions/areaTrabajoActions'
import { connect } from 'react-redux';
import Estado from '../../../Component/Estado';
const PagosSalario = (props) => {
    const [state, setstate] = React.useState({
        efectivo: {
            value: "",
            error: false
        },
        key_persona: {
            value: "Selecione Persona",
            error: false,
            data: false
        }
    })
    if (!props.state.socketReducer.socket) {
        return <Estado estado={"Reconectando"} />
    }
    if (props.state.personaReducer.estado === "cargando" && props.state.personaReducer.type === "getAllPersona") {
        return <Estado estado={"cargando"} />
    }
    if (props.state.personaReducer.estado === "exito" && props.state.personaReducer.type === "addPagos") {
        props.state.personaReducer.estado = ""
        props.state.personaReducer.type=""
        state.efectivo.value=""
        state.key_persona.value="Selecione Persona"
        state.key_persona.data=false
        setstate({...state})
    }
    if (!props.state.personaReducer.dataPersonas) {
        props.getAllPersona(props.state.socketReducer.socket);
        return <View />
    }
    const popupPersona = () => {
        const selecEmpleado = (objEmpleado) => {
            state.key_persona.value = objEmpleado.nombre + " " + objEmpleado.paterno + " " + objEmpleado.materno + "  CI:" + objEmpleado.ci
            state.key_persona.data = objEmpleado
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

                            {Object.keys(props.state.personaReducer.dataPersonas).map((key) => {
                                var obj = props.state.personaReducer.dataPersonas[key]
                                return (
                                    <TouchableOpacity
                                        onPress={() => selecEmpleado(obj)}
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
                                        <Text style={{ margin: 4, color: "#666" }}>Empleado :</Text>
                                        <Text style={{ margin: 4, color: "#fff", fontSize: 12, textAlign: "center", flex: 1, }}>{obj.nombre} {obj.materno} </Text>
                                        <Text style={{ margin: 4, color: "#fff", fontSize: 12, textAlign: "center", flex: 1, }}> CI : {obj.ci} </Text>
                                    </TouchableOpacity>
                                )
                            })}
                        </View>
                    </ScrollView>
                </View>)
        })
    }
    const hanlechage = (data) => {
        state[data.id] = {
            value: data.text,
            error: false,
        }
        setstate({ ...state })
    }
    const addPago = () => {
        var exito = true
        if (state.efectivo.value === "") {
            state.efectivo.error = true
            exito = false
        }

        if (!state.key_persona.data) {
            state.key_persona.error = true
            exito = false
        }
        setstate({ ...state })
        if (exito) {
            var num = Number(state.efectivo.value)
            if (num + "" === "NaN") {
                alert("Contiene simbolo")
                return <View />
            }
            var data = {
                efectivo: num,
                key_persona: state.key_persona.data.key
            }
            props.addPagos(props.state.socketReducer.socket, data)
        }
    }
    return (
        <View style={{
            flex: 1,
            width: '80%',
            alignItems: 'center',
        }}>
            <Text style={{ margin: 4, color: "#fff", fontSize: 25, textAlign: "center", fontWeight: 'bold', }}>Pagos salario</Text>
            <View style={{ width: "100%", flexDirection: 'column', }}>
                <Text style={{ margin: 4, color: "#fff", fontSize: 15, fontWeight: 'bold', }}>Efectivo</Text>
                <TextInput
                    keyboardType={"numeric"}
                    onChangeText={text => hanlechage({ text: text, id: "efectivo" })}
                    value={state.efectivo.value}
                    style={(state.efectivo.error ? styles.error : styles.input)} />
            </View>
            <View style={{ width: "100%", flexDirection: 'column', }}>
                <Text style={{ margin: 4, color: "#fff", fontSize: 15, fontWeight: 'bold', }}>Persona</Text>
                <TouchableOpacity
                    onPress={() => popupPersona()}
                    style={(state.key_persona.error ? styles.error : styles.touc)}>
                    <Text style={{ fontSize: 13, color: "#666", }}>{state.key_persona.value.toUpperCase()}  </Text>
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
                {props.state.personaReducer.type === "addPagos" && props.state.personaReducer.estado === "cargando" ? (
                    <ActivityIndicator size="small" color="#fff" />
                ) : (
                        <TouchableOpacity onPress={() => addPago()}
                            style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
                            <Text style={{ color: "#fff", textAlign: "center", fontSize: 12, }}>Guardar </Text>
                        </TouchableOpacity>
                    )
                }
            </View>
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
    ...personaActions,
    ...areaTrabajoActions,
    ...popupActions,

});
export default connect(initStates, initActions)(PagosSalario);

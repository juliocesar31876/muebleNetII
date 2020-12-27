import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    ScrollView,
    Image,
    TouchableOpacity,
} from 'react-native';
import * as personaActions from '../../../Actions/personaActions'
import * as popupActions from '../../../Actions/popupActions'
import * as areaTrabajoActions from '../../../Actions/areaTrabajoActions'
import { connect } from 'react-redux';
import Estado from '../../../Component/Estado';
import myPropsJulio from '../../../nativeSocket/myPropsServer.json';
//import myPropsJulio from '../../../nativeSocket/myPropsJulio.json';
const VerPersona = (props) => {
    const [state, setState] = React.useState({
        areaTrabajo: {
            value: "Todos",
            data: false
        },
    })
    if (!props.state.socketReducer.socket) {
        return <Estado estado={"Reconectando"} />
    }
  
    if (props.state.areaTrabajoReducer.estado === "cargando" && props.state.areaTrabajoReducer.type === "getAllAreaTrabajo") {
        return <Estado estado={"cargando"} />
    }
    if (!props.state.areaTrabajoReducer.dataAreaTrabajo) {
        props.getAllAreaTrabajo(props.state.socketReducer.socket);
        return <View />
    }
    if (props.state.personaReducer.estado === "cargando" && props.state.personaReducer.type === "getAllPersona") {
        return <Estado estado={"cargando"} />
    }
    if (!props.state.personaReducer.dataPersonas) {
        props.getAllPersona(props.state.socketReducer.socket);
        return <View />
    }

    const popupArea = () => {
        if (Object.keys(props.state.areaTrabajoReducer.dataAreaTrabajo).length === 0) {
            alert("agregue un tipo de producto")
            return <View />
        }
        const selecArea = (obj) => {
            if (obj.nombre === "todos") {
                state.areaTrabajo.value = obj.nombre
                state.areaTrabajo.data = false
                setState({ ...state })
                props.cerrarPopup()
                return <View />
            }
            state.areaTrabajo.value = obj.nombre
            state.areaTrabajo.data = obj
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
                            <TouchableOpacity
                                onPress={() => selecArea({ nombre: "todos" })}
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
                                <Text style={{ margin: 4, color: "#fff", fontSize: 12, textAlign: "center", flex: 1, }}>Todos</Text>

                            </TouchableOpacity>
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
                </View>) })
    }

    const Personas =()=>{
        var objDataPersona = props.state.personaReducer.dataPersonas
        var newDataPersona = {}
        for (const key in objDataPersona) {
            var obj = objDataPersona[key]
            if (!state.areaTrabajo.data) {
                newDataPersona[key] = obj
            }else{
                if (state.areaTrabajo.data.key===obj.key_area_trabajo) {
                    newDataPersona[key] = obj
                }
            }
        }
        return(
            <View style={{
                flex: 1,
                width: "100%",
                alignItems: 'center',
                justifyContent: 'center',
                width: "100%",
            }}>
                {Object.keys(newDataPersona).map((key) => {
                    var obj = newDataPersona[key]
                    var url = myPropsJulio.images.urlImage + obj.ci + ".png" + `?tipo=${"persona"}&date=${Date.now()}`
                    if (obj.key === props.state.usuarioReducer.usuarioLog.persona.key) {
                        return <View />
                    }
                    var AreaTrabajo= props.state.areaTrabajoReducer.dataAreaTrabajo[obj.key_area_trabajo].nombre
                    return (
                        <View style={{
                            margin: 10,
                            width: '90%',
                            height: 150,
                            padding: 5,
                            borderRadius: 10,
                            borderWidth: 2,
                            borderColor: "#fff",
                            flexDirection: 'row',
                        }}>
                            <View style={{ flex: 1, margin: 2, }}>
                                <View style={{ flexDirection: 'row', }}>
                                    <Text style={{ flex: 0.8, fontSize: 12, color: "#666" }}>Nombre :</Text>
                                    <Text style={{ flex: 1, marginLeft: 5, fontSize: 12, color: "#fff" }}>{obj.nombre}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', }}>
                                    <Text style={{ flex: 0.8, fontSize: 12, color: "#666" }}>Paterno :</Text>
                                    <Text style={{ flex: 1, marginLeft: 5, fontSize: 12, color: "#fff" }}>{obj.paterno}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', }}>
                                    <Text style={{ flex: 0.8, fontSize: 12, color: "#666" }}>Materno :</Text>
                                    <Text style={{ flex: 1, marginLeft: 5, fontSize: 12, color: "#fff" }}>{obj.materno}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', }}>
                                    <Text style={{ flex: 0.8, fontSize: 12, color: "#666" }}>CI :</Text>
                                    <Text style={{ flex: 1, marginLeft: 5, color: "#fff", fontSize: 12 }}>{obj.ci}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', }}>
                                    <Text style={{ flex: 0.8, fontSize: 12, color: "#666" }}>Fecha nacimiento :</Text>
                                    <Text style={{ flex: 1, marginLeft: 5, color: "#fff", fontSize: 12 }}>{obj.fecha_nacimiento}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', }}>
                                    <Text style={{ flex: 0.8, fontSize: 12, color: "#666" }}>Area trabajo:</Text>
                                    <Text style={{ flex: 1, marginLeft: 5, color: "#fff", fontSize: 12 }}>{AreaTrabajo}</Text>
                                </View>
                            </View>
                            <View style={{
                                flex: 0.6,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                                <Text style={{ color: "#fff" }}>Persona</Text>
                                <View style={{
                                    width: 70,
                                    height: 70,
                                    borderRadius: 100,
                                    borderWidth: 2,
                                    borderColor: "#fff",
                                    overflow: "hidden"
                                }} >
                                    <Image source={{ uri: url }} style={{ width: "100%", height: "100%", fill: "#000" }} />
                                </View>
                            </View>
                        </View>
                    )
                })}
            </View>
        )
    }
    return (
        <View style={{
            flex: 1,
            width: '100%',
            alignItems: 'center',
        }}>
               <View style={{
                width: "80%",
                height: 50,
                flexDirection: 'row',
                alignItems: 'center',
                margin: 5,
            }}>
                <Text style={{ margin: 5, color: "#fff", flex: 0.6, fontSize: 12, }}>Selecione el Area trabajo </Text>
                <TouchableOpacity
                    onPress={() => popupArea()}
                    style={{
                        flex: 1,
                        height: 40,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderWidth: 2,
                        borderRadius: 10,
                        borderColor: "#fff",
                    }}>
                    <Text style={{ color: "#fff" }}> {state.areaTrabajo.value}</Text>
                </TouchableOpacity>
            </View>
            <ScrollView style={{
                flex: 1,
                width: "100%",
            }}>
                {Personas()}

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
    ...personaActions,
    ...areaTrabajoActions,
    ...popupActions
});
export default connect(initStates, initActions)(VerPersona);

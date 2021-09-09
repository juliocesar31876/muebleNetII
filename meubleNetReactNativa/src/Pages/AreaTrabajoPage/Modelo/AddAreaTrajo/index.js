import React from 'react';
import { connect } from 'react-redux';
import * as areaTrabajoActions from '../../../../Actions/areaTrabajoActions'
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
import Estado from '../../../../Component/Estado';

const AddAreaTrajo = (props) => {
    const [data, setData] = React.useState({
        nombre: {
            value: "",
            error: false
        }
    })
    if (!props.state.socketReducer.socket) {
        return <Estado estado={"Reconectando"} />
    }
    if (props.state.areaTrabajoReducer.type === "addAreaTrabajo") {
        if (props.state.areaTrabajoReducer.estado === "exito") {
            props.state.areaTrabajoReducer.estado = ""
            data.nombre.value = ""
            setData({ ...data })
        }
    }

    if (props.state.areaTrabajoReducer.estado === "error" && props.state.areaTrabajoReducer.type === "addAreaTrabajo") {
        props.state.areaTrabajoReducer.estado = ""
        alert("error : existe ya este nombre ")
    }
    const hanlechage = (text) => {
        data.nombre = {
            value: text,
            error: false
        }
        setData({ ...data })
    }
    const addArea = () => {
        var exito = true
        var dato = {}
        if (data.nombre.value === "") {
            exito = false
            data.nombre.error = true
        } else {
            dato["nombre"] = data.nombre.value
            dato["estado"] = 1
        }
        setData({ ...data })
        if (exito) {
            props.addAreaTrabajo(props.state.socketReducer.socket, dato)
        }
    }

    return (
        <View style={{
            flex: 1,
            width: "80%",
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <Text style={{ color: "#fff", margin: 5, }}>Area trabajo</Text>
            <TextInput
                autoCapitalize={"none"}
                onChangeText={text => hanlechage(text)}
                value={data.nombre.value}
                style={(data.nombre.error ? styles.error : styles.input)} />
            <View

                style={{
                    margin: 10,
                    width: 100,
                    height: 50,
                    borderRadius: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderWidth: 2,
                    borderColor: "#fff",
                }}>
                {props.state.areaTrabajoReducer.type === "addAreaTrabajo" && props.state.areaTrabajoReducer.estado === "cargando" ? (
                    <ActivityIndicator size="small" color="#fff" />
                ) : (
                        <TouchableOpacity onPress={() => addArea()} style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
                            <Text style={{ color: "#fff", textAlign: "center", fontSize: 12, }}>Agreagar area trabajo</Text>

                        </TouchableOpacity>

                    )

                }
            </View>
        </View>
    )

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
const initStates = (state) => {
    return { state }
};
const initActions = ({
    ...areaTrabajoActions
});
export default connect(initStates, initActions)(AddAreaTrajo);

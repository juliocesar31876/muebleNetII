import React from 'react';
import * as materialActions from '../../../Actions/materialActions'
import { connect } from 'react-redux';
import Estado from '../../../Component/Estado';
import {  View,Text, TextInput, TouchableOpacity ,StyleSheet, ActivityIndicator,} from 'react-native';
const AddMaterial = (props) =>{
    const [data, setData] = React.useState({
        nombre: {
            value: "",
            error: false
        }
    })
    if (!props.state.socketReducer.socket) {
        return <Estado estado={"Reconectando"} />
    }
    if (props.state.materialReducer.type === "addTipoMaterial") {
    if (props.state.materialReducer.estado === "exito" ) {
        props.state.materialReducer.estado = ""
        data.nombre.value=""
        setData({...data})
    }   
    }
    if (props.state.materialReducer.estado === "error") {
        props.state.materialReducer.estado = ""
        alert("error : existe ya este nombre ")
        data.nombre.error=true
        setData({...data})
    }
    const hanlechage = (text) => {
        data.nombre = {
            value: text,
            error: false
        }
        setData({ ...data })
    }
    const addTipo = () => {
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
            props.addTipoMaterial(props.state.socketReducer.socket, dato)
        }
    }
    return (
        <View style={{
            flex: 1,
            width: "90%",
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <Text style={{ color: "#fff", margin: 5, }}>Tipo material</Text>
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
                 {props.state.materialReducer.type === "addTipoMaterial" && props.state.materialReducer.estado === "cargando" ? (
                            <ActivityIndicator size="small" color="#fff" />
                        ) : (
                                <TouchableOpacity onPress={() => addTipo()}
                                    style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
                                    <Text style={{ color: "#fff", textAlign: "center", fontSize: 15, }}>Agreagar producto</Text>

                                </TouchableOpacity>

                            )

                        }
            </View>
        </View>
    )
}
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
    ...materialActions

});
export default connect(initStates, initActions)(AddMaterial);

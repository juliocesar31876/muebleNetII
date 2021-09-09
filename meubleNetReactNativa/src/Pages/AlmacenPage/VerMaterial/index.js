import React from 'react';
import { ScrollView, View, Text, Image, TouchableOpacity, StyleSheet, TextInput, ActivityIndicator } from 'react-native';
import * as materialActions from '../../../Actions/materialActions'
import * as popupActions from '../../../Actions/popupActions'
import Estado from '../../../Component/Estado';
import { connect } from 'react-redux';
const VerMaterial = (props) => {
    const [state, setState] = React.useState({
        tipo: {
            value: "Todos",
            data: false
        },
    })
    if (!props.state.socketReducer.socket) {
        return <Estado estado={"Reconectando"} />
    }
    const popupTipo = () => {
        if (Object.keys(props.state.materialReducer.dataTipoMaterial).length === 0) {
            alert("agregue un tipo de producto")
            return <View />
        }
        const selecTipo = (obj) => {
            if (obj.nombre === "todos") {
                state.tipo.value = obj.nombre
                state.tipo.data = false
                setState({ ...state })
                props.cerrarPopup()
                return <View />
            }
            state.tipo.value = obj.nombre
            state.tipo.data = obj
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
                                onPress={() => selecTipo({ nombre: "todos" })}
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
                                <Text style={{ margin: 4, color: "#fff" }}>Tipo Material :</Text>
                                <Text style={{ margin: 4, color: "#666", fontSize: 12, textAlign: "center", flex: 1, }}>Todos</Text>

                            </TouchableOpacity>
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
                                        <Text style={{ margin: 4, color: "#fff" }}>Tipo material :</Text>
                                        <Text style={{ margin: 4, color: "#666", fontSize: 12, textAlign: "center", flex: 1, }}>{obj.nombre}</Text>
                                    </TouchableOpacity>
                                )
                            })}
                        </View>
                    </ScrollView>
                </View>
            )
        })
    }
    const popupDescuento = (objMaterial, titulo, estado) => {
        var error=false
        const verificar = (cant) => {
            if (cant==="") {
                alert("rellene cantidad")
                return <View/>
            }
            cant = Number(cant)
            if (cant + "" === "NaN") {
                alert("Contiene simbolo")
                return <View />
            }
            if (!estado) {
                if (cant > objMaterial.cantidad) {
                    alert("sobre pasa su cantidad " + objMaterial.cantidad)
                    return <View />
                }
                cant = objMaterial.cantidad - cant
            }
            if (estado) {
                cant = objMaterial.cantidad + cant
            }
           var cantidadMaterial = Number(objMaterial.cantidad,)
            var data = {
                cantidadTotal: cant,
                cantidad_material:cantidadMaterial,
                key_material: objMaterial.key
            }
            props.updateMaterial(props.state.socketReducer.socket, data);
            return <View />
        }
        props.abrirPopup(() => {
            var texto = ""
            return (
                <View style={{
                    width: "90%",
                    height: "75%",
                    margin: 10,
                    backgroundColor: "#000000",
                    borderRadius: 10,
                    borderWidth: 2,
                    borderColor: "#fff",
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <Text style={{
                        color: "#fff",
                        fontWeight: 'bold',
                        fontSize: 20,
                    }}>Material :{objMaterial.nombre}</Text>
                      <Text style={{
                        color: "#fff",
                        fontWeight: 'bold',
                        fontSize: 15,
                    }}>Cantidad :{objMaterial.cantidad}</Text>
                    <View style={{
                        width: "90%",
                        height: 80,
                        alignItems: 'center',
                        flexDirection: 'row',
                    }}>
                        <Text style={{
                            color: "#fff",
                            width: "35%",
                            fontWeight: 'bold',
                            fontSize: 15,
                            margin: 5,
                            textAlign: "center"
                        }}>Cantidad</Text>
                        <TextInput
                            onChangeText={text => {
                                texto = text
                            }}
                            keyboardType="numeric"
                            style={(error ? styles.error : styles.input)} />
                    </View>
                    <View
                        onPress={() => verificar(texto)}
                        style={{
                            width: 150,
                            height: 50,
                            marginTop: 25,
                            borderColor: "#fff",
                            borderWidth: 3,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 10,
                        }}>
                        {props.state.materialReducer.estado === "cargando" && props.state.materialReducer.type === "updateMaterial" ?
                            (
                                <ActivityIndicator size="small" color="#fff" />
                            ) : (
                                <TouchableOpacity
                                    onPress={() => verificar(texto)}
                                    style={{
                                        flex: 1,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>
                                    <Text style={{
                                        color: '#fff',
                                        fontWeight: 'bold',
                                        fontSize: 15,
                                    }}>{titulo} </Text>
                                </TouchableOpacity>
                            )
                        }
                    </View>
                </View>
            )
        })
    }
    const Material = () => {
        var objdataMaterial = props.state.materialReducer.dataMaterial
        var newdataMaterial = {}
        for (const key in objdataMaterial) {
            var obj = objdataMaterial[key]
            if (!state.tipo.data) {
                newdataMaterial[key] = obj
            } else {
                if (state.tipo.data.key === obj.key_tipo_material) {
                    newdataMaterial[key] = obj
                }
            }
        }
        return (
            <View style={{
                flex: 1,
                width: "100%",
                alignItems: 'center',
                justifyContent: 'center',
                width: "100%",
            }}>
                {Object.keys(newdataMaterial).map((key) => {
                    var obj = newdataMaterial[key]
                    return (
                        <View
                            style={{
                                margin: 10,
                                width: '80%',
                                padding: 5,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 10,
                                borderWidth: 2,
                                borderColor: "#fff",
                            }}>
                            <Text style={{ fontSize: 20, color: "#fff" }}>Material</Text>
                            <View style={styles.vie}>
                                <Text style={{ flex: 0.8, fontSize: 12, color: "#fff" }}>Nombre :</Text>
                                <Text style={{ flex: 1, marginLeft: 5, color: "#666", textAlign: "center" }}>{obj.nombre}</Text>
                            </View>
                            <View style={styles.vie}>
                                <Text style={{ flex: 0.8, fontSize: 12, color: "#fff" }}>Descripcion :</Text>
                                <Text style={{ flex: 1, marginLeft: 5, color: "#666", fontSize: 12, textAlign: "center" }}>{obj.descripcion}</Text>
                            </View>
                            <View style={styles.vie}>
                                <Text style={{ flex: 0.8, fontSize: 12, color: "#fff" }}>Cantidad :</Text>
                                <Text style={{ flex: 1, marginLeft: 5, color: "#666", fontSize: 12, textAlign: "center" }}>{obj.cantidad}</Text>
                            </View>
                            <View style={styles.vie}>
                                <Text style={{ flex: 0.8, fontSize: 12, color: "#fff" }}>Tipo material :</Text>
                                <Text style={{ flex: 1, fontSize: 12, width: "75%", marginLeft: 5, color: "#666", textAlign: "center" }}>{props.state.materialReducer.dataTipoMaterial[obj.key_tipo_material].nombre}</Text>
                            </View>
                            <View style={{
                                flex: 1,
                                margin: 5,
                                flexDirection: 'row',
                                width: "100%",
                            }}>

                                <TouchableOpacity style={styles.touc} onPress={() => popupDescuento(obj, "Descontar Material", false)}>
                                    <Text style={{ color: "#fff", fontSize: 10, }}>Descontar Material</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.touc} onPress={() => popupDescuento(obj, "Aumentar Material", true)}>
                                    <Text style={{ color: "#fff", fontSize: 10, }}>Aumentar Material</Text>
                                </TouchableOpacity>
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
                justifyContent: 'center',
            }}>
                <Text style={{ margin: 5, color: "#fff", flex: 0.5, fontSize: 12, textAlign: "center" }}>Selecione el tipo de Material </Text>
                <TouchableOpacity
                    onPress={() => popupTipo()}
                    style={{
                        flex: 0.5,
                        height: 40,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderWidth: 2,
                        borderRadius: 10,
                        borderColor: "#fff",
                    }}>
                    <Text style={{ color: "#fff" }}> {state.tipo.value}</Text>
                </TouchableOpacity>
            </View>
            <ScrollView style={{
                flex: 1,
                width: "100%",
            }}>
                {Material()}
            </ScrollView>
        </View>
    )
}
const styles = StyleSheet.create({
    touc: {
        height: 40,
        margin: 5,
        flex: 1,
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: "#fff",
        borderRadius: 10,
    },
    vie: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        flex: 1,
    },
    input: {
        backgroundColor: '#ffffff',
        color: '#000',
        marginTop: 10,
        borderRadius: 8,
        width: 100,
        height: 40,
    },
    error: {
        borderWidth: 2,
        borderColor: "#f00",
        backgroundColor: '#ffffff',
        color: '#000',
        marginTop: 10,
        borderRadius: 8,
        width:100,
        height: 40,
    },
});
const initStates = (state) => {
    return { state }
};
const initActions = ({
    ...materialActions,
    ...popupActions
});
export default connect(initStates, initActions)(VerMaterial);
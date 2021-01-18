import React from 'react';
import { connect } from 'react-redux';
import { ScrollView, View, Text, Image, TouchableOpacity } from 'react-native';
import * as productoActions from '../../../../Actions/productoActions'
import * as popupActions from '../../../../Actions/popupActions'
import Estado from '../../../../Component/Estado';
import myPropsJulio from '../../../../nativeSocket/myPropsJulio.json'

const VerProductos = (props) => {
    const [state, setState] = React.useState({
        tipo: {
            value: "Todos",
            data: false
        },
    })

    const popupTipo = () => {
        if (Object.keys(props.state.productosReducer.dataTipoProducto).length === 0) {
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
                                <Text style={{ margin: 4, color: "#fff" }}>Tipo producto :</Text>
                                <Text style={{ margin: 4, color: "#666", fontSize: 12, textAlign: "center", flex: 1, }}>Todos</Text>

                            </TouchableOpacity>
                            {Object.keys(props.state.productosReducer.dataTipoProducto).map((key) => {
                                var obj = props.state.productosReducer.dataTipoProducto[key]

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
                                        <Text style={{ margin: 4, color: "#fff" }}>Tipo producto :</Text>
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
    const Productos = () => {
        var objDataProducto = props.state.productosReducer.dataProducto
        var newDataProducto = {}
        for (const key in objDataProducto) {
            var obj = objDataProducto[key]
            if (!state.tipo.data) {
                newDataProducto[key] = obj
            } else {
                if (state.tipo.data.key === obj.key_tipo_producto) {
                    newDataProducto[key] = obj
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
                {Object.keys(newDataProducto).map((key) => {
                    var obj = newDataProducto[key]
                    var url = myPropsJulio.images.urlImage + obj.key + ".png" + `?tipo=${"producto"}&date=${Date.now()}`
                    return (
                        <TouchableOpacity 
                        onPress={()=>{
                            props.navigation.navigate("VistaProductoPage",{producto:obj,pagina:"Producto"})
                        }}
                        style={{
                            width: '90%',
                            height: 150,
                            borderRadius: 10,
                            borderColor: "#fff",
                            flexDirection: 'row',
                        }}>
                            <View style={{
                                flex: 0.4,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                                <View style={{
                                    width: 100,
                                    height: 100,
                                    borderRadius: 10,
                                    overflow: "hidden"
                                }} >
                                    <Image source={{ uri: url }} style={{ width: "100%", height: "100%", fill: "#000" }} />
                                </View>
                            </View>
                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
                                <Text style={{ marginLeft: 5,  width: "75%",fontSize: 15, margin: 2, color: "#fff" }}>{obj.nombre.toUpperCase()}</Text>
                                <Text style={{ fontSize: 12, width: "75%", marginLeft: 5, margin: 2, color: "#999" }}>{props.state.productosReducer.dataTipoProducto[obj.key_tipo_producto].nombre}</Text>
                                <Text style={{
                                    fontSize: 12,
                                    width: "75%", marginLeft: 5,
                                    margin: 2, color: "#999"
                                }}>............</Text>
                                <Text style={{ fontSize: 15, width: "75%", marginLeft: 5, color: "#999", margin: 2, }}> {obj.precio_venta}  Bs </Text>
                            </View>

                        </TouchableOpacity>
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
                <Text style={{ margin: 5, color: "#fff", flex: 0.4, fontSize: 12, alignItems: 'center', justifyContent: 'center', }}>Selecione el tipo de producto </Text>
                <TouchableOpacity
                    onPress={() => popupTipo()}
                    style={{
                        flex: 0.6,
                        height: 40,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderBottomWidth: 2,
                        borderRadius: 10,
                        borderColor: "#999",
                    }}>
                    <Text style={{ color: "#fff" }}> {state.tipo.value}</Text>
                </TouchableOpacity>
            </View>
            <ScrollView style={{
                flex: 1,
                width: "100%",
            }}>
                {Productos()}

            </ScrollView>
        </View>
    )

};
const initStates = (state) => {
    return { state }
};
const initActions = ({
    ...productoActions,
    ...popupActions
});
export default connect(initStates, initActions)(VerProductos);

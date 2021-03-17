import React from 'react';
import { connect } from 'react-redux';
import { FlatList, Image, ScrollView, TouchableOpacity, View, Text, TextInput } from 'react-native';
import myPropsJulio from '../../../nativeSocket/myPropsJulio.json'
//import myPropsJulio from '../../../nativeSocket/myPropsJulio.json'
import Estado from '../../../Component/Estado';
import * as popupActions from '../../../Actions/popupActions'
import * as productoActions from '../../../Actions/productoActions'
import Foto from '../../../Component/Foto';

const addVenta = (props) => {
    if (!props.state.socketReducer.socket) {
        return <Estado estado={"Reconectando"} />
    }
    var arrayDataProducto = []
    var dataProducto = props.state.productosReducer.dataProducto
    for (const key in dataProducto) {
        var obj = dataProducto[key]
        arrayDataProducto.push(obj)
    }
    return (
        <ScrollView style={{ flex: 1, width: "100%" }}>
            <View style={{
                flex: 1,
                width: "100%",
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <FlatList
                    style={{ width: "100%" }}
                    data={arrayDataProducto}
                    renderItem={({ item }) => (
                        <View style={{
                            flex: 1,
                            margin: 10,
                            borderBottomWidth: 1,
                            borderColor: '#fff',
                            borderRadius: 10,
                            padding: 10,
                            alignItems: 'center',
                            flexDirection: 'row',
                        }}>
                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
                                <Text style={{ color: "#fff", fontSize: 15, }}>{item.nombre}</Text>

                                <TouchableOpacity
                                    onPress={() => {
                                        // popupDetalleProducto(item)
                                        props.navigation.navigate("VentaProductoPage", { producto: item, pagina: "Producto" })
                                    }}
                                    style={{
                                        flex: 1,
                                        margin: 10,
                                    }} >
                                    <View style={{
                                        alignItems: 'center',
                                        borderColor: "#999",
                                        borderRadius: 100,
                                        borderWidth: 1,
                                        justifyContent: "center",
                                        width: 110,
                                        height: 110,
                                        borderColor: "#fff",
                                        overflow: "hidden"
                                    }} >
                                        <Foto nombre={item.key + ".png"} tipo={"producto"} />
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
                                <Text style={{ color: "#fff", flex: 0.4, fontSize: 12, margin: 5, }}>Detalle producto</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>
                                    <Text style={{ color: "#666", flex: 1, fontSize: 12, margin: 5, }}>PRECIO :</Text>
                                    <Text style={{ color: "#fff", flex: 1, fontSize: 12, margin: 5, }}>{item.precio_venta} bs</Text>
                                </View>
                                <Text style={{ fontSize: 12, width: "75%", marginLeft: 5, margin: 2, color: "#999" }}>{props.state.productosReducer.dataTipoProducto[item.key_tipo_producto].nombrre}</Text>

                            </View>
                        </View>
                    )}
                    numColumns={1}
                    keyExtractor={(index) => index.toString()}
                />
            </View>
        </ScrollView>
    )
}
const initState = (state) => {
    return { state }
}
const initActions = ({
    ...popupActions,
    ...productoActions
});
export default connect(initState, initActions)(addVenta);

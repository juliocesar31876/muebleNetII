import React from 'react';
import { connect } from 'react-redux';
import { ScrollView, TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import Svg from '../../../Svg';
const DetalleVenta = (props) => {
    return (
        <ScrollView style={{
            flex: 1,
            width: "100%",
        }}>
            <View style={{
                flex: 1,
                alignItems: 'center',
                margin: 5,
            }}>
                {Object.keys(props.state.ventaReducer.dataVentaProducto).map((key) => {
                    var obj = props.state.ventaReducer.dataVentaProducto[key]
                    if (!obj) {
                        return <View />
                    }
                    return (
                        <View style={{
                            width: "90%",
                            alignItems: 'center', justifyContent: 'center',
                            borderColor: "#fff", borderRadius: 10, borderBottomWidth: 2, margin: 5,padding:2
                        }}>
                            <TouchableOpacity
                                onPress={() => props.eliminarProductoVenta(key)}
                                style={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: 100,
                                    position: "absolute",
                                    top: "55%",
                                    right: 10,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                <Svg
                                    name={"cerrar"}
                                    style={{ width: 24, height: 24, fill: "#fff" }}
                                >
                                </Svg>
                            </TouchableOpacity>
                            <View style={styles.vie}>
                                <Text
                                    style={{ color: "#fff", flex: 1, }}>
                                    {obj.producto.toUpperCase()} </Text>
                            </View>
                            <View style={styles.vie}>
                                <Text style={{ color: "#666", flex: 0.6, }}>Precio :</Text>
                                <Text
                                    style={{ color: "#fff", flex: 1, }}>
                                    {obj.precio_venta} Bs</Text>
                            </View>
                            <View style={styles.vie}>
                                <Text style={{ color: "#666", flex: 0.6, }}>Cantidad :</Text>
                                <Text
                                    style={{ color: "#fff", flex: 1, }}>
                                    {obj.cantidad} </Text>
                            </View>
                            <View style={styles.vie}>
                                <Text style={{ color: "#666", flex: 0.6, }}>Total :</Text>
                                <Text
                                    style={{ color: "#fff", flex: 1, }}>
                                    {obj.cantidad * obj.precio_venta} </Text>
                            </View>
                        </View>
                    )
                })}
            </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    vie: {
        flexDirection: 'row', margin: 4,
    },
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
});
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(DetalleVenta);
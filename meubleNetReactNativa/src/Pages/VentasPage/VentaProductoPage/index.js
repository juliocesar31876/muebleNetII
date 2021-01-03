import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Text,
    View,
    StyleSheet,
    ScrollView,
    Image,
    TouchableOpacity,
    TextInput,
} from 'react-native';
import * as usuarioActions from '../../../Actions/usuarioActions';
import * as ventaActions from '../../../Actions/ventaActions';
import * as popupActions from '../../../Actions/popupActions';
import Barra from '../../../Component/Barra';
import myPropsJulio from '../../../nativeSocket/myPropsJulio.json';
import Svg from '../../../Svg';
class VentaProductoPage extends Component {
    static navigationOptions = {
        headerShown: false,
    }
    constructor(props) {
        super(props);
        var url = myPropsJulio.images.urlImage + props.navigation.state.params.producto.key + ".png" + `?tipo=${"producto"}&date=${Date.now()}`
        this.state = {
            titulo: props.navigation.state.params.pagina,
            producto: props.navigation.state.params.producto,
            componet: "Producto",
            url
        }
    }
    agregarVenta = (cant, objProducto) => {

        if (cant === "") {
            alert("ingrese cantidad")
            return <View />
        }
        cant = Number(cant)
        if (cant + "" === "NaN") {
            alert("Contiene simbolo")
            return <View />
        }
        if (cant > objProducto.cantidad) {
            alert("no tiene suficiente  cantidad :" + objProducto.cantidad)
            return <View />
        }
        var data = {
            producto: objProducto.nombre,
            cantidad: cant,
            nombre: objProducto.nombre,
            precio_venta: objProducto.precio_venta,
            precio_produccion: objProducto.totalCosteProduccion,
            key_producto: objProducto.key,
            precio_armador: objProducto.precio_armador,
            encargado_compra: objProducto.encargado_compra,
            descuento: objProducto.descuento,
        }
        this.props.state.ventaReducer.dataVentaProducto[objProducto.key] = data
        this.props.update(this.props.state.ventaReducer.dataVentaProducto, "dataVentaProducto")
        this.props.cerrarPopup()
        this.props.navigation.goBack()
    }
    popupDetalleProducto = () => {
        this.props.abrirPopup(() => {
            var cantidad = ""
            return (
                <View style={{
                    width: "90%",
                    height: "80%",
                    backgroundColor: "#000",
                    borderWidth: 2,
                    borderColor: "#fff",
                    alignItems: 'center',
                    borderRadius: 10,
                }}>
                    <View style={{ flex: 0.5, alignItems: 'center', justifyContent: 'center', }}>
                        <Text style={{ color: "#fff", fontSize: 20, fontWeight: 'bold', }}>Producto : {this.state.producto.nombre}</Text>
                    </View>
                    <ScrollView style={{ flex: 1, width: "100%", }}>
                        <View style={{
                            flex: 1,
                            width: "100%",
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <View style={{ flexDirection: 'row', margin: 10, }}>
                                <Text style={{ color: "#666", flex: 1, }}>Precio :</Text>
                                <Text style={{ color: "#fff", flex: 1, }}>{this.state.producto.precio_venta} bs</Text>
                            </View>
                            <View style={{ flexDirection: 'row', margin: 10, alignItems: 'center', justifyContent: 'center', }}>
                                <Text style={{ color: "#666", flex: 1, }}>Cantidad :</Text>
                                <TextInput
                                    onChangeText={text => { cantidad = text }}
                                    keyboardType="numeric"
                                    style={{ flex: 1, width: 50, height: 40, backgroundColor: "#fff", }} />
                            </View>
                            <View style={{ flexDirection: 'row', margin: 10, alignItems: 'center', justifyContent: 'center', }}>
                                <TouchableOpacity
                                    onPress={() => this.agregarVenta(cantidad, this.state.producto)}
                                    style={{ justifyContent: 'center', alignItems: 'center', flex: 1, height: 40, margin: 10, borderWidth: 2, borderColor: "#fff", borderRadius: 10, }}>
                                    <Text style={{ color: "#fff", }}>Agregar producto</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => this.props.cerrarPopup()}
                                    style={{ justifyContent: 'center', alignItems: 'center', flex: 1, height: 40, margin: 10, borderWidth: 2, borderColor: "#fff", borderRadius: 10, }}>
                                    <Text style={{ color: "#fff", }}>Cancelar producto</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            )
        })
    }


    render() {
        return (
            <View style={{
                backgroundColor: "#000",
                flex: 1,
                alignItems: 'center',
            }}>
                <Barra titulo={this.state.titulo} navigation={this.props.navigation} />
                <ScrollView style={{ flex: 1, width: '100%', }}>
                    <View style={{ flex: 1, alignItems: 'center', marginTop: 30, }}>
                        <View style={{
                            alignItems: 'center',
                            width: 300,
                            height: 300,
                            borderRadius: 10,
                            overflow: "hidden"
                        }} >
                            <Image source={{ uri: this.state.url }} style={{ width: "100%", height: "100%", fill: "#000" }} />
                        </View>
                        <Text style={{ width: '80%', color: '#fff', margin: 10, fontWeight: 'bold', fontSize: 20, textAlign: 'center' }}>{this.state.producto.nombre.toUpperCase()}</Text>
                        <Text style={{ width: '80%', color: '#fff', margin: 10, fontWeight: 'bold', fontSize: 15, }}>Precio Venta : {this.state.producto.precio_venta} Bs</Text>
                        <Text style={{ width: '80%', color: '#fff', margin: 10, fontWeight: 'bold', fontSize: 15, }}>{this.state.producto.descripcion} </Text>
                    </View>

                </ScrollView>
                <TouchableOpacity
                    onPress={() => this.popupDetalleProducto()}
                    style={{ width: 40, height: 40, position: 'absolute', bottom: 10, right: 10, }}>
                    <Text>
                        <Svg name={'add'}
                            style={{
                                width: 50,
                                height: 50,
                                fill: "#fff",
                                margin: 5,
                            }} />
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
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
const initActions = ({
    ...usuarioActions,
    ...popupActions,
    ...ventaActions
});
const initStates = (state) => {
    return { state }
};
export default connect(initStates, initActions)(VentaProductoPage);
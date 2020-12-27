import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Text,
    View,
    StyleSheet,
    ScrollView,
    Image,
} from 'react-native';
import * as usuarioActions from '../../../../Actions/usuarioActions'
import Barra from '../../../../Component/Barra';
import myPropsJulio from '../../../../nativeSocket/myPropsJulio.json'
class VistaProductoPage extends Component {
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
                        <Text style={{ width: '80%', color: '#fff', margin: 10, fontWeight: 'bold', fontSize: 15, }}>Precio Produccion: {this.state.producto.precio_produccion} Bs</Text>
                        <Text style={{ width: '80%', color: '#fff', margin: 10, fontWeight: 'bold', fontSize: 15, }}>{this.state.producto.descripcion} </Text>
                    </View>

                </ScrollView>
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
    ...usuarioActions
});
const initStates = (state) => {
    return { state }
};
export default connect(initStates, initActions)(VistaProductoPage);

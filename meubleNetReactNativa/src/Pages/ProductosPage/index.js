import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Text,
    View,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    ScrollView
} from 'react-native';
import * as usuarioActions from '../../Actions/usuarioActions'
import Barra from '../../Component/Barra';
import VerProductos from './Modelos/VerProductos';
import AddProductos from './Modelos/AddProductos';
import AddTIpoProduto from './Modelos/AddTIpoProduto';
class ProductosPage extends Component {
    static navigationOptions = {
        headerShown: false,
    }
    constructor(props) {
        super(props);
        this.state = {
            titulo: props.navigation.state.params.pagina,
            componet: "Agregar productos"
        }
    }

    selectComponet() {
        switch (this.state.componet) {
            case "Ver productos":
                return <VerProductos navigation={this.props.navigation}/>
            case "Agregar productos":
                return <AddProductos />
            case "Agregar Tipo Produto":
                return <AddTIpoProduto />
            default:
                return <View />
        }
    }
    select(text) {
        this.state.componet = text
        this.setState({ ...this.state })
    }
    barraMenu() {

        return (

            <View style={{
                width: "100%",
                height: 50,
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'center',
            }}>

                {["Agregar productos", "Agregar Tipo Produto", "Ver productos"].map((text) => {
                    var color="#fff"
                    if (this.state.componet===text) {
                        color="#666"
                    }
                    return (
                        <TouchableOpacity
                            onPress={() => {
                                this.select(text)
                            }}
                            style={{
                                flex: 1,
                                height: "90%",
                                margin: 5,
                                borderWidth: 1,
                                borderRadius: 10,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderColor: color,
                            }}>
                            <Text style={{
                                color: color,
                                fontSize: 8,
                                textAlign: "center",
                                fontWeight: 'bold',
                            }}>{text}</Text>
                        </TouchableOpacity>
                    )


                })
                }
            </View>
        )
    }
    render() {

        return (
            <View style={{
                backgroundColor: "#000",
                flex: 1,
                alignItems: 'center',

            }}>
                <Barra titulo={this.state.titulo} navigation={this.props.navigation} />
                {this.selectComponet()}
                {this.barraMenu()}
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
export default connect(initStates, initActions)(ProductosPage);

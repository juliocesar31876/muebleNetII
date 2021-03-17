import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Text,
    View,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    ScrollView,
    BackHandler,
    Dimensions
} from 'react-native';
import * as usuarioActions from '../../Actions/usuarioActions'
import * as popupActions from '../../Actions/popupActions'
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
        ////back handler
        props.state.paginaReducer.paginaAnterior = props.state.paginaReducer.paginaActual
        props.state.paginaReducer.paginaActual = props.navigation.state.routeName
        props.navigation["paginaAnterior"] = props.state.paginaReducer.paginaAnterior
        props.state.paginaReducer.objNavigation[props.navigation.state.routeName] = props.navigation
        ////
        this.state = {
            titulo: props.navigation.state.params.pagina,
            componet: "Agregar productos"
        }
    }

    selectComponet() {
        switch (this.state.componet) {
            case "Ver productos":
                return <VerProductos navigation={this.props.navigation} />
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
                height: 80,
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'center',
            }}>

                {["Agregar productos", "Agregar Tipo Produto", "Ver productos"].map((text) => {
                    var color = "#fff"
                    if (this.state.componet === text) {
                        color = "#666"
                    }
                    return (
                        <TouchableOpacity
                            onPress={() => {
                                this.select(text)
                            }}
                            style={{
                                flex: 1,
                                height: 50,
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
                width: Dimensions.get("window").width,
                height: Dimensions.get("window").height,
                alignItems: 'center',
            }}>
                <View style={{ flex: 1, width: "100%", alignItems: 'center', }}>
                    <Barra titulo={this.state.titulo} navigation={this.props.navigation} />
                    {this.selectComponet()}
                </View>
                <View style={{ flex: 0.18, }}>
                    {this.barraMenu()}
                </View>
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
    ...popupActions
});
const initStates = (state) => {
    return { state }
};
export default connect(initStates, initActions)(ProductosPage);

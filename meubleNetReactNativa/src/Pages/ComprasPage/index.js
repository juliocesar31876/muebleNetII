import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
import Barra from '../../Component/Barra';
import AddCompras from './AddCompras';
import VerCompras from './VerCompras';
class ComprasPage extends Component {
    static navigationOptions = {
        headerShown: false,
    }
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            index: 0,
            componet: "Agregar compras",
            titulo: "Compras"
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
                {[ "Agregar compras","Ver compras",].map((text) => {
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
                                flex: 0.3,
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
    selectComponet() {
        switch (this.state.componet) {
            case "Agregar compras":
                return <AddCompras />
            case "Ver compras":
                return <VerCompras />
            default:
                return <View />
        }
    }
    render() {
        return (
            <View
                style={{
                    flex: 1,
                    width: "100%",
                    alignItems: 'center',
                    backgroundColor: "#000",
                }}>
                <Barra titulo={this.state.titulo} navigation={this.props.navigation} />
                {this.selectComponet()}
                {this.barraMenu()}
            </View>
        );
    }
};
const initStates = (state) => {
    return { state }
};

export default connect(initStates)(ComprasPage);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import Barra from '../../Component/Barra';
import AddAreaTrajo from './Modelo/AddAreaTrajo';
import VerAreaTrabajo from './Modelo/VerAreaTrabajo';
class AreaTrabajoPage extends Component {
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
            isOpen: false,
            index: 0,
            componet: "Agregar area trabajo",
            titulo: "Area trabajo"
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
                {[ "Agregar area trabajo","Ver area trabajo",].map((text) => {
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
            case "Agregar area trabajo":
                return <AddAreaTrajo />
            case "Ver area trabajo":
                return <VerAreaTrabajo />
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

export default connect(initStates)(AreaTrabajoPage);

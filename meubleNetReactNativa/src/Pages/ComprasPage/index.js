import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Text,
    View,
    TouchableOpacity,
    BackHandler,
} from 'react-native';
import Barra from '../../Component/Barra';
import AddCompras from './AddCompras';
class ComprasPage extends Component {
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
            componet: "Ver compras",
            titulo: "Compras"
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
                <AddCompras params={this.props.navigation.state.params}  navigation={this.props.navigation}/>
            </View>
        );
    }
};
const initStates = (state) => {
    return { state }
};

export default connect(initStates)(ComprasPage);

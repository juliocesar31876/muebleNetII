import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Barra from '../../../Component/Barra';
class VentaCompraPage extends Component {
    static navigationOptions = {
        headerShown: false,
    }
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: "#000", }}>
                <Barra titulo={"Venta Compras"} navigation={this.props.navigation} />
                <View style={{ flex: 1, }}>

                </View>
                
            </View>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(VentaCompraPage);

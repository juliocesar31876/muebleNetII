import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import Barra from '../../../Component/Barra';
class VentaComprasPage extends Component {
    static navigationOptions = {
        headerShown: false,
    }
    constructor(props) {
        super(props);
        var venta = props.navigation.state.params.venta
        var ventascompras = []

        if (venta.ventascompras !== null) {
            ventascompras = venta.ventascompras
        }
        this.state = {
            venta,
            ventascompras
        };
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: "#000", }}>
                <Barra titulo={"Venta Compras"} navigation={this.props.navigation} />
                <View style={{ flex: 1, width: "100%", }}>
                    <Text style={{ fontWeight: 'bold', color: '#999', margin: 5, textAlign: 'center', fontSize: 18 }}
                    >Cargo de compras</Text>
                    <Text style={{ fontWeight: 'bold', color: '#999', margin: 5, textAlign: 'left', fontSize: 13 }}
                    >Total de compras realizados : {this.state.venta.totalCompras} Bs</Text>
                    <Text style={{ fontWeight: 'bold', color: '#999', margin: 5, textAlign: 'left', fontSize: 13 }}
                    >Saldo de compras : {(this.state.venta.totalMonto - this.state.venta.totalCompras)} Bs</Text>
                    {this.state.venta.venta_cargo_compra.map((objVentaCargo) => {

                        return (
                            <View style={{ width: '100%', borderBottomWidth: 1, borderColor: "#fff", marginTop: 5, }}>
                                <Text
                                    style={{ color: '#fff', margin: 2, fontSize: 12, margin: 5, }}
                                >Persona  : {objVentaCargo.persona.nombre.toUpperCase() + " " + objVentaCargo.persona.paterno.toUpperCase()} </Text>
                                <Text
                                    style={{ color: '#fff', margin: 2, fontSize: 12, margin: 5, }}
                                >Monto dado : {objVentaCargo.monto} Bs</Text>

                            </View>
                        )

                    })
                    }
                </View>
                <View style={{ flex: 1, width: '100%', }}>
                    <ScrollView>
                        {this.state.ventascompras.map((objVentaCargo) => {
                            return (
                                <View style={{ width: '100%', borderBottomWidth: 1, borderColor: "#fff", marginTop: 5, }}>
                                    <Text
                                        style={{ color: '#fff', margin: 2, fontSize: 12, margin: 5, }}
                                    >Persona   </Text>

                                </View>
                            )
                        })
                        }

                    </ScrollView>
                </View>
            </View>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(VentaComprasPage);


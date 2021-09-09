import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { connect } from 'react-redux';
import Barra from '../../../Component/Barra';
class VerificarCosteProduccionPage extends Component {
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
        var totalCoste = 0
        var costeproduccion=[]
        if (props.navigation.state.params.costeproduccion !== undefined &&props.navigation.state.params.costeproduccion !== null) {
            props.navigation.state.params.costeproduccion.map((objCosteProduccion, key) => {
                totalCoste = totalCoste + (objCosteProduccion.precio * objCosteProduccion.cantidad)
            })
            costeproduccion=props.navigation.state.params.costeproduccion
        }


        this.state = {
            nombre: props.navigation.state.params.nombre,
            totalCoste,
            costeproduccion
        };
    }

    render() {
        if (this.props.state.ventaReducer.estado === "exito" && this.props.state.ventaReducer.type === "addVentaTrabajo") {
            this.props.state.ventaReducer.estado = ""
            this.props.navigation.goBack()
            return <View />
        }
        return (
            <View style={{ flex: 1, backgroundColor: "#000", alignItems: 'center', }}>
                <Barra titulo={"Coste de produccion"} navigation={this.props.navigation} />
                <ScrollView style={{ flex: 1, width: "90%", }}>
                    <View style={{ flex: 1, alignItems: 'center', }}>

                        <Text style={{ fontWeight: 'bold', color: '#999', margin: 5, textAlign: 'center', fontSize: 18 }}>{this.state.nombre.toUpperCase()}</Text>
                        <Text style={{ fontWeight: 'bold', color: '#999', margin: 5, textAlign: 'center', fontSize: 18 }}>Coste Produccion Rellenar</Text>
                        <Text style={{ fontWeight: 'bold', color: '#999', margin: 5, width: '100%', fontSize: 18 }}> Total coste Produccion  : {this.state.totalCoste} bs</Text>

                        <View style={{ width: '100%', height: 40, flexDirection: 'row', }}>
                            <Text style={{
                                fontWeight: 'bold', color: '#999',
                                margin: 5, textAlign: 'center', fontSize: 18, flex: 0.6,
                            }}>Detalle</Text>
                            <Text style={{
                                fontWeight: 'bold', color: '#999', margin: 5,
                                textAlign: 'center', fontSize: 13, flex: 0.2,
                            }}>precio/u</Text>
                            <Text style={{
                                fontWeight: 'bold', color: '#999', margin: 5,
                                textAlign: 'center', fontSize: 13, flex: 0.2,
                            }}>Cantidad</Text>
                            <Text style={{
                                fontWeight: 'bold', color: '#999', margin: 5,
                                textAlign: 'center', fontSize: 13, flex: 0.2,
                            }}>Total</Text>

                        </View>

                        {this.state.costeproduccion.map((objCosteProduccion, key) => {
                            var numero = (key + 1)
                            return (
                                <View style={{
                                    margin: 10, width: "100%", flexDirection: 'row', borderBottomWidth: 1, height: 50,
                                    justifyContent: 'center', borderColor: "#666", alignItems: 'center',
                                }}>
                                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
                                        <Text style={{ color: '#fff', margin: 2, fontSize: 13, flex: 0.7 }}>{numero}.-   {objCosteProduccion.detalle.toUpperCase()}</Text>
                                        <TextInput style={{ backgroundColor: "#fff", margin: 2, fontSize: 13, flex: 0.2, borderRadius: 10, height: 40, }}
                                            keyboardType="numeric" placeholder={(objCosteProduccion.precio + " bs")}

                                        />
                                        <Text style={{ color: '#fff', margin: 2, fontSize: 13, flex: 0.2, }}>{objCosteProduccion.cantidad} cant   </Text>
                                        <Text style={{ color: '#fff', margin: 2, fontSize: 13, flex: 0.2, }}>{(objCosteProduccion.precio * objCosteProduccion.cantidad)} Bs   </Text>
                                    </View>
                                </View>
                            )
                        })}

                    </View>
                </ScrollView>

            </View>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(VerificarCosteProduccionPage);
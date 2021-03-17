import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    AsyncStorage,
    ScrollView,
    FlatList,
    ActivityIndicator
} from 'react-native';
import Barra from '../../../Component/Barra';
import * as personaActions from '../../../Actions/personaActions'

class ListaPagosPage extends Component {
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
        var area = props.navigation.state.params.area


        this.state = {
            titulo: "Lista pagos",
            area
        }
    }
    modeloLista() {
        if (this.props.state.personaReducer.estado === "cargando"
            && this.props.state.personaReducer.type === "getPagoAreaPendiente") {
            return <ActivityIndicator size="small" color="#fff" />
        }
        if (!this.props.state.personaReducer.dataPagoAreaPendiente) {
            this.props.getPagoAreaPendiente(this.props.state.socketReducer.socket, {
                area: this.state.area
            })
        }
        return (
            <ScrollView style={{ flex: 1, width: '90%', marginTop: 20, }}>
                {Object.keys(this.props.state.personaReducer.dataPagoAreaPendiente).map((key) => {
                    var obj = this.props.state.personaReducer.dataPagoAreaPendiente[key]

                    console.log(obj);
                    return (
                        <View style={{ width: '100%', height: 60, flexDirection: 'row', borderBottomWidth: 1, borderColor: '#fff', }}>
                            <View style={{ flex: 1, }}>
                                <Text style={{
                                    color: "#fff",
                                    fontSize: 13,
                                    fontWeight: 'bold',
                                }}>
                                    Nombre :
                </Text>
                            </View>
                            <View style={{ flex: 1, }}>

                            </View>
                        </View>


                    )



                })}




            </ScrollView>
        )


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
                <Text style={{
                    color: "#fff",
                    fontSize: 20,
                    fontWeight: 'bold',
                }}>
                    Pagos pendiente
                </Text>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', width: '100%', }}>

                    {this.modeloLista()}

                </View>
            </View>
        );
    }
};

const initStates = (state) => {
    return { state }
};
const initActions = ({
    ...personaActions,
});

export default connect(initStates, initActions)(ListaPagosPage);

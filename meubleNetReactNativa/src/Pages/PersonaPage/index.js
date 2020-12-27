import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
} from 'react-native';
import Svg from '../../Svg';
import * as usuarioActions from '../../Actions/usuarioActions'
import Barra from '../../Component/Barra';
import AddPersona from './AddPersona';
import VerPersona from './VerPersona';
import PagosSalario from './PagosSalario';
import VerPagosSalario from './VerPagosSalario';
import TrabajoEmpleado from './TrabajoEmpleado';
import VerTrabajo from './VerTrabajo';
class PersonaPage extends Component {
    static navigationOptions = {
        headerShown: false,
    }
    constructor(props) {
        super(props);
        this.state = {
            titulo: props.navigation.state.params.pagina,
            componet: "Agregar personales"
        }
    }
    selectComponet() {
        switch (this.state.componet) {
            case "Agregar personales":
                return <AddPersona />
            case "Ver personales":
                return <VerPersona />
            case "Agrega pagos salario":
                return <PagosSalario />
            case "Ver pagos salario":
                return <VerPagosSalario />
            case "Trabajos":
                return <TrabajoEmpleado />
            case "Ver trabajos":
                return <VerTrabajo />
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
                height: 60,
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'center',
                backgroundColor: "#000",
            }}>
                <ScrollView horizontal={true}  >
                    {["Agregar personales","Trabajos", "Ver personales",].map((text) => {
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
                                    width: 120,
                                    borderWidth: 1,
                                    borderRadius: 10,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderColor: color,
                                }}>
                                <Text style={{
                                    color: color,
                                    fontSize: 9,
                                    textAlign: "center",
                                    fontWeight: 'bold',
                                }}>{text}</Text>
                            </TouchableOpacity>
                        )
                    })
                    }
                </ScrollView>

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
export default connect(initStates, initActions)(PersonaPage);

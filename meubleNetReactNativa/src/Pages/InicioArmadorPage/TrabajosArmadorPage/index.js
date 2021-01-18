import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    FlatList,
    Image,
    TouchableHighlight
} from 'react-native';
import Barra from '../../../Component/Barra';
import Svg from '../../../Svg';
import myPropsJulio from '../../../nativeSocket/myPropsServer.json';
import * as personaActions from '../../../Actions/personaActions'
import Swipeable from 'react-native-swipeable';
import moment from 'moment';

class TrabajosArmadorPage extends Component {
    static navigationOptions = {
        headerShown: false,
    }
    constructor(props) {
        super(props);
        arrayMenu = []
        arrayMenu = ["trabajos", "salario"];


        var usuarioPersona = props.state.usuarioReducer.usuarioLog.persona
        this.state = {
            titulo: "Trabajo armador  ",
            menu: arrayMenu,
            usuarioPersona,
        }
    }
    terminarTrabajo(obj) {
        var fecha = moment()
            .format('YYYY-MM-DD');
        var hora = moment()
            .format('HH:mm:ss');
        var fecha_on = fecha + "T" + hora
        this.props.terminarTrabajoPendiente(this.props.state.socketReducer.socket, {
            key_trabajo_producto: obj.key,
            fecha_on,
            trabajo_precio: obj.trabajo_precio,
            encargado_compra_pago: obj.encargado_compra_pago,
            nombre_producto: obj.nombre,
            key_persona_trabajo: obj.key_persona_trabajo,
            key_persona_compra: obj.key_persona_compra
        })
        return <View />
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
                    fontSize: 30,
                    fontWeight: 'bold',
                    margin: 10,
                }}>
                    Trabajos pendiente
                    </Text>
                <ScrollView style={{ flex: 1, width: '100%', }}>

                    <View style={{ flex: 1, alignItems: 'center', width: '100%', }}>

                        {Object.keys(this.props.state.personaReducer.dataTrabajoPersonaPendiente).map((key) => {
                            var obj = this.props.state.personaReducer.dataTrabajoPersonaPendiente[key]
                            console.log(obj);
                            var url = myPropsJulio.images.urlImage + obj.key_producto + ".png" + `?tipo=${"producto"}&date=${Date.now()}`
                            /*        var fecha = obj.fecha_entrega.split("T")[0]
                                   var fechas = moment(fecha, "YYYY-MM-DD").format("dddd DD  MMMM"); */

                            return (
                                <Swipeable rightButtons={
                                    [

                                        <TouchableHighlight style={{
                                            width: '100%',
                                            marginTop: 15,
                                            height: 60,
                                            justifyContent: 'center',
                                        }}>
                                            <TouchableOpacity
                                                onPress={() => this.terminarTrabajo(obj)}
                                                style={{
                                                    flex: 1,
                                                    justifyContent: 'center',
                                                    width: '100%',
                                                }}>
                                                <Svg name={"terminarmueble"}
                                                    style={{
                                                        width: 35,
                                                        height: 35,
                                                        fill: "#fff",
                                                        margin: 5,
                                                    }} />
                                                <Text style={{
                                                    color: "#fff",
                                                    fontSize: 10,
                                                    marginLeft: 1,
                                                    fontWeight: 'bold',
                                                }}>
                                                    Finalizar
                                                </Text>
                                            </TouchableOpacity>
                                        </TouchableHighlight>
                                    ]
                                }>
                                    <View
                                        style={{ margin: 10, flexDirection: 'row', width: '95%', height: 80, borderColor: "#fff", }}>
                                        <View style={{ margin: 2, flex: 0.3, borderRadius: 10, overflow: 'hidden', }}>
                                            <Image source={{ uri: url }} style={{ width: "100%", height: "100%", fill: "#000" }} />

                                        </View>
                                        <View style={{ flex: 0.7, margin: 5, justifyContent: 'center', flexDirection: 'column', }}>
                                            <Text style={{
                                                color: "#fff",
                                                fontSize: 16,
                                                fontWeight: 'bold',
                                            }}>
                                                {obj.nombre.toUpperCase()}
                                            </Text>
                                            <Text style={{
                                                color: "#fff",
                                                fontSize: 12,
                                                margin: 2,
                                                fontWeight: 'bold',
                                            }}>
                                                Pendiente
                    </Text>
                                            {/* <Text style={{
                                                color: "#fff",
                                                fontSize: 11,
                                                margin: 2,
                                                fontWeight: 'bold',
                                            }}>
                                                ENTREGA : {fechas.toUpperCase()}
                                            </Text> */}
                                        </View>
                                        <View style={{ margin: 2, flex: 0.3, alignItems: 'center', justifyContent: 'center', }}>
                                            <View style={{
                                                borderRadius: 100,
                                            }}>
                                                <Text style={{
                                                    color: "#999",
                                                    fontSize: 12,
                                                    margin: 2,
                                                    fontWeight: 'bold',
                                                }}>
                                                    {"<----"} Deslizar
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                </Swipeable>

                            )

                        })}

                    </View>
                </ScrollView>

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
export default connect(initStates, initActions)(TrabajosArmadorPage);

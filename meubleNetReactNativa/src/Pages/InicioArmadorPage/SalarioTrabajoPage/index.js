import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    TextInput,
    Dimensions,
} from 'react-native';
import Barra from '../../../Component/Barra';
import * as popupActions from '../../../Actions/popupActions'
import * as personaActions from '../../../Actions/personaActions'
import * as trabajoActions from '../../../Actions/trabajoActions'
import * as popupCalendarioActions from '../../../Actions/popupCalendarioActions'
import moment from 'moment';
import SwipeableViews from 'react-swipeable-views-native';
import Estado from '../../../Component/Estado';
import Svg from '../../../Svg';

class SalarioTrabajoPage extends Component {
    static navigationOptions = {
        headerShown: false,
    }
    constructor(props) {
        super(props);
        var usuarioPersona = props.state.usuarioReducer.usuarioLog.persona
        var dataPagoSalarioPersona = {
            dataPago: {}
        }
        var saldoPendiente = 0
        var saldoDebiendo = 0
        var haber = 0
        var debe = 0
        var personaLibro = {}
        if (props.navigation.state.params.pagina === "PagoSalarioPage") {
            personaLibro = props.navigation.state.params.data
            dataPagoSalarioPersona.dataPago = personaLibro.pago_salario
            Object.keys(dataPagoSalarioPersona.dataPago).map((key) => {
                var obj = dataPagoSalarioPersona.dataPago[key]
                haber = haber + obj.haber
                debe = debe + obj.debe
            })

        } else {
            haber = this.props.state.personaReducer.dataPagoSalarioPersona.totalHaber
            debe = this.props.state.personaReducer.dataPagoSalarioPersona.totalDebe
            dataPagoSalarioPersona = this.props.state.personaReducer.dataPagoSalarioPersona
        }

        if (haber > debe) {
            saldoPendiente = (haber - debe)
        } else {
            saldoDebiendo = (debe - haber)

        }
        this.state = {
            titulo: "Salario trabajo",
            usuarioPersona,
            saldoDebiendo,
            saldoPendiente,
            haber,
            dataPagoSalarioPersona,
            debe,
            personaLibro,
            fecha: {
                value: "",
                fechaInicio: false,
                fechaFin: false
            },
        }
    }

    pagosPendiente() {

        return (
            <ScrollView style={{ flex: 1, width: '95%', }}>

                <View style={{ flex: 1, alignItems: 'center', width: '100%', justifyContent: 'center', }}>

                    <View style={{ width: '100%', height: 50, flexDirection: 'row', }}>
                        <View style={{ width: '100%', flex: 1, }}>
                            <Text style={{
                                color: "#fff",
                                fontSize: 14,
                                textAlign: 'left',
                                margin: 2,
                                fontWeight: 'bold',
                            }}>
                                Total ingreso :  {this.state.debe} Bs
                        </Text>
                            <Text style={{
                                color: "#fff",
                                fontSize: 14,
                                textAlign: 'left',
                                margin: 2,
                                fontWeight: 'bold',
                            }}>
                                Total egreso : {this.state.haber} Bs
                        </Text>

                        </View>
                        <View style={{ width: '100%', flex: 1, }}>
                            <Text style={{
                                color: "#fff",
                                fontSize: 14,
                                textAlign: 'left',
                                margin: 2,
                                fontWeight: 'bold',
                            }}>
                                Saldo pendiente :  {this.state.saldoPendiente} Bs
                        </Text>


                        </View>
                    </View>

                    <View style={{
                        width: '100%',
                        borderBottomWidth: 4,
                        borderColor: '#999',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <Text style={{
                            color: "#fff",
                            fontSize: 14,
                            margin: 2,
                            fontWeight: 'bold',
                            flex: 0.2,
                        }}>
                            Fecha
                        </Text>
                        <Text style={{
                            color: "#fff",
                            fontSize: 14,
                            flex: 0.6,
                            margin: 2,
                            fontWeight: 'bold',
                        }}>
                            Descripcion
                        </Text>
                        <Text style={{
                            textAlign: 'left',
                            color: "#fff",
                            fontSize: 12,
                            flex: 0.1,
                            fontWeight: 'bold',
                        }}>
                            Debe
                        </Text>
                        <Text style={{
                            color: "#fff",
                            fontSize: 12,
                            flex: 0.1,
                            textAlign: 'left',
                            fontWeight: 'bold',
                        }}>
                            Haber
                        </Text>
                    </View>

                    {Object.keys(this.state.dataPagoSalarioPersona.dataPago).map((key) => {
                        var obj = this.state.dataPagoSalarioPersona.dataPago[key]
                        var fecha = obj.fecha_on.split("T")[0]
                        var hora = obj.fecha_on.split("T")[1]
                        var fechas = moment(fecha, "YYYY-MM-DD").format("DD-MM-YYYY");
                        var color = "#fff"
                        if (!obj.cancelado) {
                            color = "#ff002299"
                        }
                        return (
                            <TouchableOpacity
                                onPress={() => {
                                    if (!obj.cancelado) {
                                        if (this.props.navigation.state.params.admin) {
                                            this.popupAceptacion(obj)
                                        }
                                    }

                                }}
                                style={{
                                    width: '100%',
                                    borderBottomWidth: 1,
                                    borderColor: '#fff',
                                    height: 70,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                <View style={{
                                    width: '100%',
                                    borderColor: '#fff',
                                    height: 50,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                    <Text style={{
                                        color: "#fff",
                                        fontSize: 12,
                                        textAlign: 'center',
                                        margin: 2,
                                        fontWeight: 'bold',
                                        flex: 0.2,
                                    }}>
                                        {fecha}

                                    </Text>
                                    <Text style={{
                                        color: color,
                                        fontSize: 12,
                                        flex: 0.6,
                                        textAlign: 'left',
                                        margin: 2,
                                        fontWeight: 'bold',
                                    }}>
                                        {obj.descripcion}

                                    </Text>
                                    <Text style={{
                                        textAlign: 'center',
                                        color: "#fff",
                                        fontSize: 12,
                                        flex: 0.1,
                                        fontWeight: 'bold',
                                    }}>
                                        {obj.debe} bs
                                </Text>
                                    <Text style={{
                                        color: "#999",
                                        fontSize: 12,
                                        flex: 0.1,
                                        textAlign: 'center',
                                        fontWeight: 'bold',
                                    }}>
                                        {obj.haber} bs
                                </Text>
                                </View>
                                {obj.cancelado ?
                                    (
                                        <Text style={{
                                            color: "green",
                                            fontSize: 15,
                                            textAlign: 'right',
                                            fontWeight: 'bold',
                                        }}>
                                            Cancelado
                                        </Text>
                                    ) : <View />}
                            </TouchableOpacity>

                        )

                    })}

                </View>
            </ScrollView>
        )
    }
    popupAceptacion = (objPago) => {
        var descripcion = "cancelado el " + objPago.descripcion
        var tex = ""
        const aceptarPago = () => {
            /*  if (tex === "") {
                 return <View />
             } */
            var fecha = moment()
                .format('YYYY-MM-DD');
            var hora = moment()
                .format('HH:mm:ss');
            var fecha_on = fecha + "T" + hora
            this.state.saldoPendiente = this.state.saldoPendiente - objPago.haber
            this.setState({ ...this.state })
            this.props.pagoSalarioCancelado(this.props.state.socketReducer.socket, {
                descripcion: descripcion + " " + tex,
                key_pago_salario: objPago.key,
                fecha_on,
                debe: objPago.haber,
                haber: 0,
                cancelado: true,
                nombre: this.state.personaLibro.nombre + " " +
                    this.state.personaLibro.paterno + " " + this.state.personaLibro.materno,
                key_admin: this.state.usuarioPersona.key,
                key_persona: objPago.key_persona,
            })

        }

        this.props.abrirPopup(() => {
            return (
                <View style={{
                    width: 350,
                    height: 200,
                    backgroundColor: "#000",
                    borderWidth: 2,
                    borderColor: '#fff',
                    alignItems: 'center',
                    borderRadius: 10,
                    position: 'absolute',
                    top: '20%',
                }}>

                    <View style={{
                        width: '100%', height: 40,
                        margin: 10,
                        marginTop: 10,
                    }}>
                        <Text style={{
                            color: "#fff",
                            fontSize: 12,
                            marginTop: 10,
                            fontWeight: 'bold',
                            fontWeight: 'bold',
                            textAlign: 'center',
                        }}>
                            Realizar pago a {this.state.personaLibro.nombre + " " + this.state.personaLibro.paterno}
                        </Text>
                        <Text style={{
                            color: "#fff",
                            fontSize: 12,
                            fontWeight: 'bold',
                            fontWeight: 'bold',
                            textAlign: 'center',
                        }}>
                            Pago de {objPago.haber} Bs
                    </Text>

                    </View>
                    {/*   <View style={{
                        width: '100%', height: 40, flexDirection: 'row', margin: 10,
                        marginTop: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <Text style={{
                            color: "#fff",
                            fontSize: 12,
                            fontWeight: 'bold',
                            fontWeight: 'bold',
                            textAlign: 'center',
                            flex: 0.3,
                            margin: 5,
                        }}>
                            Pago en
                    </Text>
                        <TextInput
                            style={{ width: 100, height: 40, borderRadius: 10, backgroundColor: '#fff', }}
                            onChangeText={text => {
                                tex = text
                            }}
                        />
                    </View > */}
                    <View style={{
                        width: '100%', flexDirection: 'row',
                        alignItems: 'center', position: 'absolute', bottom: 0
                    }}>
                        <TouchableOpacity
                            onPress={() => aceptarPago()}
                            style={{
                                flex: 1,
                                margin: 10,
                                height: 40,
                                borderRadius: 8,
                                borderWidth: 3,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderColor: '#fff',
                            }}>
                            <Text style={{
                                color: "#fff",
                                fontSize: 15,
                                fontWeight: 'bold',
                                fontWeight: 'bold',
                                textAlign: 'center',
                            }}>
                                Aceptar
                    </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.cerrarPopup()}
                            style={{
                                flex: 1,
                                margin: 10,
                                height: 40,
                                borderRadius: 8,
                                borderWidth: 3,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderColor: '#fff',
                            }}>
                            <Text style={{
                                color: "#fff",
                                fontSize: 15,
                                fontWeight: 'bold',
                                fontWeight: 'bold',
                                textAlign: 'center',
                            }}>
                                Cancelar
                    </Text>
                        </TouchableOpacity>
                    </View>
                </View >
            )
        })
    }
    popupCalendario() {
        this.props.abrirPopupCalendario((fechaSelecionada) => {
            this.state.fecha.value = fechaSelecionada.format('MMMM').toUpperCase()
            this.state.fecha.fechaInicio = fechaSelecionada.format('YYYY-MM') + "-01"
            this.state.fecha.fechaFin = moment(this.state.fecha.fechaInicio).subtract(0, 'months').endOf('month').format('YYYY-MM-DD');
            /*   props.getVentaFecha(props.state.socketReducer.socket,
                  {
                      mesDiaInicio: state.fecha.fechaInicio,
                      mesDiaFinal: state.fecha.fechaFin,
                  }); */
            this.setState({ ...this.state })
            this.props.cerrarPopupCalendario()
            return <View />
        }, "mes")
    }
    verMisPagos() {

        return (
            <ScrollView style={{ flex: 1, width: '100%', }}>
                <View style={{ flex: 1, alignItems: 'center', width: '100%', }}>
                    <View style={{ width: '90%', flexDirection: 'row', }}>
                        <Text style={{
                            color: "#fff",
                            fontSize: 15,
                            fontWeight: 'bold',
                            margin: 10,
                            textAlign: 'center',
                            flex: 1,
                        }}>
                            Seleccione mes
                    </Text>
                        <TouchableOpacity
                            onPress={() => this.popupCalendario()}
                            style={{ width: 120, height: 50, borderBottomWidth: 2, borderColor: '#fff', alignItems: 'center', justifyContent: 'center', }}>
                            <Text style={{
                                color: "#fff",
                                fontSize: 13,
                                fontWeight: 'bold',
                                textAlign: 'center',
                            }}>
                                {this.state.fecha.value}
                            </Text>
                        </TouchableOpacity>
                    </View>

                </View>

            </ScrollView>
        )
    }
    render() {
        if (this.props.state.personaReducer.estado === "cargando" && this.props.state.personaReducer.type === "getPagoSalario") {
            return <Estado estado={"cargando"} />
        }
        if (this.props.state.trabajoReducer.estado === "exito" && this.props.state.trabajoReducer.type === "pagoSalarioCancelado") {
            this.props.cerrarPopup()
            this.props.state.trabajoReducer.estado = ""
            this.props.state.trabajoReducer.type = ""
        }
        return (
            <View
                style={{
                    flex: 1,
                    width: Dimensions.get("window").width,
                    height: Dimensions.get("window").height,
                    alignItems: 'center',
                    backgroundColor: "#000",
                }}>
                <Barra titulo={this.state.titulo} navigation={this.props.navigation} />
                <SwipeableViews style={{ flex: 1, width: "100%", }} /* onChangeIndex={this.handleChanges} index={this.state.index} */ >
                    <View style={{
                        flex: 1,
                        width: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }} >
                        <Text style={{
                            color: "#fff",
                            fontSize: 30,
                            fontWeight: 'bold',
                            margin: 10,
                        }}>
                            Control de pagos
                    </Text>
                        {this.pagosPendiente()}


                        <TouchableOpacity
                            onPress={() => {
                                if (this.props.navigation.state.params.pagina !== "PagoSalarioPage") {
                                    this.props.getPagoSalario(this.props.state.socketReducer.socket,
                                        { key_persona: this.props.state.usuarioReducer.usuarioLog.persona.key });
                                }

                            }}
                            style={{ width: 40, height: 40, position: "absolute", top: 4, right: 10 }}>
                            <Svg name={"actualizarVista"}
                                style={{
                                    width: 30,
                                    height: 30,
                                    fill: "#fff",
                                    margin: 5,
                                }} />
                        </TouchableOpacity>
                    </View>

                    {/* <View style={{
                        flex: 1,
                        width: '100%',
                        alignItems: 'center',
                    }}>
                        <Text style={{
                            color: "#fff",
                            fontSize: 30,
                            fontWeight: 'bold',
                            margin: 10,
                        }}>
                            Pagos realizado
                    </Text>
                        {this.verMisPagos()}
                    </View> */}
                </SwipeableViews>
            </View>
        );
    }
};
const initStates = (state) => {
    return { state }
};
const initActions = ({
    ...personaActions,
    ...popupCalendarioActions,
    ...popupActions,
    ...trabajoActions
});
export default connect(initStates, initActions)(SalarioTrabajoPage);

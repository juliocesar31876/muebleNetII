import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    TextInput,
    Dimensions,
    ActivityIndicator,
    BackHandler,
} from 'react-native';
import Barra from '../../Component/Barra';
import * as popupActions from '../../Actions/popupActions'
import * as personaActions from '../../Actions/personaActions'
import * as trabajoActions from '../../Actions/trabajoActions'
import * as popupCalendarioActions from '../../Actions/popupCalendarioActions'
import moment from 'moment';
import SwipeableViews from 'react-swipeable-views-native';
import Estado from '../../Component/Estado';
import Svg from '../../Svg';

class SalarioTrabajoPage extends Component {
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
        var usuarioPersona = props.state.usuarioReducer.usuarioLog.persona
        var dataPagoSalarioPersona = {
            dataPago: {}
        }
        var saldoPendiente = 0
        var saldoDebiendo = 0
        var haber = 0
        var debe = 0
        var personaLibro = {}
        var admin = false
        props.state.paginaReducer.data = this.props.navigation.state
        if (props.navigation.state.params.pagina === "PagoSalarioPage") {
            personaLibro = props.navigation.state.params.data
            admin = props.navigation.state.params.admin
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


        this.state = {
            titulo: "Salario trabajo",
            usuarioPersona,
            saldoDebiendo,
            saldoPendiente,
            haber,
            dataPagoSalarioPersona,
            debe,
            dataPagoSalarioFecha: {
                dataPago: {},
            },
            admin,
            personaLibro,
            fecha: {
                haber: 0,
                debe: 0,
                value: "Mes",
                fechaInicio: false,
                fechaFin: false
            },
        }
    }

    pagosPendiente() {
        return (
            <View style={{ flex: 1, alignItems: 'center', width: '100%', justifyContent: 'center', }}>
                <View style={{ width: '100%', height: 50, flexDirection: 'row', borderColor: "#999", }}>
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
                            Saldo  :  {(this.state.debe - this.state.haber)} Bs
                        </Text>
                        {!this.state.admin ? (<View />) : (
                            <TouchableOpacity
                                onPress={() => {
                                    var getSalarioPersona = {}
                                    if (Object.keys(this.state.personaLibro).length > 1) {
                                        getSalarioPersona = this.state.personaLibro

                                    }
                                    this.props.navigation.navigate("AddSaldoCompradorPage",

                                        {
                                            persona: this.state.usuarioPersona,
                                            nuevo: false,
                                            admin: this.state.admin,
                                            ingrego: true,
                                            finalizo: false,
                                            getSalarioPersona
                                        })
                                }}


                                style={{ width: 40, height: 40,}}>
                                <Svg name={"add"}
                                    style={{
                                        width: 30,
                                        height: 30,
                                        fill: "#fff",
                                        margin: 5,
                                    }} />
                            </TouchableOpacity>
                        )}

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
                <ScrollView style={{ flex: 1, width: '98%', marginBottom: 30, }}>

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
                                        color: "#999",
                                        fontSize: 10,
                                        textAlign: 'left',
                                        fontWeight: 'bold',
                                        flex: 0.17,
                                    }}>
                                        {fecha}

                                    </Text>
                                    <Text style={{
                                        color: color,
                                        fontSize: 12,
                                        flex: 0.63,
                                        textAlign: 'center',
                                        fontWeight: 'bold',
                                        margin: 5,
                                    }}>
                                        -. {obj.descripcion}

                                    </Text>
                                    <View style={{ flex: 0.25, alignItems: 'center', justifyContent: 'center', }}>
                                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>
                                            <Text style={{
                                                textAlign: 'center',
                                                color: "#fff",
                                                flex: 1,
                                                fontSize: 10,
                                                fontWeight: 'bold',
                                            }}>
                                                {obj.debe} bs
</Text>
                                            <Text style={{
                                                flex: 1,
                                                color: "#999",
                                                fontSize: 10,
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
                                                    fontSize: 10,
                                                    marginBottom: 10,
                                                    textAlign: 'right',
                                                    fontWeight: 'bold',
                                                }}>
                                                    Cancelado
                                                </Text>
                                            ) : <View />}
                                    </View>
                                </View>



                            </TouchableOpacity>

                        )

                    })}
                </ScrollView>
            </View>
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
                    <View style={{
                        width: '100%', flexDirection: 'row',
                        alignItems: 'center', position: 'absolute', bottom: 0
                    }}>


                        {this.props.state.trabajoReducer.estado === "cargando" && this.props.state.trabajoReducer.type === "pagoSalarioCancelado" ? (
                            <TouchableOpacity
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
                                <ActivityIndicator size="small" color="#fff" />
                            </TouchableOpacity>
                        ) : (
                                <TouchableOpacity
                                    onPress={() => {
                                        aceptarPago()
                                    }

                                    }
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
                            )
                        }

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
    popupCalendario = () => {
        this.props.abrirPopupCalendario((fechaSelecionada) => {
            this.state.fecha.value = fechaSelecionada.format('MMMM').toUpperCase()
            this.state.fecha.fechaInicio = fechaSelecionada.format('YYYY-MM') + "-01"
            var mes = Number(fechaSelecionada.format('MM'))
            var anos = Number(fechaSelecionada.format('YYYY'))
            this.state.fecha.fechaFin = moment(this.state.fecha.fechaInicio).subtract(0, 'months').endOf('month').format('YYYY-MM-DD');
            var admin = true
            var key_persona = this.state.usuarioPersona.key
            if (Object.keys(this.state.personaLibro).length > 0) {
                admin = false
                key_persona = this.state.personaLibro.key
            }
            this.props.getSalarioFecha(this.props.state.socketReducer.socket,
                {
                    mes,
                    anos,
                    key_persona,
                    mesDiaInicio: this.state.fecha.fechaInicio,
                    mesDiaFinal: this.state.fecha.fechaFin,
                });
            this.setState({ ...this.state })
            this.props.cerrarPopupCalendario()
            return <View />
        }, "mes")
        return <View />
    }
    modeloGetSalarioFecha() {

        return (
            <View style={{ flex: 1, alignItems: 'center', width: '100%', justifyContent: 'center', }}>
                <ScrollView style={{ flex: 1, width: '100%', marginBottom: 30, }}>
                    {Object.keys(this.state.dataPagoSalarioFecha.dataPago).map((key) => {
                        var obj = this.state.dataPagoSalarioFecha.dataPago[key]
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
                                        color: "#999",
                                        fontSize: 10,
                                        textAlign: 'left',
                                        fontWeight: 'bold',
                                        flex: 0.17,
                                    }}>
                                        {fecha}

                                    </Text>
                                    <Text style={{
                                        color: color,
                                        fontSize: 12,
                                        flex: 0.63,
                                        textAlign: 'center',
                                        fontWeight: 'bold',
                                        margin: 5,
                                    }}>
                                        -. {obj.descripcion}

                                    </Text>
                                    <View style={{ flex: 0.25, alignItems: 'center', justifyContent: 'center', }}>
                                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>
                                            <Text style={{
                                                textAlign: 'center',
                                                color: "#fff",
                                                flex: 1,
                                                fontSize: 10,
                                                fontWeight: 'bold',
                                            }}>
                                                {obj.debe} bs
</Text>
                                            <Text style={{
                                                flex: 1,
                                                color: "#999",
                                                fontSize: 10,
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
                                                    fontSize: 12,
                                                    marginBottom: 10,
                                                    textAlign: 'right',
                                                    fontWeight: 'bold',
                                                }}>
                                                    Cancelado
                                                </Text>
                                            ) : <View />}
                                    </View>
                                </View>

                            </TouchableOpacity>

                        )

                    })}
                </ScrollView>

            </View>
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
        if (this.props.state.trabajoReducer.estado === "exito" && this.props.state.trabajoReducer.type === "getSalarioFecha") {
            this.state.dataPagoSalarioFecha = this.props.state.trabajoReducer.dataPagoSalarioFecha
            this.state.fecha.haber = this.state.dataPagoSalarioFecha.totalHaber
            this.state.fecha.debe = this.state.dataPagoSalarioFecha.totalDebe
            this.props.state.trabajoReducer.estado = ""
            this.setState({ ...this.state })
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


                        <TouchableOpacity
                            onPress={() => {
                                if (this.props.navigation.state.params.pagina !== "PagoSalarioPage") {
                                    this.props.getPagoSalario(
                                        this.props.state.socketReducer.socket,
                                        {
                                            key_persona: this.props.state.usuarioReducer.usuarioLog.persona.key,
                                        });
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


                        {this.pagosPendiente()}
                    </View>
                    <View style={{
                        flex: 1,
                        width: '100%',
                        alignItems: 'center',
                    }} >
                        <Text style={{
                            color: "#fff",
                            fontSize: 30,
                            fontWeight: 'bold',
                            margin: 10,
                        }}>
                            Reporte Pagos
                    </Text>
                        <View style={{ width: '100%', height: 50, flexDirection: 'row', borderColor: "#999", }}>
                            <View style={{ width: '100%', flex: 1, }}>
                                <Text style={{
                                    color: "#fff",
                                    fontSize: 14,
                                    textAlign: 'left',
                                    margin: 2,
                                    fontWeight: 'bold',
                                }}>
                                    Total ingreso :  {this.state.fecha.debe} Bs
                        </Text>
                                <Text style={{
                                    color: "#fff",
                                    fontSize: 14,
                                    textAlign: 'left',
                                    margin: 2,
                                    fontWeight: 'bold',
                                }}>
                                    Total egreso : {this.state.fecha.haber} Bs
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
                                    Saldo  :  {(this.state.fecha.debe - this.state.fecha.haber)} Bs
                        </Text>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.popupCalendario()
                                    }}
                                    style={{ flex: 1, borderColor: "#fff", borderWidth: 2, borderRadius: 10, justifyContent: 'center', alignItems: 'center', }}>

                                    {this.props.state.personaReducer.estado === "cargando" &&
                                        this.props.state.personaReducer.type === "getSalarioFecha" ? (
                                            <Estado estado={"cargando"} />
                                        ) : (
                                            <Text style={{
                                                color: "#fff",
                                                fontSize: 14,
                                                textAlign: 'left',
                                                margin: 2,
                                                fontWeight: 'bold',
                                            }}>
                                                {this.state.fecha.value}
                                            </Text>
                                        )
                                    }
                                </TouchableOpacity>

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
                        <ScrollView style={{ flex: 1, width: '100%', marginBottom: 30, }}>

                            {this.modeloGetSalarioFecha()}
                        </ScrollView>
                    </View>

                </SwipeableViews>
            </View >
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

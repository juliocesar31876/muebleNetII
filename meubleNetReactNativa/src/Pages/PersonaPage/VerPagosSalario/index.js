import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    ScrollView,
    Image,
    TouchableOpacity,
} from 'react-native';
import * as personaActions from '../../../Actions/personaActions'
import * as popupActions from '../../../Actions/popupActions'
import * as areaTrabajoActions from '../../../Actions/areaTrabajoActions'
import * as popupCalendarioActions from '../../../Actions/popupCalendarioActions'
import { connect } from 'react-redux';
import Estado from '../../../Component/Estado';
import myPropsJulio from '../../../nativeSocket/myPropsJulio.json';
import Svg from '../../../Svg';
import moment from 'moment';
const VerPagosSalario = (props) => {
    const [state, setState] = React.useState({
        persona: {
            value: "Todos",
            data: false
        },
        fecha: {
            value: "",
            fechaInicio: false,
            fechaFin: false
        },
    })
    if (!props.state.socketReducer.socket) {
        return <Estado estado={"Reconectando"} />
    }
    if (props.state.personaReducer.estado === "cargando" && props.state.personaReducer.type === "getAllPersona") {
        return <Estado estado={"cargando"} />
    }
    if (!props.state.personaReducer.dataPersonas) {
        props.getAllPersona(props.state.socketReducer.socket);
        return <View />
    }
    if (props.state.personaReducer.estado === "cargando" && props.state.personaReducer.type === "getAllPersona") {
        return <Estado estado={"cargando"} />
    }
    const popupPersona = () => {
        const selecEmpleado = (objEmpleado) => {
            state.persona.value = objEmpleado.nombre + " " + objEmpleado.paterno + " " + objEmpleado.materno + "  CI:" + objEmpleado.ci
            state.persona.data = objEmpleado
            if (!state.fecha.fechaInicio && !state.fecha.fechaFin) {
                setState({ ...state })
                props.cerrarPopup()
                return <View />
            }
            props.getPersonaPago(props.state.socketReducer.socket,
                {
                    key_persona: objEmpleado.key,
                    mesDiaInicio: state.fecha.fechaInicio,
                    mesDiaFinal: state.fecha.fechaFin,
                });
            setState({ ...state })
            props.cerrarPopup()
        }
        props.abrirPopup(() => {
            return (
                <View style={{
                    width: "90%",
                    height: "80%",
                    backgroundColor: "#ffffff99",
                    borderRadius: 10,
                }}>
                    <ScrollView style={{ flex: 1, }}>
                        <View style={{
                            flex: 1,
                            margin: 10,
                            width: "100%",
                            alignItems: 'center',
                        }}>

                            {Object.keys(props.state.personaReducer.dataPersonas).map((key) => {
                                var obj = props.state.personaReducer.dataPersonas[key]
                                return (
                                    <TouchableOpacity
                                        onPress={() => selecEmpleado(obj)}
                                        style={{
                                            margin: 5,
                                            width: "90%",
                                            height: 50,
                                            borderRadius: 10,
                                            borderWidth: 3,
                                            flexDirection: 'row',
                                            borderColor: "#fff",
                                            alignItems: 'center',
                                            backgroundColor: "#000",
                                        }}>
                                        <Text style={{ margin: 4, color: "#666" }}>Empleado :</Text>
                                        <Text style={{ margin: 4, color: "#fff", fontSize: 12, textAlign: "center", flex: 1, }}>{obj.nombre} {obj.materno} </Text>
                                        <Text style={{ margin: 4, color: "#fff", fontSize: 12, textAlign: "center", flex: 1, }}> CI : {obj.ci} </Text>
                                    </TouchableOpacity>
                                )
                            })}
                        </View>
                    </ScrollView>
                </View>)
        })
    }
    const popupCalendario = () => {
        props.abrirPopupCalendario((fechaSelecionada) => {
            state.fecha.value = fechaSelecionada.format('MMMM').toUpperCase()
            state.fecha.fechaInicio = fechaSelecionada.format('YYYY-MM') + "-01"
            state.fecha.fechaFin = moment(state.fecha.fechaInicio).subtract(0, 'months').endOf('month').format('YYYY-MM-DD');
            if (!state.persona.data) {
                setState({ ...state })
                props.cerrarPopupCalendario()
                return <View />
            }
            props.getPersonaPago(props.state.socketReducer.socket,
                {
                    key_persona: state.persona.data.key,
                    mesDiaInicio: state.fecha.fechaInicio,
                    mesDiaFinal: state.fecha.fechaFin,
                });
            setState({ ...state })
            props.cerrarPopupCalendario()
            return <View />
        }, "mes")
        return <View />
    }
    return (
        <View style={{
            flex: 1,
            width: '95%',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <View style={{ width: "90%", alignItems: 'center', justifyContent: 'center', flexDirection: 'row', marginTop: 20, }}>
                <Text style={{ color: "#fff", flex: 0.7, margin: 5, }}>Selecion persona para ver pagos :</Text>
                <TouchableOpacity
                    onPress={() => popupPersona()}
                    style={{ flex: 1, width: 100, height: 50, borderWidth: 2, borderColor: "#fff", borderRadius: 10, alignItems: 'center', justifyContent: 'center', }}>
                    {state.persona.data ? (
                        <Text style={{ color: "#fff", fontSize: 10, }}> {state.persona.value} </Text>
                    ) : (
                            <Svg name={"persona"}
                                style={{
                                    width: 35,
                                    height: 35,
                                    fill: "#fff",
                                    margin: 5,
                                }} />
                        )}
                </TouchableOpacity>
            </View>
            <View style={{ width: "90%", alignItems: 'center', justifyContent: 'center', flexDirection: 'row', marginTop: 20, }}>
                <Text style={{ color: "#fff", flex: 0.7, margin: 5, }}>Mes pago:</Text>
                <TouchableOpacity
                    onPress={() => popupCalendario()}
                    style={{ flex: 1, width: 100, height: 40, borderWidth: 2, borderColor: "#fff", borderRadius: 10, alignItems: 'center', justifyContent: 'center', }}>
                    <Text style={{ color: "#fff", fontSize: 10, }}> {state.fecha.value} </Text>
                </TouchableOpacity>
            </View>
            <View >
                <Text style={{ color: "#fff", margin: 5, }}>Total Pago : {props.state.personaReducer.totalPagosPersona} Bs</Text>
            </View>
            <ScrollView style={{ flex: 1, width: "100%", }}>
                <View style={{ width: "100%", margin: 5, flex: 1, alignItems: 'center', }}>
                    {Object.keys(props.state.personaReducer.dataPagosPersona).map((key) => {
                        var obj = props.state.personaReducer.dataPagosPersona[key]
                        var fecha = moment(obj.fecha_on, "YYYY-MM-DD").format("DD/MM/YYYY");
                        return (
                            <View style={{ width: "90%", alignItems: 'center', flexDirection: 'row', justifyContent: 'center', height: 50, borderWidth: 2, borderColor: "#fff", margin: 5, borderRadius: 10, }}>
                                <Text style={{ color: "#fff", fontSize: 13, flex: 1, margin: 5, textAlign: "center" }}> Fecha :   {fecha} </Text>
                                <Text style={{ color: "#fff", fontSize: 13, flex: 1, margin: 5, textAlign: "center" }}> Efectivo :   {obj.efectivo} Bs </Text>
                            </View>
                        )
                    })}
                </View>
            </ScrollView>
        </View>
    )
};
const styles = StyleSheet.create({
    touc: {
        backgroundColor: '#ffffff',
        color: '#000',
        marginTop: 10,
        borderRadius: 8,
        width: '100%',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
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
const initStates = (state) => {
    return { state }
};
const initActions = ({
    ...personaActions,
    ...areaTrabajoActions,
    ...popupActions, ...popupCalendarioActions
});
export default connect(initStates, initActions)(VerPagosSalario);

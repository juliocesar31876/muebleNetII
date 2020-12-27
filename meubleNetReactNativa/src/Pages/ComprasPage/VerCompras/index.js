import React from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import * as personaActions from '../../../Actions/personaActions'
import * as comprasActions from '../../../Actions/comprasActions'
import * as sucursalActions from '../../../Actions/sucursalActions'
import Estado from '../../../Component/Estado';
import moment from 'moment';
import * as popupCalendarioActions from '../../../Actions/popupCalendarioActions'
const VerCompras = (props) => {
    const [state, setState] = React.useState({
        totalCompras: 0,
        fecha: {
            value: "",
            fechaInicio: false,
            fechaFin: false
        },
    })
    if (!props.state.socketReducer.socket) {
        return <Estado estado={"Reconectando"} />
    }
    const popupCalendario = () => {
        props.abrirPopupCalendario((fechaSelecionada) => {
            /*    state.fecha.value = fechaSelecionada.format('MMMM').toUpperCase()
            var fecha = fechaSelecionada.format('YYYY-MM-DD')
            state.fecha.fechaInicio = moment(fecha).subtract(1, 'months').endOf('month').format('YYYY-MM-DD');
            state.fecha.fechaFin = moment(state.fecha.fechaInicio).subtract(0, 'months').endOf('month').format('YYYY-MM-DD');
            */
            state.fecha.value = fechaSelecionada.format('MMMM').toUpperCase()
            state.fecha.fechaInicio = fechaSelecionada.format('YYYY-MM') + "-01"
            var fecha2 = fechaSelecionada.add(1, 'month')
            state.fecha.fechaFin = moment(fecha2).subtract(0, 'months').format('YYYY-MM') + "-01";
            props.getComprasFecha(props.state.socketReducer.socket,
                {
                    mesDiaInicio: state.fecha.fechaInicio,
                    mesDiaFinal: state.fecha.fechaFin,
                });
            setState({ ...state })
            props.cerrarPopupCalendario()
        }, "mes")
        return <View />
    }
    return (
        <View style={{
            flex: 1,
            width: '100%',
            alignItems: 'center',
        }}>

            <View style={{ width: "90%", alignItems: 'center', justifyContent: 'center', flexDirection: 'row', marginTop: 20, }}>
                <Text style={{ color: "#fff", flex: 0.7, margin: 5, }}>Mes compras  :</Text>
                <TouchableOpacity
                    onPress={() => popupCalendario()}
                    style={{
                        flex: 1, width: 100, height: 40, borderWidth: 2,
                        borderColor: "#fff", borderRadius: 10, alignItems: 'center', justifyContent: 'center',
                    }}>
                    <Text style={{ color: "#fff", fontSize: 10, }}> {state.fecha.value} </Text>
                </TouchableOpacity>
            </View>
            <View style={{ width: "90%", alignItems: 'center', justifyContent: 'center', flexDirection: 'row', marginTop: 20, }}>
                <Text style={{ flex: 5, marginLeft: 5, fontSize: 13, color: "#fff" }}>Total compras  : {props.state.comprasReducer.totalCompras} Bs</Text>
            </View>
            <ScrollView style={{
                flex: 1,
                width: "100%",
                marginTop: 20,
            }}>
                <View style={{
                    flex: 1,
                    width: "100%",
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: "100%",
                }}>
                    {Object.keys(props.state.comprasReducer.dataCompras).map((key) => {
                        var obj = props.state.comprasReducer.dataCompras[key]
                        var persona = props.state.personaReducer.dataPersonas[obj.key_persona]
                        var sucursal = props.state.sucursalReducer.dataSucursal[obj.key_sucursal]
                        var fecha = moment(obj.fecha_compra, "YYYY-MM-DD").format("DD/MM/YYYY");
                        if (obj.key === props.state.usuarioReducer.usuarioLog.persona.key) {
                            return <View />
                        }
                        return (
                            <View style={{
                                margin: 10,
                                width: '80%',
                                padding: 5,
                                borderRadius: 10,
                                borderWidth: 2,
                                borderColor: "#fff",
                                flexDirection: 'row',
                            }}>
                                <View style={{ flex: 1, margin: 2, }}>
                                    <View style={{ flexDirection: 'row', }}>
                                        <Text style={{ flex: 0.8, fontSize: 12, color: "#666" }}>Nombre :</Text>
                                        <Text style={{ flex: 1, marginLeft: 5, fontSize: 12, color: "#fff" }}>{obj.nombre}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', }}>
                                        <Text style={{ flex: 0.8, fontSize: 12, color: "#666" }}>Descripcio :</Text>
                                        <Text style={{ flex: 1, marginLeft: 5, fontSize: 12, color: "#fff" }}>{obj.descripcion}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', }}>
                                        <Text style={{ flex: 0.8, fontSize: 12, color: "#666" }}>Precio unitario :</Text>
                                        <Text style={{ flex: 1, marginLeft: 5, fontSize: 12, color: "#fff" }}>{obj.precio} Bs</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', }}>
                                        <Text style={{ flex: 0.8, fontSize: 12, color: "#666" }}>cantidad :</Text>
                                        <Text style={{ flex: 1, marginLeft: 5, fontSize: 12, color: "#fff" }}>{obj.cantidad} </Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', }}>
                                        <Text style={{ flex: 0.8, fontSize: 12, color: "#666" }}>Persona :</Text>
                                        <Text style={{ flex: 1, marginLeft: 5, fontSize: 12, color: "#fff" }}>{persona.nombre + " " + persona.paterno} </Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', }}>
                                        <Text style={{ flex: 0.8, fontSize: 12, color: "#666" }}>Sucursal :</Text>
                                        <Text style={{ flex: 1, marginLeft: 5, fontSize: 12, color: "#fff" }}>{sucursal.direccion} </Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', }}>
                                        <Text style={{ flex: 0.8, fontSize: 12, color: "#666" }}>fecha :</Text>
                                        <Text style={{ flex: 1, marginLeft: 5, fontSize: 12, color: "#fff" }}>{fecha} </Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', }}>
                                        <Text style={{ flex: 0.8, fontSize: 12, color: "#666" }}>Total :</Text>
                                        <Text style={{ flex: 1, marginLeft: 5, fontSize: 12, color: "#fff" }}>{(obj.precio * obj.cantidad)} Bs </Text>
                                    </View>
                                </View>
                            </View>
                        )
                    })}
                </View>
            </ScrollView>
        </View>
    )
}
const initStates = (state) => {
    return { state }
};
const initActions = ({
    ...comprasActions,
    ...sucursalActions,
    ...personaActions,
    ...popupCalendarioActions
});
export default connect(initStates, initActions)(VerCompras);

import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    ScrollView,
    TouchableOpacity,
    TextInput,
    ActivityIndicator,
} from 'react-native';
import * as productoActions from '../../../Actions/productoActions'
import * as personaActions from '../../../Actions/personaActions'
import * as popupActions from '../../../Actions/popupActions'
import * as popupCalendarioActions from '../../../Actions/popupCalendarioActions'
import * as areaTrabajoActions from '../../../Actions/areaTrabajoActions'
import { connect } from 'react-redux';
import MiCheckBox from '../../../Component/MiCheckBox';
import moment from 'moment';
const initStates = (state) => {
    return { state }
};
const initActions = ({
    ...personaActions,
    ...areaTrabajoActions,
    ...popupActions,
    ...productoActions,
    ...popupCalendarioActions

});
const TrabajoEmpleado = (props) => {
    const [state, setstate] = React.useState({
        cantidad: {
            value: "",
            error: false
        },
        key_persona: {
            value: "Selecione Persona",
            error: false,
            data: false
        },
        key_persona_compra: {
            value: "Selecione Comprador",
            error: false,
            data: false
        },
        key_persona_limpieza: {
            value: "Selecione ",
            error: false,
            data: false
        },
        key_producto: {
            value: "Selecione Producto",
            error: false,
            data: false
        },
        producto_terminado: {
            value: false,
        },
        fecha_entrega: {
            value: "Selecion Fecha",
        },
    })
    if (props.state.personaReducer.estado === "exito" && props.state.personaReducer.type === "addTrabajoEnpleado") {
        props.state.personaReducer.estado = ""
        props.state.personaReducer.type = ""
        state.cantidad.value = ""
        state.key_persona.value = "Selecione Armador"
        state.key_persona.data = false
        state.key_producto.value = "Selecione Producto"
        state.key_producto.data = false
        state.key_persona_compra.value = "Selecione Persona Compra"
        state.key_persona_compra.data = false
        state.key_persona_limpieza.value = "Selecione Producto"
        state.key_persona_limpieza.data = false
        state.cantidad = ""
        state.fecha_entrega = ""
        setstate({ ...state })
    }

    const popupProducto = () => {
        const selecProducto = (objProducto) => {
            state.key_producto.value = objProducto.nombre
            state.key_producto.data = objProducto
            setstate({ ...state })
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

                            {Object.keys(props.state.productosReducer.dataProducto).map((key) => {
                                var obj = props.state.productosReducer.dataProducto[key]
                                var tipo = props.state.productosReducer.dataTipoProducto[obj.key_tipo_producto]
                                return (
                                    <TouchableOpacity
                                        onPress={() => selecProducto(obj)}
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
                                        <Text style={{ margin: 4, color: "#666" }}>Producto :</Text>
                                        <Text style={{ margin: 4, color: "#fff", fontSize: 12, textAlign: "center", flex: 1, }}>{obj.nombre} </Text>
                                        <Text style={{ margin: 4, color: "#fff", fontSize: 12, textAlign: "center", flex: 1, }}> CI : {tipo.nombre} </Text>
                                    </TouchableOpacity>
                                )
                            })}
                        </View>
                    </ScrollView>
                </View>)
        })
    }
    const popupPersona = (id, titulo, area) => {
        const selecEmpleado = (objEmpleado) => {
            state[id].value = objEmpleado.nombre + " " + objEmpleado.paterno + " " + objEmpleado.materno + "  CI:" + objEmpleado.ci
            state[id].data = objEmpleado
            setstate({ ...state })
            props.cerrarPopup()
        }
        props.abrirPopup(() => {
            return (
                <View style={{
                    width: "90%",
                    height: "80%",
                    backgroundColor: "#000",
                    borderWidth: 1,
                    borderColor: "#fff",
                    borderRadius: 10,
                }}>
                    <ScrollView style={{ flex: 1, }}>
                        <View style={{
                            flex: 1,
                            margin: 10,
                            width: "100%",
                            alignItems: 'center',
                        }}>
                            <Text style={{ margin: 4, color: "#fff", fontWeight: 'bold', fontSize: 20, }}>Armador mueble </Text>

                            {Object.keys(props.state.personaReducer.dataPersonas).map((key) => {
                                var obj = props.state.personaReducer.dataPersonas[key]
                                var area_trabajo = props.state.areaTrabajoReducer.dataAreaTrabajo[obj.key_area_trabajo]
                                if (area_trabajo.nombre === area) {
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
                                            <Text style={{ margin: 4, color: "#fff", fontSize: 12, textAlign: "center", flex: 1, }}>{obj.nombre} {obj.materno} </Text>
                                            <Text style={{ margin: 4, color: "#fff", fontSize: 12, textAlign: "center", flex: 1, }}> CI : {obj.ci} </Text>
                                        </TouchableOpacity>
                                    )
                                }
                                return <View />
                            })}
                        </View>
                    </ScrollView>
                </View>)
        })
    }
    const hanlechage = (data) => {
        state[data.id] = {
            value: data.text,
            error: false,
        }
        setstate({ ...state })
    }
    const popupCalendario = () => {
        props.abrirPopupCalendario((fechaSelecionada) => {
            hanlechage({ text: fechaSelecionada, id: "fecha_entrega" })
            props.cerrarPopupCalendario()
            return <View />
        }, "dia", "actual")
        return <View />
    }
    const addTrabajo = () => {
        var exito = true
        if (state.cantidad.value === "") {
            state.cantidad.error = true
            exito = false
        }
        if (!state.key_persona.data) {
            state.key_persona.error = true
            exito = false
        }
        if (!state.key_producto.data) {
            state.key_producto.error = true
            exito = false
        }
        if (!state.fecha_entrega.value === "Selecion Fecha") {
            exito = false
            alert("selecion fecha")
            return <View />
        }
        setstate({ ...state })
        if (exito) {
            var num = Number(state.cantidad.value)
            if (num + "" === "NaN") {
                alert("Contiene simbolo")
                return <View />
            }
            var fecha = moment()
                .format('YYYY-MM-DD');
            var hora = moment()
                .format('HH:mm:ss');
            var fecha_on = fecha + "T" + hora
            var data = {
                datos: {
                    key_persona_trabajo: state.key_persona.data.key,
                    key_persona_compra: state.key_persona_compra.data.key,
                    key_persona_limpieza: state.key_persona_limpieza.data.key,
                    key_sucursal: state.key_persona.data.key_sucursal,
                    nombre: state.key_producto.data.nombre,
                    trabajo_precio: state.key_producto.data.precio_armador,
                    producto_terminado: false,
                    pago_recibido: false,
                    pago_limpieza: state.key_producto.data.pago_limpieza,
                    trabajo_limpieza_realizado: false,
                    pago_compra_recibido: false,
                    compra_realizado: false,
                    fecha_entrega: state.fecha_entrega.value,
                    fecha_on
                },
                cantidad_producto: num
            }
            props.addTrabajoEnpleado(props.state.socketReducer.socket, data)
        }
    }
    return (
        <ScrollView style={{ flex: 1, width: '100%', }}>

            <View style={{
                flex: 1,
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <View style={{ flex: 1, width: '80%', alignItems: 'center', }}>

                    <Text style={{ margin: 4, color: "#fff", fontSize: 25, textAlign: "center", fontWeight: 'bold', }}>Trabajos empleados</Text>
                    <View style={{ width: "100%", flexDirection: 'column', }}>
                        <Text style={{ margin: 4, color: "#fff", fontSize: 15, fontWeight: 'bold', }}>Producto</Text>
                        <TouchableOpacity
                            onPress={() => popupProducto()}
                            style={(state.key_producto.error ? styles.error : styles.touc)}>
                            <Text style={{ fontSize: 13, color: "#666", }}>{state.key_producto.value.toUpperCase()}  </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: "100%", flexDirection: 'column', }}>
                        <Text style={{ margin: 4, color: "#fff", fontSize: 15, fontWeight: 'bold', }}>cantidad</Text>
                        <TextInput
                            keyboardType={"numeric"}
                            onChangeText={text => hanlechage({ text: text, id: "cantidad" })}
                            value={state.cantidad.value}
                            style={(state.cantidad.error ? styles.error : styles.input)} />
                    </View>

                    <View style={{ width: "100%", flexDirection: 'column', }}>
                        <Text style={{ margin: 4, color: "#fff", fontSize: 15, fontWeight: 'bold', }}>Persona</Text>
                        <TouchableOpacity
                            onPress={() => popupPersona("key_persona", "Armadores", "armador mueble")}
                            style={(state.key_persona.error ? styles.error : styles.touc)}>
                            <Text style={{ fontSize: 13, color: "#666", }}>{state.key_persona.value.toUpperCase()}  </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: "100%", flexDirection: 'column', }}>
                        <Text style={{ margin: 4, color: "#fff", fontSize: 15, fontWeight: 'bold', }}>Persona compra</Text>
                        <TouchableOpacity
                            onPress={() => popupPersona("key_persona_compra", "Compras", "compras")}
                            style={(state.key_persona_compra.error ? styles.error : styles.touc)}>
                            <Text style={{ fontSize: 13, color: "#666", }}>{state.key_persona_compra.value.toUpperCase()}  </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: "100%", flexDirection: 'column', }}>
                        <Text style={{ margin: 4, color: "#fff", fontSize: 15, fontWeight: 'bold', }}>Persona limpieza</Text>
                        <TouchableOpacity
                            onPress={() => popupPersona("key_persona_limpieza", "Limpieza", "limpieza")}
                            style={(state.key_persona_limpieza.error ? styles.error : styles.touc)}>
                            <Text style={{ fontSize: 13, color: "#666", }}>{state.key_persona_limpieza.value.toUpperCase()}  </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: "100%", flexDirection: 'column', }}>
                        <Text style={{ margin: 4, color: "#fff", fontSize: 15, fontWeight: 'bold', }}>Fecha entrega</Text>
                        <TouchableOpacity onPress={() => popupCalendario()}
                            style={(state.fecha_entrega.error ? styles.error : styles.touc)}>
                            <Text style={{ fontSize: 10, color: "#666", }}>
                                {state.fecha_entrega.value}</Text>
                        </TouchableOpacity>
                    </View>
                    {/*   <View style={{ width: "100%", flexDirection: 'row', margin: 5, }}>
                        <View style={{ flex: 1, alignItems: 'center', }}>
                            <MiCheckBox ischeck={state.producto_terminado.value} id={"producto_terminado"}
                                onChange={text => hanlechage({ text: text, id: "producto_terminado" })}
                            />
                            <Text style={{ margin: 4, color: "#fff", fontSize: 12, fontWeight: 'bold', }}>producto terminado</Text>
                        </View>
                    </View> */}
                    <View
                        style={{
                            marginTop: 30,
                            width: 100,
                            height: 40,
                            borderRadius: 10,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderWidth: 2,
                            borderColor: "#fff",
                        }}>
                        {props.state.personaReducer.type === "addTrabajoEnpleado" && props.state.personaReducer.estado === "cargando" ? (
                            <ActivityIndicator size="small" color="#fff" />
                        ) : (
                                <TouchableOpacity onPress={() => addTrabajo()}
                                    style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
                                    <Text style={{ color: "#fff", textAlign: "center", fontSize: 12, }}>Guardar </Text>
                                </TouchableOpacity>
                            )
                        }
                    </View>
                </View>

            </View>
        </ScrollView>

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

export default connect(initStates, initActions)(TrabajoEmpleado);

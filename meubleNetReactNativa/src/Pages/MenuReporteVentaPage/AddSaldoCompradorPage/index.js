import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    View,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Text,
    TextInput
} from 'react-native';
import Svg from '../../../Svg';
import * as usuarioActions from '../../../Actions/usuarioActions'
import * as comprasActions from '../../../Actions/comprasActions'
import Barra from '../../../Component/Barra';
import moment from 'moment';
import MiCheckBox from '../../../Component/MiCheckBox';
class AddSaldoCompradorPage extends Component {
    static navigationOptions = {
        headerShown: false,
    }
    constructor(props) {
        super(props);
        var persona = props.navigation.state.params.persona
        var area = props.navigation.state.params.area
        var nuevo = props.navigation.state.params.nuevo
        var finalizo = props.navigation.state.params.finalizo
        var montoDevolver = 0
        var key_compras_libro= false
        var obj = {
            efectivo: false,
            cuenta: false,
            ingreso: true,
            egreso: false,
            monto: "",
        }
        var titulo = "Registrar nuevo libro compras"
        if (!nuevo && !finalizo) {
            key_compras_libro = props.navigation.state.params.key_compras_libro
            titulo = ""
            obj = {
                efectivo: true,
                cuenta: false,
                ingreso: false,
                egreso: true,
                monto: "",

            }

        }
        if (finalizo) {
            key_compras_libro = props.navigation.state.params.key_compras_libro
            titulo = ""
            obj = {
                efectivo: false,
                cuenta: false,
                ingreso: false,
                egreso: true,
                monto: 200,

            }
        }
        this.state = {
            titulo,
            persona,
            area,
            obj,
            montoDevolver,
            finalizo,
            nuevo,
            key_compras_libro
        }
    }
    hanlechages(data) {
        if (data.id === "efectivo") {
            this.state.obj["cuenta"] = false
        }
        if (data.id === "cuenta") {
            this.state.obj["efectivo"] = false
        }
        if (data.id === "ingreso") {
            this.state.obj["egreso"] = false
        }
        if (data.id === "egreso") {
            this.state.obj["ingreso"] = false
        }
        this.state.obj[data.id] = data.text
        this.setState({ ...this.state })
    }
    registrar() {
        var exito = true
        var fecha = moment()
            .format('YYYY-MM-DD');
        var hora = moment()
            .format('HH:mm:ss');
        var fecha_on = fecha + "T" + hora
        var pago = false
        var ingreso = false
        if (this.state.obj.monto==="") {
            exito=false
            alert("registro monto")
            return<View/>
        }
        if (this.state.obj.cuenta) {
            pago=true
        }
        if (!this.state.obj.cuenta && !this.state.obj.efectivo) {
            alert("escoga un modelo de pago")
            return<View/>
        }
        if (this.state.obj.ingreso) {
            ingreso=true
        }
        var monto = Number(this.state.obj.monto)
        if ((monto+"")==="NaN") {
            alert("Contiene letra o puntos ")
            return<View/>
        }
        if (this.state.nuevo) {
            var compras_libro = {
                fecha_on,
                key_persona: this.state.persona.key,
                compras_finalizado: false
            }
            var compras_ingreso = {
                fecha_on,
                monto: this.state.obj.monto,
                pago
                
            }
            var data = {
                compras_libro,
                compras_ingreso
            }
            this.props.addLibroCompras(this.props.state.socketReducer.socket, data)
            return <View />
        }
        if (!nuevo && !finalizo) {



        }


    }
    render() {
        return (
            <View style={{
                flex: 1,
                backgroundColor: '#000',
            }}>
                <Barra titulo={this.state.titulo} navigation={this.props.navigation} />
                <View style={{ flex: 1, width: '100%', alignItems: 'center', }}>
                    <Text style={{ color: '#999', fontWeight: 'bold', fontSize: 13, width: "90%", }}>
                        Comprador : {this.state.persona.nombre + " " + this.state.persona.paterno + " " + this.state.persona.materno} </Text>
                    <Text style={{ color: '#999', fontWeight: 'bold', fontSize: 13, width: "90%", }}>
                        telefono : {this.state.persona.telefono} </Text>
                    <Text style={{ color: '#999', fontWeight: 'bold', fontSize: 13, width: "90%", }}>
                        CI : {this.state.persona.ci} </Text>
                    <Text style={{ color: '#fff', fontWeight: 'bold', margin: 5, fontSize: 20, width: "90%", }}>
                        Ingresar saldo  </Text>
                    <View style={{ marginTop: 20, width: '100%', alignItems: 'center', flexDirection: 'row', }}>

                        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 15, flex: 0.2, margin: 5, textAlign: 'right' }}>
                            Monto </Text>
                        <TextInput style={{ width: 100, backgroundColor: '#fff', height: 40, borderRadius: 10, }} keyboardType="numeric"
                            placeholder=" bs" onChangeText={text => this.hanlechages({ text: text, id: "monto" })}
                        />
                    </View>
                    <View style={{ marginTop: 20, width: '100%', alignItems: 'center', flexDirection: 'row', }}>
                        <View style={{
                            flex: 1, flexDirection: 'row',
                            borderWidth: 1, borderRadius: 10,
                            borderColor: '#fff', padding: 10,
                            margin: 5,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <View style={{ flex: 0.5, alignItems: 'center', width: '100%', justifyContent: 'center', }}>
                                <MiCheckBox ischeck={this.state.obj.efectivo} id={"efectivo"}
                                    onChange={text => this.hanlechages({ text: text, id: "efectivo" })}

                                />
                                <Text style={{ margin: 5, color: '#fff', fontWeight: 'bold', fontSize: 13, }}>
                                    Efectivo </Text>
                            </View>
                            <View style={{ flex: 0.5, alignItems: 'center', width: '100%', justifyContent: 'center', }}>

                                <MiCheckBox ischeck={this.state.obj.cuenta} id={"cuenta"}
                                    onChange={text => this.hanlechages({ text: text, id: "cuenta" })}
                                />
                                <Text style={{ margin: 5, color: '#fff', fontWeight: 'bold', fontSize: 13, }}>
                                    Cuenta </Text>
                            </View>
                        </View>
                        <View style={{
                            flex: 1, flexDirection: 'row',
                            borderWidth: 1, borderRadius: 10,
                            borderColor: '#fff', padding: 10,
                            margin: 5,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <View style={{ flex: 0.5, alignItems: 'center', width: '100%', justifyContent: 'center', }}>
                                <MiCheckBox ischeck={this.state.obj.ingreso} id={"ingreso"}
                                    onChange={text => this.hanlechages({ text: text, id: "ingreso" })}

                                />
                                <Text style={{ margin: 5, color: '#fff', fontWeight: 'bold', fontSize: 13, }}>
                                    Ingreso </Text>
                            </View>
                            <View style={{ flex: 0.5, alignItems: 'center', width: '100%', justifyContent: 'center', }}>

                                <MiCheckBox ischeck={this.state.obj.egreso} id={"egreso"}
                                    onChange={text => this.hanlechages({ text: text, id: "egreso" })}
                                />
                                <Text style={{ margin: 5, color: '#fff', fontWeight: 'bold', fontSize: 13, }}>
                                    Egreso </Text>
                            </View>
                        </View>

                    </View>
                    <TouchableOpacity onPress={()=>this.registrar()} style={{ marginTop: 20, width: 120, height: 50, borderWidth: 1, borderRadius: 10, borderColor: '#fff', alignItems: 'center', justifyContent: 'center', }}>
                        <Text style={{ margin: 5, color: '#fff', fontWeight: 'bold', fontSize: 13, textAlign: 'center' }}>
                            Registrar  </Text>
                    </TouchableOpacity>

                </View>

            </View >
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
    ...usuarioActions,
    ...comprasActions
});
const initStates = (state) => {
    return { state }
};
export default connect(initStates, initActions)(AddSaldoCompradorPage);

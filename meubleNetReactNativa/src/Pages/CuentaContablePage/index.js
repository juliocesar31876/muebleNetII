import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Text,
    View,
    TouchableOpacity,
    AsyncStorage,
    ScrollView,
    Dimensions,
    TextInput,
    StyleSheet,
    ActivityIndicator
} from 'react-native';
import * as cuentaContableActions from '../../Actions/cuentaContableActions'
import Barra from '../../Component/Barra';
import Svg from '../../Svg';
import moment from 'moment';
import ListaCuenta from '../../Component/ListaCuenta';
class CuentaContablePage extends Component {
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
        var dataCuentas = {
            1: {
                key: 1,
                descripcion: "activo",
                key_cuenta_contable: 1,
                mostrar: false
            },
            2: {
                key: 2,
                descripcion: "activo disponible",
                key_cuenta_contable: 1,
                mostrar: false
            },
            3: {
                key: 3,
                descripcion: "activo fijo",
                key_cuenta_contable: 4,
                mostrar: false
            },
            4: {
                key: 4,
                descripcion: "activo see",
                key_cuenta_contable: 4,
                mostrar: false
            },
        }
        var data = {}
        for (const key in dataCuentas) {
            var obj = dataCuentas[key]
            if (obj.key === obj.key_cuenta_contable) {
                obj["mostrar"] = false
                data[key] = obj
            }
        }
        this.state = {
            index: 0,
            titulo: "Cuenta Contable",
            obj: {
                codigo: {
                    value: "",
                    error: false,
                },
                descripcion: {
                    value: "",
                    error: false,
                },
                key_cuenta_contable: {
                    value: "",
                    error: false,
                }
            },
            dataCuentas,
            dataCuentaContable: data
        }
    }
    hanlechage = (data) => {
        this.state.obj[data.id] = {
            value: data.text,
            error: false,
        }
        this.setState({ ...this.state })
    }
    registrarCuenta = () => {
        var fecha_on = moment()
            .format('YYYY-MM-DD');
        var hora = moment()
            .format('HH:mm:ss');
        var exito = true
        var data = {}

        for (const key in this.state.obj) {
            var obj = this.state.obj[key]
            if (obj.value === "") {
                exito = false
                obj.error = true
                continue
            }
            data[key] = obj.value
            this.state.obj[key] = obj
        }

        this.setState({ ...this.state })
        if (exito) {
            data["fecha_on"] = fecha_on + "T" + hora
            this.props.addcuentaContable(this.props.state.socketReducer.socket, data)
        }
    }
    esperandoRepuesta = () => {
        if (this.props.state.cuentaContableReducer.type === "addcuentaContable" && this.props.state.cuentaContableReducer.estado === "cargando") {
            return <ActivityIndicator size="small" color="#fff" />
        }
        return (
            <TouchableOpacity onPress={() => this.registrarCuenta()}
                style={{
                    position: 'absolute',
                    bottom: 30,
                    right: 0,
                    flex: 1, alignItems: 'center', justifyContent: 'center',
                }}>
                <Svg name={'add'}
                    style={{
                        width: 100,
                        height: 50,
                        fill: "#fff",
                        margin: 5,
                    }} />
            </TouchableOpacity>
        )
    }
    listaCuenta(objContable) {


    }




    render() {
        return (
            <View
                style={{
                    flex: 1,
                    width: Dimensions.get('window').width,
                    height: Dimensions.get('window').height,
                    alignItems: 'center',
                    backgroundColor: "#000",
                }}>
                <Barra titulo={this.state.titulo} navigation={this.props.navigation} />
                <View style={{
                    width: "100%",
                    height: '100%',
                    flex: 1,
                    alignItems: 'center',
                }}>
                    <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center', }}>
                        {Object.keys(this.state.dataCuentaContable).map((key) => {
                            var data = this.state.dataCuentaContable[key]
                            var objCuenta = this.state.dataCuentaContable[data.key_cuenta_contable]
                            var estado = false
                            var count = 1
                            if (!objCuenta) {
                                objCuenta = {}
                            }
                            return (

                                <View style={{
                                    width: "90%",
                                    flexDirection: 'column',
                                    borderColor: "#999", margin: 8,
                                    borderWidth: 1, borderRadius: 10, padding: 5,
                                    alignItems: 'center',
                                    justifyContent: 'center',

                                }}>
                                    <View style={{
                                        width: "90%", flexDirection: 'row', alignItems: 'center',
                                        justifyContent: 'center',
                                        height: 40,
                                    }}>
                                        <View style={{ flex: 0.8, }}>
                                            <Text style={{ margin: 2, color: "#fff", fontSize: 12, fontWeight: '400', alignItems: 'center', justifyContent: 'center', }}>{data.descripcion.toUpperCase()}</Text>

                                        </View>
                                        <View style={{ flex: 0.2, alignItems: 'center', justifyContent: 'center', }}>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    this.state.dataCuentaContable[data.key].mostrar = true
                                                    this.setState({ ...this.state })
                                                }}
                                                style={{ width: 40, height: 40, borderRadius: 100, }}>
                                                <Svg name={'add'}
                                                    style={{
                                                        width: 30,
                                                        height: 30,
                                                        fill: "#fff",
                                                        margin: 5,
                                                    }} />
                                            </TouchableOpacity>
                                        </View>
                                    </View>

                                    {data.mostrar ?
                                        (
                                            /*  this.listaCuenta({
                                                 data: data,
                                                 tamano: 100,
                                                 mostrarLista: true,
                                                 dataCuentaContable: this.state.dataCuentas,
                                                 count
                                             }) */
                                            <ListaCuenta
                                                cambiarEstado={this.cambiarEstado}
                                                objContable={{
                                                    data,
                                                    tamano: 100,
                                                    mostrarLista: true,
                                                    dataCuentaContable: this.state.dataCuentas,
                                                    count
                                                }} />
                                        ) :
                                        (
                                            <View />
                                        )

                                    }
                                </View>

                            )
                        })

                        }


                    </View>
                    {this.esperandoRepuesta()}

                </View>
            </View>
        );
    }
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
    ...cuentaContableActions
});

export default connect(initStates, initActions)(CuentaContablePage);

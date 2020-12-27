import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Text,
    View,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import SwipeableViews from 'react-swipeable-views-native';
import Barra from '../../Component/Barra';
import * as productoActions from '../../Actions/productoActions'
import * as popupActions from '../../Actions/popupActions'
import * as ventaActions from '../../Actions/ventaActions'
import * as sucursalActions from '../../Actions/sucursalActions'
import AddVenta from './AddVenta';
import Vender from './Vender';
import DetalleVenta from './DetalleVenta';
import Estado from '../../Component/Estado';
import Svg from '../../Svg';
class VentasPage extends Component {
    static navigationOptions = {
        headerShown: false,
    }
    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            isOpen: false,
            index: 0,
            titulo: "Ventas",
            obj: {
                cliente: {
                    value: "",
                    error: false
                },
                direccion: {
                    value: "",
                    error: false
                },
                telefono: {
                    value: "",
                    error: false
                },
                nit: {
                    value: "",
                    error: false
                },
                descuento: {
                    value: "",
                    error: false
                },
                adelanto: {
                    value: "",
                    error: false
                },
                key_sucursal: {
                    value: "Selecion sucursal",
                    error: false
                },
                entrega: {
                    value: false,
                }
            },
            dataVentaProducto: {},
            total: 0
        }
    }
  
    eliminarProductoVenta = (key) => {
        this.props.state.ventaReducer.dataVentaProducto[key] = false
        this.props.update(this.props.state.ventaReducer.dataVentaProducto, "dataVentaProducto")
    }
    hanlechage = (data) => {
        this.state.obj[data.id] = {
            value: data.text,
            error: false,
        }
        this.setState({ ...this.state })
    }
  /*   selecSucursal = (obj) => {
        this.state.obj.key_sucursal.value = obj.direccion
        this.state.obj.key_sucursal.error = false
        this.state.obj.key_sucursal["data"] = obj
        this.props.cerrarPopup()
    } */
    actualizar = (data) => {
        this.state.obj = data
        this.setState({ ...this.state })
    }
    handleChanges = (index) => {
        this.state.index = index;
        this.setState({ ...this.state })
    }
    render() {
        if (this.props.state.sucursalReducer.estado === "cargando" && this.props.state.sucursalReducer.type === "getAllSucursal") {
            return <Estado estado={"cargando"} />
        }

        if (!this.props.state.sucursalReducer.dataSucursal) {
            this.props.getAllSucursal(this.props.state.socketReducer.socket);
            return <View />
        }
        return (
            <View
                style={{
                    flex: 1,
                    width: "100%",
                    alignItems: 'center',
                    backgroundColor: "#000",
                }}>
                <Barra titulo={this.state.titulo} navigation={this.props.navigation} />
                <SwipeableViews style={{ flex: 1, width: "100%", }} onChangeIndex={this.handleChanges} index={this.state.index} >
                    <View style={{
                        flex: 1,
                        width: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }} >
                        <View style={{
                            width: "100%",
                            height: 50,
                            alignItems: 'center',
                            justifyContent: 'center',

                        }}>
                            <Text style={{ color: "#fff", fontWeight: 'bold', fontSize: 20, }}>AGREGAR VENTA</Text>
                        </View>
                        <AddVenta navigation={this.props.navigation} agregarVenta={this.agregarVenta} />
                    </View>
                    <View style={{
                        flex: 1,
                        width: '100%',
                        alignItems: 'center',
                    }}>
                        <Text style={{ color: "#fff", fontWeight: 'bold', fontSize: 20, }}>DETALLE VENTAS</Text>
                        <DetalleVenta eliminarProductoVenta={this.eliminarProductoVenta} dataVentaProducto={this.state.dataVentaProducto} />
                        <View style={{ alignItems: 'center', justifyContent: 'center', width: "80%", flexDirection: 'row', }}>
                            <Text style={{ color: "#fff", fontSize: 18, }}>TOTAL : {this.state.total} Bs</Text>
                        </View>
                    </View>
                    <View style={{
                        flex: 1,
                        width: '100%',
                        alignItems: 'center',
                    }}>
                        <Text style={{ color: "#fff", fontWeight: 'bold', fontSize: 20, }}>REGISTRO ClIENTE</Text>
                        <Vender obj={this.state.obj} hanlechage={this.hanlechage} actualizar={this.actualizar} selecSucursal={this.selecSucursal} />
                        
                    </View>
                </SwipeableViews>
                <View style={{ width: "100%", backgroundColor: "#000", height: 75, flexDirection: 'row', }}>
                    <TouchableOpacity
                        onPress={() => this.handleChanges(0)}
                        style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
                        <Svg name={"addVenta"}
                            style={{
                                width: 50,
                                height: 50,
                                fill: "#fff",
                                margin: 5,
                            }} />
                        <Text style={{ color: "#fff", fontWeight: 'bold', fontSize: 10, }}>Agregar venta</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.handleChanges(1)}
                        style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
                        <Svg name={"totalVenta"}
                            style={{
                                width: 50,
                                height: 50,
                                fill: "#fff",
                                margin: 5,
                            }} />
                        <Text style={{ color: "#fff", fontWeight: 'bold', fontSize: 10, }}>Detalle venta </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.handleChanges(2)}
                        style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
                        <Svg name={"ventasProducto"}
                            style={{
                                width: 50,
                                height: 50,
                                fill: "#fff",
                                margin: 5,
                            }} />
                        <Text style={{ color: "#fff", fontWeight: 'bold', fontSize: 10, }}>Registro</Text>

                    </TouchableOpacity>

                </View>
            </View>
        );
    }
};
const initStates = (state) => {
    return { state }
};
const initActions = ({
    ...productoActions,
    ...popupActions,
    ...ventaActions,
    ...sucursalActions
});
export default connect(initStates, initActions)(VentasPage);
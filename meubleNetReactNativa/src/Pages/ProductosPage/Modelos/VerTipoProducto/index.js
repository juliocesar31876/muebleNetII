import React from 'react';
import { connect } from 'react-redux';
import {
    ScrollView,
    Text,
    View,
} from 'react-native';
import * as productoActions from '../../../../Actions/productoActions'
import Estado from '../../../../Component/Estado';
const VistaProductoPage = (props) => {
    if (!props.state.socketReducer.socket) {
        return <Estado estado={"Reconectando"} />
    }
    if (props.state.productosReducer.estado === "cargando" && props.state.productosReducer.type === "getAllTipoProducto") {
        return <Estado estado={"Cargando"} />
    }
    if (!props.state.productosReducer.dataTipoProducto) {
        props.getAllTipoProducto(props.state.socketReducer.socket);
        return<View/>
    }
    return (
        <View style={{
            flex: 1,
            width: "100%",
        }}>
            <ScrollView style={{ flex: 1, }}>
                <View style={{
                    flex: 1,
                    margin: 10,
                    width: "100%",
                    alignItems: 'center',
                }}>

                    {Object.keys(props.state.productosReducer.dataTipoProducto).map((key) => {
                        var obj = props.state.productosReducer.dataTipoProducto[key]
                        return (
                            <View style={{
                                margin: 5,
                                width: "80%",
                                height: 50,
                                borderRadius: 10,
                                borderWidth: 3,
                                flexDirection: 'row',
                                borderColor: "#fff",
                                alignItems: 'center',
                            }}>
                                <Text style={{ margin: 4, color: "#fff" }}>Tipo producto :</Text>
                                <Text style={{ margin: 4, color: "#666", fontSize: 15, textAlign: "center", flex: 0.5, }}>{obj.nombre}</Text>
                            </View>

                        )

                    })

                    }

                </View>
            </ScrollView>
        </View>
    )

};
const initStates = (state) => {
    return { state }
};
const initActions = ({
    ...productoActions
});
export default connect(initStates, initActions)(VistaProductoPage);

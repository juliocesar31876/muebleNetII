import React from 'react';
import { connect } from 'react-redux';
import {
    ScrollView,
    Text,
    View,
} from 'react-native';
import * as areaTrabajoActions from '../../../../Actions/areaTrabajoActions'
import Estado from '../../../../Component/Estado';
const VerAreaTrabajo = (props) => {

    if (!props.state.socketReducer.socket) {
        return <Estado estado={"Reconectando"} />
    }
    if (props.state.areaTrabajoReducer.estado === "cargando" && props.state.areaTrabajoReducer.type === "getAllAreaTrabajo") {
        return <Estado estado={"Cargando"} />
    }
    if (!props.state.areaTrabajoReducer.dataAreaTrabajo) {
        props.getAllAreaTrabajo(props.state.socketReducer.socket);
        return <View />
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
                    {Object.keys(props.state.areaTrabajoReducer.dataAreaTrabajo).map((key) => {
                        var obj = props.state.areaTrabajoReducer.dataAreaTrabajo[key]
                        if (obj.nombre==="administrador") {
                            return<View/>
                        }
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
                                <Text style={{ margin: 4, color: "#fff" }}>Area trabajo :</Text>
                                <Text
                                    style={{ margin: 4, color: "#666", fontSize: 15, textAlign: "center", flex: 0.8, }}>
                                    {obj.nombre}</Text>
                            </View>
                        )
                    })}
                </View>
            </ScrollView>
        </View>
    )
};
const initStates = (state) => {
    return { state }
};
const initActions = ({
    ...areaTrabajoActions
});
export default connect(initStates, initActions)(VerAreaTrabajo);
import React from 'react';
import { View, ScrollView, TouchableOpacity, TouchableWithoutFeedback, } from 'react-native';
import { connect } from 'react-redux';
import * as popupCalendarioActions from '../../Actions/popupCalendarioActions'
import CalendarioPiker from '../CalendarioPiker';
import CalendarioMes from '../CalendarioMes';
const PopupCalendario = (props) => {
    if (!props.state.popupCalendarioReducer.estado) {
        return <View />
    }
    const cerrarVentana = () => {
        props.cerrarPopupCalendario();
        return <View />
    }
    return (
        <TouchableOpacity onPress={cerrarVentana}
            style={{
                position: "absolute", width: "100%",
                backgroundColor: "#00000055",
                height: "100%",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: 'center',
            }}>
            <TouchableWithoutFeedback>
                <View style={{
                    borderRadius: 20,
                    overflow: "hidden",
                    flex: 0.8,
                    height: "60%",
                    backgroundColor: "#000000",
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderWidth: 2,
                    borderColor: "#fff",
                }}>
                    <ScrollView style={{ flex: 1,width: "100%", }}>
                    
                        {props.state.popupCalendarioReducer.tipo === "dia" ? (
                            <CalendarioPiker />
                        ) : (
                                <CalendarioMes />
                            )
                        }
                    </ScrollView>
                </View>
            </TouchableWithoutFeedback>
        </TouchableOpacity>
    );
}
const initActions = ({
    ...popupCalendarioActions
});
const initStates = (state) => {
    return { state }
};

export default connect(initStates, initActions)(PopupCalendario);

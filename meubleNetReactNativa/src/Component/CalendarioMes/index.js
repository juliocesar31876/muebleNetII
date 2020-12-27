import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import Moment from 'moment'
import * as calendarioActions from '../../Actions/calendarioActions'
import ModeloOtro from '../CalendarioPiker/ModeloOtro';
import 'moment/locale/es';
const initActions = ({
    ...calendarioActions
});
const CalendarioMes = (props) => {
    const [obj, setObj] = React.useState({
        moment:Moment()
    });
    const masAños = () => {
        obj.moment.add(1, 'year')
        props.state.calendarioReducer.estado = false;
        setObj({ ...obj })
        return <View />
    }
    const menosAños = () => {
        obj.moment.add(-1, 'year')
        props.state.calendarioReducer.estado = false;
        setObj({ ...obj })
        return <View />
    }
    const izquierda = () => {
        obj.moment.add(-1, 'month')
        props.state.calendarioReducer.estado = false;
        setObj({ ...obj })
        return <View />
    }
    const derecha = () => {
        obj.moment.add(1, 'month')
        props.state.calendarioReducer.estado = false;
        setObj({ ...obj })
        return <View />
    }
    const hoy = () => {
        obj.moment = Moment();
        setObj({ ...obj })
        return <View />
    }
    const handleClick = () => {
        var fechaDia = obj.moment;
        props.state.popupCalendarioReducer.onChange(fechaDia);
    }
    return (
        <View style={{
            width: '100%',
            justifyContent: "center",
            alignItems: 'center',
            margin: 5,
        }}>

            <View style={{
                width: '90%',
                flexDirection: 'row',
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 50,
            }}>
                <View style={{
                    alignItems: 'center',
                    width: "80%",
                }}>
               {/*      <TouchableOpacity onPress={masAños} style={{
                        flex: 1,
                        alignItems: "flex-end",
                        paddingLeft: 60,
                    }}>
                        <View style={{
                            width: 20,
                            height: 20, borderWidth: 1, borderRadius: 5, borderColor: "#fff",
                        }}>
                            <Text style={{ textAlign: "center", fontWeight: "bold", color: "#fff", fontSize: 15, }}>+</Text>
                        </View>
                    </TouchableOpacity> */}
                    <Text
                        style={{ color: '#fff', alignContent: 'flex-end', fontWeight: 'bold', fontSize: 20 ,margin:5}}>
                        {obj.moment.format('MMMM').toUpperCase()}  {obj.moment.format('YYYY')} </Text>
                   {/*  <TouchableOpacity onPress={menosAños}
                        style={{
                            flex: 1,
                            alignItems: "flex-end",
                            paddingLeft: 60,
                        }}>
                        <View style={{
                            width: 20,
                            height: 20,
                            borderWidth: 1,
                            borderRadius: 5,
                            borderColor: "#fff",
                        }}>
                            <Text style={{ textAlign: "center", fontWeight: "bold", color: "#fff", fontSize: 15, }}>-</Text>
                        </View>
                    </TouchableOpacity> */}
                </View>

            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', margin: 5,}}>
                <ModeloOtro lado={izquierda} style={styles.modelootro} dia='<'></ModeloOtro>
                <ModeloOtro lado={hoy} style={styles.modelootro} dia='Hoy'></ModeloOtro>
                <ModeloOtro lado={derecha} style={styles.modelootro} dia='>'></ModeloOtro>
            </View>
            <TouchableOpacity
                onPress={() => handleClick()}
                style={{ width: 120, height: 50, borderWidth: 2, borderColor: "#fff", borderRadius: 10, marginTop: 50, alignItems: 'center', justifyContent: 'center', }}>
                <Text style={{ color: '#fff', alignContent: 'flex-end', fontWeight: 'bold', fontSize: 15 }}>Selecionar </Text>
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    modelootro: {
        borderColor: '#fff',
        borderWidth: 1,
        width: 40,
        height: 40,
        margin: 5,
        fontSize: 15,
        borderRadius: 5,
        justifyContent: "center"
    },
    modelootro2: {
        flex: 1,
        width: 55,
        textAlign: "center",
        color: '#fff',
        fontSize: 15,
    },
});
const initStates = (state) => {
    return { state }
};
export default connect(initStates, initActions)(CalendarioMes);
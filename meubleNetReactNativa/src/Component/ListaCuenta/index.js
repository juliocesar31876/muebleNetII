import React from 'react';

import {
    TouchableOpacity, View,
    Text
} from 'react-native';
import Svg from '../../Svg';
const ListaCuenta = (props) => {
    if (!props.objContable.mostrarLista) {
        return <View />
    }
    var dataCuenta = {}
    var count = 0
    var tamano = (props.objContable.tamano - 5) + "%"
    for (const key in props.objContable.dataCuentaContable) {
        var obj = props.objContable.dataCuentaContable[key]
        if (obj.key_cuenta_contable === props.objContable.data.key) {
            if (props.objContable.data.descripcion === obj.descripcion) {
                continue
            }
            dataCuenta[obj.key] = obj
        }
    }
    var lent = Object.keys(dataCuenta).length
    if (lent === 0) {
        return <View />
    }
    return (
        <View style={{ width: tamano, alignItems: 'center', justifyContent: 'center', }}>
            <Text style={{ margin: 2, color: "#fff", fontSize: 12, fontWeight: '400', width: tamano, textAlign: 'center', borderBottomWidth: 2, borderColor: "#999", margin: 5, }}></Text>
            {Object.keys(dataCuenta).map(function (key) {
                var data = dataCuenta[key]
                var objCuenta = props.objContable.dataCuentaContable[data.key_cuenta_contable]
                if (!objCuenta) {
                    return <View />
                }
                count++
                return (
                    <View style={{ width: "90%", flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}
                    >
                        <View style={{ flex: 0.9, }}>
                            <Text style={{ margin: 2, color: "#fff", fontSize: 12, fontWeight: '400', }}>
                                {count}-.    {data.descripcion.toUpperCase()}</Text>
                        </View>
                        <View style={{ flex: 0.2, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', }}>
                            <TouchableOpacity
                                onPress={() => props.cambiarEstado(data)}
                                style={{ width: 40, height: 40, borderRadius: 100, }}>
                                <Svg name={'add'}
                                    style={{
                                        width: 30,
                                        height: 30,
                                        fill: "#fff",
                                        margin: 5,
                                    }} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => props.cambiarEstado(data)}
                                style={{ width: 40, height: 40, borderRadius: 100, }}>
                                <Svg name={'cerrar'}
                                    style={{
                                        width: 30,
                                        height: 30,
                                        fill: "#fff",
                                        margin: 5,
                                    }} />
                            </TouchableOpacity>
                        </View>


                    </View>
                )
            })

            }

        </View>
    )


};

export default ListaCuenta;

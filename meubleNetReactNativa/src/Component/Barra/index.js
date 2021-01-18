import React from 'react';
import {
    TouchableOpacity,
    View,
    Text
} from 'react-native';
import Svg from '../../Svg';
const Barra = (props) => {
    if (props.titulo === "Inicio") {
        return (
            <View style={{
                width: "100%",
                height: 50,
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
           
                backgroundColor: "#000",
            }}>
                <Text style={{
                    color: "#fff",
                    fontSize: 30,
                    fontWeight: 'bold',
                }}>
                    {props.titulo}
                </Text>
            </View>
        )
    }
    return (
        <View style={{
            width: "100%",
            flex: 0.1,
            flexDirection: 'row',
            backgroundColor: "#000",
          
        }}>
            <TouchableOpacity
                onPress={() => {
                    props.navigation.goBack()
                }}
                style={{
                    flex: 0.2,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                <Svg name={"volver"}
                    style={{
                        width: 30,
                        height: 30,
                        fill: "#fff",
                        margin: 5,
                    }} />
            </TouchableOpacity>
            <View style={{
                flex: 1,
                justifyContent: 'center',
            }}>
                <Text style={{
                    color: "#fff",
                    fontSize: 15,
                    fontWeight: 'bold',
                }}>
                    {props.titulo}
                </Text>
            </View>
        </View>
    )
};
export default Barra;
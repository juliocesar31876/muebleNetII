import React from 'react';
import {
    View,
    Text,
    Modal,
    StyleSheet,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Dimensions,
    AsyncStorage
} from 'react-native';
import { connect } from 'react-redux';

import Svg from '../../Svg';
const NaviDrawe = (props) => {
    if (!props.isOpen) {
        return <View></View>
    }
    const handleClick = (item) => {
        props.onChange(0);
        switch (item) {
            case "Productos":
                props.nav.navigate("ProductosPage",{pagina:item})
                return <View />
            case "Cerrar":
                AsyncStorage.removeItem('usuario')
                props.state.usuarioReducer.usuariolog = false;
                props.nav.replace("CargaPage")
                return <View />
            default:
                props.state.navigationReducer.navigation.navigate(item)
                return <View />
        }
    }
    return (

        <Modal
            animationType="fade"
            transparent={true}
            visible={props.isOpen}
            style={{ border: 0, }}
        >
            <View style={{
                width: Dimensions.get("window").width,
                height: "100%",
                position: "absolute",
                top: 0,

            }} >

                <TouchableWithoutFeedback onPress={handleClick}
                    style={{
                        flex: 1,
                        backgroundColor: "#fff",
                    }}>
                    <View style={styles.contenedors2}>
                    </View>
                </TouchableWithoutFeedback>
                <View style={styles.contenedors}>
                    <View style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        paddingBottom: 50,
                    }}>
                        <View style={{
                            minHeight: '100%', width: "100%", paddingTop: 20,
                            paddingBottom: 50,
                            alignItems: "center"
                        }}>
                            <Text style={{
                                fontSize: 25,
                                fontWeight: 'bold',
                                color: "#ffa4a9"
                            }}>Mueble Net</Text>
                            <Text style={{
                                fontSize: 15,
                                fontWeight: 'bold',
                                color: "#666"
                            }}>{props.state.usuarioReducer.usuarioLog.persona.nombre + props.state.usuarioReducer.usuarioLog.persona.paterno}</Text>


                            {["Ventas", "Productos", "Almacen", "Empleados", "Area trabajo"].map((text) => {
                                var imagen = text.toLowerCase()
                                return (
                                    <TouchableOpacity
                                        style={styles.sty} onPress={() => { handleClick(text) }}>
                                        <Svg name={imagen}
                                            style={{
                                                width: 25,
                                                height: 25,
                                                fill: "#000",
                                                margin: 5,
                                                flex: 1,
                                            }} />
                                        <Text style={{
                                            flex: 0.9,
                                            marginLeft: 10,
                                            fontSize: 16,
                                            color: "#666",
                                            fontWeight: 'bold',
                                        }}>{text}</Text>
                                    </TouchableOpacity>
                                )
                            })

                            }
                            <TouchableOpacity style={styles.sty} onPress={() => { handleClick("Cerrar") }}>
                                <Text style={{
                                    fontSize: 25,
                                    color: "#666",
                                    fontWeight: 'bold',
                                }} >Salir</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>




            </View>

        </Modal>




    );

}


const styles = StyleSheet.create({
    sty: {
        height: 50,
        margin: 5,
        width: "100%",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',

    },
    contenedors: {
        position: "absolute",
        flex: 1,
        width: "50%",
        height: "100%",
        minHeight: 1000,
        backgroundColor: "#ffffff",
        justifyContent: "center",

        alignItems: "center",
    },
    menus: {
        justifyContent: 'center',
        alignItems: 'center',

    },
    contenedors2: {
        position: "absolute",
        width: "100%",
        right: 0,
        top: 0,
        height: "100%",
        minHeight: 1000,

        paddingTop: 50,


    },

});
const initStates = (state) => {
    return { state }
};

export default connect(initStates)(NaviDrawe);
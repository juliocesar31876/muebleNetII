import React from 'react';
import { ScrollView, View,Text } from 'react-native';
import * as materialActions from '../../../Actions/materialActions'
import Estado from '../../../Component/Estado';
import { connect } from 'react-redux';

const VerMaterial = (props) =>{
    if (!props.state.socketReducer.socket) {
        return <Estado estado={"Reconectando"} />
    }
    if (props.state.materialReducer.estado === "cargando" && props.state.materialReducer.type === "getAllTipoMaterial") {
        return <Estado estado={"Cargando"} />
    }
    if (!props.state.materialReducer.dataTipoMaterial) {
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

                    {Object.keys(props.state.materialReducer.dataTipoMaterial).map((key) => {
                        var obj = props.state.materialReducer.dataTipoMaterial[key]
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
                                <Text style={{ margin: 4, color: "#fff" }}>Tipo Material :</Text>
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
    ...materialActions
});
export default connect(initStates, initActions)(VerMaterial);


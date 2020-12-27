import React from 'react';
import { View, Text, ActivityIndicator, SafeAreaView } from 'react-native';
import { connect } from 'react-redux';

const DisconectBarra = (props) => {
  if (props.state.socketReducer.estado === "conectado") {
    return <View />
  }
  if ((props.state.socketReducer.reintent || 0) < 1) {
    return <View />
  }

  return (
    <SafeAreaView style={{ backgroundColor: "#cb3234", fllex: 1 }}>
      <View style={{
        width: "100%",
        height: 25,
        backgroundColor: "#cb3234",
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Text style={{ textAlign: "center", color: "#fff", fontWeight: 'bold', }}>Conexion perdida reconectando</Text>
        <View style={{ paddingLeft: 20, backgroundColor: "fff", }}>
          <ActivityIndicator size="small" color="#fff" />
        </View>
      </View>
    </SafeAreaView>

  );

}
const initStates = (state) => {
  return { state }
};
export default connect(initStates)(DisconectBarra);


import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Platform,
  Linking,
  Animated,
  Text
} from 'react-native';
import { connect } from 'react-redux';
import Carga from '../../Component/Carga';
import Svg from '../../Svg';
import Theme from '../../Styles/Theme.json';
import LinearGradient from 'react-native-linear-gradient';

class CargaPage extends Component {
  static navigationOptions = ({ navigation }) => (
    navigation.state.prop ? ({ ...navigation.state.prop }) : {}
  );

  constructor(props) {
    super(props);
    this.state = {
      startValue: new Animated.Value(1),
      endValue: 1.3,
    };
    props.state.navigationReducer.setParams(props.navigation, {
      title: "Carga",
      headerShown: false,
      headerTitleStyle: {
        color: '#fff',
      },
    })
  }

  componentDidMount() { // B
    Animated.loop(
      Animated.spring(this.state.startValue, {
        toValue: this.state.endValue,
        friction: 1,
        useNativeDriver: true,
      }),
      { iterations: 1000 },
    ).start();

  }

  render() {
    return (
      <View style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Theme.colors.fondo
      }}>
        <LinearGradient
          colors={['#000', '#000']}
          locations={[0, 1]}
          style={{
            flex: 1,
            width: "100%",
            alignItems: 'center',
            justifyContent: 'center',
          }} >
          <Animated.View
            style={[
              styles.square,
              {
                transform: [
                  {
                    scale: this.state.startValue,
                  },
                ],
              },
            ]}>
            <View style={{
              flex: 1,
              width: "100%",
              height: 120,
              alignItems: 'center',
            }}>
              <Text style={{ color: "#fff", fontSize: 36,fontWeight: 'bold', }}>muebleNet</Text>
            </View>
          </Animated.View>
          <View style={{
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <View style={{
              flexDirection: 'row',
              width: "50%",
              alignItems: 'center',
              justifyContent: 'center',
            }}>

              <Svg name="arreglo"
                style={{
                  width: 50,
                  height: 50,
                  fill: "#fff"
                }} />
            </View>

            <Text style={{
              fontSize: 10,
              alignItems: 'center',
              fontWeight: 'bold',
              color: '#fff'
            }}>Estamos en etapa de desarrollo.</Text>
            <Text style={{
              fontSize: 10,
              alignItems: 'center',
              fontWeight: 'bold',
              color: '#fff'
            }}>Esperamos su comprencion</Text>
          </View>
          <Carga />
        </LinearGradient>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  square: {
    flex: 0.2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});



const initStates = (state) => {
  return { state }
};

export default connect(initStates)(CargaPage);
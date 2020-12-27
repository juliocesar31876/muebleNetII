/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import {
  View,
  SafeAreaView,
  StatusBar,
  TouchableOpacity
} from 'react-native';
//PAGES
import * as Pages from './src/Pages';
///reducx
import { createStore, applyMiddleware } from 'redux';
import Reducer from './src/Reducers';
import reduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Theme from './src/Styles/Theme.json';
import SocketComp from './src/nativeSocket';
import DisconectBarra from './src/Component/DisconectBarra';
import Popup from './src/Component/Popup';
import PopupCalendario from './src/Component/PopupCalendario';

const store = createStore(
  Reducer,
  {},
  applyMiddleware(reduxThunk),
);
SocketComp(store);
const Home = createStackNavigator(
  Pages.getPages(),
  {

    defaultNavigationOptions: ({ navigation }) => ({
      headerBackground: () =>
        <LinearGradient colors={Theme.gradient.primary} style={{
          height: "100%",
          width: "100%",
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: "#000",
        }}>

        </LinearGradient>
      ,
      headerTitleStyle: {
        color: Theme.colors.secondary,
      },
      headerRight: () => (
        <View style={{
        }} />
      ),
      headerLeft: () => goBackButton(navigation),
    }),
  }
);
const goBackButton = (navigation) => {
  if (navigation.isFirstRouteInParent()) {
    return <View />
  }
  return (<TouchableOpacity style={{
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }}
    onPress={() => navigation.goBack()}>

  </TouchableOpacity>)
}
const Container = createAppContainer(Home);
class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Provider store={store}>
        <SafeAreaView style={{ backgroundColor: Theme.colors.primary }}>
          <StatusBar barStyle={Theme.barStyle} />
          <View style={{
            width: "100%",
            height: "100%"
          }}>
            <DisconectBarra/>
            <Container />
            <Popup />
            <PopupCalendario />

          </View>

        </SafeAreaView>
      </Provider>

    );
  }
};
export default App;

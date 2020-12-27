import React, { Component } from 'react';
import {
    Text,
    View,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import * as Pages from '../../Pages'
import { connect } from 'react-redux';

import Theme from '../../Styles/Theme.json'
class ListaPaginasPage extends Component {
    static navigationOptions = {
        headerShown: false,
    }
    constructor(props) {
        super(props);
        this.state = {
            y: 0
        };
    }
    componentDidMount() {

    }

    componentWillUnmount() {
    }
    arr = Object.keys(Pages.getPages());
    render() {
        return (

            <ScrollView
                style={{
                    backgroundColor: "#000",
                    flex: 1,
                    height: "100%",

                }}>
                <Text style={{
                    color: "#fff",
                    width: "100%",
                    textAlign:"center",
                    fontSize: 30,
                }}>Lista de paginas...</Text>
                <View style={{
                    alignItems: 'center',
                    flex: 1,
                    justifyContent: 'center',
                }}>
                    {

                        this.arr.map((obj, key) => {

                            return (
                                <TouchableOpacity key={key} onPress={() => {
                                    this.props.navigation.navigate(obj);
                                }}
                                    style={{
                                        width: 200,
                                        height: 40,
                                        backgroundColor: Theme.colors.primary,
                                        margin: 10,
                                        justifyContent: "center",
                                        alignItems: "center",
                                        borderRadius: 10
                                    }}
                                >
                                    <Text style={{ color: Theme.colors.secondary }}>
                                        {obj}
                                    </Text>
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>
            </ScrollView>

        );
    }

};


// export default PagesPage;


const initStates = (state) => {
    return { state }
};

export default connect(initStates)(ListaPaginasPage);

import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Svg from '../../Svg';
const MiCheckBox = (props) => {
    const [isCheck, setisCheck] = React.useState(false);
    const hadleClick = () => {
        if (props.onChange) {
            props.onChange(!isCheck, props.id);
        }
        setisCheck(!isCheck);
        return <View />
    }
    if (!props.ischeck) {
        props.ischeck = false;
    }
    if (props.ischeck !== isCheck) {
        props.ischeck = !isCheck;
        setisCheck(props.ischeck);
        return <View />
    }
    if (isCheck) {
        return (
            <TouchableOpacity onPress={hadleClick}>
                <View style={[styles.cbPadreCheck]}>
                    <Svg name="bien" style={{ width: 20, height: 20, fill: '#000' }} />
                </View>
            </TouchableOpacity>
        )
    } else {
        return (
            <TouchableOpacity onPress={hadleClick}>
                <View style={styles.cbPadre}>
                </View>
            </TouchableOpacity>
        )
    }
}
const styles = StyleSheet.create({
    cbPadre: {
        width: 30,
        height: 30,
        borderColor: "#fff",
        borderWidth: 2,
        borderRadius: 100,
        marginLeft: 5,
        alignItems: 'center',
        justifyContent: 'center',

    },
    cbPadreCheck: {

        width: 30,
        height: 30,
        borderColor: "#fff",
        backgroundColor: "#fff",
        borderWidth: 2,
        borderRadius: 100,
        marginLeft: 5,
        alignItems: 'center',
        justifyContent: 'center',

    },
    logo: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 20,
        height: 20,
    },
});
export default MiCheckBox;
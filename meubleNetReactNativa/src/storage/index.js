import { AsyncStorage, Platform } from 'react-native';
const isWeb = Platform.OS === 'web';
const setItem = (key, val) => {

    AsyncStorage.setItem("@MySuperStore:" + key, val);
};
const getItem = (key, fun) => {

    var data = AsyncStorage.getItem("@MySuperStore:" + key).then((value) => {
        data = value;
        fun(data);
    });
};
const removeItem = (key) => {

    AsyncStorage.removeItem("@MySuperStore:" + key);
};
export default { setItem, getItem, removeItem };
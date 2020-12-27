
import myProps from './myPropsJulio.json'
//import myProps from './myPropsJulio.json'
import { AsyncStorage } from 'react-native';
const SocketComp = (store) => {
    var usuario, url;
    const delay = ms => new Promise(res => setTimeout(res, ms));
    var reintent = 0;
    const Reconnect = async () => {
        reintent++;
        if (reintent > 2) {
            store.dispatch({
                component: 'socket',
                type: 'close',
                estado: 'Reconectando',
                reconect: true,
                mensaje: 'conexion Perdida',
                reintent: reintent,
                socket: false,
            });
        }
        await delay(3000);
        openSocket(url);
        if (store.getState().socketReducer.estado !== "conectado") {
            Reconnect();
        }
    }
    var openSocket = (url) => {
        var socket = new WebSocket(url);
        socket.onopen = () => {
            console.log('open')
            store.dispatch({
                component: 'socket',
                type: 'open',
                reconect: false,
                estado: 'conectado',
                mensaje: 'conectado con exito',
                reintent: 0,
                socket: socket,
            });
            reintent = 0;
        }
        socket.onclose = () => {
            console.log('close')

            if (!store.getState().socketReducer.reconect) {
                Reconnect();
                return;
            }
            store.dispatch({
                component: 'socket',
                type: 'close',
                estado: 'desconectado close',
                mensaje: 'conexion Perdida',
                socket: false,
            });
        }
        socket.onerror = (event) => {
            console.log(event.data)

            store.dispatch({
                component: 'socket',
                type: 'error',
                estado: 'Error',
                mensaje: 'conexion erroenea o  Perdida',
                socket: false,
            });
        }
        socket.addEventListener('message', function (event) {

            console.log("MENSAJE SOCKET")

            try {
                var data = JSON.parse(event.data);
                console.log(data.component + " " + data.type)
                console.log(data)
                store.dispatch({
                    ...data
                });
            } catch (e) {
                console.log("ERROR")
            }

        });
    }
    AsyncStorage.getItem("usuario").then((data) => {
        usuario = data;
        if (usuario) {
            usuario = JSON.parse(usuario);
            if (usuario.key) {
                myProps.socket.key = usuario.key;
            }
        }
        if (!myProps.socket.key) {
            myProps.socket.key = "";
        }
        url = myProps.socket.url + myProps.socket.key;
        openSocket(url);
    });
}
export default SocketComp;

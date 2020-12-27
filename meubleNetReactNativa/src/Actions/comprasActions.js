
export const addCompras = (socket, datos) => async (dispatch) => {
    var objToSend = {
        component: "compras",
        type: "addCompras",
        data: datos,
        mensaje: "",
        estado: "cargando"
    };
    if (!socket) {
        dispatch({
            ...objToSend,
            estado: "error"
        })
        return;
    }
    socket.send(JSON.stringify(objToSend));
    dispatch({
        ...objToSend,
        estado: "cargando"
    })
}
export const getComprasFecha = (socket,datos) => async (dispatch) => {
    var objToSend = {
        component: "compras",
        data: datos,
        type: "getComprasFecha",
        estado: "cargando"
    };
    if (!socket) {
        dispatch({
            ...objToSend,
            estado: "error"
        })
        return;
    }
    socket.send(JSON.stringify(objToSend));
    dispatch({
        ...objToSend,
        estado: "cargando"
    })
}
export const getAllFechaCompras = (socket) => async (dispatch) => {
    var objToSend = {
        component: "compras",
        type: "getAllFechaCompras",
        estado: "cargando"
    };
    if (!socket) {
        dispatch({
            ...objToSend,
            estado: "error"
        })
        return;
    }
    socket.send(JSON.stringify(objToSend));
    dispatch({
        ...objToSend,
        estado: "cargando"
    })
}

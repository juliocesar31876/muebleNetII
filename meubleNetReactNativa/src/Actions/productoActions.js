export const registrarProducto = (socket, datos) => async (dispatch) => {
    var objToSend = {
        component: "producto",
        type: "addProducto",
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
export const AddTipoProducto = (socket, datos) => async (dispatch) => {
    var objToSend = {
        component: "producto",
        type: "addTipoProducto",
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
export const getAllTipoProducto = (socket) => async (dispatch) => {
    var objToSend = {
        component: "producto",
        type: "getAllTipoProducto",
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
export const getAllProducto = (socket) => async (dispatch) => {
    var objToSend = {
        component: "producto",
        type: "getAllProducto",
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
export const actualizarProducto = (dato) => async (dispatch) => {
    var objToSend = {
        component: "producto",
        type: "actualizarProducto",
        data:dato
    };
    dispatch({
        ...objToSend,
    })
}


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

export const addLibroCompras = (socket, datos) => async (dispatch) => {
    var objToSend = {
        component: "compras",
        type: "addLibroCompras",
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
export const addLibroComprasIngreso = (socket, datos) => async (dispatch) => {
    var objToSend = {
        component: "compras",
        type: "addLibroComprasIngreso",
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
export const finalizarLibroComprasIngreso = (socket, datos) => async (dispatch) => {
    var objToSend = {
        component: "compras",
        type: "finalizarLibroComprasIngreso",
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
export const getAllLibroComprasPendienteUsuario = (socket,datos) => async (dispatch) => {
    var objToSend = {
        component: "compras",
        data: datos,
        type: "getAllLibroComprasPendienteUsuario",
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
export const getAllLibroComprasPendiente = (socket) => async (dispatch) => {
    var objToSend = {
        component: "compras",
        type: "getAllLibroComprasPendiente",
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


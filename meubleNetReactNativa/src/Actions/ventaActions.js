export const addVenta = (socket, datos) => async (dispatch) => {
    var objToSend = {
        component: "venta",
        type: "addVenta",
        data: datos,
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
export const addVentaTrabajo = (socket, datos) => async (dispatch) => {
    var objToSend = {
        component: "venta",
        type: "addVentaTrabajo",
        data: datos,
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
export const getVentaPendiente = (socket) => async (dispatch) => {
    var objToSend = {
        component: "venta",
        type: "getVentaPendiente",
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
export const getVentaDatosRellenado = (socket) => async (dispatch) => {
    var objToSend = {
        component: "venta",
        type: "getVentaDatosRellenado",
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
export const getVentaDatosRellenar = (socket) => async (dispatch) => {
    var objToSend = {
        component: "venta",
        type: "getVentaDatosRellenar",
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
export const finalizarVenta = (socket,datos) => async (dispatch) => {
    var objToSend = {
        component: "venta",
        data:datos,
        type: "finalizarVenta",
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
export const getVentaFinalizado = (socket) => async (dispatch) => {
    var objToSend = {
        component: "venta",
        type: "getVentaFinalizado",
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
export const getVentaFecha = (socket,datos) => async (dispatch) => {
    var objToSend = {
        component: "venta",
        data:datos,
        type: "getVentaFecha",
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
export const update = (datos,modelo) => async (dispatch) => {
    var objToSend = {
        component: "venta",
        data:datos,
        modelo,
        type: "update",
        estado: "cargando"
    };
    dispatch({
        ...objToSend,
        estado: "cargando"
    })
}
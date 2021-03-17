
export const getAreaTrabajoPagosSalario = (socket, data) => async (dispatch) => {
    var objToSend = {
        component: "trabajos",
        data,
        type: "getAreaTrabajoPagosSalario",
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
export const pagoSalarioCancelado = (socket, data) => async (dispatch) => {
    var objToSend = {
        component: "trabajos",
        data,
        type: "pagoSalarioCancelado",
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
export const getSalarioFecha = (socket, data) => async (dispatch) => {
    var objToSend = {
        component: "trabajos",
        data,
        type: "getSalarioFecha",
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
export const addSalarioPersona = (socket, data) => async (dispatch) => {
    var objToSend = {
        component: "trabajos",
        data,
        type: "addSalarioPersona",
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
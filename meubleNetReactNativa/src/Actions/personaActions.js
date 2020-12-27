export const addPersona = (socket, datos) => async (dispatch) => {
    var objToSend = {
        component: "persona",
        type: "addPersona",
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
export const addPagos = (socket, datos) => async (dispatch) => {
    var objToSend = {
        component: "persona",
        type: "addPagos",
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
export const getAllPersona = (socket) => async (dispatch) => {
    var objToSend = {
        component: "persona",
        type: "getAllPersona",
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
export const getAllPagosSalario = (socket) => async (dispatch) => {
    var objToSend = {
        component: "persona",
        type: "getAllPagosSalario",
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
export const getPersonaPago = (socket, datos) => async (dispatch) => {
    var objToSend = {
        component: "persona",
        type: "getPersonaPago",
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
export const getPersonaTrabajo = (socket, datos) => async (dispatch) => {
    var objToSend = {
        component: "persona",
        type: "getPersonaTrabajo",
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
export const estadoActualizar = () => async (dispatch) => {
    var objToSend = {
        component: "persona",
        type: "actualizar",
        mensaje: "",
        estado: "cargando"
    };
    dispatch({
        ...objToSend,
        estado: "cargando"
    })
}
export const addTrabajoEnpleado = (socket, datos) => async (dispatch) => {
    var objToSend = {
        component: "persona",
        type: "addTrabajoEnpleado",
        mensaje: "",
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
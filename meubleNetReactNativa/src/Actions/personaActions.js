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
export const getTrabajoPendiente = (socket, datos) => async (dispatch) => {
    var objToSend = {
        component: "persona",
        type: "getTrabajoPendiente",
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
export const terminarTrabajoPendiente = (socket, datos) => async (dispatch) => {
    var objToSend = {
        component: "persona",
        type: "terminarTrabajoPendiente",
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
export const PagoTrabajoPendiente = (socket, datos) => async (dispatch) => {
    var objToSend = {
        component: "persona",
        type: "PagoTrabajoPendiente",
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
export const getPagoTrabajoRealizado = (socket, datos) => async (dispatch) => {
    var objToSend = {
        component: "persona",
        type: "getPagoTrabajoRealizado",
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
export const getPagoAreaPendiente = (socket, datos) => async (dispatch) => {
    var objToSend = {
        component: "persona",
        type: "getPagoAreaPendiente",
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
export const getAllPagoPendientePersona = (socket) => async (dispatch) => {
    var objToSend = {
        component: "persona",
        type: "getAllPagoPendientePersona",
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
export const getPagoSalario = (socket,data) => async (dispatch) => {
    var objToSend = {
        component: "persona",
        data,
        type: "getPagoSalario",
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
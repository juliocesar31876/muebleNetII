
export const addAreaTrabajo = (socket, datos) => async (dispatch) => {
    var objToSend = {
        component: "areaTrabajo",
        type: "addAreaTrabajo",
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
export const getAllAreaTrabajo = (socket) => async (dispatch) => {
    var objToSend = {
        component: "areaTrabajo",
        type: "getAllAreaTrabajo",
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

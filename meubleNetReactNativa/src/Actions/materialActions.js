export const addMaterial = (socket, datos) => async (dispatch) => {
    var objToSend = {
        component: "material",
        type: "addMaterial",
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
export const addTipoMaterial = (socket, datos) => async (dispatch) => {
    var objToSend = {
        component: "material",
        type: "addTipoMaterial",
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
export const getAllMaterial = (socket) => async (dispatch) => {
    var objToSend = {
        component: "material",
        type: "getAllMaterial",
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
export const getAllTipoMaterial = (socket) => async (dispatch) => {
    var objToSend = {
        component: "material",
        type: "getAllTipoMaterial",
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
export const updateMaterial = (socket, datos) => async (dispatch) => {
    var objToSend = {
        component: "material",
        type: "updateMaterial",
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
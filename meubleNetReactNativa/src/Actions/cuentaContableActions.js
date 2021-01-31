export const addcuentaContable = (socket, data) => async (dispatch) => {
    const _obj = {
        component: "cuentaContable",
        type: "addCuentaContable",
        data
    }
    if (!socket) {
        dispatch({
            ..._obj,
            estado: "error"
        })
        return;
    }
    socket.send(JSON.stringify(_obj));
    dispatch({
        ..._obj,
        estado: "cargando"
    })
}

const initialState = {
    estado: "Not Found",
    dataCompras: {},
    totalCompras: 0,
}
export default (state, action) => {
    if (!state) return initialState
    if (action.component == "compras") {
        switch (action.type) {
            case "addCompras":
                addCompras(state, action);
                break;
            case "getComprasFecha":
                getComprasFecha(state, action);
                break;
        }
        state = { ...state };
    }
    return state;
}
const addCompras = (state, action) => {
    state.estado = action.estado
    state.type = action.type
}
const getComprasFecha = (state, action) => {
    state.estado = action.estado
    state.type = action.type
    if (action.estado === "exito") {
        state.totalCompras = 0
        state.dataCompras = {}
        if (!state.dataCompras || action.data.length === 0) {
            state.dataCompras = {}
        }
        action.data.map((obj) => {
            state.dataCompras[obj.key] = obj
            state.totalCompras = state.totalCompras + (obj.precio * obj.cantidad)
        })
    }
}


const initialState = {
    estado: "Not Found",
    dataAreaTrabajo: false
}
export default (state, action) => {
    if (!state) return initialState
    if (action.component == "areaTrabajo") {
        switch (action.type) {
            case "addAreaTrabajo":
                addAreaTrabajo(state, action);
                break;
            case "getAllAreaTrabajo":
                getAllAreaTrabajo(state, action);
                break;
        }
        state = { ...state };
    }
    return state;
}
const addAreaTrabajo = (state, action) => {
    state.estado = action.estado
    state.type = action.type
    if (action.estado === "exito") {
        if (!state.dataAreaTrabajo || action.data.length === 0) {
            state.dataAreaTrabajo = {}
        }
        state.dataAreaTrabajo[action.data.key] = action.data
    }
    if (action.estado === "actualizar") {
        if (!state.dataAreaTrabajo || action.data.length === 0) {
            state.dataAreaTrabajo = {}
        }
        state.dataAreaTrabajo[action.data.key] = action.data
    }
}
const getAllAreaTrabajo = (state, action) => {
    state.estado = action.estado
    state.type = action.type
    if (action.estado === "exito") {
        if (!state.dataAreaTrabajo || action.data.length === 0) {
            state.dataAreaTrabajo = {}
        }
        action.data.map((obj) => {
            state.dataAreaTrabajo[obj.key] = obj
        })
    }
}
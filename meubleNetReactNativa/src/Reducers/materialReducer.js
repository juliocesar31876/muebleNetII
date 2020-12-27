const initialState = {
    estado: "Not Found",
    dataMaterial: false,
    dataTipoMaterial: false
}
export default (state, action) => {
    if (!state) return initialState
    if (action.component == "material") {
        switch (action.type) {
            case "addMaterial":
                addMaterial(state, action);
                break;
            case "addTipoMaterial":
                addTipoMaterial(state, action);
                break;
            case "getAllTipoMaterial":
                getAllTipoMaterial(state, action);
                break;
            case "getAllMaterial":
                getAllMaterial(state, action);
                break;
            case "updateMaterial":
                updateMaterial(state, action);
                break;
        }
        state = { ...state };
    }
    return state;
}
const updateMaterial = (state, action) => {
    state.estado = action.estado
    state.type = action.type
    if (action.estado === "exito") {
        if (!state.dataMaterial) {
            state.dataMaterial = {}
        }
        state.dataMaterial[action.data.key_material].cantidad = action.data.cantidadTotal
    }
    if (action.estado === "actualizar") {
        if (!state.dataCompras) {
            state.dataCompras = {}
        }
        state.dataMaterial[action.data.key_material].cantidad =action.data.cantidadTotal
    }
}
const addMaterial = (state, action) => {
    state.estado = action.estado
    state.type = action.type
    if (action.estado === "exito") {
        if (!state.dataMaterial) {
            state.dataMaterial = {}
        }
        state.dataMaterial[action.data.key] = action.data
    }
    if (action.estado === "actualizar") {
        if (!state.dataCompras) {
            state.dataCompras = {}
        }
        state.dataMaterial[action.data.key] = action.data
    }
}
const addTipoMaterial = (state, action) => {
    state.estado = action.estado
    state.type = action.type
    if (action.estado === "exito") {
        if (!state.dataTipoMaterial) {
            state.dataTipoMaterial = {}
        }
        state.dataTipoMaterial[action.data.key] = action.data
    }
    if (action.estado === "actualizar") {
        if (!state.dataCompras) {
            state.dataCompras = {}
        }
        state.dataTipoMaterial[action.data.key] = action.data
    }
}
const getAllTipoMaterial = (state, action) => {
    state.estado = action.estado
    state.type = action.type
    if (action.estado === "exito") {
        if (!state.dataTipoMaterial || action.data.length === 0) {
            state.dataTipoMaterial = {}
        }
        action.data.map((obj) => {
            state.dataTipoMaterial[obj.key] = obj
        })
    }
}
const getAllMaterial = (state, action) => {
    state.estado = action.estado
    state.type = action.type
    if (action.estado === "exito") {
        if (!state.dataMaterial || action.data.length === 0) {
            state.dataMaterial = {}
        }
        action.data.map((obj) => {
            state.dataMaterial[obj.key] = obj
        })
    }
}
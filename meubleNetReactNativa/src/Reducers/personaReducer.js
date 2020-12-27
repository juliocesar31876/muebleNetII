const initialState = {
    estado: "Not Found",
    dataPersonas: false,
    dataPagos: false,
    dataPagosPersona: {},
    dataTrabajoPersona: {},
    totalPagosPersona: 0,
}
export default (state, action) => {
    if (!state) return initialState
    if (action.component == "persona") {
        switch (action.type) {
            case "addPersona":
                addPersona(state, action);
                break;
            case "addTrabajoEnpleado":
                addTrabajoEnpleado(state, action);
                break;
            case "getAllPersona":
                getAllPersona(state, action);
                break;
            case "addPagos":
                addPagos(state, action);
                break;
            case "getAllPagosSalario":
                getAllPagosSalario(state, action);
                break;
            case "getPersonaPago":
                getPersonaPago(state, action);
                break;
            case "getPersonaTrabajo":
                getPersonaTrabajo(state, action);
                break
            case "actualizar":
                actualizar(state, action);
                break;
        }
        state = { ...state };
    }
    return state;
}
const actualizar = (state, action) => {
    state.estado = "Not Found"
    state.type = "Not Found"
}
const addTrabajoEnpleado = (state, action) => {
    state.estado = action.estado
    state.type = action.type
}
const addPersona = (state, action) => {
    state.estado = action.estado
    state.type = action.type
    if (action.estado === "exito") {
        if (!state.dataPersonas || action.data.length === 0) {
            state.dataPersonas = {}
        }
        state.dataPersonas[action.data.key] = action.data
    }
    if (action.estado === "actualizar") {
        if (!state.dataPersonas) {
            state.dataPersonas = {}
        }
        state.dataPersonas[action.data.key] = action.data
    }
}
const addPagos = (state, action) => {
    state.estado = action.estado
    state.type = action.type
    if (action.estado === "exito") {
        if (!state.dataPagos || action.data.length === 0) {
            state.dataPagos = {}
        }
        state.dataPagos[action.data.key] = action.data
    }
    if (action.estado === "actualizar") {
        if (!state.dataPagos) {
            state.dataPagos = {}
        }
        state.dataPagos[action.data.key] = action.data
    }
}
const getAllPersona = (state, action) => {
    state.estado = action.estado
    state.type = action.type
    if (action.estado === "exito") {
        if (!state.dataPersonas || action.data.length === 0) {
            state.dataPersonas = {}
        }
        action.data.map((obj) => {
            state.dataPersonas[obj.key] = obj
        })
    }
}
const getAllPagosSalario = (state, action) => {
    state.estado = action.estado
    state.type = action.type
    if (action.estado === "exito") {
        if (!state.dataPagos || action.data.length === 0) {
            state.dataPagos = {}
        }
        action.data.map((obj) => {
            state.dataPagos[obj.key] = obj
        })
    }
}
const getPersonaPago = (state, action) => {
    state.estado = action.estado
    state.type = action.type
    if (action.estado === "exito") {
        state.totalPagosPersona = 0
        state.dataPagosPersona = {}
        if (!state.dataPagosPersona || action.data.length === 0) {
            state.dataPagosPersona = {}
        }
        action.data.map((obj) => {
            state.dataPagosPersona[obj.key] = obj
            state.totalPagosPersona = state.totalPagosPersona + obj.efectivo
        })
    }
}
const getPersonaTrabajo = (state, action) => {
    state.estado = action.estado
    state.type = action.type
    if (action.estado === "exito") {
        state.dataTrabajoPersona = {}
        if (!state.dataTrabajoPersona || action.data.length === 0) {
            state.dataTrabajoPersona = {}
        }
        action.data.map((obj) => {
            state.dataTrabajoPersona[obj.key] = obj
        })
    }
}
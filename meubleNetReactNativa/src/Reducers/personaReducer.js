const initialState = {
    estado: "Not Found",
    dataPersonas: false,
    dataPagos: false,
    dataPagosPersona: {},
    dataTrabajoPersonaPendiente: false,
    dataPagoTrabajoPersonaPendiente: false,
    totalPagosPersona: 0,
    dataPagoAreaPendiente: false,
    dataPagoPendiente: false,
    dataPagoSalarioPersona: {
        dataPago: false,
        totalHaber: 0,
        totalDebe: 0
    }
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
            case "getTrabajoPendiente":
                getTrabajoPendiente(state, action);
                break;
            case "terminarTrabajoPendiente":
                terminarTrabajoPendiente(state, action);
                break;
            case "PagoTrabajoPendiente":
                PagoTrabajoPendiente(state, action);
                break;

            case "getPagoAreaPendiente":
                getPagoAreaPendiente(state, action);
                break;

            case "getAllPagoPendientePersona":
                getAllPagoPendientePersona(state, action);
                break;
            case "getPagoSalario":
                getPagoSalario(state, action);
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
const getTrabajoPendiente = (state, action) => {
    state.estado = action.estado
    state.type = action.type
    if (action.estado === "exito") {
        state.dataTrabajoPersonaPendiente = false
        if (!state.dataTrabajoPersonaPendiente || action.data.length === 0) {
            state.dataTrabajoPersonaPendiente = {}
        }
        action.data.map((obj) => {
            state.dataTrabajoPersonaPendiente[obj.key] = obj
        })
    }
}
const terminarTrabajoPendiente = (state, action) => {
    state.estado = action.estado
    state.type = action.type
    if (action.estado === "exito") {
        var data = {}
        Object.keys(state.dataTrabajoPersonaPendiente).map((key) => {
            var obj = state.dataTrabajoPersonaPendiente[key]
            if (obj.key !== action.data.key_trabajo_producto) {
                data[obj.key] = obj
            }
            if (obj.key == action.data.key_trabajo_producto) {
                obj.producto_terminado = true
                state.dataPagoTrabajoPersonaPendiente[obj.key] = obj
            }
        })
       /*  var totalDebe = state.dataPagoSalarioPersona.totalDebe
        var totalHaber = state.dataPagoSalarioPersona.totalHaber
        if (!state.dataPagoSalarioPersona.dataPago || action.data.length === 0) {
            state.dataPagoSalarioPersona.dataPago = {}
        }
        totalDebe = totalDebe + action.data.objTrabajo.debe
        totalHaber = totalHaber + action.data.objTrabajo.haber
        state.dataPagoSalarioPersona.totalDebe = totalDebe
        state.dataPagoSalarioPersona.totalHaber = totalHaber
        state.dataPagoSalarioPersona.dataPago[action.data.objTrabajo.key] = action.data.objTrabajo */
        state.dataTrabajoPersonaPendiente = data

    }

}
const PagoTrabajoPendiente = (state, action) => {
    state.estado = action.estado
    state.type = action.type
    if (action.estado === "exito") {
        state.dataPagoTrabajoPersonaPendiente = false
        if (!state.dataPagoTrabajoPersonaPendiente || action.data.length === 0) {
            state.dataPagoTrabajoPersonaPendiente = {}
        }
        action.data.map((obj) => {
            state.dataPagoTrabajoPersonaPendiente[obj.key] = obj
        })
    }
}

const getPagoAreaPendiente = (state, action) => {
    state.estado = action.estado
    state.type = action.type
    if (action.estado === "exito") {
        state.dataPagoAreaPendiente = false
        if (!state.dataPagoAreaPendiente || action.data.length === 0) {
            state.dataPagoAreaPendiente = {}
        }
        action.data.map((obj) => {
            state.dataPagoAreaPendiente[obj.key] = obj
        })
    }
}
const getAllPagoPendientePersona = (state, action) => {
    state.estado = action.estado
    state.type = action.type
    if (action.estado === "exito") {
        state.dataPagoPendiente = false
        if (!state.dataPagoPendiente || action.data.length === 0) {
            state.dataPagoPendiente = {}
        }
        action.data.map((obj) => {
            state.dataPagoPendiente[obj.key] = obj
        })
    }
}
const getPagoSalario = (state, action) => {
    state.estado = action.estado
    state.type = action.type
    if (action.estado === "exito") {
        state.dataPagoSalarioPersona.dataPago = false
        state.dataPagoSalarioPersona.totalDebe = 0
        state.dataPagoSalarioPersona.totalHaber = 0
        if (!state.dataPagoSalarioPersona.dataPago || action.data.length === 0) {
            state.dataPagoSalarioPersona.dataPago = {}
        }
        action.data.map((obj) => {
            state.dataPagoSalarioPersona.dataPago[obj.key] = obj
            state.dataPagoSalarioPersona.totalDebe = obj.debe + state.dataPagoSalarioPersona.totalDebe
            state.dataPagoSalarioPersona.totalHaber = obj.haber + state.dataPagoSalarioPersona.totalHaber
        })
    }
}
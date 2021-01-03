const initialState = {
    estado: "Not Found",
    dataVentaPendiente: false,
    dataVentaDatosPendiente: false,
    dataVentaDatosFinalizado: false,
    dataVentaCargoCompra: {},
    dataComprasPendienteVenta: false,
    dataVentaTrabajo: {},
    dataCredito: {},
    dataVentaFinalizado: false,
    dataVentaProducto: {},
    data: false
}
export default (state, action) => {
    if (!state) return initialState
    if (action.component == "venta") {
        switch (action.type) {
            case "addVenta":
                addVenta(state, action);
                break;
            case "addVentaTrabajo":
                addVentaTrabajo(state, action);
                break; u
            case "getVentaPendiente":
                getVentaPendiente(state, action);
                break;
            case "getVentaDatosRellenar":
                getVentaDatosRellenar(state, action);
                break;
            case "getVentaDatosRellenado":
                getVentaDatosRellenado(state, action);
                break;
            case "finalizarVenta":
                finalizarVenta(state, action);
                break;
            case "getVentaFinalizado":
                getVentaFinalizado(state, action);
                break;
            case "getVentaFecha":
                getVentaFecha(state, action);
                break;
            case "update":
                update(state, action);
                break;
            case "getAllCompraPendienteVenta":
                getAllCompraPendienteVenta(state, action);
                break;
        }
        state = { ...state };
    }
    return state;
}
const update = (state, action) => {
    for (const key in state) {
        if (key === action.modelo) {
            state[key] = action.data
            break
        }
    }
}
const addVenta = (state, action) => {
    state.estado = action.estado
    state.type = action.type
    if (action.estado === "exito") {
        if (!action.data.venta.entrega) {
            if (!state.dataVentaPendiente) {
                state.dataVentaPendiente = {}
            }
            state.dataVentaPendiente[action.data.venta.key] = action.data.venta
            state.dataVentaPendiente[action.data.venta.key]["detalle"] = action.data.detalle
        }
        state.data = action.data
    }
    if (action.estado === "actualizar") {
        state.data = action.data
    }
}
const addVentaTrabajo = (state, action) => {
    state.estado = action.estado
    state.type = action.type
    if (action.estado === "exito") {
        var data = {}
        Object.keys(state.dataVentaDatosPendiente).map((key) => {
            var obj = state.dataVentaDatosPendiente[key]
            if (action.data.key_venta !== key) {
                data[obj.key_venta] = obj
            }
        })
        state.dataVentaDatosPendiente = data
    }
    if (action.estado === "actualizar") {
        state.data = action.data
    }
}
const getVentaPendiente = (state, action) => {
    state.estado = action.estado
    state.type = action.type
    if (action.estado === "exito") {
        if (!state.dataVentaPendiente || action.data.length === 0) {
            state.dataVentaPendiente = {}
        }
        action.data.map((obj) => {
            state.dataVentaPendiente[obj.key] = obj
        })
    }
    if (action.estado === "actualizar") {
        state.data = action.data
    }
}
const getVentaDatosRellenado = (state, action) => {
    state.estado = action.estado
    state.type = action.type
    if (action.estado === "exito") {
        if (!state.dataVentaDatosFinalizado || action.data.length === 0) {
            state.dataVentaDatosFinalizado = {}
        }
        action.data.map((obj) => {
            obj.ventatrabajo.map((data) => {
                var trabajo = data.trabajos[0]
                data.trabajos = trabajo
                state.dataVentaTrabajo[data.key_venta] = data
            })
            state.dataVentaDatosFinalizado[obj.key] = obj
        })
    }
}
const getVentaDatosRellenar = (state, action) => {
    state.estado = action.estado
    state.type = action.type
    if (action.estado === "exito") {
        if (!state.dataVentaDatosPendiente || action.data.length === 0) {
            state.dataVentaDatosPendiente = {}
        }
        state.dataVentaDatosPendiente = {}
        action.data.map((obj) => {
            state.dataVentaDatosPendiente[obj.key] = obj
        })
    }
}
const finalizarVenta = (state, action) => {
    state.estado = action.estado
    state.type = action.type
    if (state.estado === "exito") {
        var data = {}
        for (const key in state.dataVentaPendiente) {
            if (key === action.data.key_venta) {
                state.dataVentaPendiente[key].entrega = true
                state.dataVentaFinalizado[key] = state.dataVentaPendiente[key]
                continue
            }
            data[key] = state.dataVentaPendiente[key]
        }
        state.dataVentaPendiente = data
    }
}
const getVentaFinalizado = (state, action) => {
    state.estado = action.estado
    state.type = action.type
    if (action.estado === "exito") {
        state.dataVentaFinalizado = {}
        if (!state.dataVentaFinalizado || action.data.length === 0) {
            state.dataVentaFinalizado = {}
        }
        action.data.map((obj) => {
            state.dataVentaFinalizado[obj.key] = obj
        })
    }
    if (action.estado === "actualizar") {
        state.data = action.data
    }
}
const getVentaFecha = (state, action) => {
    state.estado = action.estado
    state.type = action.type
    if (action.estado === "exito") {
        state.dataVentaFinalizado = {}
        if (!state.dataVentaFinalizado || action.data.length === 0) {
            state.dataVentaFinalizado = {}
        }
        action.data.map((obj) => {
            state.dataVentaFinalizado[obj.key] = obj
        })
    }
    if (action.estado === "actualizar") {
        state.data = action.data
    }
}
const getAllCompraPendienteVenta = (state, action) => {
    state.estado = action.estado
    state.type = action.type
    if (action.estado === "exito") {
        if (!state.dataComprasPendienteVenta || action.data.length === 0) {
            state.dataComprasPendienteVenta = {}
        }
        action.data.map((obj) => {
            state.dataComprasPendienteVenta[obj.key] = obj
        })
    }
}
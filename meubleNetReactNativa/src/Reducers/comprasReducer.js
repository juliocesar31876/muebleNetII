const initialState = {
    estado: "Not Found",
    dataCompras: {},
    dataComprasPendiente: {},
    dataLibroComprasPendiente: false,
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
            case "getAllLibroComprasPendiente":
                getAllLibroComprasPendiente(state, action);
                break;
            case "getAllLibroComprasPendienteUsuario":
                getAllLibroComprasPendienteUsuario(state, action);
                break;
        }
        state = { ...state };
    }
    return state;
}
const addCompras = (state, action) => {
    state.estado = action.estado
    state.type = action.type
    if (action.estado === "exito") {
        state.dataLibroComprasPendiente[action.data.key_compras_libro].compra.push(action.data)

    }
    if (action.estado === "actualizar") {
        state.dataLibroComprasPendiente[action.data.key_compras_libro].compra.push(action.data)
    }
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
const getAllLibroComprasPendiente = (state, action) => {
    state.estado = action.estado
    state.type = action.type
    if (action.estado === "exito") {
        var totalCompras = 0
        var totalIngreso = 0
        state.dataLibroComprasPendiente = {}
        if (!state.dataLibroComprasPendiente || action.data.length === 0) {
            state.dataLibroComprasPendiente = {}
        }
        action.data.map((obj) => {
            if (obj.compra !== null) {
                obj.compra.map((objcompra) => {
                    totalCompras = totalCompras + (objcompra.precio * objcompra.cantidad)
                })
            }
            if (obj.ingreso !== null) {
                obj.ingreso.map((objingreso) => {
                    totalIngreso = totalIngreso + objingreso.monto
                })
            }
            obj["totalCompras"] = totalCompras
            obj["totalIngreso"] = totalIngreso
            state.dataLibroComprasPendiente[obj.key] = obj
        })
    }
}
const getAllLibroComprasPendienteUsuario = (state, action) => {
    state.estado = action.estado
    state.type = action.type
    if (action.estado === "exito") {
        var totalCompras = 0
        var totalIngreso = 0
        state.dataLibroComprasPendiente = {}
        if (!state.dataLibroComprasPendiente || action.data.length === 0) {
            state.dataLibroComprasPendiente = {}
        }
        action.data.map((obj) => {
            if (obj.compra !== null) {
                obj.compra.map((objcompra) => {
                    if (!objcompra.ingreso) {
                        totalCompras = totalCompras + (objcompra.precio * objcompra.cantidad)
                    }
                })
            }
            if (obj.ingreso !== null) {
                obj.ingreso.map((objingreso) => {
                    totalIngreso = totalIngreso + objingreso.monto
                })
            }
            obj["totalCompras"] = totalCompras
            obj["totalIngreso"] = totalIngreso
            state.dataLibroComprasPendiente[obj.key] = obj
        })
    }
}




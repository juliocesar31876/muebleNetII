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
            case "addLibroCompras":
                addLibroCompras(state, action);
                break;
            case "addLibroComprasIngreso":
                addLibroComprasIngreso(state, action);
                break;
            case "finalizarLibroComprasIngreso":
                finalizarLibroComprasIngreso(state, action);
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
        state.dataLibroComprasPendiente[action.data.key_compras_libro].totalCompras = state.dataLibroComprasPendiente[action.data.key_compras_libro].totalCompras + (action.data.precio * action.data.cantidad)

    }
    if (action.estado === "actualizar") {
        state.dataLibroComprasPendiente[action.data.key_compras_libro].compra.push(action.data)
        state.dataLibroComprasPendiente[action.data.key_compras_libro].totalCompras = state.dataLibroComprasPendiente[action.data.key_compras_libro].totalCompras + (action.data.precio * action.data.cantidad)
    }
}
const addLibroComprasIngreso = (state, action) => {
    state.estado = action.estado
    state.type = action.type
    if (action.estado === "exito") {
        state.dataLibroComprasPendiente[action.data.compras.key_compras_libro].compra.push(action.data.compras)
        state.dataLibroComprasPendiente[action.data.compras.key_compras_libro].ingreso.push(action.data.compras_ingreso)
        state.dataLibroComprasPendiente[action.data.compras.key_compras_libro].totalIngreso = state.dataLibroComprasPendiente[action.data.compras.key_compras_libro].totalIngreso + action.data.compras_ingreso.monto
    }
    if (action.estado === "actualizar") {
        state.dataLibroComprasPendiente[action.data.compras.key_compras_libro].compra.push(action.data.compras)
        state.dataLibroComprasPendiente[action.data.compras.key_compras_libro].ingreso.push(action.data.compras_ingreso)
        state.dataLibroComprasPendiente[action.data.compras.key_compras_libro].totalIngreso = state.dataLibroComprasPendiente[action.data.compras.key_compras_libro].totalIngreso + action.data.compras_ingreso.monto
    }
}
const addLibroCompras = (state, action) => {
    state.estado = action.estado
    state.type = action.type
    if (action.estado === "exito") {
        var ingreso = []
        var compra = []
        var totalCompras = 0
        var totalIngreso = 0
        ingreso.push(action.data.compras_ingreso)
        compra.push(action.data.compras)
        totalIngreso = action.data.compras_ingreso.monto
        state.dataLibroComprasPendiente[action.data.compras_libro.key] = action.data.compras_libro
        state.dataLibroComprasPendiente[action.data.compras_libro.key]["totalCompras"] = totalCompras
        state.dataLibroComprasPendiente[action.data.compras_libro.key]["totalIngreso"] = totalIngreso
        state.dataLibroComprasPendiente[action.data.compras_libro.key]["compra"] = compra
        state.dataLibroComprasPendiente[action.data.compras_libro.key]["ingreso"] = ingreso
    }
    if (action.estado === "actualizar") {
        var ingreso = []
        var compra = []
        var totalCompras = 0
        var totalIngreso = 0
        ingreso.push(action.data.compras_ingreso)
        compra.push(action.data.compras)
        totalIngreso = action.data.compras_ingreso.monto
        state.dataLibroComprasPendiente[action.data.compras_libro.key] = action.data.compras_libro
        state.dataLibroComprasPendiente[action.data.compras_libro.key]["totalCompras"] = totalCompras
        state.dataLibroComprasPendiente[action.data.compras_libro.key]["totalIngreso"] = totalIngreso
        state.dataLibroComprasPendiente[action.data.compras_libro.key]["compra"] = compra
        state.dataLibroComprasPendiente[action.data.compras_libro.key]["ingreso"] = ingreso
    }
}
const finalizarLibroComprasIngreso = (state, action) => {
    state.estado = action.estado
    state.type = action.type
    if (action.estado === "exito") {
        var data = {}
        for (const key in state.dataLibroComprasPendiente) {
            obj = state.dataLibroComprasPendiente[key]
            if (action.data.compras_libro.key_compras_libro === obj.key) {
                continue
            }
            data[obj.key] = obj
        }
        state.dataLibroComprasPendiente = data
    }
    if (action.estado === "actualizar") {
        var data = {}
        for (const key in state.dataLibroComprasPendiente) {
            obj = state.dataLibroComprasPendiente[key]
            if (action.data.compras_libro.key_compras_libro === obj.key) {
                continue
            }
            data[obj.key] = obj
        }
        state.dataLibroComprasPendiente = data
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




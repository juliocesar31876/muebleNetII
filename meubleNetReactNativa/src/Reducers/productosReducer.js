const initialState = {
    estado: "Not Found",
    dataProducto: false,
    dataTipoProducto: false
}
export default (state, action) => {
    if (!state) return initialState
    if (action.component == "producto") {
        switch (action.type) {
            case "addProducto":
                addProducto(state, action);
                break;
            case "addTipoProducto":
                addTipoProducto(state, action);
                break;
            case "addCosteProduccion":
                addCosteProduccion(state, action);
                break;
            case "getAllTipoProducto":
                getAllTipoProducto(state, action);
                break;
            case "getAllProducto":
                getAllProducto(state, action);
                break;
            case "actualizarProducto":
                actualizarProducto(state, action);
                break;
        }
        state = { ...state };
    }
    return state;
}
const actualizarProducto = (state, action) => {
    state.dataProducto[action.data.key_producto].cantidad = action.data.cantidad - action.data.detalleVenta.cantidad
}
const addProducto = (state, action) => {
    state.estado = action.estado
    state.type = action.type
    if (action.estado === "exito") {
        if (!state.dataProducto) {
            state.dataProducto = {}
        }
        state.dataProducto[action.data.key] = action.data
        state.foto = action.data.key
    }
}
const addTipoProducto = (state, action) => {
    state.estado = action.estado
    state.type = action.type
    if (action.estado === "exito") {
        if (!state.dataTipoProducto) {
            state.dataTipoProducto = {}
        }
        state.dataTipoProducto[action.data.key] = action.data
    }
}
const addCosteProduccion = (state, action) => {
    state.estado = action.estado
    state.type = action.type
    if (action.estado === "exito") {
        var total =state.dataProducto[action.data.key_producto].totalCosteProduccion
        state.dataProducto[action.data.key_producto].totalCosteProduccion = total+(action.data.precio*action.data.cantidad)
        state.dataProducto[action.data.key_producto].coste_produccion.push(action.data)
    }
}
const getAllTipoProducto = (state, action) => {
    state.estado = action.estado
    state.type = action.type
    if (action.estado === "exito") {
        if (!state.dataTipoProducto || action.data.length === 0) {
            state.dataTipoProducto = {}
        }
        action.data.map((obj) => {
            state.dataTipoProducto[obj.key] = obj

        })
    }
}
const getAllProducto = (state, action) => {
    state.estado = action.estado
    state.type = action.type
    if (action.estado === "exito") {
        if (!state.dataProducto || action.data.length === 0) {
            state.dataProducto = {}
        }
        action.data.map((obj) => {
            var totalCosteProduccion = 0
            if (obj.coste_produccion === null) {
                obj.coste_produccion = []
            }
            obj.coste_produccion.map((data) => {
                var cantidad = Number(data.cantidad)
                totalCosteProduccion = totalCosteProduccion + (data.precio * cantidad)
            })
            obj["totalCosteProduccion"] = totalCosteProduccion
            state.dataProducto[obj.key] = obj

        })
    }
}
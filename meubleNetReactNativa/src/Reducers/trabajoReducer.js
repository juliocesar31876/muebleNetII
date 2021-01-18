const initialState = {
    estado: "Not Found",
    dataAreaPagoPendiente: false,
}
export default (state, action) => {
    if (!state) return initialState
    if (action.component == "trabajos") {
        switch (action.type) {
            case "getAreaTrabajoPagosSalario":
                getAreaTrabajoPagosSalario(state, action);
                break;
            case "pagoSalarioCancelado":
                pagoSalarioCancelado(state, action);
                break;
        }
        state = { ...state };
    }
    return state;
}
const getAreaTrabajoPagosSalario = (state, action) => {
    state.estado = action.estado
    state.type = action.type
    if (action.estado === "exito") {
        state.dataAreaPagoPendiente = false
        if (!state.dataAreaPagoPendiente || action.data.length === 0) {
            state.dataAreaPagoPendiente = {}
        }
        action.data.map((obj) => {
            state.dataAreaPagoPendiente[obj.key] = obj
            var dato = {}
            obj.pago_salario.map((objpago) => {
                dato[objpago.key] = objpago
            })
            obj.pago_salario = dato
        })
    }
}
const pagoSalarioCancelado = (state, action) => {
    state.estado = action.estado
    state.type = action.type
    if (action.estado === "exito") {
        state.dataAreaPagoPendiente[action.data.key_persona][action.data.key_pago_salario].cancelado = true
    }
}

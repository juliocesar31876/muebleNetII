const initialState = {
    estado: "Not Found",
    dataAreaPagoPendiente: false,
    dataPagoSalarioFecha: {
        dataPago: false,
        totalHaber: 0,
        totalDebe: 0
    }
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
            case "getSalarioFecha":
                getSalarioFecha(state, action);
                break;
            case "addSalarioPersona":
                addSalarioPersona(state, action);
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
        state.dataAreaPagoPendiente[action.data.key_persona].pago_salario[action.data.key_pago_salario].cancelado = true
    }
}
const getSalarioFecha = (state, action) => {
    state.estado = action.estado
    state.type = action.type
    if (action.estado === "exito") {
        state.dataPagoSalarioFecha.dataPago = false
        state.dataPagoSalarioFecha.totalDebe = 0
        state.dataPagoSalarioFecha.totalHaber = 0
        if (!state.dataPagoSalarioFecha.dataPago || action.data.length === 0) {
            state.dataPagoSalarioFecha.dataPago = {}
        }
        action.data.map((obj) => {
            state.dataPagoSalarioFecha.dataPago[obj.key] = obj
            state.dataPagoSalarioFecha.totalDebe = obj.debe + state.dataPagoSalarioFecha.totalDebe
            state.dataPagoSalarioFecha.totalHaber = obj.haber + state.dataPagoSalarioFecha.totalHaber
        })
    }
}
const addSalarioPersona = (state, action) => {
    state.estado = action.estado
    state.type = action.type
}
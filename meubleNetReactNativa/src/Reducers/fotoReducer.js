const initialState = {
    fotos: []
}
export default (state, action) => {
    if (!state) return initialState
    if (action.component === "foto") {
        if (action.type === "cambio") {
            state.fotos.map((obj, key) => {
                state.fotos[key].estado = "cambio"
            })
            return {
                ...state
            }
        }

    }

    return state
} 
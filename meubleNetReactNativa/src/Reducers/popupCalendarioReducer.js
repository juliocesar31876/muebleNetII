const initialState = {
    estado : false,
    onChange:false,
    tipo:false,
}
export default (state, action) => {
    if (!state) return initialState
    if (action.component === "popupCalendario") {
        return {
            ...state,
            ...action
        }
    }
    return state
} 
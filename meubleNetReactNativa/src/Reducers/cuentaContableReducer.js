const initialState = {
    estado: "Not Found",
    dataAreaTrabajo: false
}
export default (state, action) => {
    if (!state) return initialState
    if (action.component == "cuentaContable") {
        switch (action.type) {
            case "addcuentaContable":
                addcuentaContable(state, action);
                break;

        }
        state = { ...state };
    }
    return state;
}
const addcuentaContable = (state, action) => {
    state.estado = action.estado
    state.type = action.type
}

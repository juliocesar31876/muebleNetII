const initialState = {
    estado: "Not Found",
    data: false
}
export default (state, action) => {
    if (!state) return initialState
    if (action.component == "pagina") {
        switch (action.type) {
            case "setPagina":
                setPagina(state, action);
                break;

        }
        state = { ...state };
    }
    return state;
}
const setPagina = (state, action) => {
    state.data = action.data
}

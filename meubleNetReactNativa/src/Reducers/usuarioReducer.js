import { AsyncStorage } from 'react-native';

const initialState = {
    estado: "Not Found",
    usuarioLog: false,
    keyUsuario: ""
}

export default (state, action) => {
    if (!state) return initialState

    if (action.component == "usuario") {
        switch (action.type) {
            case "login":
                login(state, action);
                break;
         
        }
        state = { ...state };
    }
    return state;
}

const login = (state, action) => {
    state.estado = action.estado
    if (action.estado === "exito") {
     AsyncStorage.setItem("usuario", JSON.stringify(action.data));
    }
   
}

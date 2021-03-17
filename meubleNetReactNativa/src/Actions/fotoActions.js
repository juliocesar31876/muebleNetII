export const actualizarFoto = (foto) => async (dispatch) => {

    dispatch({
        type: "cambio",
        component: "foto",
        foto
    })

}
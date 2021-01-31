export const cerrarPopupCalendario = () => async (dispatch) =>{
    dispatch({

        component:"popupCalendario", 
        estado:false,
        type:"cerrarPopupCalendario",
        barra:true
    })

}
export const abrirPopupCalendario = (obj,tipos,actual) => async (dispatch) =>{
    dispatch({
        component:"popupCalendario", 
        estado:true,
        type:"abrirPopupCalendario",
        onChange:obj,
        tipo:tipos,
        actual
    })

}
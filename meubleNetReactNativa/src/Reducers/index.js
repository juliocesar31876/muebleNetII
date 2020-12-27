import { combineReducers } from 'redux';
import navigationReducer from './navigationReducer';
import socketReducer from './socketReducer';
import usuarioReducer from './usuarioReducer';
import productosReducer from './productosReducer';
import popupReducer from './popupReducer';
import sucursalReducer from './sucursalReducer';
import areaTrabajoReducer from './areaTrabajoReducer';
import popupCalendarioReducer from './popupCalendarioReducer';
import calendarioReducer from './calendarioReducer';
import personaReducer from './personaReducer';
import comprasReducer from './comprasReducer';
import materialReducer from './materialReducer';
import ventaReducer from './ventaReducer';
export default combineReducers({
    navigationReducer,
    socketReducer,
    usuarioReducer,
    productosReducer,
    popupReducer,
    sucursalReducer,
    areaTrabajoReducer,
    popupCalendarioReducer,
    calendarioReducer,
    personaReducer,
    comprasReducer,
    materialReducer,
    ventaReducer
});
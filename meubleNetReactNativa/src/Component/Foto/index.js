import React from 'react';
import { Image } from 'react-native';
import { connect } from 'react-redux';
import Props from '../../nativeSocket/myPropsServer.json'
const Foto = (props) => {
  var fotFin = false;
  var nombre = ""
  var foto = false

  for (const key in props.state.fotoReducer.fotos) {
    var obj = props.state.fotoReducer.fotos[key]
    if (obj.nombre === props.nombre) {
      if (obj.estado === "cambio") {
        foto = (<Image source={{ uri: Props.images.urlImage + props.nombre + `?tipo=${props.tipo}&date=${Date.now()}` }} style={{ width: "100%", height: "100%", fill: "#000" }} />);
        nombre = props.nombre;
        fotFin = foto;
        var obj = { nombre: props.nombre, foto: foto, estado: "exito" };
        props.state.fotoReducer.fotos[key] = obj;
        fotFin = foto;
      }
    }
  }

  if (!fotFin) {
    foto = (<Image
      source={{ uri: Props.images.urlImage + props.nombre + `?tipo=${props.tipo}&date=${Date.now()}` }}
      style={{ width: "100%", height: "100%", fill: "#000" }} />);
    var obj = { nombre: props.nombre, foto: foto, estado: "exito", };
    props.state.fotoReducer.fotos.push(obj);
    fotFin = foto;
  }
  return (
    fotFin
  );
}
const initStates = (state) => {
  return { state }
};
export default connect(initStates)(Foto);

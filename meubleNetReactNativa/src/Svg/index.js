import React from 'react';
import { Text } from 'react-native';
import Volver from '../img/volver.svg';
import Arreglo from '../img/arreglo.svg';
import Logo from '../img/logo.svg';
import Almacen from '../img/iconoAlmacen.svg';
import Empleado from '../img/iconoEmpleado.svg';
import Ventas from '../img/iconoVentas.svg';
import Productos from '../img/iconoProductos.svg';
import Area from '../img/iconoAreaTrabajo.svg';
import Camara from '../img/camara.svg';
import Compras from '../img/compras.svg';
import Editar from '../img/editar.svg';
import Cerrar from '../img/cerrar.svg';
import Bien from '../img/bien.svg';
import TotalVenta from '../img/totalVenta.svg';
import VentasProducto from '../img/ventasProducto.svg';
import AddVenta from '../img/addVenta.svg';
import Persona from '../img/persona.svg';
import Reporte from '../img/reporte.svg';
import ActualizarVista from '../img/actualizarVista.svg';
import Add from '../img/add.svg';

const Svg = (props) => {

    switch (props.name) {
        case "add":
            return <Add style={props.style} />
        case "actualizarVista":
            return <ActualizarVista style={props.style} />
        case "addVenta":
            return <AddVenta style={props.style} /> 
              case "reporte ventas":
            return <Reporte style={props.style} />
        case "ventasProducto":
            return <VentasProducto style={props.style} />
        case "totalVenta":
            return <TotalVenta style={props.style} />
        case "persona":
            return <Persona style={props.style} />
        case "personales":
            return <Empleado style={props.style} />
        case "bien":
            return <Bien style={props.style} />
        case "editar":
            return <Editar style={props.style} />
        case "cerrar":
            return <Cerrar style={props.style} />
        case "compras":
            return <Compras style={props.style} />
        case "almacen":
            return <Almacen style={props.style} />
        case "productos":
            return <Productos style={props.style} />
        case "ventas":
            return <Ventas style={props.style} />
        case "arreglo":
            return <Arreglo style={props.style} />
        case "Logo":
            return <Logo style={props.style} />
        case "volver":
            return <Volver style={props.style} />
        case "area trabajo":
            return <Area style={props.style} />
        case "camara":
            return <Camara style={props.style} />
        default:
            return <Text>SVG</Text>
    }
}



export default Svg;

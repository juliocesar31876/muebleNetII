import InicioPage from './InicioPage';
import CargaPage from './CargaPage';
import LoginPage from './LoginPage';
import ProductosPage from './ProductosPage';
import AreaTrabajoPage from './AreaTrabajoPage';
import PersonaPage from './PersonaPage';
import ComprasPage from './ComprasPage';
import VentasPage from './VentasPage';
import AlmacenPage from './AlmacenPage';
import ReporteVentaPage from './ReporteVentaPage';
import VistaProductoPage from './ProductosPage/Modelos/VistaProductoPage';
import VentaProductoPage from './VentasPage/VentaProductoPage';
import RellenarDatoVentaPage from './RellenarDatoVentaPage';
import MenuDatoVentaPage from './RellenarDatoVentaPage/MenuDatoVentaPage';
import VentaPerdidaPage from './RellenarDatoVentaPage/VentaPerdidaPage';
import VentaTrabajoPage from './RellenarDatoVentaPage/VentaTrabajoPage';
import VentaCompraPage from './RellenarDatoVentaPage/VentaCompraPage';
export const getPages = () => {
    return {
        CargaPage,
        InicioPage,
        LoginPage,
        ProductosPage,
        AreaTrabajoPage,
        PersonaPage,
        ComprasPage,
        VentasPage,
        AlmacenPage,
        ReporteVentaPage,
        VistaProductoPage,
        VentaProductoPage, 
        RellenarDatoVentaPage,
        MenuDatoVentaPage,
        VentaCompraPage,
        VentaPerdidaPage,
        VentaTrabajoPage   
    }
}
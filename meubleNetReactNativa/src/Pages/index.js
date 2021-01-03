import InicioPage from './InicioPage';
import CargaPage from './CargaPage';
import LoginPage from './LoginPage';
import ProductosPage from './ProductosPage';
import CosteProduccionPage from './ProductosPage/Modelos/CosteProduccionPage';
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
import VentaComprasPage from './RellenarDatoVentaPage/VentaComprasPage';
import MenuReporteVentaPage from './MenuReporteVentaPage';
import ListaComprasPage from './MenuReporteVentaPage/ListaComprasPage';
import InformeVentaPage from './MenuReporteVentaPage/InformeVentaPage';
import VerLibroComprasPage from './MenuReporteVentaPage/VerLibroComprasPage';
import RegistrarPagosComprasPage from './MenuReporteVentaPage/RegistrarPagosComprasPage';
import AddSaldoCompradorPage from './MenuReporteVentaPage/AddSaldoCompradorPage';
import InicioCompraPage from './InicioCompraPage';
import ComprasVentaPage from './InicioCompraPage/ComprasVentaPage';
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
        VentaPerdidaPage,
        VentaTrabajoPage,
        MenuReporteVentaPage,
        InformeVentaPage,
        VentaComprasPage,
        InicioCompraPage,
        ComprasVentaPage,
        RegistrarPagosComprasPage,
        AddSaldoCompradorPage,
        CosteProduccionPage,
        VerLibroComprasPage,
        ListaComprasPage
    }
}
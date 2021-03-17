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
import VerificarCosteProduccionPage from './RellenarDatoVentaPage/VerificarCosteProduccionPage';
import MenuReporteVentaPage from './MenuReporteVentaPage';
import ListaComprasPage from './MenuReporteVentaPage/ListaComprasPage';
import InformeVentaPage from './MenuReporteVentaPage/InformeVentaPage';
////////////////////////armador compras
import VerLibroComprasPage from './RegistrarPagosComprasPage/VerLibroComprasPage';
import RegistrarPagosComprasPage from './RegistrarPagosComprasPage';
import AddSaldoCompradorPage from './RegistrarPagosComprasPage/AddSaldoCompradorPage';
import InicioCompraPage from './InicioCompraPage';
import ComprasVentaPage from './InicioCompraPage/ComprasVentaPage';
////////////////////////armador usuario
import InicioArmadorPage from './InicioArmadorPage';
import PagoSalarioPage from './PagoSalarioPage';
import TrabajosArmadorPage from './InicioArmadorPage/TrabajosArmadorPage';
import SalarioTrabajoPage from './SalarioTrabajoPage';
import ListaPagosPage from './PagoSalarioPage/ListaPagosPage';
import CuentaContablePage from './CuentaContablePage';
import PerfilPage from './PerfilPage';
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
        ListaComprasPage,
        VerificarCosteProduccionPage,
        InicioArmadorPage,
        TrabajosArmadorPage,
        SalarioTrabajoPage,
        PagoSalarioPage,
        ListaPagosPage,
        CuentaContablePage,
        PerfilPage,
    }
}
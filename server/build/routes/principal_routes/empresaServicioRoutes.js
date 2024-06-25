"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const empresaServicioController_1 = __importDefault(require("../../controllers/principal_controllers/empresaServicioController"));
class EmpresaServicioRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        //consultas para las  - 
        this.router.get('/api/empresaservicio', empresaServicioController_1.default.listarEmpresasServicios);
        //  this.router.get('/api/empresaservicio/transportepersonas',empresaServicioController.listarEmpresasServicios_trans_personas)
        this.router.get('/api/empresaservicio/detalle/:id', empresaServicioController_1.default.ObtenerDetalleEmpresaServicio); //ObtenerDetalleEmpresaServicio
        this.router.get('/api/empresaservicio/:id', empresaServicioController_1.default.ObtenerEmpresaServicio); //ObtenerDetalleEmpresaServicio
        this.router.post('/api/empresaservicio', empresaServicioController_1.default.CrearEmpresaServicio);
        this.router.put('/api/empresaservicio/:id', empresaServicioController_1.default.ModificarEmpresaServicio);
        //consulta todas las resoluciones de la empresa Servicio
        this.router.get('/api/empresaservicio/resoluciones/:id', empresaServicioController_1.default.ObtnerResolucionesDeEmpresaServicio); //ObtenerDetalleEmpresaServicio
        //lista el nombre de las resoluciones correspondientes a la empresa servicio
        this.router.get('/api/empresaservicio/resoluciones/lista/:id', empresaServicioController_1.default.ListarNombreResolucionesDeEmpresaServicio);
        //consulta de la existencia de una empresa buscada por ruc y tipo de servicio
        this.router.get('/api/empresaservicio/:id_tipo_servicio/:empresa_ruc', empresaServicioController_1.default.BuscarEmpresaPorRuc_TipoServicio);
        //ingresar resolucion al conjunto de resoluciones
        this.router.post('/api/empresaservicio/resoluciones', empresaServicioController_1.default.CrearResolucionEmpresaServicio);
        //obtener la lista de los conductores que pertenecen a una empresa por servicio
        this.router.get('/api/empresaservicio/conductores/lista/:id', empresaServicioController_1.default.ObtenerListaConductores);
        //obtener empresa por placa 
        this.router.get('/api/empresaservicio/buscar/placa/:placa', empresaServicioController_1.default.ObtenerEmpresaPorPlaca);
        //obtener empresas por ruta
        this.router.get('/api/empresaservicio/detalle/rutas/lista', empresaServicioController_1.default.listarEmpresasPorRuta);
        //obtener las cantidades de las empresas que pertencen a un tipo de servico 
        this.router.get('/api/empresaservicio/detalle/cantidad/tiposervicio', empresaServicioController_1.default.CantidadDeEmpresasPorTipoServicio);
        //cantidad de empresas que se encunentran en algun estado de Activas, Alertas o de Baja
        this.router.get('/api/empresaservicio/detalle/estado/cantidad', empresaServicioController_1.default.CantidadEstadoEmpresas);
        //cantidad de empresas por ruta 
        this.router.get('/api/empresaservicio/detalle/rutas/cantidad', empresaServicioController_1.default.CantidadDeEmpresasPorRuta);
        //lista de empresas que pasan por un origen de ruta
        this.router.get('/api/empresaservicio/detalle/lista/ruta/origen/:origen', empresaServicioController_1.default.listarEmpresasPorRutaOrigen);
        //lista de empresas que pasan por un destino
        this.router.get('/api/empresaservicio/detalle/lista/ruta/destino/:destino', empresaServicioController_1.default.listarEmpresasPorRutaDestino);
        //lista de empresas que pasan por un origen y destino
        this.router.get('/api/empresaservicio/detalle/lista/ruta/trayecto/:origen/:destino', empresaServicioController_1.default.listarEmpresasPorRutaOrigenDestino);
    }
}
const empresaServicioRoutes = new EmpresaServicioRoutes;
exports.default = empresaServicioRoutes.router;

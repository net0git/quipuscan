"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const vehiculoController_1 = __importDefault(require("../../controllers/principal_controllers/vehiculoController"));
class TucRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        //consultas para los vehiculos- 
        this.router.get('/api/vehiculo', vehiculoController_1.default.listarVehiculos);
        this.router.get('/api/vehiculo/empresaservicio/:id', vehiculoController_1.default.listarVehiculosDetallePorEmpresa);
        this.router.get('/api/vehiculo/empresaservicio', vehiculoController_1.default.listarTotalVehiculosPorEmpresa);
        this.router.get('/api/vehiculo/:id', vehiculoController_1.default.ObtenerVehiculo);
        this.router.get('/api/vehiculo/placa/:placa', vehiculoController_1.default.ObtenerVehiculoPorPlaca);
        this.router.get('/api/vehiculo/historial/:placa', vehiculoController_1.default.ObtenerHistorialVehicularPorPlaca);
        this.router.post('/api/vehiculo', vehiculoController_1.default.CrearVehiculo);
        this.router.put('/api/vehiculo/:id', vehiculoController_1.default.ModificarVehiculo);
        //modificar tuc del vehiculo
        this.router.put('/api/vehiculo/modificar/tuc/:id', vehiculoController_1.default.ModificarTucVehiculo);
        //dar de baja el vehiculo
        this.router.put('/api/vehiculo/baja/:id', vehiculoController_1.default.BajaVehiculo);
        //listar vehiculos por ruta
        this.router.get('/api/vehiculo/reporte/ruta/lista', vehiculoController_1.default.listarVehiculosPorRuta);
        //cantidad de vehiculos por ruta
        this.router.get('/api/vehiculo/detalle/cantidad/ruta', vehiculoController_1.default.CantidadVehiculosPorRuta);
        //cantidades de vehiculos Por tipo de servicio 
        this.router.get('/api/vehiculo/detalle/cantidad/tiposervicio', vehiculoController_1.default.CantidadVehiculosPorTipoServicio);
        //lista de vehiculos que pasan por un oriten 
        this.router.get('/api/vehiculo/detalle/lista/ruta/origen/:origen', vehiculoController_1.default.listarVehiculosPorOrigenRuta);
        //lista de vehiculos que pasan por un destino
        this.router.get('/api/vehiculo/detalle/lista/ruta/destino/:destino', vehiculoController_1.default.listarVehiculosPorDestinoRuta);
        //lista de vehiculos que pasan por un origen y destino
        this.router.get('/api/vehiculo/detalle/lista/ruta/trayecto/:origen/:destino', vehiculoController_1.default.listarVehiculosPorOrigenDestinoRuta);
    }
}
const tucRoutes = new TucRoutes;
exports.default = tucRoutes.router;

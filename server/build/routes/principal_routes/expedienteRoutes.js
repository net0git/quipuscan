"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const expedienteController_1 = __importDefault(require("../../controllers/principal_controllers/expedienteController"));
class ExpedienteRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        //consultas para personas 
        this.router.get('/api/expediente/listaporinventario/:id_inventario', expedienteController_1.default.listarExpedientesXidInventario); //
        this.router.get('/api/expediente/listatotalporinventario/:id_inventario', expedienteController_1.default.listarTotalExpedientesXidInventario); //
        this.router.get('/api/expediente/:id', expedienteController_1.default.ObtenerExpedienteDetalleXid);
        this.router.get('/api/expediente/limpiar/:id_expediente', expedienteController_1.default.LimpiarProcesoExpediente);
        this.router.post('/api/expediente', expedienteController_1.default.CrearExpediente);
        this.router.put('/api/expediente/:id', expedienteController_1.default.ModificarExpediente);
        this.router.put('/api/expediente/preparacion/:id', expedienteController_1.default.ModificarPreparacionExpediente);
        this.router.put('/api/expediente/estado_preparado/:id', expedienteController_1.default.ModificarEstadoPreparado);
        this.router.put('/api/expediente/estado_digitalizado/:id', expedienteController_1.default.ModificarEstadoDigitalizado);
        this.router.put('/api/expediente/estado_indizado/:id', expedienteController_1.default.ModificarEstadoIndizado);
        this.router.put('/api/expediente/estado_controlado/:id', expedienteController_1.default.ModificarEstadoControlado);
        this.router.put('/api/expediente/estado_fedatado/:id', expedienteController_1.default.ModificarEstadoFedatado);
        this.router.delete('/api/expediente/:id', expedienteController_1.default.EliminarExpediente);
    }
}
const expedienteRoutes = new ExpedienteRoutes;
exports.default = expedienteRoutes.router;

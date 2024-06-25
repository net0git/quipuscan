"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fedatarioController_1 = __importDefault(require("../../controllers/principal_controllers/fedatarioController"));
class InventarioRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        //consultas para personas 
        this.router.get('/api/fedatar', fedatarioController_1.default.listarFedatados);
        this.router.get('/api/fedatar/detalle/expediente/:id_expediente', fedatarioController_1.default.ObtenerExpedienteDetalleXidExpediente);
        this.router.get('/api/fedatar/estado/:id_expediente', fedatarioController_1.default.ObtenerFedatadoEstadoIdExpediente);
        this.router.get('/api/fedatar/responsables/:id_expediente', fedatarioController_1.default.ObtenerResponsablesExpediente);
        this.router.post('/api/fedatar', fedatarioController_1.default.CrearFedatado);
    }
}
const inventarioRoutes = new InventarioRoutes;
exports.default = inventarioRoutes.router;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const indizacionController_1 = __importDefault(require("../../controllers/principal_controllers/indizacionController"));
class InventarioRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        //consultas para personas 
        this.router.get('/api/indizacion', indizacionController_1.default.listarIndizaciones);
        this.router.get('/api/indizacion/detalleporexpediente/:id_expediente', indizacionController_1.default.ObtenerDetalleIndizacinXidExpediente);
        //ModificarIndizacionIndex
        this.router.post('/api/indizacion', indizacionController_1.default.CrearIndizacion);
        this.router.put('/api/indizacion/:id', indizacionController_1.default.ModificarIndizacion);
        this.router.put('/api/indizacion/modificar/:id', indizacionController_1.default.ModificarIndizacionIndex);
    }
}
const inventarioRoutes = new InventarioRoutes;
exports.default = inventarioRoutes.router;

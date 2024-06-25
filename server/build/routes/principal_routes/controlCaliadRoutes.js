"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controlCalidadController_1 = __importDefault(require("../../controllers/principal_controllers/controlCalidadController"));
class ControlCalidadRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    } //ObtenerDetalleControlXidExpediente
    config() {
        //consultas para personas 
        this.router.get('/api/controlcalidad/:id_expediente', controlCalidadController_1.default.ObtenerDetalleControlXidExpediente);
        this.router.get('/api/controlcalidad', controlCalidadController_1.default.listarCotrolesCalidad);
        this.router.post('/api/controlcalidad', controlCalidadController_1.default.CrearControlCalidad);
    }
}
const controlCalidadRoutes = new ControlCalidadRoutes;
exports.default = controlCalidadRoutes.router;

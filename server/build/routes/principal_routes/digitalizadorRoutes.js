"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const digitalizacionController_1 = __importDefault(require("../../controllers/principal_controllers/digitalizacionController"));
class DigitalizacionRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        //consultas para personas 
        this.router.get('/api/digitalizacion/listaporidexpediente/:id_expediente', digitalizacionController_1.default.ObtenerDatosDigitalizadoXidExpediente);
        this.router.get('/api/digitalizacion/:id_digitalizacion', digitalizacionController_1.default.ObtenerDatosDigitalizadoID);
        this.router.put('/api/digitalizacion/modificar/documento/:id_digitalizacion', digitalizacionController_1.default.ModificarDocumentoDigitalizado);
        this.router.post('/api/digitalizacion', digitalizacionController_1.default.CrearDigitalizacion);
        this.router.get('/api/digitalizacion/documento/:id_expediente', digitalizacionController_1.default.ObtenerDocumentoDigitalizadoXidExpediente);
    }
}
const digitalizacionRoutes = new DigitalizacionRoutes;
exports.default = digitalizacionRoutes.router;

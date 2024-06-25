"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const certificadoController_1 = __importDefault(require("../../controllers/principal_controllers/certificadoController"));
class CertificadoRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        //consultas para las certificados - 
        this.router.get('/api/certificado', certificadoController_1.default.listarCertificados);
        this.router.get('/api/certificado/:id', certificadoController_1.default.ObtenerCertificado);
        this.router.post('/api/certificado', certificadoController_1.default.CrearCertificado);
        this.router.put('/api/certificado/:id', certificadoController_1.default.ModificarCertificado);
    }
}
const certificadoRoutes = new CertificadoRoutes;
exports.default = certificadoRoutes.router;

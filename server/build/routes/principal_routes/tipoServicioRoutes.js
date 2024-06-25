"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tipoServicioController_1 = __importDefault(require("../../controllers/principal_controllers/tipoServicioController"));
class TipoServicioRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        //consultas para las tuc - 
        this.router.get('/api/tiposervicio', tipoServicioController_1.default.listarTiposServicios);
        this.router.get('/api/tiposervicio/:id', tipoServicioController_1.default.ObtenerTipoServicio);
        this.router.post('/api/tiposervicio', tipoServicioController_1.default.CrearTipoServicio);
        this.router.put('/api/tiposervicio/:id', tipoServicioController_1.default.ModificarTipoServicio);
    }
}
const tipoServicioRoutes = new TipoServicioRoutes;
exports.default = tipoServicioRoutes.router;

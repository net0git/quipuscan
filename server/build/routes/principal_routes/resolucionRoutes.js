"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const resolucionController_1 = __importDefault(require("../../controllers/principal_controllers/resolucionController"));
class TucRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        //consultas para las resoluciones - 
        this.router.get('/api/resolucion', resolucionController_1.default.listarResolucion);
        this.router.get('/api/resolucion/:id', resolucionController_1.default.ObtenerResolucion);
        this.router.get('/api/resolucion/detalle/:nro_resolucion/:anio_resolucion', resolucionController_1.default.ObtenerResolucionPorNroAnio);
        this.router.post('/api/resolucion', resolucionController_1.default.CrearResolucion);
        this.router.put('/api/resolucion/:id', resolucionController_1.default.ModificarResolucion);
    }
}
const tucRoutes = new TucRoutes;
exports.default = tucRoutes.router;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tucController_1 = __importDefault(require("../../controllers/principal_controllers/tucController"));
class EmpresaSeviciosResolucionesRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        //consultas para las tuc - 
        this.router.get('/api/tuc', tucController_1.default.listarTuc);
        this.router.get('/api/tuc/:id', tucController_1.default.ObtenerTuc);
        this.router.post('/api/tuc', tucController_1.default.CrearTuc);
        this.router.put('/api/tuc/:id', tucController_1.default.ModificarTuc);
    }
}
const empresaSeviciosResolucionesRoutes = new EmpresaSeviciosResolucionesRoutes;
exports.default = empresaSeviciosResolucionesRoutes.router;

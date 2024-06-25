"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tucController_1 = __importDefault(require("../../controllers/principal_controllers/tucController"));
class TucRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        //consultas para las tuc - 
        this.router.get('/api/tuc', tucController_1.default.listarTuc);
        this.router.get('/api/tuc/:id', tucController_1.default.ObtenerTuc);
        this.router.get('/api/tuc/buscar/:nro_tuc', tucController_1.default.ObtenerTucPorNumero);
        this.router.get('/api/tuc/listar/:placa', tucController_1.default.listrTucPorPlaca);
        this.router.post('/api/tuc', tucController_1.default.CrearTuc);
        this.router.put('/api/tuc/:id', tucController_1.default.ModificarTuc);
        this.router.put('/api/tuc/modificar/modal/:id', tucController_1.default.ModificarTucModal);
    }
}
const tucRoutes = new TucRoutes;
exports.default = tucRoutes.router;

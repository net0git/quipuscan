"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const marcaController_1 = __importDefault(require("../../controllers/principal_controllers/marcaController"));
class MarcasRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        //consultas para de marcas - no se puede eliminar una marca por motivos de seguridad y relacion de tablas
        this.router.get('/api/marca', marcaController_1.default.listarMarcas);
        this.router.get('/api/marca/:id', marcaController_1.default.ObtenerMarca);
        this.router.post('/api/marca/detalle', marcaController_1.default.ObtenerMarcaPorNombre);
        this.router.post('/api/marca', marcaController_1.default.CrearMarca);
        this.router.put('/api/marca/:id', marcaController_1.default.ModificarMarca);
    }
}
const marcasRoutes = new MarcasRoutes;
exports.default = marcasRoutes.router;

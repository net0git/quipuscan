"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const inventarioController_1 = __importDefault(require("../../controllers/principal_controllers/inventarioController"));
class InventarioRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        //consultas para personas 
        this.router.get('/api/inventario', inventarioController_1.default.listarInventario);
        this.router.get('/api/inventario/listadetallada', inventarioController_1.default.listarInventarioDetalle);
        this.router.get('/api/inventario/detalle/:id', inventarioController_1.default.ObtenerInventarioXid);
        this.router.post('/api/inventario', inventarioController_1.default.CrearInventario);
        this.router.put('/api/inventario/:id', inventarioController_1.default.ModificarInventario);
        this.router.put('/api/inventario/modificarestado/:id', inventarioController_1.default.ModificarEstadoInventario);
    }
}
const inventarioRoutes = new InventarioRoutes;
exports.default = inventarioRoutes.router;

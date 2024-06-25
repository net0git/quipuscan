"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const modeloController_1 = __importDefault(require("../../controllers/principal_controllers/modeloController"));
class ModeloRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        //consultas para personas - no se puede eliminar un modelo por motivos de seguridad y relacion de tablas 
        this.router.get('/api/modelo', modeloController_1.default.listarModelos);
        this.router.get('/api/modelo/:id', modeloController_1.default.ObtenerModelo);
        this.router.get('/api/modelo/grupo/:nombre_marca', modeloController_1.default.listarModelosPorNombreMarca);
        this.router.post('/api/modelo/detalle', modeloController_1.default.ObtenerModeloPorNombre);
        this.router.get('/api/modelo/lista/:id_marca', modeloController_1.default.ObtenerModeloPorIdMarca);
        this.router.post('/api/modelo', modeloController_1.default.CrearModelo);
        this.router.put('/api/modelo/:id', modeloController_1.default.ModificarModelo);
    }
}
const modeloRoutes = new ModeloRoutes;
exports.default = modeloRoutes.router;

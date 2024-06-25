"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tipoInfraestructuraControllore_1 = __importDefault(require("../../controllers/principal_controllers/tipoInfraestructuraControllore"));
class TipoInfraestructuraRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        //consultas para los tipos de infraestructura - 
        this.router.get('/api/tipoinfraestructura', tipoInfraestructuraControllore_1.default.listarTipoInfraestructura);
        this.router.get('/api/tipoinfraestructura/:id', tipoInfraestructuraControllore_1.default.ObtenerTipoInfraestructura);
        this.router.post('/api/tipoinfraestructura', tipoInfraestructuraControllore_1.default.CrearTipoInfraestructura);
        this.router.put('/api/tipoinfraestructura/:id', tipoInfraestructuraControllore_1.default.ModificarTipoInfraestructura);
    }
}
const tipoInfraestructuraRoutes = new TipoInfraestructuraRoutes;
exports.default = tipoInfraestructuraRoutes.router;

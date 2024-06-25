"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const arrendamientoController_1 = __importDefault(require("../../controllers/principal_controllers/arrendamientoController"));
class ArrendamientoRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        //consultas para las tuc - 
        this.router.get('/api/arrendamiento', arrendamientoController_1.default.ListaArrendamientos);
        this.router.get('/api/arrendamiento/:id', arrendamientoController_1.default.ObtenerContratoArrendamientoPorEmpresa);
        this.router.post('/api/arrendamiento', arrendamientoController_1.default.CrearContratoArrendamiento);
        this.router.put('/api/arrendamiento/:id', arrendamientoController_1.default.ModificarContratoArrendamiento);
        this.router.delete('/api/arrendamiento/:id', arrendamientoController_1.default.EliminarContratoArrendamiento);
    }
}
const arrendamientoRoutes = new ArrendamientoRoutes;
exports.default = arrendamientoRoutes.router;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const conductorController_1 = __importDefault(require("../../controllers/principal_controllers/conductorController"));
class ConductorRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        //consultas para las tuc - 
        this.router.get('/api/conductor/lista/:id', conductorController_1.default.listarConductoresPorEmpresa);
        this.router.get('/api/conductor', conductorController_1.default.listarTotalConductores);
        //  this.router.get('/api/conductor/detalle/:id',conductorController.ObtenerConductor)
        this.router.post('/api/conductor', conductorController_1.default.CrearConductor);
        this.router.put('/api/conductor/:id', conductorController_1.default.ModificarConductor);
        this.router.delete('/api/conductor/:id', conductorController_1.default.EliminarConductor);
    }
}
const conductorRoutes = new ConductorRoutes;
exports.default = conductorRoutes.router;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const empresaInfraestructuraController_1 = __importDefault(require("../../controllers/principal_controllers/empresaInfraestructuraController"));
class EmpresaInfraestructuraRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        //consultas para las las empresas por infraestuctura - 
        this.router.get('/api/empresainfraestructura', empresaInfraestructuraController_1.default.listarEmpresasInfraestructura);
        this.router.get('/api/empresainfraestructura/:id', empresaInfraestructuraController_1.default.ObtenerEmpresaInfraestructura);
        this.router.post('/api/empresainfraestructura', empresaInfraestructuraController_1.default.CrearEmpresaInfraestructura);
        this.router.put('/api/empresainfraestructura/:id', empresaInfraestructuraController_1.default.ModificarEmpresaInfraestuctura);
    }
}
const empresaInfraestructuraRoutes = new EmpresaInfraestructuraRoutes;
exports.default = empresaInfraestructuraRoutes.router;

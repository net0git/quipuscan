"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const empresaController_1 = __importDefault(require("../../controllers/principal_controllers/empresaController"));
class TucRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        //consultas para las empresas en general incluidos las de infraestructuras - 
        this.router.get('/api/empresa', empresaController_1.default.listarEmpresas);
        this.router.get('/api/empresa/:id', empresaController_1.default.ObtenerEmpresa);
        this.router.get('/api/empresa/ruc/:ruc', empresaController_1.default.ObtenerEmpresaPorRuc);
        this.router.post('/api/empresa', empresaController_1.default.CrearEmpresa);
        this.router.put('/api/empresa/:id', empresaController_1.default.ModificarEmpresa);
    }
}
const tucRoutes = new TucRoutes;
exports.default = tucRoutes.router;

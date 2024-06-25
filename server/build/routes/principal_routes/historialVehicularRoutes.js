"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const historialVehicularController_1 = __importDefault(require("../../controllers/principal_controllers/historialVehicularController"));
class HistorialVehicularRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        //consultas para los historiales vehiculares - 
        this.router.get('/api/historialvehicular', historialVehicularController_1.default.listarHistorialVehicular);
        this.router.get('/api/historialvehicular/:id', historialVehicularController_1.default.ListarHistorialVehicularPorEmpresa);
        this.router.post('/api/historialvehicular', historialVehicularController_1.default.CrearHistorialVehicular);
    }
}
const historialVehicularRoutes = new HistorialVehicularRoutes;
exports.default = historialVehicularRoutes.router;

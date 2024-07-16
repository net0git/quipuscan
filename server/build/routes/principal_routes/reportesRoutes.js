"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const reportesController_1 = __importDefault(require("../../controllers/principal_controllers/reportesController"));
class ReportesRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        //consultas para las tuc - 
        this.router.get('/api/reportes/expedientes/:id', reportesController_1.default.listarExpedientesDetalle);
    }
}
const reportesRoutes = new ReportesRoutes;
exports.default = reportesRoutes.router;

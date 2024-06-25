"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const parteController_1 = __importDefault(require("../../controllers/principal_controllers/parteController"));
class PersonaRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        //consultas para personas 
        this.router.get('/api/parte/listaporexpediente/:id_expediente', parteController_1.default.listarPartesDetalleXidExpediente);
        this.router.get('/api/parte/:id', parteController_1.default.ObtenerParteXid);
        this.router.post('/api/parte', parteController_1.default.CrearParte);
        this.router.put('/api/parte/:id', parteController_1.default.ModificarParte);
        this.router.delete('/api/parte/:id', parteController_1.default.EliminarParte);
    }
}
const personaRoutes = new PersonaRoutes;
exports.default = personaRoutes.router;

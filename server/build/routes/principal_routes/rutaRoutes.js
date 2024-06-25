"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class RutasRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        //consultas para las tuc - 
        //  this.router.get('/api/ruta/lista/origen',rutasController.listarRutasOrigen)
        //  this.router.get('/api/ruta/lista/destino',rutasController.listarRutasDestino)
        //  this.router.get('/api/tuc/:id',tucController.ObtenerTuc)
        //  this.router.post('/api/tuc',tucController.CrearTuc)
        //  this.router.put('/api/tuc/:id',tucController.ModificarTuc)    
    }
}
const rutasRoutes = new RutasRoutes;
exports.default = rutasRoutes.router;

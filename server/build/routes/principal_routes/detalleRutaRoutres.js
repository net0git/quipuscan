"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class DetalleRutasRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        //consultas para las tuc - 
        //  this.router.get('/api/detalleruta',detalleRutasController.listarDetalleRutas)
        //  this.router.get('/api/detalleruta/:id',detalleRutasController.ObtenerDetalleRuta)
        //  this.router.get('/api/detalle/lista/rutas/origen',detalleRutasController.listarRutasOrigen)
        //  this.router.get('/api/detalle/lista/rutas/destino',detalleRutasController.listarRutasDestino)
        //  this.router.post('/api/detalleruta',detalleRutasController.CrearDetalleRuta)
        //  this.router.put('/api/detalleruta/:id',detalleRutasController.ModificarDetalleRutas)    
    }
}
const detalleRutasRoutes = new DetalleRutasRoutes;
exports.default = detalleRutasRoutes.router;

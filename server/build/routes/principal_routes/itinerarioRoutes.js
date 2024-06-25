"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// import personaController from '../../controllers/principal_controllers/personaController'
const itinerarioController_1 = __importDefault(require("../../controllers/principal_controllers/itinerarioController"));
class ItinerariRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        //consultas para itinerario _ no se permite eliminar itinerario por motivos de seguridad y relacion de tablas 
        this.router.get('/api/itinerario', itinerarioController_1.default.listarItineario);
        //lista de rutas origen para un vehiculo
        this.router.get('/api/itinerario/lista/ruta/origen', itinerarioController_1.default.listarRutasOrigenVehiculo);
        //lista de rutas destino para un vehiculo 
        this.router.get('/api/itinerario/lista/ruta/destino', itinerarioController_1.default.listarRutasDestinoVehiculo);
        //lista de ruta origen para una empresa
        this.router.get('/api/itinerario/lista/empresas/ruta/origen', itinerarioController_1.default.listarRutasOrigenEmpresa);
        //lista de rutas de destino para una empresa
        this.router.get('/api/itinerario/lista/empresas/ruta/destino', itinerarioController_1.default.listarRutasDestinoEmpresa);
        this.router.get('/api/itinerario/lista/empresa/:id', itinerarioController_1.default.listarItinearioPorEmpresa);
        this.router.get('/api/itinerario/:id', itinerarioController_1.default.ObtenerItinerario);
        this.router.post('/api/itinerario', itinerarioController_1.default.CrearItinerario);
        this.router.put('/api/itinerario/:id', itinerarioController_1.default.ModificarItinerario);
        //eliminar itinerario 
        this.router.delete('/api/itinerario/:id', itinerarioController_1.default.EliminarItinerario);
    }
}
const itinerariRoutes = new ItinerariRoutes;
exports.default = itinerariRoutes.router;

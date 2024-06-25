"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const infraestructuraController_1 = __importDefault(require("../../controllers/principal_controllers/infraestructuraController"));
class EmpresaInfraestructuraRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        //consultas para las las empresas por infraestuctura - 
        this.router.get('/api/infraestructura', infraestructuraController_1.default.listarAllInfraestructura);
        this.router.get('/api/infraestructura/:id', infraestructuraController_1.default.ObtenerInfraestructuraDetalle);
        this.router.post('/api/infraestructura', infraestructuraController_1.default.CrearInfraestructura);
        this.router.put('/api/infraestructura/:id', infraestructuraController_1.default.ModificarEmpresaInfraestuctura);
        //consulta de sus resoluciones, el id que se pasa como parametro es de la infraestructura
        this.router.get('/api/infraestructura/resoluciones/:id', infraestructuraController_1.default.ObtnerResolucionesDeInfraestructura);
        //consulta de sus certificados
        this.router.get('/api/infraestructura/certificados/:id', infraestructuraController_1.default.ObtnerCertificadosDeInfraestructura);
        //registrar resolucion al conjunto de resoluciones
        this.router.post('/api/infraestructura/resoluciones', infraestructuraController_1.default.CrearResolucionInfraestructura);
        //resgistrar certificado al conjunto de resoluciones
        this.router.post('/api/infraestructura/certificados', infraestructuraController_1.default.CrearCertificadoInfraestructura);
        //obtener las cantidades de las infraestructuras
        this.router.get('/api/infraestructura/detalle/cantidad', infraestructuraController_1.default.CantidadDeInfraestructura);
    }
}
const empresaInfraestructuraRoutes = new EmpresaInfraestructuraRoutes;
exports.default = empresaInfraestructuraRoutes.router;

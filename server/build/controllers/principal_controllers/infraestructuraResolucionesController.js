"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../../database/database")); // Ruta al archivo db.ts
class InfraestructuraResolucionesController {
    //esta funcion devulve las resoluciones correspondientes a una infraestructura, la busqueda se realiza en funcion al id de la infraestructura 
    ObtnerResolucionesDeInfraestructura(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const consulta = 'select * from t_infraestructura_resoluciones where id_infraestructura=$1';
                const tuc = yield database_1.default.query(consulta, [id]);
                if (tuc && tuc['rows'].length > 0) {
                    res.json(tuc['rows']);
                }
                else {
                    res.status(404).json({ text: 'las resoluciones correspondientes a la infraestrucutra no existen' });
                }
            }
            catch (error) {
                console.error('Error al obtener resoluciones:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    CrearResolucionEmpresaServicio(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_infraestructura, id_resolucion } = req.body;
                const consulta = `
                INSERT INTO t_infraestructura_resoluciones(
                    id_infraestructura,id_resolucion)
                    VALUES ($1, $2);
            `;
                const valores = [id_infraestructura, id_resolucion];
                database_1.default.query(consulta, valores, (error, resultado) => {
                    if (error) {
                        console.error('Error al insertar resolucione a infraestrucuta:', error);
                    }
                    else {
                        console.log('resolucion insertado correctamente');
                        res.json({ text: 'La resolucion se creó correctamente' });
                    }
                });
            }
            catch (error) {
                console.error('Error al crear resolucion:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    //=============EN RELACION A SUS CERTIFICADOS=======================================================================
    //esta funcion devuelve las resoluciones correspondientes a una infraestructura, la busqueda se realiza en funcion al id de la infraestructura 
    ObtnerCertificadosDeInfraestructura(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const consulta = 'select * from t_infraestructura_Certificados where id_infraestructura=$1';
                const tuc = yield database_1.default.query(consulta, [id]);
                if (tuc && tuc['rows'].length > 0) {
                    res.json(tuc['rows']);
                }
                else {
                    res.status(404).json({ text: 'los certificados correspondientes a la infraestrucutra no existen' });
                }
            }
            catch (error) {
                console.error('Error al obtener certificado:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    CrearCertificadoInfraestructura(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_infraestructura, id_certifidaco } = req.body;
                const consulta = `
                INSERT INTO t_infraestructura_certificados(
                    id_infraestructura,id_certificado)
                    VALUES ($1, $2);
            `;
                const valores = [id_infraestructura, id_certifidaco];
                database_1.default.query(consulta, valores, (error, resultado) => {
                    if (error) {
                        console.error('Error al insertar certificado a la infraestructura:', error);
                    }
                    else {
                        console.log('certificado insertado correctamente');
                        res.json({ text: 'El certificado se creó correctamente' });
                    }
                });
            }
            catch (error) {
                console.error('Error al crear certificado:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
}
const infraestructuraResolucionesController = new InfraestructuraResolucionesController();
exports.default = infraestructuraResolucionesController;

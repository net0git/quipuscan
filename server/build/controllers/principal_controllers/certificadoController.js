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
class CertificadoController {
    listarCertificados(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const certificados = yield database_1.default.query('select * from d_certificado');
                res.json(certificados['rows']);
            }
            catch (error) {
                console.error('Error al obtener certificados:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    ObtenerCertificado(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const consulta = 'select * from d_certificado where id_certificado = $1';
                const certificado = yield database_1.default.query(consulta, [id]);
                if (certificado && certificado['rows'].length > 0) {
                    res.json(certificado['rows']);
                }
                else {
                    res.status(404).json({ text: 'El certificado no existe' });
                }
            }
            catch (error) {
                console.error('Error al obtener certificado:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    CrearCertificado(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { nro_certificado, anio_certificado, fecha_certificado, nombre_certificado, tomo_certificado, documento } = req.body;
                const consulta = `
                INSERT INTO d_certificado(
                        nro_certificado, anio_certificado, fecha_certificado, nombre_certificado, tomo_certificado, documento)
                        VALUES ($1, $2, $3, $4, $5, $6)
                    RETURNING id_certificado; -- Devuelve el ID del certificado insertado
            `;
                const valores = [nro_certificado, anio_certificado, fecha_certificado, nombre_certificado, tomo_certificado, documento];
                database_1.default.query(consulta, valores, (error, resultado) => {
                    if (error) {
                        console.error('Error al insertar certificado:', error);
                        res.status(500).json({ error: 'Error interno del servidor' });
                    }
                    else {
                        const idCertificado = resultado.rows[0]['id_certificado']; // ID se encuentra en la primera fila
                        console.log('datos de certificado en BD:', idCertificado);
                        res.json({ id_certificado: idCertificado, text: 'La certificado se creó correctamente' });
                    }
                });
            }
            catch (error) {
                console.error('Error al crear certificado:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    ModificarCertificado(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { nro_certificado, anio_certificado, fecha_certificado, nombre_certificado, tomo_certificado, documento } = req.body;
                const consulta = `
                UPDATE d_certificado 
                SET nro_certificado= $1, anio_certificado= $2, fecha_certificado= $3, nombre_certificado= $4, tomo_certificado= $5, documento=$6
                WHERE id_certificado=$7
                `;
                const valores = [nro_certificado, anio_certificado, fecha_certificado, nombre_certificado, tomo_certificado, documento, id];
                database_1.default.query(consulta, valores, (error, resultado) => {
                    if (error) {
                        console.error('Error al modificar certificado:', error);
                    }
                    else {
                        console.log('certificado modificado correctamente');
                        res.json({ text: 'El certificado se modifico correctamente' });
                    }
                });
            }
            catch (error) {
                console.error('Error al modificar certificado:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
}
const certificadoController = new CertificadoController();
exports.default = certificadoController;

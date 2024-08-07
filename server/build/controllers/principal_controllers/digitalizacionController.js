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
class DigitalizacionController {
    listarDigitalizaciones(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const consulta = 'select * from t_digitalizacion';
                const expediente = yield database_1.default.query(consulta);
                if (expediente && expediente['rows'].length > 0) {
                    res.json(expediente['rows']);
                }
                else {
                    res.status(404).json({ text: 'no existe digitalizado de expediente' });
                }
            }
            catch (error) {
                console.error('Error al obtener listar de digitalizados:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    ObtenerDatosDigitalizadoXidExpediente(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_expediente } = req.params;
                const consulta = `
                            select 
                                id_digitalizacion,
                                id_responsable,
                                fojas,
                                fojas_unacara,
                                fojas_doscaras,
                                ocr,
                                escala_gris,
                                color,
                                peso_doc,
                                observaciones,
                                estado_concluido
                            from 
                                t_digitalizacion 
                            where 
                                id_expediente=$1
            `;
                const digitalizado = yield database_1.default.query(consulta, [id_expediente]);
                if (digitalizado && digitalizado['rows'].length > 0) {
                    res.json(digitalizado['rows']);
                }
                else {
                    res.status(404).json({ text: 'el digitalizado no existe' });
                }
            }
            catch (error) {
                console.error('Error al obtener digitalizado por id_expediente:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    ObtenerDocumentoDigitalizadoXidExpediente(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_expediente } = req.params;
                const consulta = `
                        select * from t_digitalizacion where id_expediente=$1
            `;
                const digitalizado = yield database_1.default.query(consulta, [id_expediente]);
                if (digitalizado && digitalizado['rows'].length > 0) {
                    res.json(digitalizado['rows'][0]);
                }
                else {
                    res.status(404).json({ text: 'el documento no existe' });
                }
            }
            catch (error) {
                console.error('Error al obtener documento por id_expediente:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    ObtenerDatosDigitalizadoID(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_digitalizacion } = req.params;
                const consulta = `
                            select 
                                id_digitalizacion,
                                id_responsable,
                                fojas,
                                fojas_unacara,
                                fojas_doscaras,
                                ocr,
                                escala_gris,
                                color,
                                peso_doc,
                                observaciones,
                                estado_concluido
                            from 
                                t_digitalizacion 
                            where 
                                id_digitalizacion=$1
            `;
                const expediente = yield database_1.default.query(consulta, [id_digitalizacion]);
                if (expediente && expediente['rows'].length > 0) {
                    res.json(expediente['rows']);
                }
                else {
                    res.status(404).json({ text: 'el expediente no existe' });
                }
            }
            catch (error) {
                console.error('Error al obtener digitalizado por id_digitalizacion:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    CrearDigitalizacion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_expediente, id_responsable, fojas, fojas_unacara, fojas_doscaras, escala_gris, color, observaciones, documento, peso_doc, ocr } = req.body;
                const consulta = `
                  
                        INSERT INTO t_digitalizacion(id_expediente, id_responsable, fojas, fojas_unacara, fojas_doscaras, escala_gris, color, observaciones, documento,peso_doc, ocr)
                        VALUES ( $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
                        RETURNING id_digitalizacion; -- Devolver el ID de digitalizacion
            `;
                const valores = [id_expediente, id_responsable, fojas, fojas_unacara, fojas_doscaras, escala_gris, color, observaciones, documento, peso_doc, ocr];
                database_1.default.query(consulta, valores, (error, resultado) => {
                    if (error) {
                        console.error('Error al insertar digitalizacion:', error);
                        res.status(500).json({ error: 'Error interno del servidor' });
                    }
                    else {
                        const idigitalizacion = resultado.rows[0]['id_digitalizacion']; // ID se encuentra en la primera fila
                        console.log('datos de expediente en BD:', idigitalizacion);
                        res.json({ id_digitalizacion: idigitalizacion, text: 'la digitalizacion se creó correctamente' });
                    }
                });
            }
            catch (error) {
                console.error('Error al crear digitalizacion:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    ModificarDigitalizado(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { id_expediente, id_responsable, fojas, fojas_unacara, fojas_doscaras, escala_gris, color, observaciones, documento, peso_doc, estado_concluido, ocr } = req.body;
                const consulta = `
                 
                        UPDATE t_digitalizacion
                        SET  id_expediente=$1, 
                             id_responsable=$2, 
                             fojas=$3, 
                             fojas_unacara=$4, 
                             fojas_doscaras=$5, 
                             escala_gris=$6, 
                             color=$7, 
                             observaciones=$8, 
                             documento=$9, 
                             peso_doc=$10,
                             estado_concluido=$11, 
                             ocr=$12
                        WHERE id_digitalizacion=$13;
                
                `;
                const valores = [id_expediente, id_responsable, fojas, fojas_unacara, fojas_doscaras, escala_gris, color, observaciones, documento, peso_doc, estado_concluido, ocr, id];
                database_1.default.query(consulta, valores, (error, resultado) => {
                    if (error) {
                        console.error('Error al modificar digitalizado:', error);
                    }
                    else {
                        console.log('Digitalizado modificado correctamente');
                        res.json({ text: 'Digitalizado se modifico correctamente' });
                    }
                });
            }
            catch (error) {
                console.error('Error al modificar digitalizado:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    ModificarDocumentoDigitalizado(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_digitalizacion } = req.params;
                const { documento } = req.body;
                const consulta = `
                 
                        UPDATE t_digitalizacion
                        SET   
                             documento=$1
                             
                        WHERE id_digitalizacion=$2;
                
                `;
                const valores = [documento, id_digitalizacion];
                database_1.default.query(consulta, valores, (error, resultado) => {
                    if (error) {
                        console.error('Error al modificar documento digitalizado:', error);
                    }
                    else {
                        console.log('Documento Digitalizado modificado correctamente');
                        res.json({ text: 'Documento Digitalizado se modifico correctamente' });
                    }
                });
            }
            catch (error) {
                console.error('Error al modificar digitalizado:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
}
const digitalizacionController = new DigitalizacionController();
exports.default = digitalizacionController;

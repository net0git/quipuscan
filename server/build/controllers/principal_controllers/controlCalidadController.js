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
class ControlCalidadController {
    listarCotrolesCalidad(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const personas = yield database_1.default.query('select * from t_control_calidad');
                res.json(personas['rows']);
            }
            catch (error) {
                console.error('Error al obtener lista de controles de calidad:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    ObtenerDetalleControlXidExpediente(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_expediente } = req.params;
                const consulta = `SELECT
                                   *
                               FROM
                                   t_control_calidad
                               WHERE 
                                  id_expediente=$1
                              `;
                const inventario = yield database_1.default.query(consulta, [id_expediente]);
                if (inventario && inventario['rows'].length > 0) {
                    res.json(inventario['rows']);
                }
                else {
                    res.status(404).json({ text: 'detalle de control de calidad no existe' });
                }
            }
            catch (error) {
                console.error('Error al obtener detalle de control de calidad:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    CrearControlCalidad(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_expediente, id_responsable, observacion, estado_concluido, formato, peso, nitidez, pruebas } = req.body;
                const consulta = `
                INSERT INTO t_control_calidad(
                    id_expediente, id_responsable, observacion, estado_concluido, formato, peso, nitidez, pruebas)
                VALUES ( $1, $2, $3, $4, $5, $6, $7, $8)
                RETURNING id_controlcalidad;
            `;
                const valores = [id_expediente, id_responsable, observacion, estado_concluido, formato, peso, nitidez, pruebas];
                database_1.default.query(consulta, valores, (error, resultado) => {
                    if (error) {
                        console.error('Error al insertar control de calidad:', error);
                        res.status(500).json({ error: 'Error interno del servidor' });
                    }
                    else {
                        const idcontrolcalidad = resultado.rows[0]['id_controlcalidad']; // ID se encuentra en la primera fila
                        console.log('datos de indizacion en BD:', idcontrolcalidad);
                        res.json({ id_controlcalidad: idcontrolcalidad, text: 'el control de calidad se creo correctamente' });
                    }
                });
            }
            catch (error) {
                console.error('Error al crear indizacion:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
}
const controlCalidadController = new ControlCalidadController();
exports.default = controlCalidadController;

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
class RutasController {
    listarRutas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rutas = yield database_1.default.query('select * from t_detalle_ruta_itinerario');
                res.json(rutas['rows']);
            }
            catch (error) {
                console.error('Error al obtener rutas:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    listarRutasOrigen(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const consulta = `
                        SELECT DISTINCT
                            tdr.origen AS origen_ruta
                        FROM 
                            t_detalle_ruta_itinerario AS tdr
                        WHERE 
                            (tdr.origen IS NOT NULL AND tdr.origen <> '')
            `;
                const rutas = yield database_1.default.query(consulta);
                res.json(rutas['rows']);
            }
            catch (error) {
                console.error('Error al obtener rutas origen:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    listarRutasDestino(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const consulta = `
                            SELECT DISTINCT
                                tdr.destino AS destino_ruta
                            FROM 
                                t_detalle_ruta_itinerario AS tdr
                            WHERE 
                                (tdr.destino IS NOT NULL AND tdr.destino <> '');
            `;
                const rutas = yield database_1.default.query(consulta);
                res.json(rutas['rows']);
            }
            catch (error) {
                console.error('Error al obtener rutas destino:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    ObtenerRuta(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const consulta = 'select * from d_rutas where id_ruta = $1';
                const ruta = yield database_1.default.query(consulta, [id]);
                if (ruta && ruta['rows'].length > 0) {
                    res.json(ruta['rows']);
                }
                else {
                    res.status(404).json({ text: 'La ruta no existe' });
                }
            }
            catch (error) {
                console.error('Error al obtener ruta:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    CrearRuta(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { origen, destino, corredor } = req.body;
                const consulta = `
                INSERT INTO d_ruta(
                    origen, destino, corredor)
                    VALUES ($1, $2, $3);
            `;
                const valores = [origen, destino, corredor];
                database_1.default.query(consulta, valores, (error, resultado) => {
                    if (error) {
                        console.error('Error al insertar ruta:', error);
                    }
                    else {
                        console.log('ruta insertado correctamente');
                        res.json({ text: 'La ruta se creó correctamente' });
                    }
                });
            }
            catch (error) {
                console.error('Error al crear tuc:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    ModificarTuc(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { nro_tuc, nro_impresion, fecha_exp, condicion, estado, fecha_ven } = req.body;
                const consulta = `
                UPDATE t_tuc 
                SET nro_tuc= $1, nro_impresion= $2, fecha_exp= $3, condicion= $4, estado= $5, fecha_ven= $6 
                WHERE id_tuc=$7
                `;
                const valores = [nro_tuc, nro_impresion, fecha_exp, condicion, estado, fecha_ven, id];
                database_1.default.query(consulta, valores, (error, resultado) => {
                    if (error) {
                        console.error('Error al modificar tuc:', error);
                    }
                    else {
                        console.log('tuc modificado correctamente');
                        res.json({ text: 'La tuc se modifico correctamente' });
                    }
                });
            }
            catch (error) {
                console.error('Error al modificar tuc:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
}
const rutasController = new RutasController();
exports.default = rutasController;

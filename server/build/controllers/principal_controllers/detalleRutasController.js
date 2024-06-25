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
class DetalleRutasController {
    listarDetalleRutas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const detallerRutas = yield database_1.default.query('select * from t_detalle_ruta');
                res.json(detallerRutas['rows']);
            }
            catch (error) {
                console.error('Error al obtener detallerRutas:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    ObtenerDetalleRuta(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const consulta = 'select * from t_detalle_ruta where id_detalle_ruta = $1';
                const detalleruta = yield database_1.default.query(consulta, [id]);
                if (detalleruta && detalleruta['rows'].length > 0) {
                    res.json(detalleruta['rows']);
                }
                else {
                    res.status(404).json({ text: 'el detalle de la ruta no existe' });
                }
            }
            catch (error) {
                console.error('Error al obtener detalle de ruta:', error);
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
    CrearDetalleRuta(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_itinerario, id_ruta } = req.body;
                const consulta = `
                INSERT INTO t_detalle_ruta(
                    id_itinerario, id_ruta)
                    VALUES ($1, $2);
            `;
                const valores = [id_itinerario, id_ruta];
                database_1.default.query(consulta, valores, (error, resultado) => {
                    if (error) {
                        console.error('Error al insertar detalle de ruta:', error);
                    }
                    else {
                        console.log('el detalle de la ruta se inserto correctamente');
                        res.json({ text: 'el detalle de ruta se creó correctamente' });
                    }
                });
            }
            catch (error) {
                console.error('Error al crear detalle de ruta:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    ModificarDetalleRutas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { id_itinerario, id_ruta } = req.body;
                const consulta = `
                UPDATE t_detalle_ruta 
                SET id_itinerario=$1, id_ruta=$2 
                WHERE id_detalle_ruta=$3
                `;
                const valores = [id_itinerario, id_ruta, id];
                database_1.default.query(consulta, valores, (error, resultado) => {
                    if (error) {
                        console.error('Error al modificar tuc:', error);
                    }
                    else {
                        console.log('tuc modificado correctamente');
                        res.json({ text: 'el detalle de ruta se modifico correctamente' });
                    }
                });
            }
            catch (error) {
                console.error('Error al modificar el detalle de ruta:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
}
const detalleRutasController = new DetalleRutasController();
exports.default = detalleRutasController;

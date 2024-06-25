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
class ItinerarioController {
    listarItineario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const itinerarios = yield database_1.default.query('select * from t_itinerario');
                res.json(itinerarios['rows']);
            }
            catch (error) {
                console.error('Error al obtener itinerarios:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    //lista las rutas de origen asociadas a vehiculos vigentes
    listarRutasOrigenVehiculo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const consulta = `
                            SELECT DISTINCT
                                    dr.origen as origen_ruta
                            FROM t_vehiculo AS v
                            INNER JOIN t_empresa_servicio AS es ON v.id_empresa_servicio = es.id_empresa_servicio
                            INNER JOIN t_detalle_ruta_itinerario AS dr ON v.id_detalle_ruta_itinerario = dr.id_detalle_ruta_itinerario
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
    //lista las rutas de destino asociadas a vehiculos vigentes
    listarRutasDestinoVehiculo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const consulta = `
                            SELECT DISTINCT
                                    dr.destino as destino_ruta
                            FROM t_vehiculo AS v
                            INNER JOIN t_empresa_servicio AS es ON v.id_empresa_servicio = es.id_empresa_servicio
                            INNER JOIN t_detalle_ruta_itinerario AS dr ON v.id_detalle_ruta_itinerario = dr.id_detalle_ruta_itinerario
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
    //lista las rutas de origen asociadas a las empresas vigentes
    listarRutasOrigenEmpresa(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const consulta = `
                            SELECT DISTINCT
                            tdr.origen AS origen_ruta
                        FROM 
                            t_detalle_ruta_itinerario AS tdr
                        JOIN 
                            t_empresa_servicio AS te ON tdr.id_empresa_servicio = te.id_empresa_servicio
                        JOIN 
                            t_empresa AS e ON te.id_empresa = e.id_empresa
                        WHERE 
                            (tdr.origen IS NOT NULL AND tdr.origen <> '') AND (tdr.destino IS NOT NULL AND tdr.destino <> '');
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
    //lista las rutas de destino asociadas a las empresas vigentes
    listarRutasDestinoEmpresa(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const consulta = `
                                SELECT DISTINCT
                                tdr.destino AS destino_ruta
                            FROM 
                                t_detalle_ruta_itinerario AS tdr
                            JOIN 
                                t_empresa_servicio AS te ON tdr.id_empresa_servicio = te.id_empresa_servicio
                            JOIN 
                                t_empresa AS e ON te.id_empresa = e.id_empresa
                            WHERE 
                                (tdr.origen IS NOT NULL AND tdr.origen <> '') AND (tdr.destino IS NOT NULL AND tdr.destino <> '');
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
    listarItinearioPorEmpresa(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const consulta = 'select * from t_detalle_ruta_itinerario where id_empresa_servicio = $1';
                const itinerarios = yield database_1.default.query(consulta, [id]);
                if (itinerarios && itinerarios['rows'].length > 0) {
                    res.json(itinerarios['rows']);
                }
                else {
                    res.status(404).json({ text: 'la lista no existe' });
                }
            }
            catch (error) {
                console.error('Error al obtener lista de itinerario:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    ObtenerItinerario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const consulta = 'select * from t_detalle_ruta_itinerario where id_detalle_ruta_itinerario = $1';
                const itinerario = yield database_1.default.query(consulta, [id]);
                if (itinerario && itinerario['rows'].length > 0) {
                    res.json(itinerario['rows']);
                }
                else {
                    res.status(404).json({ text: 'El itinerario no existe' });
                }
            }
            catch (error) {
                console.error('Error al obtener itinerario:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    CrearItinerario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { origen, destino, itinerario, frecuencia, id_empresa_servicio } = req.body;
                const consulta = `
                INSERT INTO t_detalle_ruta_itinerario(
                       origen, destino,itinerario, frecuencia, id_empresa_servicio)
                    VALUES ($1, $2, $3, $4, $5)
                    RETURNING id_detalle_ruta_itinerario; -- Devuelve el ID de la empresa 
                    `;
                const valores = [origen, destino, itinerario, frecuencia, id_empresa_servicio];
                database_1.default.query(consulta, valores, (error, resultado) => {
                    if (error) {
                        console.error('Error al insertar itinerario:', error);
                        res.status(500).json({ error: 'Error interno del servidor' });
                    }
                    else {
                        const idItinerario = resultado.rows[0]['id_detalle_ruta_itinerario']; // ID se encuentra en la primera fila
                        res.json({ id_detalle_ruta_itinerario: idItinerario, text: 'El itinerario se creó correctamente' });
                    }
                });
            }
            catch (error) {
                console.error('Error al crear itinerario:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    ModificarItinerario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { origen, destino, itinerario, frecuencia, id_empresa_servicio } = req.body;
                const consulta = `
                UPDATE t_detalle_ruta_itinerario 
                SET origen=$1, destino=$2, itinerario=$3, frecuencia=$4, id_empresa_servicio=$5
                WHERE id_detalle_ruta_itinerario=$6
                `;
                const valores = [origen, destino, itinerario, frecuencia, id_empresa_servicio, id];
                database_1.default.query(consulta, valores, (error, resultado) => {
                    if (error) {
                        console.error('Error al modificar irinerario:', error);
                    }
                    else {
                        console.log('itinerario modificado correctamente');
                        res.json({ text: 'El itinerario se modifico correctamente' });
                    }
                });
            }
            catch (error) {
                console.error('Error al modificar itinerario:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    EliminarItinerario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const consulta = 'DELETE FROM t_detalle_ruta_itinerario WHERE id_detalle_ruta_itinerario  =$1';
                database_1.default.query(consulta, [id], (error, resultado) => {
                    if (error) {
                        console.error('Error al eliminar itinerario :', error);
                        res.json({ text: 'error' });
                    }
                    else {
                        console.log('itinerario eliminado correctamente');
                        res.json({ text: 'el itinerario se elimino correctamente' });
                    }
                });
            }
            catch (error) {
                console.error('Error al eliminar itinerario:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
}
const itinerarioController = new ItinerarioController();
exports.default = itinerarioController;

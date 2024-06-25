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
class TipoServicioController {
    listarTiposServicios(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const servicios = yield database_1.default.query('select * from d_tipo_servicio');
                res.json(servicios['rows']);
            }
            catch (error) {
                console.error('Error al obtener tipos de servicios:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    ObtenerTipoServicio(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const consulta = 'select * from d_tipo_servicio where id_tipo_servicio = $1';
                const servicio = yield database_1.default.query(consulta, [id]);
                if (servicio && servicio['rows'].length > 0) {
                    res.json(servicio['rows']);
                }
                else {
                    res.status(404).json({ text: 'El tipo de servicio no existe' });
                }
            }
            catch (error) {
                console.error('Error al obtener el tipo de servicio:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    CrearTipoServicio(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { denominacion } = req.body;
                const consulta = `
                INSERT INTO d_tipo_servicio(
                    denominacion)
                    VALUES ($1);
            `;
                const valores = [denominacion];
                database_1.default.query(consulta, valores, (error, resultado) => {
                    if (error) {
                        console.error('Error al insertar tipo de servicio:', error);
                    }
                    else {
                        console.log('tipo de servicio insertado correctamente');
                        res.json({ text: 'El tipo de servicio se creó correctamente' });
                    }
                });
            }
            catch (error) {
                console.error('Error al crear tipo de servicio:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    ModificarTipoServicio(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { denominacion } = req.body;
                const consulta = `
                UPDATE d_tipo_servicio 
                SET denominacion=$1 
                WHERE id_tipo_servicio=$2
                `;
                const valores = [denominacion, id];
                database_1.default.query(consulta, valores, (error, resultado) => {
                    if (error) {
                        console.error('Error al modificar tipo de servicio:', error);
                    }
                    else {
                        console.log('el tipo de servicio se modificado correctamente');
                        res.json({ text: 'El tipo de servicio se modifico correctamente' });
                    }
                });
            }
            catch (error) {
                console.error('Error al modificar el tipo de servicio:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
}
const tipoServicioController = new TipoServicioController();
exports.default = tipoServicioController;

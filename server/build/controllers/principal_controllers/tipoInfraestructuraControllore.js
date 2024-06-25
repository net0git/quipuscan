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
class TipoInfraestructuraController {
    listarTipoInfraestructura(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const infraestructura = yield database_1.default.query('select * from d_tipo_infraestructura');
                res.json(infraestructura['rows']);
            }
            catch (error) {
                console.error('Error al obtener tipo de infraestructuras:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    ObtenerTipoInfraestructura(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const consulta = 'select * from d_tipo_infraestructura where id_tipo_infraestructura = $1';
                const infraestructura = yield database_1.default.query(consulta, [id]);
                if (infraestructura && infraestructura['rows'].length > 0) {
                    res.json(infraestructura['rows']);
                }
                else {
                    res.status(404).json({ text: 'El tipo de infraestructura no existe' });
                }
            }
            catch (error) {
                console.error('Error al obtener tipo de infraestructura:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    CrearTipoInfraestructura(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { denominacion } = req.body;
                const consulta = `
                INSERT INTO d_tipo_infraestructura(
                    denominacion)
                    VALUES ($1);
            `;
                const valores = [denominacion];
                database_1.default.query(consulta, valores, (error, resultado) => {
                    if (error) {
                        console.error('Error al insertar tipo de infraestructura:', error);
                    }
                    else {
                        console.log('tipo de infraestructura insertado correctamente');
                        res.json({ text: 'El tipo de infraestructura se creó correctamente' });
                    }
                });
            }
            catch (error) {
                console.error('Error al crear tuc:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    ModificarTipoInfraestructura(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { denominacion } = req.body;
                const consulta = `
                UPDATE d_tipo_infraestructura
                SET denominacion=$1
                WHERE id_tipo_infraestructura=$2
                `;
                const valores = [denominacion, id];
                database_1.default.query(consulta, valores, (error, resultado) => {
                    if (error) {
                        console.error('Error al modificar el tipo de infraestructura:', error);
                    }
                    else {
                        console.log('tipo de infraestructura modificado correctamente');
                        res.json({ text: 'El tipo de infraestructura se modifico correctamente' });
                    }
                });
            }
            catch (error) {
                console.error('Error al modificar el tipo de infraestructura:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
}
const tipoInfraestructuraController = new TipoInfraestructuraController();
exports.default = tipoInfraestructuraController;

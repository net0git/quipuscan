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
class TucController {
    listarTuc(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tuc = yield database_1.default.query('select * from t_tuc');
                res.json(tuc['rows']);
            }
            catch (error) {
                console.error('Error al obtener tucs:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    ObtenerTuc(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const consulta = 'select * from t_tuc where id_tuc = $1';
                const tuc = yield database_1.default.query(consulta, [id]);
                if (tuc && tuc['rows'].length > 0) {
                    res.json(tuc['rows']);
                }
                else {
                    res.status(404).json({ text: 'La tuc no existe' });
                }
            }
            catch (error) {
                console.error('Error al obtener tuc:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    listrTucPorPlaca(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { placa } = req.params;
                const consulta = 'select * from t_tuc where placa = $1';
                const tuc = yield database_1.default.query(consulta, [placa]);
                if (tuc && tuc['rows'].length > 0) {
                    res.json(tuc['rows']);
                }
                else {
                    res.status(404).json({ text: 'TUC´s no existes' });
                }
            }
            catch (error) {
                console.error('Error al obtener tuc´s:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    ObtenerTucPorNumero(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { nro_tuc } = req.params;
                const consulta = 'select * from t_tuc where nro_tuc = $1';
                const tuc = yield database_1.default.query(consulta, [nro_tuc]);
                if (tuc && tuc['rows'].length > 0) {
                    res.json(tuc['rows']);
                }
                else {
                    res.status(404).json({ text: 'La tuc no existe' });
                }
            }
            catch (error) {
                console.error('Error al obtener tuc:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    CrearTuc(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { nro_tuc, nro_impresion, fecha_exp, condicion, placa, fecha_ven, razon_social, nro_part_reg, nombre_resolucion, marca, anio_fabricacion, color, nro_chasis, nro_asientos, peso, carga, ruta, modalidad } = req.body;
                const consulta = `
                    INSERT INTO t_tuc( nro_tuc, nro_impresion, fecha_exp, condicion, placa, fecha_ven,razon_social, nro_part_reg, nombre_resolucion, marca, anio_fabricacion, color, nro_chasis, nro_asientos, peso, carga, ruta, modalidad)
                        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)
                    RETURNING id_tuc; -- Devolver el ID de la persona insertada
            `;
                const valores = [nro_tuc, nro_impresion, fecha_exp, condicion, placa, fecha_ven, razon_social, nro_part_reg, nombre_resolucion, marca, anio_fabricacion, color, nro_chasis, nro_asientos, peso, carga, ruta, modalidad];
                database_1.default.query(consulta, valores, (error, resultado) => {
                    if (error) {
                        console.error('Error al insertar tuc:', error);
                        res.status(500).json({ error: 'Error interno del servidor' });
                    }
                    else {
                        const idtuc = resultado.rows[0]['id_tuc']; // ID se encuentra en la primera fila
                        console.log('datos de la tuc en BD:', idtuc);
                        res.json({ id_tuc: idtuc, text: 'El TUC se creó correctamente' });
                    }
                });
            }
            catch (error) {
                console.error('Error al crear TUC:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    ModificarTuc(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { nro_tuc, nro_impresion, copia } = req.body;
                const consulta = `
                UPDATE t_tuc 
                SET nro_tuc=$1, nro_impresion=$2, copia=$3
                WHERE id_tuc=$4
                `;
                const valores = [nro_tuc, nro_impresion, copia, id];
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
    ModificarTucModal(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { copia } = req.body;
                const consulta = `
                UPDATE t_tuc 
                SET  copia=$1
                WHERE id_tuc=$2
                `;
                const valores = [copia, id];
                database_1.default.query(consulta, valores, (error, resultado) => {
                    if (error) {
                        console.error('Error al modificar tucModal:', error);
                    }
                    else {
                        console.log('tucModal modificado correctamente');
                        res.json({ text: 'La tucModal se modifico correctamente' });
                    }
                });
            }
            catch (error) {
                console.error('Error al modificar tucModal:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
}
const tucController = new TucController();
exports.default = tucController;

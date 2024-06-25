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
class ParteController {
    listarPartesDetalleXidExpediente(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_expediente } = req.params;
                const consulta = `
                            select 
                                *
                            from 
                                t_parte
                            where 
                                id_expediente=$1
            `;
                const personas = yield database_1.default.query(consulta, [id_expediente]);
                res.json(personas['rows']);
            }
            catch (error) {
                console.error('Error al obtener lista de partes:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    ObtenerParteXid(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const consulta = `select 
                                    *
                                from 
                                    t_parte
                                where 
                                    id_parte=$1
                             `;
                const inventario = yield database_1.default.query(consulta, [id]);
                if (inventario && inventario['rows'].length > 0) {
                    res.json(inventario['rows']);
                }
                else {
                    res.status(404).json({ text: 'el inventario no existe' });
                }
            }
            catch (error) {
                console.error('Error al obtener parte:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    CrearParte(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_expediente, nombre_parte, ap_parte, am_parte, dni, tipo_parte } = req.body;
                const consulta = `
                            INSERT INTO t_parte(
                                id_expediente, nombre_parte, ap_parte, am_parte, dni, tipo_parte)
                            VALUES ($1,$2,$3,$4,$5,$6);
                        `;
                const valores = [id_expediente, nombre_parte, ap_parte, am_parte, dni, tipo_parte];
                database_1.default.query(consulta, valores, (error, resultado) => {
                    if (error) {
                        console.error('Error al crear parte:', error);
                    }
                    else {
                        console.log('parte creado correctamente');
                        res.json({ text: 'la parte se creó correctamente' });
                    }
                });
            }
            catch (error) {
                console.error('Error al crear parte:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    ModificarParte(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { id_expediente, nombre_parte, ap_parte, am_parte, dni, tipo_parte } = req.body;
                const consulta = `
                            UPDATE t_parte
                            SET  id_expediente=$1, nombre_parte=$2, ap_parte=$3, am_parte=$4, dni=$5, tipo_parte=$6
                            WHERE id_parte=$7;
                
                `;
                const valores = [id_expediente, nombre_parte, ap_parte, am_parte, dni, tipo_parte, id];
                database_1.default.query(consulta, valores, (error, resultado) => {
                    if (error) {
                        console.error('Error al modificar parte:', error);
                    }
                    else {
                        console.log('parte modificado correctamente');
                        res.json({ text: 'la parte se modifico correctamente' });
                    }
                });
            }
            catch (error) {
                console.error('Error al modificar parte:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    EliminarParte(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const consulta = `
                        DELETE FROM t_parte
                         WHERE id_parte=$1;
                
                `;
                database_1.default.query(consulta, [id], (error, resultado) => {
                    if (error) {
                        console.error('Error al elininar parte:', error);
                    }
                    else {
                        console.log('parte eliminado correctamente');
                        res.json({ text: 'la parte se elimino correctamente' });
                    }
                });
            }
            catch (error) {
                console.error('Error al eliminar parte:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
}
const parteController = new ParteController();
exports.default = parteController;

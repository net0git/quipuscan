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
class InventarioController {
    listarInventario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const personas = yield database_1.default.query('select * from t_inventario');
                res.json(personas['rows']);
            }
            catch (error) {
                console.error('Error al obtener lista de inventarios:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    listarInventarioDetalle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const consulta = `SELECT
                            i.id_inventario,
                            i.anio,
                            i.cantidad,
                            i.tipo_doc,
                            i.serie_doc,
                            i.especialidad_inventario,
                            i.contador,
                            i.estado_preparado,
                            u.id_usuario,
                            u.nombre_usuario,
                            u.perfil,
                            u.estado,
                            p.nombre,
                            p.ap_paterno,
                            p.ap_materno
                        
                        FROM
                            t_inventario i
                        JOIN
                            t_usuario u ON i.id_supervisor = u.id_usuario
                        JOIN
                            t_persona p ON u.id_persona = p.id_persona; `;
                const inventario = yield database_1.default.query(consulta);
                if (inventario && inventario['rows'].length > 0) {
                    res.json(inventario['rows']);
                }
                else {
                    res.status(404).json({ text: 'la lista de inventario no existe' });
                }
            }
            catch (error) {
                console.error('Error al obtener lista de inventario:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    ObtenerInventarioXid(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const consulta = `SELECT
                            i.id_inventario,
                            i.anio,
                            i.cantidad,
                            i.tipo_doc,
                            i.serie_doc,
                            i.estado_preparado,
                            i.especialidad_inventario,
                            i.contador,
                            u.id_usuario,
                            u.nombre_usuario,
                            u.perfil,
                            u.estado,
                            p.nombre,
                            p.ap_paterno,
                            p.ap_materno
                        
                        FROM
                            t_inventario i
                        JOIN
                            t_usuario u ON i.id_supervisor = u.id_usuario
                        JOIN
                            t_persona p ON u.id_persona = p.id_persona
                        WHERE 
                            i.id_inventario=$1
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
                console.error('Error al obtener inventario:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    CrearInventario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_supervisor, anio, cantidad, tipo_doc, serie_doc, especialidad_inventario, contador, estado_preparado } = req.body;
                const consulta = `
                    INSERT INTO t_inventario(id_supervisor, anio, cantidad, tipo_doc, serie_doc, especialidad_inventario, contador,estado_preparado)
                       VALUES ( $1, $2, $3, $4, $5, $6, $7,$8)
                    RETURNING id_inventario; -- Devolver el ID de la persona insertada
            `;
                const valores = [id_supervisor, anio, cantidad, tipo_doc, serie_doc, especialidad_inventario, contador, estado_preparado];
                database_1.default.query(consulta, valores, (error, resultado) => {
                    if (error) {
                        console.error('Error al insertar persona:', error);
                        res.status(500).json({ error: 'Error interno del servidor' });
                    }
                    else {
                        const idinventario = resultado.rows[0]['id_inventario']; // ID se encuentra en la primera fila
                        console.log('datos de inventario en BD:', idinventario);
                        res.json({ id_inventario: idinventario, text: 'el inventario se creó correctamente' });
                    }
                });
            }
            catch (error) {
                console.error('Error al crear inventario:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    ModificarInventario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { id_supervisor, anio, cantidad, tipo_doc, serie_doc, especialidad_inventario, contador, estado_preparado } = req.body;
                const consulta = `
                 

                  UPDATE public.t_inventario
                    SET  id_supervisor=$1, anio=$2, cantidad=$3, tipo_doc=$4, serie_doc=$5, especialidad_inventario=$6, contador=$7,estado_preparado=$8
                    WHERE id_inventario=$9;
                
                `;
                const valores = [id_supervisor, anio, cantidad, tipo_doc, serie_doc, especialidad_inventario, contador, estado_preparado, id];
                database_1.default.query(consulta, valores, (error, resultado) => {
                    if (error) {
                        console.error('Error al modificar inventario:', error);
                    }
                    else {
                        console.log('inventario modificado correctamente');
                        res.json({ text: 'La inventario se modifico correctamente' });
                    }
                });
            }
            catch (error) {
                console.error('Error al modificar inventario:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    ModificarEstadoInventario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { estado_preparado } = req.body;
                const consulta = `
                 

                  UPDATE public.t_inventario
                    SET  estado_preparado=$1
                    WHERE id_inventario=$2;
                
                `;
                const valores = [estado_preparado, id];
                database_1.default.query(consulta, valores, (error, resultado) => {
                    if (error) {
                        console.error('Error al modificar estado inventario:', error);
                    }
                    else {
                        console.log('estado inventario modificado correctamente');
                        res.json({ text: 'el estado del inventario se modifico correctamente' });
                    }
                });
            }
            catch (error) {
                console.error('Error al modificar estado del inventario:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
}
const inventarioController = new InventarioController();
exports.default = inventarioController;

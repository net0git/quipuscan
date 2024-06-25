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
class ExpedienteController {
    listarExpedientesXidInventario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_inventario } = req.params;
                const consulta = 'select * from t_expediente where id_inventario = $1';
                const expediente = yield database_1.default.query(consulta, [id_inventario]);
                if (expediente && expediente['rows'].length > 0) {
                    res.json(expediente['rows']);
                }
                else {
                    res.status(404).json({ text: 'no existe registro de expedientes' });
                }
            }
            catch (error) {
                console.error('Error al obtener lista de expediente:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    ObtenerExpedienteDetalleXid(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const consulta = `
                    select 
                        e.*,
                        i.id_inventario,
                        i.especialidad_inventario,
                        i.anio,
                        i.serie_doc
                        
                    from 
                        t_expediente e
                    join
                        t_inventario i on e.id_inventario=i.id_inventario
                    where 
                        e.id_expediente=$1
            `;
                const expediente = yield database_1.default.query(consulta, [id]);
                if (expediente && expediente['rows'].length > 0) {
                    res.json(expediente['rows']);
                }
                else {
                    res.status(404).json({ text: 'el expediente no existe' });
                }
            }
            catch (error) {
                console.error('Error al obtener expediente:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    CrearExpediente(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_inventario, id_responsable, nombre_expediente, fojas, fojas_unacara, fojas_doscaras, fojas_obs, copias_originales, copias_simples, observaciones, lote, estado_preparado, estado_digitalizado, estado_controlado, estado_fedatado, estado_indizado } = req.body;
                const consulta = `
                  
                       INSERT INTO t_expediente( id_inventario, id_responsable, nombre_expediente, fojas, fojas_unacara, fojas_doscaras, fojas_obs, copias_originales, copias_simples, observaciones, lote, estado_preparado, estado_digitalizado, estado_controlado, estado_fedatado, estado_indizado)
                       VALUES (  $1, $2, $3, $4, $5, $6, $7,$8, $9, $10, $11,$12,$13,$14, $15, $16)
                    RETURNING id_expediente; -- Devolver el ID de la persona insertada
            `;
                const valores = [id_inventario, id_responsable, nombre_expediente, fojas, fojas_unacara, fojas_doscaras, fojas_obs, copias_originales, copias_simples, observaciones, lote, estado_preparado, estado_digitalizado, estado_controlado, estado_fedatado, estado_indizado];
                database_1.default.query(consulta, valores, (error, resultado) => {
                    if (error) {
                        console.error('Error al insertar expediente:', error);
                        res.status(500).json({ error: 'Error interno del servidor' });
                    }
                    else {
                        const idexpediente = resultado.rows[0]['id_expediente']; // ID se encuentra en la primera fila
                        console.log('datos de expediente en BD:', idexpediente);
                        res.json({ id_inventario: idexpediente, text: 'el expediente se creó correctamente' });
                    }
                });
            }
            catch (error) {
                console.error('Error al crear inventario:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    ModificarExpediente(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { id_inventario, id_responsable, nombre_expediente, fojas, fojas_unacara, fojas_doscaras, fojas_obs, copias_originales, copias_simples, observaciones, lote, estado_preparado, estado_digitalizado, estado_controlado, estado_fedatado, estado_indizado } = req.body;
                const consulta = `
                 
                    UPDATE t_expediente
                    SET  id_inventario=$1, 
                         id_responsable=$2, 
                         nombre_expediente=$3, 
                         fojas=$4, fojas_unacara=$5, 
                         fojas_doscaras=$6, 
                         fojas_obs=$7, 
                         copias_originales=$8, 
                         copias_simples=$9, 
                         observaciones=$10, 
                         lote=$11, 
                         estado_preparado=$12,
                         estado_digitalizado=$13, 
                         estado_controlado=$14, 
                         estado_fedatado=$15, 
                         estado_indizado=$16
                    WHERE id_expediente=$17
                
                `;
                const valores = [id_inventario, id_responsable, nombre_expediente, fojas, fojas_unacara, fojas_doscaras, fojas_obs, copias_originales, copias_simples, observaciones, lote, estado_preparado, estado_digitalizado, estado_controlado, estado_fedatado, estado_indizado, id];
                database_1.default.query(consulta, valores, (error, resultado) => {
                    if (error) {
                        console.error('Error al modificar expediente:', error);
                    }
                    else {
                        console.log('expediente modificado correctamente');
                        res.json({ text: 'El expediente se modifico correctamente' });
                    }
                });
            }
            catch (error) {
                console.error('Error al modificar expediente:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    EliminarExpediente(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const consulta = 'DELETE FROM t_expediente WHERE id_expediente=$1';
                database_1.default.query(consulta, [id], (error, resultado) => {
                    if (error) {
                        console.error('Error al elininar expediente:', error);
                    }
                    else {
                        console.log('expediente eliminado correctamente');
                        res.json({ text: 'el expediente se elimino correctamente' });
                    }
                });
            }
            catch (error) {
                console.error('Error al eliminar expediente:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    //MODIFICAR ESTADOS DE EXPEDIENTE
    //modificar estado_preparado
    ModificarEstadoPreparado(req, res) {
        try {
            const { id } = req.params;
            const { estado_preparado } = req.body;
            const consulta = `
                 
                    UPDATE t_expediente
                    SET  
                         estado_preparado=$1
                    WHERE id_expediente=$2
                
                `;
            const valores = [estado_preparado, id];
            database_1.default.query(consulta, valores, (error, resultado) => {
                if (error) {
                    console.error('Error al modificar estado preparado de expediente:', error);
                }
                else {
                    console.log('estado_preparado de expediente modificado correctamente');
                    res.json({ text: 'El estado_preparado de expediente se modifico correctamente' });
                }
            });
        }
        catch (error) {
            console.error('Error al modificar estado_preparado de expediente:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
    //modificar estado_digitalizado
    ModificarEstadoDigitalizado(req, res) {
        try {
            const { id } = req.params;
            const { estado_digitalizado } = req.body;
            const consulta = `
                 
                    UPDATE t_expediente
                    SET  
                        estado_digitalizado=$1
                    WHERE t_expediente.id_expediente=$2
                
                `;
            const valores = [estado_digitalizado, id];
            database_1.default.query(consulta, valores, (error, resultado) => {
                if (error) {
                    console.error('Error al modificar estado_digitalizado de expediente:', error);
                }
                else {
                    console.log('estado_digitalizado de expediente modificado correctamente');
                    res.json({ text: 'El estado_digitalizado de expediente se modifico correctamente' });
                }
            });
        }
        catch (error) {
            console.error('Error al modificar estado_digitalizado de expediente:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
    //modificar estado_indizado
    ModificarEstadoIndizado(req, res) {
        try {
            const { id } = req.params;
            const { estado_indizado } = req.body;
            const consulta = `
                 
                    UPDATE t_expediente
                    SET  
                    estado_indizado=$1
                    WHERE id_expediente=$2
                
                `;
            const valores = [estado_indizado, id];
            database_1.default.query(consulta, valores, (error, resultado) => {
                if (error) {
                    console.error('Error al modificar estado_indizado de expediente:', error);
                }
                else {
                    console.log('estado_indizado de expediente modificado correctamente');
                    res.json({ text: 'El estado_indizado de expediente se modifico correctamente' });
                }
            });
        }
        catch (error) {
            console.error('Error al modificar estado_indizado de expediente:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
    //modificar estado_indizado
    ModificarEstadoControlado(req, res) {
        try {
            const { id } = req.params;
            const { estado_controlado } = req.body;
            const consulta = `
                 
                    UPDATE t_expediente
                    SET  
                    estado_controlado=$1
                    WHERE id_expediente=$2
                
                `;
            const valores = [estado_controlado, id];
            database_1.default.query(consulta, valores, (error, resultado) => {
                if (error) {
                    console.error('Error al modificar estado_controlado de expediente:', error);
                }
                else {
                    console.log('estado_indizado de expediente modificado correctamente');
                    res.json({ text: 'El estado_controlado de expediente se modifico correctamente' });
                }
            });
        }
        catch (error) {
            console.error('Error al modificar estado_controlado de expediente:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
    //modificar estado_fedatado
    ModificarEstadoFedatado(req, res) {
        try {
            const { id } = req.params;
            const { estado_fedatado } = req.body;
            const consulta = `
                 
                    UPDATE t_expediente
                    SET  
                    estado_fedatado=$1
                    WHERE id_expediente=$2
                
                `;
            const valores = [estado_fedatado, id];
            database_1.default.query(consulta, valores, (error, resultado) => {
                if (error) {
                    console.error('Error al modificar estado_fedatado de expediente:', error);
                }
                else {
                    console.log('estado_indizado de expediente modificado correctamente');
                    res.json({ text: 'El estado_fedatado de expediente se modifico correctamente' });
                }
            });
        }
        catch (error) {
            console.error('Error al modificar estado_fedatado de expediente:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
    LimpiarProcesoExpediente(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_expediente } = req.body;
                yield database_1.default.query('DELETE FROM t_fedatar WHERE id_expediente = $1', [id_expediente]);
                yield database_1.default.query('DELETE FROM t_control_calidad WHERE id_expediente = $1', [id_expediente]);
                yield database_1.default.query('DELETE FROM t_indizacion WHERE id_expediente = $1', [id_expediente]);
                yield database_1.default.query('DELETE FROM t_digitalizacion WHERE id_expediente = $1', [id_expediente]);
                yield database_1.default.query(`
                UPDATE t_expediente
                SET id_responsable = NULL,
                    fojas = NULL,
                    fojas_unacara = NULL,
                    fojas_doscaras = NULL,
                    copias_originales = NULL,
                    copias_simples = NULL,
                    estado_preparado = NULL,
                    estado_controlado = NULL,
                    estado_digitalizado = NULL,
                    estado_indizado = NULL,
                    estado_fedatado = NULL
                WHERE id_expediente = $1
            `, [id_expediente]);
                res.json({ message: 'Proceso de expediente limpiado correctamente' });
            }
            catch (error) {
                console.error('Error al limpiar expediente:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
}
const expedienteController = new ExpedienteController();
exports.default = expedienteController;

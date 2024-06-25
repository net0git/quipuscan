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
class ResoucionController {
    listarResolucion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resoluciones = yield database_1.default.query('select * from d_resolucion');
                res.json(resoluciones['rows']);
            }
            catch (error) {
                console.error('Error al obtener resoluciones:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    ObtenerResolucion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const consulta = 'select * from d_resolucion where id_resolucion = $1';
                const resolucion = yield database_1.default.query(consulta, [id]);
                if (resolucion && resolucion['rows'].length > 0) {
                    res.json(resolucion['rows']);
                }
                else {
                    res.status(404).json({ text: 'La resolucion no existe' });
                }
            }
            catch (error) {
                console.error('Error al obtener resolucion:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    //obtener resolucion por numero y año
    ObtenerResolucionPorNroAnio(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { nro_resolucion, anio_resolucion } = req.params;
                const consulta = `
            -- Resoluciones de t_empresa_servicio_resoluciones
            SELECT r.id_resolucion, r.nro_resolucion, r.anio_resolucion, r.fecha_resolucion, r.tomo_resolucion, r.nombre_resolucion,r.documento, r.descripcion,
                        es.id_empresa_servicio AS empresa_cod_id,esv.expediente, e.razon_social AS nombre_empresa
                    FROM d_resolucion AS r
                    INNER JOIN t_empresa_servicio_resoluciones AS es ON r.id_resolucion = es.id_resolucion
                    INNER JOIN t_empresa_servicio AS esv ON es.id_empresa_servicio = esv.id_empresa_servicio
                    INNER JOIN t_empresa AS e ON esv.id_empresa = e.id_empresa
                    WHERE r.nro_resolucion=$1 and r.anio_resolucion=$2
            
            UNION
            
            -- Resoluciones de t_infraestructura_resoluciones
            SELECT r.id_resolucion, r.nro_resolucion, r.anio_resolucion, r.fecha_resolucion, r.tomo_resolucion, r.nombre_resolucion,r.documento, r.descripcion,
                        ir.id_infraestructura AS empresa_cod_id,e.expediente, e.nombre_infraestructura AS nombre_empresa
                    FROM d_resolucion AS r
                    INNER JOIN t_infraestructura_resoluciones AS ir ON r.id_resolucion = ir.id_resolucion
                    INNER JOIN t_infraestructura AS e ON ir.id_infraestructura = e.id_infraestructura
                    WHERE r.nro_resolucion=$1 and r.anio_resolucion=$2;
                
            `;
                const resolucion = yield database_1.default.query(consulta, [nro_resolucion, anio_resolucion]);
                if (resolucion && resolucion['rows'].length > 0) {
                    res.json(resolucion['rows']);
                }
                else {
                    res.status(404).json({ text: 'La resolucion no existe' });
                }
            }
            catch (error) {
                console.error('Error al obtener resolucion:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    CrearResolucion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { nro_resolucion, anio_resolucion, fecha_resolucion, nombre_resolucion, tomo_resolucion, documento, descripcion } = req.body;
                const consulta = `
                INSERT INTO d_resolucion(
                        nro_resolucion, anio_resolucion, fecha_resolucion, nombre_resolucion, tomo_resolucion, documento, descripcion)
                        VALUES ($1, $2, $3, $4, $5, $6, $7)
                    RETURNING id_resolucion; -- Devuelve el ID de la resolucion insertada
                
            `;
                const valores = [nro_resolucion, anio_resolucion, fecha_resolucion, nombre_resolucion, tomo_resolucion, documento, descripcion];
                database_1.default.query(consulta, valores, (error, resultado) => {
                    if (error) {
                        console.error('Error al insertar resolucion:', error);
                        res.status(500).json({ error: 'Error interno del servidor' });
                    }
                    else {
                        const idResolucion = resultado.rows[0]['id_resolucion']; // ID se encuentra en la primera fila
                        console.log('datos de certificado en BD:', idResolucion);
                        res.json({ id_resolucion: idResolucion, text: 'La resolucion se creó correctamente' });
                    }
                });
            }
            catch (error) {
                console.error('Error al crear resolucion:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    ModificarResolucion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { nro_resolucion, anio_resolucion, fecha_resolucion, nombre_resolucion, tomo_resolucion, documento, descripcion } = req.body;
                const consulta = `
                UPDATE public.d_resolucion 
                SET nro_resolucion= $1, anio_resolucion= $2, fecha_resolucion= $3, nombre_resolucion= $4, tomo_resolucion= $5, documento= $6, descripcion=$7
                WHERE id_resolucion=$8
                `;
                const valores = [nro_resolucion, anio_resolucion, fecha_resolucion, nombre_resolucion, tomo_resolucion, documento, descripcion, id];
                database_1.default.query(consulta, valores, (error, resultado) => {
                    if (error) {
                        console.error('Error al modificar resolucion:', error);
                    }
                    else {
                        console.log('resolucion modificado correctamente');
                        res.json({ text: 'La resolucion se modifico correctamente' });
                    }
                });
            }
            catch (error) {
                console.error('Error al modificar resolucion:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
}
const resoucionController = new ResoucionController();
exports.default = resoucionController;

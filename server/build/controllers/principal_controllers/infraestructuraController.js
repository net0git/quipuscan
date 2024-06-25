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
class InfraestructuraController {
    //listar las empresas por infraestructura de forma que enlace informacion con la tabla t_empresa y devuelva toda la informacion necesaria
    listarAllInfraestructura(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const consulta = `
                                SELECT
                                    ti.id_tipo_infraestructura,
                                    ti.id_infraestructura,
                                    ti.expediente,
                                    ti.provincia,
                                    ti.distrito,
                                    ti.departamento,
                                    ti.nombre_infraestructura,
                                    di.denominacion AS tipo_infraestructura,
                                    ti.direccion,
                                    ti.fecha_act,
                                    r.nombre_resolucion
                                FROM
                                    t_infraestructura ti
                                JOIN
                                    d_tipo_infraestructura di ON ti.id_tipo_infraestructura = di.id_tipo_infraestructura
                                JOIN 
                                    t_infraestructura_resoluciones tir ON ti.id_infraestructura=tir.id_infraestructura
                                JOIN
                                    d_resolucion r ON tir.id_resolucion = r.id_resolucion
                                WHERE
                                    r.fecha_resolucion = ti.fecha_act;
                `;
                const emrpesaInfraestructura = yield database_1.default.query(consulta);
                res.json(emrpesaInfraestructura['rows']);
            }
            catch (error) {
                console.error('Error al obtener las empresas por infraestructura:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    ObtenerInfraestructuraDetalle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const consulta = `
                            SELECT
                                ti.*,
                                di.denominacion AS tipo_infraestructura
                            FROM
                                t_infraestructura ti
                            JOIN
                                d_tipo_infraestructura di ON ti.id_tipo_infraestructura = di.id_tipo_infraestructura
                            WHERE ti.id_infraestructura=$1;
                     `;
                const empresaInfraestructura = yield database_1.default.query(consulta, [id]);
                if (empresaInfraestructura && empresaInfraestructura['rows'].length > 0) {
                    res.json(empresaInfraestructura['rows']);
                }
                else {
                    res.status(404).json({ text: 'La infraestructura no existe' });
                }
            }
            catch (error) {
                console.error('Error al obtener la infraestructura:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    CrearInfraestructura(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_tipo_infraestructura, fecha_act, expediente, ruc_empresa, nombre_infraestructura, direccion, distrito, provincia, departamento, mtc, representante, dni_representante, empresa } = req.body;
                const consulta = `
                INSERT INTO t_infraestructura(
                      id_tipo_infraestructura, fecha_act, expediente, ruc_empresa, nombre_infraestructura, direccion, distrito, provincia, departamento, mtc, representante, dni_representante, empresa)
                        VALUES ($1, $2, $3, $4, $5, $6, $7,$8 ,$9 ,$10 ,$11 ,$12, $13)
                    RETURNING id_infraestructura; -- Devuelve el id_infraestructura
            `;
                const valores = [id_tipo_infraestructura, fecha_act, expediente, ruc_empresa, nombre_infraestructura, direccion, distrito, provincia, departamento, mtc, representante, dni_representante, empresa];
                database_1.default.query(consulta, valores, (error, resultado) => {
                    if (error) {
                        console.error('Error al crear infraestructura:', error);
                        res.status(500).json({ error: 'Error interno del servidor' });
                    }
                    else {
                        const idInfraestructura = resultado.rows[0]['id_infraestructura']; // ID se encuentra en la primera fila
                        res.json({ id_infraestructura: idInfraestructura, text: 'La infraestructura se creó correctamente' });
                    }
                });
            }
            catch (error) {
                console.error('Error al crear emrpesa por infraestuctura:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    ModificarEmpresaInfraestuctura(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { id_tipo_infraestructura, fecha_act, expediente, ruc_empresa, nombre_infraestructura, direccion, distrito, provincia, departamento, mtc, representante, dni_representante, empresa } = req.body;
                const consulta = `
                UPDATE t_infraestructura 
                SET id_tipo_infraestructura=$1, fecha_act=$2, expediente=$3, ruc_empresa=$4, nombre_infraestructura=$5, direccion=$6, distrito=$7, provincia=$8, departamento=$9, mtc=$10, representante=$11, dni_representante=$12, empresa=$13
                WHERE id_infraestructura=$14
                    `;
                const valores = [id_tipo_infraestructura, fecha_act, expediente, ruc_empresa, nombre_infraestructura, direccion, distrito, provincia, departamento, mtc, representante, dni_representante, empresa, id];
                database_1.default.query(consulta, valores, (error, resultado) => {
                    if (error) {
                        console.error('Error al modificar la infraestructura:', error);
                    }
                    else {
                        console.log('La infraestructura se ha modificado correctamente');
                        res.json({ text: 'La infraestructura se modifico correctamente' });
                    }
                });
            }
            catch (error) {
                console.error('Error al modificar la infraestructura:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    //========================EN RELACION A SUS RESOLUCIONES==================================================================================
    //esta funcion devulve las resoluciones correspondientes a una infraestructura, la busqueda se realiza en funcion al id de la infraestructura 
    ObtnerResolucionesDeInfraestructura(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const consulta = `
            SELECT r.*
                    FROM d_resolucion r
                    JOIN t_infraestructura_resoluciones ir ON r.id_resolucion = ir.id_resolucion
                    WHERE ir.id_infraestructura =$1
                    ORDER BY r.fecha_resolucion
                    `;
                const tuc = yield database_1.default.query(consulta, [id]);
                if (tuc && tuc['rows'].length > 0) {
                    res.json(tuc['rows']);
                }
                else {
                    res.status(404).json({ text: 'las resoluciones correspondientes a la infraestrucutra no existen' });
                }
            }
            catch (error) {
                console.error('Error al obtener resoluciones:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    CrearResolucionInfraestructura(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_infraestructura, id_resolucion } = req.body;
                const consulta = `
                INSERT INTO t_infraestructura_resoluciones(
                    id_infraestructura,id_resolucion)
                    VALUES ($1, $2);
            `;
                const valores = [id_infraestructura, id_resolucion];
                database_1.default.query(consulta, valores, (error, resultado) => {
                    if (error) {
                        console.error('Error al insertar resolucion a la infraestructura:', error);
                    }
                    else {
                        console.log('resolucion insertado correctamente');
                        res.json({ text: 'La resolucion se inserto correctamente' });
                    }
                });
            }
            catch (error) {
                console.error('Error al crear resolucion:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    //=============EN RELACION A SUS CERTIFICADOS=======================================================================
    //esta funcion devuelve las resoluciones correspondientes a una infraestructura, la busqueda se realiza en funcion al id de la infraestructura 
    ObtnerCertificadosDeInfraestructura(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const consulta = `
                    SELECT ce.*
                            FROM d_certificado ce
                            JOIN t_infraestructura_certificados ir ON ce.id_certificado = ir.id_certificado
                        WHERE ir.id_infraestructura =$1
                        ORDER BY ce.fecha_certificado

                    `;
                const tuc = yield database_1.default.query(consulta, [id]);
                if (tuc && tuc['rows'].length > 0) {
                    res.json(tuc['rows']);
                }
                else {
                    res.status(404).json({ text: 'los certificados correspondientes a la infraestrucutra no existen' });
                }
            }
            catch (error) {
                console.error('Error al obtener certificado:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    CrearCertificadoInfraestructura(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_infraestructura, id_certificado } = req.body;
                const consulta = `
                INSERT INTO t_infraestructura_certificados(
                    id_infraestructura,id_certificado)
                    VALUES ($1, $2);
            `;
                const valores = [id_infraestructura, id_certificado];
                database_1.default.query(consulta, valores, (error, resultado) => {
                    if (error) {
                        console.error('Error al insertar certificado a la infraestructura:', error);
                    }
                    else {
                        console.log('certificado insertado correctamente');
                        res.json({ text: 'El certificado se creó correctamente' });
                    }
                });
            }
            catch (error) {
                console.error('Error al crear certificado:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    //=============================================EN RELACION A LOS REPORTES====================================================================
    CantidadDeInfraestructura(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const consulta = `
                        SELECT tipo_infraestructura, cantidad_infraestructuras
                        FROM (
                            SELECT
                                ti.denominacion AS tipo_infraestructura,
                                COUNT(inf.id_infraestructura) AS cantidad_infraestructuras
                            FROM 
                                d_tipo_infraestructura AS ti
                            LEFT JOIN 
                                t_infraestructura AS inf ON ti.id_tipo_infraestructura = inf.id_tipo_infraestructura
                            GROUP BY tipo_infraestructura

                            UNION ALL

                            SELECT
                                'Total' AS tipo_infraestructura,
                                COUNT(*) AS cantidad_infraestructuras
                            FROM 
                                t_infraestructura AS inf
                        ) AS result
                        ORDER BY tipo_infraestructura;
        
                    `;
                const emrpesaInfraestructura = yield database_1.default.query(consulta);
                res.json(emrpesaInfraestructura['rows']);
            }
            catch (error) {
                console.error('Error al obtener las cantidades de infraestructura:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
}
const infraestructuraController = new InfraestructuraController();
exports.default = infraestructuraController;

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
class EmpresaServicioController {
    //LISTA DE EMPRESAS Y SUS TIPOS DE SERCIO  id_tipo_Servicio, tipo_servicio, id_empresa, nombre_empresa
    listarEmpresasServicios(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //devuelve todas las empresas que estan registradas como servicio, juntamente con su estado de acuerdo a la fecha inicial de apertura
                // --empresas activas, inactivas y encondicion de alerta (empresa, id_tipo_servicio, tipo_servicio, fecha_activacion, fecha_vencimiento)
                const consulta = `
                            SELECT
                                es.id_empresa_servicio,
                                e.razon_social AS empresa,
                                e.ruc,
                                es.id_tipo_servicio AS id_tipo_servicio, 
                                ts.denominacion AS tipo_servicio,
                                es.fecha_inicial,
                                es.fecha_final,
                                es.expediente,
                                CASE
                                    WHEN CURRENT_DATE < es.fecha_final - INTERVAL '6 months' THEN 'Activo'
                                    WHEN CURRENT_DATE >= es.fecha_final - INTERVAL '6 months' AND CURRENT_DATE <= es.fecha_final THEN 'Alerta'
                                    WHEN CURRENT_DATE > es.fecha_final THEN 'Inactivo'
                                END AS estado,
                                CASE
                                    WHEN CURRENT_DATE < es.fecha_final THEN 
                                        ROUND(CAST(EXTRACT(EPOCH FROM AGE(CURRENT_DATE, es.fecha_inicial)) / 
                                            EXTRACT(EPOCH FROM AGE(es.fecha_final, es.fecha_inicial)) * 100 AS numeric), 2)
                                    ELSE 100.00
                                END AS porcentaje
                            FROM
                                t_empresa_servicio es
                            JOIN t_empresa e ON es.id_empresa = e.id_empresa
                            JOIN d_tipo_servicio ts ON es.id_tipo_servicio = ts.id_tipo_servicio
                            ORDER BY
                                es.expediente;
                    `;
                const empresaServicios = yield database_1.default.query(consulta);
                res.json(empresaServicios['rows']);
            }
            catch (error) {
                console.error('Error al obtener empresas por servicio:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    ObtenerEmpresaServicio(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //devuelve todas las empresas que estan registradas como servicio, juntamente con su estado de acuerdo a la fecha inicial de apertura
                // --empresas activas, inactivas y encondicion de alerta (empresa, id_tipo_servicio, tipo_servicio, fecha_activacion, fecha_vencimiento)
                const { id } = req.params;
                const consulta = `
                            select * 
                            from t_empresa_servicio 
                            where id_empresa_servicio=$1 
                    `;
                const empresaServicios = yield database_1.default.query(consulta, [id]);
                res.json(empresaServicios['rows']);
            }
            catch (error) {
                console.error('Error al obtener empresa por servicio:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    //muestra el detalle de la empresa en funcion al id de la tabla t_servicio_empresa
    ObtenerDetalleEmpresaServicio(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const consulta = `
                            SELECT 
                                tes.id_empresa_servicio,
                                ts.denominacion as tipo_servicio ,
                                ts.id_tipo_servicio,
                                te.* ,CONCAT(pe.nombres,' ',pe.ap_paterno,' ',pe.ap_materno) AS representante_legal, 
                                tes.expediente, tes.fecha_inicial, 
                                tes.fecha_final,
                                CASE
                                    WHEN CURRENT_DATE < tes.fecha_final - INTERVAL '6 months' THEN 'Activo'
                                    WHEN CURRENT_DATE >= tes.fecha_final - INTERVAL '6 months' AND CURRENT_DATE <= tes.fecha_final THEN 'Alerta'
                                    WHEN CURRENT_DATE > tes.fecha_final THEN 'Inactivo'
                                END AS estado,
                                CASE
                                    WHEN CURRENT_DATE < tes.fecha_final THEN 
                                        ROUND(CAST(EXTRACT(EPOCH FROM AGE(CURRENT_DATE, tes.fecha_inicial)) / 
                                            EXTRACT(EPOCH FROM AGE(tes.fecha_final, tes.fecha_inicial)) * 100 AS numeric), 2)
                                    ELSE 100.00
                                END AS porcentaje
                            FROM t_empresa_servicio AS tes
                            JOIN t_empresa AS te ON tes.id_empresa = te.id_empresa
                            JOIN d_tipo_servicio AS ts ON tes.id_tipo_servicio=ts.id_tipo_servicio
                            JOIN t_persona AS pe ON te.id_representante_legal=pe.id_persona
                            WHERE tes.id_empresa_servicio =$1;
            `;
                const empresaServicio = yield database_1.default.query(consulta, [id]);
                if (empresaServicio && empresaServicio['rows'].length > 0) {
                    res.json(empresaServicio['rows']);
                }
                else {
                    res.status(404).json({ text: 'los detalles de la empresa no existe' });
                }
            }
            catch (error) {
                console.error('Error al obtener los detalles de la empresa:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    ObtenerListaConductores(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const consulta = `
            SELECT
                    tp.id_persona,
                    tc.id_conductor,
                    tc.categoria,
                    tp.nombres,
                    tp.ap_paterno,
                    tp.ap_materno,
                    tp.tipo_doc,
                    tp.documento,
                    tp.telefono,
                    tp.correo,
                    tc.nro_licencia
                FROM
                    t_conductor tc
                INNER JOIN
                    t_empresa_servicio tes ON tc.id_empresa_servicio = tes.id_empresa_servicio
                INNER JOIN
                    t_empresa te ON tes.id_empresa = te.id_empresa
                INNER JOIN
                    t_persona tp ON tc.id_persona = tp.id_persona
                WHERE
                    tes.id_empresa_servicio =$1
               
                    `;
                const conductores = yield database_1.default.query(consulta, [id]);
                res.json(conductores['rows']);
            }
            catch (error) {
                console.error('Error al obtener lista de conductores:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    CrearEmpresaServicio(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_tipo_servicio, id_empresa, fecha_inicial, expediente, fecha_final } = req.body;
                const consulta = `
                INSERT INTO t_empresa_servicio(
                     id_tipo_servicio, id_empresa, fecha_inicial, expediente, fecha_final )
                    VALUES ($1, $2, $3, $4, $5)
                    RETURNING id_empresa_servicio; -- Devuelve el ID de la empresa  

            `;
                const valores = [id_tipo_servicio, id_empresa, fecha_inicial, expediente, fecha_final];
                database_1.default.query(consulta, valores, (error, resultado) => {
                    if (error) {
                        console.error('Error al insertar empresa:', error);
                        res.status(500).json({ error: 'Error interno del servidor' });
                    }
                    else {
                        const idEmpresa = resultado.rows[0]['id_empresa_servicio']; // ID se encuentra en la primera fila
                        res.json({ id_empresa_servicio: idEmpresa, text: 'La emrpesa_servicio se creó correctamente' });
                    }
                });
                // db.query(consulta, valores, (error, resultado) => {
                //     if (error) {
                //         console.error('Error al insertar empresa por servicio:', error);
                //     } else {
                //         console.log('emrpesa por servicio insertado correctamente');
                //         res.json({ text: 'La empresa por servicio se creó correctamente' });
                //     }
                // });
            }
            catch (error) {
                console.error('Error al crear la empresa por sevicio:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    ModificarEmpresaServicio(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { id_tipo_servicio, id_empresa, fecha_inicial, expediente, fecha_final } = req.body;
                const consulta = `
                UPDATE t_empresa_servicio 
                SET  id_tipo_servicio=$1, id_empresa=$2, fecha_inicial=$3, expediente=$4, fecha_final=$5
                WHERE id_empresa_servicio=$6
                `;
                const valores = [id_tipo_servicio, id_empresa, fecha_inicial, expediente, fecha_final, id];
                database_1.default.query(consulta, valores, (error, resultado) => {
                    if (error) {
                        console.error('Error al modificar empresa por sevicio:', error);
                    }
                    else {
                        console.log('empresa por servicio se  modificado correctamente');
                        res.json({ text: 'la empresa por servicio se modifico correctamente' });
                    }
                });
            }
            catch (error) {
                console.error('Error al modificar la empresa por servicio:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    BuscarEmpresaPorRuc_TipoServicio(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_tipo_servicio, empresa_ruc } = req.params;
                const consulta = `
                    SELECT *
                    FROM t_empresa_servicio
                    WHERE id_tipo_servicio = $1
                    AND id_empresa IN (
                        SELECT id_empresa
                        FROM t_empresa
                        WHERE ruc = $2
            );
                `;
                const empresa_servicio = yield database_1.default.query(consulta, [id_tipo_servicio, empresa_ruc]);
                if (empresa_servicio && empresa_servicio['rows'].length > 0) {
                    res.json(empresa_servicio['rows']);
                }
                else {
                    res.status(404).json({ text: 'la empresa por tipo de servicio y ruc no existe ' });
                }
            }
            catch (error) {
                console.error('Error al obtener empresa por servicio y ruc:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    //------------------------------------------------------------------------------------------------------------------------
    //BUSCAR EMPRESA POR VEHICULO
    ObtenerEmpresaPorPlaca(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { placa } = req.params;
                const consulta = `
                    SELECT
                        e.razon_social
                        
                    FROM
                        t_vehiculo v 
                    JOIN
                        t_empresa_servicio es ON v.id_empresa_servicio = es.id_empresa_servicio
                    JOIN
                        t_empresa e ON es.id_empresa=e.id_empresa
                    
                    WHERE
                        v.placa=$1
                `;
                const tuc = yield database_1.default.query(consulta, [placa]);
                if (tuc && tuc['rows'].length > 0) {
                    res.json(tuc['rows']);
                }
                else {
                    res.status(404).json({ text: 'la empresa buscada por placa no existe' });
                }
            }
            catch (error) {
                console.error('Error al obtener empresa:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    //===========================================EN RELACION A SUS RESOLUCIONES==================================================================================================
    //esta funcion devulve las resoluciones correspondientes a una empresa, la busqueda se realiza en funcion al id de la empresa 
    ObtnerResolucionesDeEmpresaServicio(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const consulta = `
        SELECT r.*
                FROM d_resolucion r
                JOIN t_empresa_servicio_resoluciones ir ON r.id_resolucion = ir.id_resolucion
                WHERE ir.id_empresa_servicio =$1
                ORDER BY r.fecha_resolucion
                `;
                const tuc = yield database_1.default.query(consulta, [id]);
                if (tuc && tuc['rows'].length > 0) {
                    res.json(tuc['rows']);
                }
                else {
                    res.status(404).json({ text: 'las resoluciones correspondientes a la empresa no existen' });
                }
            }
            catch (error) {
                console.error('Error al obtener resoluciones:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    //esta funcion solo devuelve el listado de las resoluciones sin el documento
    ListarNombreResolucionesDeEmpresaServicio(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const consulta = `
                SELECT r.id_resolucion, r.nombre_resolucion, r.fecha_resolucion
                    FROM d_resolucion r
                    JOIN t_empresa_servicio_resoluciones ir ON r.id_resolucion = ir.id_resolucion
                    WHERE ir.id_empresa_servicio =$1
                ORDER BY r.fecha_resolucion
                `;
                const tuc = yield database_1.default.query(consulta, [id]);
                if (tuc && tuc['rows'].length > 0) {
                    res.json(tuc['rows']);
                }
                else {
                    res.status(404).json({ text: 'los nombres de las  resoluciones correspondientes a la empresa no existen' });
                }
            }
            catch (error) {
                console.error('Error al obtener resoluciones:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    CrearResolucionEmpresaServicio(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_empresa_servicio, id_resolucion } = req.body;
                const consulta = `
            INSERT INTO t_empresa_servicio_resoluciones(
                id_empresa_servicio,id_resolucion)
                VALUES ($1, $2);
        `;
                const valores = [id_empresa_servicio, id_resolucion];
                database_1.default.query(consulta, valores, (error, resultado) => {
                    if (error) {
                        console.error('Error al insertar resolucione a empresa por servicio:', error);
                    }
                    else {
                        console.log('resolucion insertado correctamente');
                        res.json({ text: 'La resolucion se creó correctamente' });
                    }
                });
            }
            catch (error) {
                console.error('Error al crear resolucion:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    //=============================================EN RELACION A LOS REPORTES=============================================================================================================
    listarEmpresasPorRuta(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const consulta = `
                    SELECT DISTINCT
                        tdr.origen AS origen_ruta,
                        tdr.destino AS destino_ruta,
                        e.razon_social AS nombre_empresa
                    FROM 
                        t_detalle_ruta_itinerario AS tdr
                    JOIN 
                        t_empresa_servicio AS te ON tdr.id_empresa_servicio = te.id_empresa_servicio
                    JOIN 
                        t_empresa AS e ON te.id_empresa = e.id_empresa
                    WHERE 
                        (tdr.origen IS NOT NULL AND tdr.origen <> '') AND (tdr.destino IS NOT NULL AND tdr.destino <> '');
                `;
                const tuc = yield database_1.default.query(consulta);
                if (tuc && tuc['rows'].length > 0) {
                    res.json(tuc['rows']);
                }
                else {
                    res.status(404).json({ text: 'no existen empresas por ruta' });
                }
            }
            catch (error) {
                console.error('Error al obtener empresas por ruta:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    listarEmpresasPorRutaOrigen(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { origen } = req.params;
                const consulta = `
                        SELECT DISTINCT
                            tdr.origen AS origen_ruta,
                            tdr.destino AS destino_ruta,
                            e.razon_social AS nombre_empresa
                        FROM 
                            t_detalle_ruta_itinerario AS tdr
                        JOIN 
                            t_empresa_servicio AS te ON tdr.id_empresa_servicio = te.id_empresa_servicio
                        JOIN 
                            t_empresa AS e ON te.id_empresa = e.id_empresa
                        WHERE 
                            tdr.origen =$1;
                `;
                const tuc = yield database_1.default.query(consulta, [origen]);
                if (tuc && tuc['rows'].length > 0) {
                    res.json(tuc['rows']);
                }
                else {
                    res.status(404).json({ text: 'no existen empresas por origen ruta' });
                }
            }
            catch (error) {
                console.error('Error al obtener empresas por origen ruta:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    listarEmpresasPorRutaDestino(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { destino } = req.params;
                const consulta = `
                            SELECT DISTINCT
                                tdr.origen AS origen_ruta,
                                tdr.destino AS destino_ruta,
                                e.razon_social AS nombre_empresa
                            FROM 
                                t_detalle_ruta_itinerario AS tdr
                            JOIN 
                                t_empresa_servicio AS te ON tdr.id_empresa_servicio = te.id_empresa_servicio
                            JOIN 
                                t_empresa AS e ON te.id_empresa = e.id_empresa
                            WHERE 
                                tdr.destino = $1;
                `;
                const tuc = yield database_1.default.query(consulta, [destino]);
                if (tuc && tuc['rows'].length > 0) {
                    res.json(tuc['rows']);
                }
                else {
                    res.status(404).json({ text: 'no existen empresas por destino ruta' });
                }
            }
            catch (error) {
                console.error('Error al obtener empresas por ruta:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    listarEmpresasPorRutaOrigenDestino(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { origen, destino } = req.params;
                const consulta = `
                        SELECT DISTINCT
                            tdr.origen AS origen_ruta,
                            tdr.destino AS destino_ruta,
                            e.razon_social AS nombre_empresa
                        FROM 
                            t_detalle_ruta_itinerario AS tdr
                        JOIN 
                            t_empresa_servicio AS te ON tdr.id_empresa_servicio = te.id_empresa_servicio
                        JOIN 
                            t_empresa AS e ON te.id_empresa = e.id_empresa
                        WHERE 
                            tdr.origen =$1 AND tdr.destino = $2;
                `;
                const tuc = yield database_1.default.query(consulta, [origen, destino]);
                if (tuc && tuc['rows'].length > 0) {
                    res.json(tuc['rows']);
                }
                else {
                    res.status(404).json({ text: 'no existen empresas por origen y destino ruta' });
                }
            }
            catch (error) {
                console.error('Error al obtener empresas por ruta:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    //cantidad de empresas por tipo se servicio
    CantidadDeEmpresasPorTipoServicio(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const consulta = `
                            SELECT tipo_servicio, cantidad_empresas
                            FROM (
                                SELECT
                                    ts.denominacion AS tipo_servicio,
                                    COUNT(te.id_empresa) AS cantidad_empresas,
                                    1 AS orden
                                FROM 
                                    d_tipo_servicio AS ts
                                LEFT JOIN 
                                    t_empresa_servicio AS te ON ts.id_tipo_servicio = te.id_tipo_servicio
                                GROUP BY tipo_servicio
                            
                                UNION ALL
                            
                                SELECT
                                    'Total' AS tipo_servicio,
                                    COUNT(te.id_empresa) AS cantidad_empresas,
                                    2 AS orden
                                FROM 
                                    t_empresa_servicio AS te
                            ) AS result
                            ORDER BY orden;
                `;
                const tuc = yield database_1.default.query(consulta);
                if (tuc && tuc['rows'].length > 0) {
                    res.json(tuc['rows']);
                }
                else {
                    res.status(404).json({ text: 'no existen cantidades de las empresas por tipo de servicio' });
                }
            }
            catch (error) {
                console.error('Error al obtener  cantidades de las empresas por tipo de servivio:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    //cantidad de empresas por ruta
    CantidadDeEmpresasPorRuta(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const consulta = `
                            --cantidad de empresas que pasan por ruta
                            SELECT
                                origen_ruta,
                                destino_ruta,
                                COUNT(nombre_empresa) AS cantidad_empresas
                            FROM (
                                SELECT DISTINCT
                                    tdr.origen AS origen_ruta,
                                    tdr.destino AS destino_ruta,
                                    e.razon_social AS nombre_empresa
                                FROM 
                                    t_detalle_ruta_itinerario AS tdr
                                JOIN 
                                    t_empresa_servicio AS te ON tdr.id_empresa_servicio = te.id_empresa_servicio
                                JOIN 
                                    t_empresa AS e ON te.id_empresa = e.id_empresa
                                WHERE 
                                    (tdr.origen IS NOT NULL AND tdr.origen <> '') AND (tdr.destino IS NOT NULL AND tdr.destino <> '')
                            ) AS subconsulta
                            GROUP BY origen_ruta, destino_ruta
                `;
                const tuc = yield database_1.default.query(consulta);
                if (tuc && tuc['rows'].length > 0) {
                    res.json(tuc['rows']);
                }
                else {
                    res.status(404).json({ text: 'no existen cantidades de las empresas por ruta' });
                }
            }
            catch (error) {
                console.error('Error al obtener  cantidades de las empresas por  ruta:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    CantidadEstadoEmpresas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const consulta = `
                                SELECT
                                    COUNT(CASE WHEN estado = 'Activo' THEN 1 ELSE NULL END) AS empresas_activas,
                                    COUNT(CASE WHEN estado = 'Alerta' THEN 1 ELSE NULL END) AS empresas_en_alerta,
                                    COUNT(CASE WHEN estado = 'Inactivo' THEN 1 ELSE NULL END) AS empresas_de_baja
                                FROM (
                                    SELECT tes.id_empresa_servicio, te.*, CONCAT(pe.nombres, ' ', pe.ap_paterno, ' ', pe.ap_materno) AS representante_legal, tes.expediente, tes.fecha_inicial, tes.fecha_final,
                                        CASE
                                            WHEN CURRENT_DATE < tes.fecha_final - INTERVAL '6 months' THEN 'Activo'
                                            WHEN CURRENT_DATE >= tes.fecha_final - INTERVAL '6 months' AND CURRENT_DATE <= tes.fecha_final THEN 'Alerta'
                                            WHEN CURRENT_DATE > tes.fecha_final THEN 'Inactivo'
                                        END AS estado
                                    FROM t_empresa_servicio AS tes
                                    JOIN t_empresa AS te ON tes.id_empresa = te.id_empresa
                                    JOIN t_persona AS pe ON te.id_representante_legal = pe.id_persona
                                ) AS empresas_estado;
        `;
                const EstadoEmpresaServicio = yield database_1.default.query(consulta);
                if (EstadoEmpresaServicio && EstadoEmpresaServicio['rows'].length > 0) {
                    res.json(EstadoEmpresaServicio['rows']);
                }
                else {
                    res.status(404).json({ text: 'los detalles de la empresa no existe' });
                }
            }
            catch (error) {
                console.error('Error al obtener los detalles de la empresa:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
}
const empresaServicioController = new EmpresaServicioController();
exports.default = empresaServicioController;

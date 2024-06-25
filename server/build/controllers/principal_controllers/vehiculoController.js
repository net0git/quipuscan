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
class VehiculoController {
    listarVehiculos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const consulta = `
                                SELECT
                                    ts.denominacion as tipo_servicio,
                                    e.razon_social,
                                    v.id_vehiculo,
                                    v.placa,
                                    v.nro_part_reg,
                                    v.modalidad,
                                    v.estado,
                                    v.carga,
                                    v.peso,
                                    v.categoria,
                                    v.anio_fabricacion,
                                    v.color,
                                    v.nro_chasis,
                                    v.nro_asientos,
                                    v.marca,
                                    v.modelo,
                                    v.serie,
                                    v.carroceria,
                                    v.id_tuc,
                                    r.fecha_resolucion as fecha_inicial,
                                    es.fecha_final,
                                    r.nombre_resolucion,
                                    i.itinerario
                                FROM
                                    t_vehiculo v
                                JOIN
                                    t_empresa_servicio es ON v.id_empresa_servicio = es.id_empresa_servicio
                                JOIN 
                                    d_tipo_servicio ts ON es.id_tipo_servicio=ts.id_tipo_servicio
                                JOIN
                                    t_empresa e ON es.id_empresa=e.id_empresa
                                JOIN 
                                    d_resolucion r ON v.id_resolucion=r.id_resolucion
                                JOIN 
                                    t_detalle_ruta_itinerario i ON v.id_detalle_ruta_itinerario=i.id_detalle_ruta_itinerario
                                

                             `;
                const vehiculos = yield database_1.default.query(consulta);
                res.json(vehiculos['rows']);
            }
            catch (error) {
                console.error('Error al obtener vehiculos:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    listarTotalVehiculosPorEmpresa(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const consulta = `
                        SELECT 
                            e.razon_social AS nombre_empresa,
                            e.ruc,
                            te.fecha_inicial,
                            te.fecha_final,
                            v.placa AS placa_vehiculo,
                            v.anio_fabricacion,
                            ts.denominacion AS tipo_servicio,
                            r.itinerario 
                            
                        FROM 
                            t_empresa_servicio AS te
                        JOIN 
                            t_vehiculo AS v ON te.id_empresa_servicio = v.id_empresa_servicio
                        JOIN 
                            d_tipo_servicio AS ts ON te.id_tipo_servicio=ts.id_tipo_servicio
                        JOIN 
                            t_detalle_ruta_itinerario AS r ON v.id_detalle_ruta_itinerario = r.id_detalle_ruta_itinerario
                        JOIN 
                            t_empresa AS e ON te.id_empresa=e.id_empresa        

                             `;
                const vehiculos = yield database_1.default.query(consulta);
                res.json(vehiculos['rows']);
            }
            catch (error) {
                console.error('Error al obtener vehiculos:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    listarVehiculosDetallePorEmpresa(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const consulta = `
                                    SELECT
                                        ts.denominacion as tipo_servicio,
                                        e.razon_social,
                                        v.id_vehiculo,
                                        v.placa,
                                        v.nro_part_reg,
                                        v.modalidad,
                                        v.estado,
                                        v.carga,
                                        v.peso,
                                        v.categoria,
                                        v.anio_fabricacion,
                                        v.color,
                                        v.nro_chasis,
                                        v.nro_asientos,
                                        v.marca,
                                        v.modelo,
                                        v.serie,
                                        v.carroceria,
                                        v.id_tuc,
                                        r.fecha_resolucion as fecha_inicial,
                                        es.fecha_final,
                                        r.nombre_resolucion,
                                        i.itinerario
                                    FROM
                                        t_vehiculo v
                                    JOIN
                                        t_empresa_servicio AS es ON v.id_empresa_servicio = es.id_empresa_servicio
                                    JOIN
                                        d_tipo_servicio AS ts ON es.id_tipo_servicio = ts.id_tipo_servicio
                                    JOIN
                                        t_empresa AS e ON es.id_empresa=e.id_empresa
                                    JOIN 
                                        d_resolucion AS r ON v.id_resolucion=r.id_resolucion
                                    JOIN 
                                        t_detalle_ruta_itinerario AS i ON v.id_detalle_ruta_itinerario=i.id_detalle_ruta_itinerario
                                    WHERE
                                        es.id_empresa_servicio=$1

                             `;
                const vehiculos = yield database_1.default.query(consulta, [id]);
                res.json(vehiculos['rows']);
            }
            catch (error) {
                console.error('Error al obtener vehiculos:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    ObtenerVehiculo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const consulta = 'select * from t_vehiculo where id_vehiculo = $1';
                const vehiculo = yield database_1.default.query(consulta, [id]);
                if (vehiculo && vehiculo['rows'].length > 0) {
                    res.json(vehiculo['rows']);
                }
                else {
                    res.status(404).json({ text: 'El vehiculo no existe' });
                }
            }
            catch (error) {
                console.error('Error al obtener vehiculo:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    ObtenerVehiculoPorPlaca(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { placa } = req.params;
                const consulta = 'select * from t_vehiculo where placa = $1';
                const vehiculo = yield database_1.default.query(consulta, [placa]);
                if (vehiculo && vehiculo['rows'].length > 0) {
                    res.json(vehiculo['rows']);
                }
                else {
                    res.status(404).json({ text: 'El vehiculo no existe' });
                }
            }
            catch (error) {
                console.error('Error al obtener vehiculo:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    ObtenerHistorialVehicularPorPlaca(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { placa } = req.params;
                const consulta = `
                        SELECT ehv.*,
                               es.id_empresa AS id_empresa_servicio,
                               e.razon_social AS nombre_empresa
                            FROM r_empre_histo_vehiculo ehv
                            INNER JOIN t_empresa_servicio es ON ehv.id_empresa_servicio = es.id_empresa_servicio
                            INNER JOIN t_empresa e ON es.id_empresa = e.id_empresa
                            WHERE ehv.placa=$1
                            ORDER BY ehv.create_at
                             `;
                const vehiculo = yield database_1.default.query(consulta, [placa]);
                if (vehiculo && vehiculo['rows'].length > 0) {
                    res.json(vehiculo['rows']);
                }
                else {
                    res.status(404).json({ text: 'El historial vehicular no existe' });
                }
            }
            catch (error) {
                console.error('Error al obtener historial vehicular:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    CrearVehiculo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { placa, categoria, anio_fabricacion, peso, carga, serie, nro_asientos, color, carroceria, modalidad, nro_part_reg, id_detalle_ruta_itinerario, id_tuc, id_resolucion, estado, marca, modelo, id_empresa_servicio, nro_chasis } = req.body;
                const consulta = `
                    INSERT INTO t_vehiculo(
                            placa, categoria, anio_fabricacion, peso, carga, serie, nro_asientos, color, carroceria, modalidad, nro_part_reg, id_detalle_ruta_itinerario, id_tuc, id_resolucion, estado, marca, modelo, id_empresa_servicio, nro_chasis)
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16 ,$17 ,$18, $19);
           
            `;
                const valores = [placa, categoria, anio_fabricacion, peso, carga, serie, nro_asientos, color, carroceria, modalidad, nro_part_reg, id_detalle_ruta_itinerario, id_tuc, id_resolucion, estado, marca, modelo, id_empresa_servicio, nro_chasis];
                database_1.default.query(consulta, valores, (error, resultado) => {
                    if (error) {
                        console.error('Error al insertar vehiculo:', error);
                    }
                    else {
                        console.log('vehiculo insertado correctamente');
                        res.json({ text: 'El vehiculo se creó correctamente' });
                    }
                });
            }
            catch (error) {
                console.error('Error al crear vehiculo:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    ModificarVehiculo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { placa, categoria, anio_fabricacion, peso, carga, serie, nro_asientos, color, carroceria, modalidad, nro_part_reg, id_detalle_ruta_itinerario, id_resolucion, estado, marca, modelo, id_empresa_servicio, nro_chasis } = req.body;
                const consulta = `
                UPDATE t_vehiculo
                        SET placa=$1, categoria=$2, anio_fabricacion=$3, peso=$4, carga=$5, serie=$6, nro_asientos=$7, color=$8, carroceria=$9, modalidad=$10, nro_part_reg=$11, id_detalle_ruta_itinerario=$12, id_resolucion=$13, estado=$14, marca=$15, modelo=$16, id_empresa_servicio=$17, nro_chasis=$18
                WHERE id_vehiculo=$19
                `;
                const valores = [placa, categoria, anio_fabricacion, peso, carga, serie, nro_asientos, color, carroceria, modalidad, nro_part_reg, id_detalle_ruta_itinerario, id_resolucion, estado, marca, modelo, id_empresa_servicio, nro_chasis, id];
                database_1.default.query(consulta, valores, (error, resultado) => {
                    if (error) {
                        console.error('Error al modificar vehiculo:', error);
                    }
                    else {
                        console.log('vehiculo modificado correctamente');
                        res.json({ text: 'El vehiculo se modifico correctamente' });
                    }
                });
            }
            catch (error) {
                console.error('Error al modificar vehiculo:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    ModificarTucVehiculo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { id_tuc } = req.body;
                const consulta = `
                UPDATE t_vehiculo
                       SET   id_tuc=$1
                WHERE id_vehiculo=$2
                `;
                const valores = [id_tuc, id];
                database_1.default.query(consulta, valores, (error, resultado) => {
                    if (error) {
                        console.error('Error al modificar tuc vehiculo:', error);
                    }
                    else {
                        console.log('tuc vehiculo modificado correctamente');
                        res.json({ text: 'La tuc del vehiculo se modifico correctamente' });
                    }
                });
            }
            catch (error) {
                console.error('Error al modificar vehiculo:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    BajaVehiculo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { id_detalle_ruta_itinerario, id_tuc, id_resolucion, estado, id_empresa_servicio } = req.body;
                const consulta = `
                        UPDATE t_vehiculo
                            SET  id_detalle_ruta_itinerario=$1, id_tuc=$2, id_resolucion=$3, estado=$4,id_empresa_servicio=$5 
                        WHERE id_vehiculo=$6;
                      `;
                const valores = [id_detalle_ruta_itinerario, id_tuc, id_resolucion, estado, id_empresa_servicio, id];
                database_1.default.query(consulta, valores, (error, resultado) => {
                    if (error) {
                        console.error('Error al dar de baja al vehiculo:', error);
                    }
                    else {
                        console.log('Baja de vehiculo exitoso');
                        res.json({ text: 'Baja de vehiculo exitoso' });
                    }
                });
            }
            catch (error) {
                console.error('Error al modificar la baja del vehiculo:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    //=====================EN RELACION A LOS REPORTES=====================================================================================================================================
    listarVehiculosPorRuta(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const consulta = ` 
                            SELECT DISTINCT
                                tdr.origen AS origen_ruta,
                                tdr.destino AS destino_ruta,
                                tv.placa AS placa_vehiculo,
                                tv.modalidad AS modalidad_vehiculo,
                                te.razon_social AS nombre_empresa
                            FROM 
                                t_detalle_ruta_itinerario AS tdr
                            JOIN 
                                t_vehiculo AS tv ON tdr.id_detalle_ruta_itinerario = tv.id_detalle_ruta_itinerario
                            JOIN 
                                t_empresa_servicio AS tes ON tv.id_empresa_servicio = tes.id_empresa_servicio
                            JOIN 
                                t_empresa AS te ON tes.id_empresa = te.id_empresa;
                             `;
                const vehiculos = yield database_1.default.query(consulta);
                res.json(vehiculos['rows']);
            }
            catch (error) {
                console.error('Error al obtener vehiculos por ruta:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    //Lista de vehiculos que pasan por un origen de ruta
    listarVehiculosPorOrigenRuta(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { origen } = req.params;
                const consulta = ` 
                            SELECT DISTINCT 
                                dr.origen AS origen_ruta,
                                dr.destino AS destino_ruta,
                                v.placa AS placa_vehiculo,
                                v.modalidad AS modalidad_vehiculo,
                                te.razon_social AS nombre_empresa
                            FROM t_detalle_ruta_itinerario AS dr
                            INNER JOIN t_vehiculo AS v ON dr.id_detalle_ruta_itinerario = v.id_detalle_ruta_itinerario
                            INNER JOIN t_empresa_servicio AS tes ON v.id_empresa_servicio = tes.id_empresa_servicio
                            INNER JOIN t_empresa AS te ON tes.id_empresa = te.id_empresa
                            WHERE dr.origen = $1 
                             `;
                const vehiculos = yield database_1.default.query(consulta, [origen]);
                res.json(vehiculos['rows']);
            }
            catch (error) {
                console.error('Error al obtener vehiculos por origen de ruta:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    //Lista de vehiculos que pasan por un destino de ruta
    listarVehiculosPorDestinoRuta(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { destino } = req.params;
                const consulta = ` 
                                SELECT DISTINCT 
                                    dr.origen AS origen_ruta,
                                    dr.destino AS destino_ruta,
                                    v.placa AS placa_vehiculo,
                                    v.modalidad AS modalidad_vehiculo,
                                    te.razon_social AS nombre_empresa
                                FROM t_detalle_ruta_itinerario AS dr
                                INNER JOIN t_vehiculo AS v ON dr.id_detalle_ruta_itinerario = v.id_detalle_ruta_itinerario
                                INNER JOIN t_empresa_servicio AS tes ON v.id_empresa_servicio = tes.id_empresa_servicio
                                INNER JOIN t_empresa AS te ON tes.id_empresa = te.id_empresa
                                WHERE  dr.destino = $1;
                             `;
                const vehiculos = yield database_1.default.query(consulta, [destino]);
                res.json(vehiculos['rows']);
            }
            catch (error) {
                console.error('Error al obtener vehiculos por destino de ruta:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    //lista de vehiculos que pasan por un origen y destino especifico 
    listarVehiculosPorOrigenDestinoRuta(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { origen, destino } = req.params;
                const consulta = ` 
                                    SELECT DISTINCT 
                                        dr.origen AS origen_ruta,
                                        dr.destino AS destino_ruta,
                                        v.placa AS placa_vehiculo,
                                        v.modalidad AS modalidad_vehiculo,
                                        te.razon_social AS nombre_empresa
                                    FROM t_detalle_ruta_itinerario AS dr
                                    INNER JOIN t_vehiculo AS v ON dr.id_detalle_ruta_itinerario = v.id_detalle_ruta_itinerario
                                    INNER JOIN t_empresa_servicio AS tes ON v.id_empresa_servicio = tes.id_empresa_servicio
                                    INNER JOIN t_empresa AS te ON tes.id_empresa = te.id_empresa
                                    WHERE dr.origen = $1 AND dr.destino = $2;
                             `;
                const vehiculos = yield database_1.default.query(consulta, [origen, destino]);
                res.json(vehiculos['rows']);
            }
            catch (error) {
                console.error('Error al obtener vehiculos por origen y destino de ruta:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    //cantidad de vehiculos por tipo de servicio 
    CantidadVehiculosPorTipoServicio(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const consulta = `
                            SELECT
                                ts.denominacion AS tipo_servicio,
                                COUNT(tv.id_vehiculo) AS cantidad_vehiculos
                            FROM 
                                d_tipo_servicio AS ts
                            LEFT JOIN 
                                t_empresa_servicio AS tes ON ts.id_tipo_servicio = tes.id_tipo_servicio
                            LEFT JOIN 
                                t_vehiculo AS tv ON tes.id_empresa_servicio = tv.id_empresa_servicio
                            GROUP BY tipo_servicio
                            
                            UNION ALL
                            
                            -- Consulta para obtener el total general de vehículos
                            SELECT
                                'Total General' AS tipo_servicio,
                                COUNT(tv.id_vehiculo) AS cantidad_vehiculos
                            FROM 
                                t_vehiculo AS tv
                            where 
                                tv.id_empresa_servicio is not null
                             `;
                const vehiculos = yield database_1.default.query(consulta);
                res.json(vehiculos['rows']);
            }
            catch (error) {
                console.error('Error al obtener cantidades de vehiculos por tipo de sercio:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    //catidad de vehiculos por ruta
    CantidadVehiculosPorRuta(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const consulta = ` 
                            SELECT
                                tdr.origen AS origen_ruta,
                                tdr.destino AS destino_ruta,
                                COUNT(DISTINCT tv.placa) AS cantidad_vehiculos
                            FROM 
                                t_detalle_ruta_itinerario AS tdr
                            JOIN 
                                t_vehiculo AS tv ON tdr.id_detalle_ruta_itinerario = tv.id_detalle_ruta_itinerario
                            JOIN 
                                t_empresa_servicio AS tes ON tv.id_empresa_servicio = tes.id_empresa_servicio
                            JOIN 
                                t_empresa AS te ON tes.id_empresa = te.id_empresa
                            GROUP BY
                                tdr.origen, tdr.destino;
                             `;
                const vehiculos = yield database_1.default.query(consulta);
                res.json(vehiculos['rows']);
            }
            catch (error) {
                console.error('Error al obtener cantidad de vehiculos por ruta:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
}
const vehiculoController = new VehiculoController();
exports.default = vehiculoController;

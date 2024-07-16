import { Request, Response } from 'express';
import db from '../../database/database'; // Ruta al archivo db.ts

class FedatarioController{
    public async listarFedatados(req:Request, res:Response):Promise<any>{
        try {
            const personas=await db.query('select * from t_fedatar')
            res.json(personas['rows']);
        } catch (error) {
            console.error('Error al obtener lista de fedatados:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
        
    }

    public async ObtenerUnFedatado(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const consulta= 'select * from t_fedatar where id_fedatar=$1';
            const persona = await db.query(consulta,[id]);

            if (persona && persona['rows'].length > 0) {
                res.json(persona['rows']);
            } else {
                res.status(404).json({ text: 'el fedatado no existe' });
            }

        } catch (error) {
            console.error('Error al obtener fedatado:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }

    public async ObtenerFedatadoEstadoIdExpediente(req: Request, res: Response): Promise<void> {
        try {
            const { id_expediente } = req.params;
            const consulta = `
                            select 
                                ex.id_expediente,
                                ex.nombre_expediente,
                                f.id_fedatar,
                                f.estado_concluido
                            
                            from 
                                t_fedatar f
                            join 
                                t_expediente ex on f.id_expediente=ex.id_expediente
                            where
                                ex.id_expediente=$1
            `;
            const fedatado = await db.query(consulta,[id_expediente]);

            if (fedatado && fedatado['rows'].length > 0) {
                res.json(fedatado['rows']);
            } else {
                res.status(404).json({ text: 'el fedatado no existe' });
            }

        } catch (error) {
            console.error('Error al obtener fedatado:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }


    public async CrearFedatado(req: Request, res: Response): Promise<void> {
        try {
            const { id_expediente, id_responsable, estado_concluido, observaciones } = req.body;

            const consulta = `
            INSERT INTO t_fedatar(
                id_expediente, id_responsable, estado_concluido, observaciones)
               VALUES ( $1, $2, $3, $4)
                RETURNING id_fedatar; 
            `;
            
            const valores = [id_expediente, id_responsable, estado_concluido, observaciones];
            
            db.query(consulta, valores, (error, resultado) => {
                if (error) {
                    console.error('Error al insertar fedatar:', error);
                    res.status(500).json({ error: 'Error interno del servidor' });
                } else {
                    const idfedatar = resultado.rows[0]['id_fedatar']; // ID se encuentra en la primera fila
                    console.log('datos de fedatar en BD:', idfedatar);
                    res.json({id_fedatar:idfedatar,text: 'fedatar se creó correctamente' });
                }
            });

         } catch (error) {
            console.error('Error al crear persona:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
         }
    }


    // public async ModificarPersona(req: Request, res: Response): Promise<void> {
    //     try {
    //         const { id } = req.params;
    //         const { nombre, ap_paterno, ap_materno, dni, telefono, correo,direccion } = req.body;

    //         const consulta = `
    //               UPDATE public.t_persona
    //                 SET  nombre=$1, ap_paterno=$2, ap_materno=$3, dni=$4, telefono=$5, correo=$6, direccion=$7
    //               WHERE id_persona=$8
                
    //             `;
    //         const valores = [nombre,ap_paterno,ap_materno,dni,telefono,correo,direccion,id];

    //         db.query(consulta, valores, (error, resultado) => {
    //             if (error) {
    //                 console.error('Error al modificar persona:', error);
    //             } else {
    //                 console.log('persona modificada correctamente');
    //                 res.json({ text: 'La persona se modifico correctamente' });
    //             }
    //         });
    //     } catch (error) {
    //         console.error('Error al modificar persona:', error);
    //         res.status(500).json({ error: 'Error interno del servidor' });
    //     }
    // }

    // public async EliminarPersona(req: Request, res: Response): Promise<void> {
    //     try {
    //         const { id } = req.params;
    //         const consulta = `
    //                     DELETE FROM t_persona where id_persona=$1;
    //             `;
    //         const valores = [id];

    //         db.query(consulta, valores, (error, resultado) => {
    //             if (error) {
    //                 console.error('Error al eliminar persona:', error);
    //             } else {
    //                 console.log('persona elimada correctamente');
    //                 res.json({ text: 'La persona se elimino correctamente' });
    //             }
    //         });
    //     } catch (error) {
    //         console.error('Error al eliminar persona:', error);
    //         res.status(500).json({ error: 'Error interno del servidor' });
    //     }
    // }

    //CASO ESPECIAL DE CONSULTA PARA DETERMINAR LOS DATOS GENERALES CON RESPECTO A UN EXPEDIENTE Y SUS PARTES INCULIDO LA INDIZACION

    public async ObtenerExpedienteDetalleXidExpediente(req: Request, res: Response): Promise<void> {
        try {
            const { id_expediente } = req.params;
            const consulta = `
                            select 
                            ex.id_expediente,
                            ex.id_inventario,
                            ex.estado_fedatado,
                            ex.nombre_expediente,
                            ex.juzgado_origen,
                            ex.tipo_proceso,
                            ex.materia,
                            ex.demandante,
                            ex.demandado,
                            ex.fojas_obs as obs_preparacion,
                            i.indizacion,
                            d.documento,
                            d.id_digitalizacion,  
                            d.observaciones as obs_digitalizacion,
                            c.observacion as obs_control_calidad,
                            c.val_observaciones,
                            c.val_datos,
                            c.val_nitidez,
                            c.val_pruebas_impresion,
                            c.val_copia_fiel

                        from 
                            t_indizacion i
                        join 
                            t_expediente ex on i.id_expediente=ex.id_expediente
                        join 
                            t_digitalizacion d on i.id_expediente= d.id_expediente
                        join 
                            t_control_calidad c on i.id_expediente= c.id_expediente
                        where
                            ex.id_expediente=$1
            `;
            const expediente = await db.query(consulta,[id_expediente]);

            if (expediente && expediente['rows'].length > 0) {
                res.json(expediente['rows']);
            } else {
                res.status(404).json({ text: 'el expediente_de_fedatar no existe' });
            }

        } catch (error) {
            console.error('Error al obtener expediente_de_fedatar:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }

    //CASO ESPECIAL PARA OBTERNER EL SEGUIMIENTO DE RESPONSABLES DE SEGUIMIENTO DEL ARCHIVO
    public async ObtenerResponsablesExpediente(req: Request, res: Response): Promise<void> {
        try {
            const { id_expediente } = req.params;
            const consulta = `
                           SELECT 
                                CONCAT(p_inventario.nombre, ' ', p_inventario.ap_paterno, ' ', p_inventario.ap_materno) AS nombre_responsable_inventario,
                                CONCAT(p_expediente.nombre, ' ', p_expediente.ap_paterno, ' ', p_expediente.ap_materno) AS nombre_responsable_expediente,
                                CONCAT(p_digitalizacion.nombre, ' ', p_digitalizacion.ap_paterno, ' ', p_digitalizacion.ap_materno) AS nombre_responsable_digitalizacion,
                                CONCAT(p_indizacion.nombre, ' ', p_indizacion.ap_paterno, ' ', p_indizacion.ap_materno) AS nombre_responsable_indizacion,
                                CONCAT(p_control_calidad.nombre, ' ', p_control_calidad.ap_paterno, ' ', p_control_calidad.ap_materno) AS nombre_responsable_control_calidad
                            FROM 
                                t_expediente e
                            JOIN 
                                t_inventario i ON e.id_inventario = i.id_inventario
                            JOIN 
                                t_usuario u_inventario ON i.id_supervisor = u_inventario.id_usuario
                            JOIN 
                                t_persona p_inventario ON u_inventario.id_persona = p_inventario.id_persona
                            JOIN 
                                t_usuario u_expediente ON e.id_responsable = u_expediente.id_usuario
                            JOIN 
                                t_persona p_expediente ON u_expediente.id_persona = p_expediente.id_persona
                            LEFT JOIN 
                                t_digitalizacion d ON e.id_expediente = d.id_expediente
                            LEFT JOIN 
                                t_usuario u_digitalizacion ON d.id_responsable = u_digitalizacion.id_usuario
                            LEFT JOIN 
                                t_persona p_digitalizacion ON u_digitalizacion.id_persona = p_digitalizacion.id_persona
                            LEFT JOIN 
                                t_indizacion ind ON e.id_expediente = ind.id_expediente
                            LEFT JOIN 
                                t_usuario u_indizacion ON ind.id_responsable = u_indizacion.id_usuario
                            LEFT JOIN 
                                t_persona p_indizacion ON u_indizacion.id_persona = p_indizacion.id_persona
                            LEFT JOIN 
                                t_control_calidad c ON e.id_expediente = c.id_expediente
                            LEFT JOIN 
                                t_usuario u_control_calidad ON c.id_responsable = u_control_calidad.id_usuario
                            LEFT JOIN 
                                t_persona p_control_calidad ON u_control_calidad.id_persona = p_control_calidad.id_persona
                            WHERE 
                                e.id_expediente =  $1;
            `;
            const expediente = await db.query(consulta,[id_expediente]);

            if (expediente && expediente['rows'].length > 0) {
                res.json(expediente['rows']);
            } else {
                res.status(404).json({ text: 'no existe responsables' });
            }

        } catch (error) {
            console.error('Error al obtener responsables del expediente:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
    
}
const fedatarioController = new FedatarioController();
export default fedatarioController;
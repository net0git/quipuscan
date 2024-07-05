import { Request, Response } from 'express';
import db from '../../database/database'; // Ruta al archivo db.ts

class ExpedienteController{

    public async listarExpedientesXidInventario(req:Request, res:Response):Promise<any>{
        try {
            const { id_inventario } = req.params;
            const consulta=`
                          SELECT * 
                                FROM t_expediente 
                                WHERE id_inventario = $1 
                                AND estado_preparado IS NOT NULL
                                ORDER BY id_expediente;
                            `;
            const expediente = await db.query(consulta,[id_inventario]);

            if (expediente && expediente['rows'].length > 0) {
                res.json(expediente['rows']);
            } else {
                res.status(404).json({ text: 'no existe registro de expedientes' });
            }

        } catch (error) {
            console.error('Error al obtener lista de expediente:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
        
    }
    public async listarTotalExpedientesXidInventario(req:Request, res:Response):Promise<any>{
        try {
            const { id_inventario } = req.params;
            const consulta= 'select * from t_expediente where id_inventario = $1 order by id_expediente';
            const expediente = await db.query(consulta,[id_inventario]);

            if (expediente && expediente['rows'].length > 0) {
                res.json(expediente['rows']);
            } else {
                res.status(404).json({ text: 'no existe registro de expedientes' });
            }

        } catch (error) {
            console.error('Error al obtener lista de expediente:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
        
    }

    public async ObtenerExpedienteDetalleXid(req: Request, res: Response): Promise<void> {
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
            const expediente = await db.query(consulta,[id]);

            if (expediente && expediente['rows'].length > 0) {
                res.json(expediente['rows'][0]);
            } else {
                res.status(404).json({ text: 'el expediente no existe' });
            }

        } catch (error) {
            console.error('Error al obtener expediente:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
    

    public async CrearExpediente(req: Request, res: Response): Promise<void> {
        try {
            const { id_inventario, id_responsable, nombre_expediente, fojas, fojas_unacara, fojas_doscaras, fojas_obs, copias_originales, copias_simples, juzgado_origen, tipo_proceso, materia, demandante, demandado, estado_preparado, estado_digitalizado, estado_indizado, estado_controlado, estado_fedatado } = req.body;

            const consulta = `
                  
                    INSERT INTO t_expediente( id_inventario, id_responsable, nombre_expediente, fojas, fojas_unacara, fojas_doscaras, fojas_obs, copias_originales, copias_simples, juzgado_origen, tipo_proceso, materia, demandante, demandado, estado_preparado, estado_digitalizado, estado_indizado, estado_controlado, estado_fedatado)
                       VALUES (  $1, $2, $3, $4, $5, $6, $7,$8, $9, $10, $11,$12,$13,$14, $15, $16,$17,$18,$19)
                    RETURNING id_expediente; -- Devolver el ID de la persona insertada
            `;
            
            const valores = [id_inventario, id_responsable, nombre_expediente, fojas, fojas_unacara, fojas_doscaras, fojas_obs, copias_originales, copias_simples, juzgado_origen, tipo_proceso, materia, demandante, demandado, estado_preparado, estado_digitalizado, estado_indizado, estado_controlado, estado_fedatado];
            
            db.query(consulta, valores, (error, resultado) => {
                if (error) {
                    console.error('Error al insertar expediente:', error);
                    res.status(500).json({ error: 'Error interno del servidor' });
                } else {
                    const idexpediente = resultado.rows[0]['id_expediente']; // ID se encuentra en la primera fila
                    console.log('datos de expediente en BD:', idexpediente);
                    res.json({id_inventario:idexpediente,text: 'el expediente se creó correctamente' });
                }
            });

         } catch (error) {
            console.error('Error al crear inventario:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
         }
    }


    public async ModificarExpediente(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const { id_inventario, id_responsable, nombre_expediente, fojas, fojas_unacara, fojas_doscaras, fojas_obs, copias_originales, copias_simples, juzgado_origen, tipo_proceso, materia, demandante, demandado, estado_preparado, estado_digitalizado, estado_indizado, estado_controlado, estado_fedatado, fecha_inicial, fecha_final } = req.body;

            const consulta = `
                 
                    UPDATE t_expediente
                    SET   id_inventario=$1,  
                          id_responsable=$2, 
                          nombre_expediente=$3, 
                          fojas=$4, 
                          fojas_unacara=$5, 
                          fojas_doscaras=$6, 
                          fojas_obs=$7, 
                          copias_originales=$8, 
                          copias_simples=$9, 
                          juzgado_origen=$10, 
                          tipo_proceso=$11, 
                          materia=$12, 
                          demandante=$13, 
                          demandado=$14, 
                          estado_preparado=$15, 
                          estado_digitalizado=$16, 
                          estado_indizado=$17, 
                          estado_controlado=$18, 
                          estado_fedatado=$19, 
                          fecha_inicial=$20, 
                          fecha_final=$21 
                    WHERE id_expediente=$22
                
                `;
            const valores = [id_inventario, id_responsable, nombre_expediente, fojas, fojas_unacara, fojas_doscaras, fojas_obs, copias_originales, copias_simples, juzgado_origen, tipo_proceso, materia, demandante, demandado, estado_preparado, estado_digitalizado, estado_indizado, estado_controlado, estado_fedatado, fecha_inicial, fecha_final,id];

            db.query(consulta, valores, (error, resultado) => {
                if (error) {
                    console.error('Error al modificar expediente:', error);
                } else {
                    console.log('expediente modificado correctamente');
                    res.json({ text: 'El expediente se modifico correctamente' });
                }
            });
        } catch (error) {
            console.error('Error al modificar expediente:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
    public async ModificarPreparacionExpediente(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const { id_inventario, id_responsable, fojas, fojas_unacara, fojas_doscaras, fojas_obs, copias_originales, copias_simples, estado_preparado} = req.body;

            const consulta = `
                 
                    UPDATE t_expediente
                    SET  
                         id_inventario=$1,
                         id_responsable=$2, 
                         fojas=$3, 
                         fojas_unacara=$4, 
                         fojas_doscaras=$5, 
                         fojas_obs=$6, 
                         copias_originales=$7, 
                         copias_simples=$8, 
                         estado_preparado=$9
                    WHERE id_expediente=$10
                
                `;
            const valores = [id_inventario, id_responsable, fojas, fojas_unacara, fojas_doscaras, fojas_obs, copias_originales, copias_simples, estado_preparado,id];

            db.query(consulta, valores, (error, resultado) => {
                if (error) {
                    console.error('Error al modificar expediente:', error);
                } else {
                    console.log('expediente modificado correctamente');
                    res.json({ text: 'El expediente se modifico correctamente' });
                }
            });
        } catch (error) {
            console.error('Error al modificar expediente:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }

    public async ModificarExpedienteEnIndizacion(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const { juzgado_origen, tipo_proceso, materia, demandante, demandado, fecha_inicial, fecha_final} = req.body;

            const consulta = `
                 
                    UPDATE t_expediente
                    SET  juzgado_origen=$1, 
                         tipo_proceso=$2, 
                         materia=$3, 
                         demandante=$4, 
                         demandado=$5, 
                         fecha_inicial=$6, 
                         fecha_final=$7         
                    WHERE id_expediente=$8
                
                `;
            const valores = [juzgado_origen, tipo_proceso, materia, demandante, demandado, fecha_inicial, fecha_final,id];

            db.query(consulta, valores, (error, resultado) => {
                if (error) {
                    console.error('Error al modificar expediente:', error);
                } else {
                    console.log('expediente modificado correctamente');
                    res.json({ text: 'El expediente se modifico correctamente' });
                }
            });
        } catch (error) {
            console.error('Error al modificar expediente:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }

    public async EliminarExpediente(req:Request, res:Response):Promise<any>{
        try {
            const { id } = req.params;
            const consulta= 'DELETE FROM t_expediente WHERE id_expediente=$1';
            

            db.query(consulta, [id], (error, resultado) => {
                if (error) {
                    console.error('Error al elininar expediente:', error);
                } else {
                    console.log('expediente eliminado correctamente');
                    res.json({ text: 'el expediente se elimino correctamente' });
                }
            });

        } catch (error) {
            console.error('Error al eliminar expediente:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
        
    }
    
    //MODIFICAR ESTADOS DE EXPEDIENTE
    //modificar estado_preparado
    ModificarEstadoPreparado(req:Request, res:Response){
        try {
            const { id } = req.params;
            const {  estado_preparado } = req.body;

            const consulta = `
                 
                    UPDATE t_expediente
                    SET  
                         estado_preparado=$1
                    WHERE id_expediente=$2
                
                `;
            const valores =  [estado_preparado,id];

            db.query(consulta, valores, (error, resultado) => {
                if (error) {
                    console.error('Error al modificar estado preparado de expediente:', error);
                } else {
                    console.log('estado_preparado de expediente modificado correctamente');
                    res.json({ text: 'El estado_preparado de expediente se modifico correctamente' });
                }
            });
        } catch (error) {
            console.error('Error al modificar estado_preparado de expediente:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }  
    }

    //modificar estado_digitalizado
    ModificarEstadoDigitalizado(req:Request, res:Response){
        try {
            const { id } = req.params;
            const {  estado_digitalizado } = req.body;

            const consulta = `
                 
                    UPDATE t_expediente
                    SET  
                        estado_digitalizado=$1
                    WHERE t_expediente.id_expediente=$2
                
                `;
            const valores =  [estado_digitalizado,id];

            db.query(consulta, valores, (error, resultado) => {
                if (error) {
                    console.error('Error al modificar estado_digitalizado de expediente:', error);
                } else {
                    console.log('estado_digitalizado de expediente modificado correctamente');
                    res.json({ text: 'El estado_digitalizado de expediente se modifico correctamente' });
                }
            });
        } catch (error) {
            console.error('Error al modificar estado_digitalizado de expediente:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }  
    }

    //modificar estado_indizado
    ModificarEstadoIndizado(req:Request, res:Response){
        try {
            const { id } = req.params;
            const {  estado_indizado } = req.body;

            const consulta = `
                 
                    UPDATE t_expediente
                    SET  
                    estado_indizado=$1
                    WHERE id_expediente=$2
                
                `;
            const valores =  [estado_indizado,id];

            db.query(consulta, valores, (error, resultado) => {
                if (error) {
                    console.error('Error al modificar estado_indizado de expediente:', error);
                } else {
                    console.log('estado_indizado de expediente modificado correctamente');
                    res.json({ text: 'El estado_indizado de expediente se modifico correctamente' });
                }
            });
        } catch (error) {
            console.error('Error al modificar estado_indizado de expediente:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }  
    }
     //modificar estado_indizado
     ModificarEstadoControlado(req:Request, res:Response){
        try {
            const { id } = req.params;
            const {  estado_controlado } = req.body;

            const consulta = `
                 
                    UPDATE t_expediente
                    SET  
                    estado_controlado=$1
                    WHERE id_expediente=$2
                
                `;
            const valores =  [estado_controlado,id];

            db.query(consulta, valores, (error, resultado) => {
                if (error) {
                    console.error('Error al modificar estado_controlado de expediente:', error);
                } else {
                    console.log('estado_indizado de expediente modificado correctamente');
                    res.json({ text: 'El estado_controlado de expediente se modifico correctamente' });
                }
            });
        } catch (error) {
            console.error('Error al modificar estado_controlado de expediente:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }  
    }

     //modificar estado_fedatado
     ModificarEstadoFedatado(req:Request, res:Response){
        try {
            const { id } = req.params;
            const {  estado_fedatado } = req.body;

            const consulta = `
                 
                    UPDATE t_expediente
                    SET  
                    estado_fedatado=$1
                    WHERE id_expediente=$2
                
                `;
            const valores =  [estado_fedatado,id];

            db.query(consulta, valores, (error, resultado) => {
                if (error) {
                    console.error('Error al modificar estado_fedatado de expediente:', error);
                } else {
                    console.log('estado_indizado de expediente modificado correctamente');
                    res.json({ text: 'El estado_fedatado de expediente se modifico correctamente' });
                }
            });
        } catch (error) {
            console.error('Error al modificar estado_fedatado de expediente:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }  
    }

    

    public async LimpiarProcesoExpediente(req:Request, res:Response):Promise<any>{
        try {
            const { id_expediente } = req.body;

          
            await db.query('DELETE FROM t_fedatar WHERE id_expediente = $1', [id_expediente]);
            await db.query('DELETE FROM t_control_calidad WHERE id_expediente = $1', [id_expediente]);
            await db.query('DELETE FROM t_indizacion WHERE id_expediente = $1', [id_expediente]);
            await db.query('DELETE FROM t_digitalizacion WHERE id_expediente = $1', [id_expediente]);
            
            await db.query(`
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
         
        } catch (error) {
            console.error('Error al limpiar expediente:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
        
    }
    
}
const expedienteController = new ExpedienteController();
export default expedienteController;
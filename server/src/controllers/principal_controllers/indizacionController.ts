import { Request, Response } from 'express';
import db from '../../database/database'; // Ruta al archivo db.ts

class IndizacionController{

    public async listarIndizaciones(req:Request, res:Response):Promise<any>{
        try {
            const personas=await db.query('select * from t_indizacion')
            res.json(personas['rows']);
        } catch (error) {
            console.error('Error al obtener lista de indizaciones:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
        
    }

    public async ObtenerDetalleIndizacinXidExpediente(req:Request, res:Response):Promise<any>{
        try {
            const { id_expediente } = req.params;
            const consulta= `SELECT
                                   *
                               FROM
                                   t_indizacion
                               WHERE 
                                  id_expediente=$1
                              `;
            const inventario = await db.query(consulta,[id_expediente]);

            if (inventario && inventario['rows'].length > 0) {
                res.json(inventario['rows']);
            } else {
                res.status(404).json({ text: 'detalle de indizacion no existe' });
            }

        } catch (error) {
            console.error('Error al obtener detalle de indizacion:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
        
    }

  

    public async CrearIndizacion(req: Request, res: Response): Promise<void> {
        try {
            const { id_expediente, id_responsable, indizacion, observaciones, estado_concluido } = req.body;

            const consulta = `
            INSERT INTO t_indizacion(
                id_expediente, id_responsable, indizacion, observaciones, estado_concluido)
                VALUES ($1, $2, $3, $4, $5)
                RETURNING id_indizacion; 
            `;
            
            const valores = [id_expediente, id_responsable, indizacion, observaciones, estado_concluido];
            
            db.query(consulta, valores, (error, resultado) => {
                if (error) {
                    console.error('Error al insertar indizacion:', error);
                    res.status(500).json({ error: 'Error interno del servidor' });
                } else {
                    const idindizacion = resultado.rows[0]['id_indizacion']; // ID se encuentra en la primera fila
                    console.log('datos de indizacion en BD:', idindizacion);
                    res.json({id_indizacion:idindizacion,text: 'la indizacion se creo correctamente' });
                }
            });

         } catch (error) {
            console.error('Error al crear indizacion:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
         }
    }


    public async ModificarIndizacion(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const { id_expediente, id_responsable, juzgado_origen, observaciones, estado_concluido, demandante, demandado, tipo_proceso, indizacion, materia } = req.body;
            const consulta = `
                 UPDATE t_indizacion
                  SET  id_expediente=1, id_responsable=2, juzgado_origen=3, observaciones=4, estado_concluido=5, demandante=6, demandado=7, tipo_proceso=8, indizacion=9, materia=10
                 WHERE id_indizacion=11;
                
                `;
            const valores = [id_expediente, id_responsable, juzgado_origen, observaciones, estado_concluido, demandante, demandado, tipo_proceso, indizacion, materia,id];

            db.query(consulta, valores, (error, resultado) => {
                if (error) {
                    console.error('Error al modificar indizacion:', error);
                } else {
                    console.log('indizacion modificado correctamente');
                    res.json({ text: 'La indizacion se modifico correctamente' });
                }
            });
        } catch (error) {
            console.error('Error al modificar indizacion:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
  

}
const indizacionController = new IndizacionController();
export default indizacionController;
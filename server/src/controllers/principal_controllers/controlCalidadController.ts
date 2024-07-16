import { Request, Response } from 'express';
import db from '../../database/database'; // Ruta al archivo db.ts

class ControlCalidadController{

    public async listarCotrolesCalidad(req:Request, res:Response):Promise<any>{
        try {
            const personas=await db.query('select * from t_control_calidad')
            res.json(personas['rows']);
        } catch (error) {
            console.error('Error al obtener lista de controles de calidad:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
        
    }

    public async ObtenerDetalleControlXidExpediente(req:Request, res:Response):Promise<any>{
        try {
            const { id_expediente } = req.params;
            const consulta= `SELECT
                                   *
                               FROM
                                   t_control_calidad
                               WHERE 
                                  id_expediente=$1
                              `;
            const inventario = await db.query(consulta,[id_expediente]);

            if (inventario && inventario['rows'].length > 0) {
                res.json(inventario['rows']);
            } else {
                res.status(404).json({ text: 'detalle de control de calidad no existe' });
            }

        } catch (error) {
            console.error('Error al obtener detalle de control de calidad:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
        
    }

    public async CrearControlCalidad(req: Request, res: Response): Promise<void> {
        try {
            const {id_expediente, id_responsable, observacion, val_observaciones, val_datos, val_nitidez, val_pruebas_impresion, val_copia_fiel } = req.body;

            const consulta = `
                INSERT INTO t_control_calidad(
                    id_expediente, id_responsable, observacion, val_observaciones, val_datos, val_nitidez, val_pruebas_impresion, val_copia_fiel)
                    VALUES ( $1, $2, $3, $4, $5, $6, $7, $8)
                RETURNING id_controlcalidad;
            `;
            
            const valores = [id_expediente, id_responsable, observacion, val_observaciones, val_datos, val_nitidez, val_pruebas_impresion, val_copia_fiel];
            
            db.query(consulta, valores, (error, resultado) => {
                if (error) {
                    console.error('Error al insertar control de calidad:', error);
                    res.status(500).json({ error: 'Error interno del servidor' });
                } else {
                    const idcontrolcalidad = resultado.rows[0]['id_controlcalidad']; // ID se encuentra en la primera fila
                    console.log('datos de indizacion en BD:', idcontrolcalidad);
                    res.json({id_controlcalidad:idcontrolcalidad,text: 'el control de calidad se creo correctamente' });
                }
            });

         } catch (error) {
            console.error('Error al crear indizacion:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
         }
    }

}
const controlCalidadController = new ControlCalidadController();
export default controlCalidadController;
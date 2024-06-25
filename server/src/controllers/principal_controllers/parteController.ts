import { Request, Response } from 'express';
import db from '../../database/database'; // Ruta al archivo db.ts

class ParteController{

    public async listarPartesDetalleXidExpediente(req:Request, res:Response):Promise<any>{
        try {
            const { id_expediente } = req.params;
            const consulta= `
                            select 
                                *
                            from 
                                t_parte
                            where 
                                id_expediente=$1
            `;
            const personas=await db.query(consulta,[id_expediente])
            res.json(personas['rows']);
        } catch (error) {
            console.error('Error al obtener lista de partes:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
        
    }
 

    public async ObtenerParteXid(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const consulta= `select 
                                    *
                                from 
                                    t_parte
                                where 
                                    id_parte=$1
                             `;
            const inventario = await db.query(consulta,[id]);

            if (inventario && inventario['rows'].length > 0) {
                res.json(inventario['rows']);
            } else {
                res.status(404).json({ text: 'el inventario no existe' });
            }

        } catch (error) {
            console.error('Error al obtener parte:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }

    public async CrearParte(req: Request, res: Response): Promise<void> {
        try {
            const { id_expediente, nombre_parte, ap_parte, am_parte, dni, tipo_parte } = req.body;

            const consulta = `
                            INSERT INTO t_parte(
                                id_expediente, nombre_parte, ap_parte, am_parte, dni, tipo_parte)
                            VALUES ($1,$2,$3,$4,$5,$6);
                        `;
            
            const valores = [id_expediente, nombre_parte, ap_parte, am_parte, dni, tipo_parte];
            
            db.query(consulta, valores, (error, resultado) => {
                if (error) {
                    console.error('Error al crear parte:', error);
                } else {
                    console.log('parte creado correctamente');
                    res.json({ text: 'la parte se creó correctamente' });
                }
            });

         } catch (error) {
            console.error('Error al crear parte:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
         }
    }


    public async ModificarParte(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const { id_expediente, nombre_parte, ap_parte, am_parte, dni, tipo_parte } = req.body;

            const consulta = `
                            UPDATE t_parte
                            SET  id_expediente=$1, nombre_parte=$2, ap_parte=$3, am_parte=$4, dni=$5, tipo_parte=$6
                            WHERE id_parte=$7;
                
                `;
            const valores = [id_expediente, nombre_parte, ap_parte, am_parte, dni, tipo_parte,id];

            db.query(consulta, valores, (error, resultado) => {
                if (error) {
                    console.error('Error al modificar parte:', error);
                } else {
                    console.log('parte modificado correctamente');
                    res.json({ text: 'la parte se modifico correctamente' });
                }
            });
        } catch (error) {
            console.error('Error al modificar parte:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }

    public async EliminarParte(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            

            const consulta = `
                        DELETE FROM t_parte
                         WHERE id_parte=$1;
                
                `;
           

            db.query(consulta, [id], (error, resultado) => {
                if (error) {
                    console.error('Error al elininar parte:', error);
                } else {
                    console.log('parte eliminado correctamente');
                    res.json({ text: 'la parte se elimino correctamente' });
                }
            });
        } catch (error) {
            console.error('Error al eliminar parte:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }

}
const parteController = new ParteController();
export default parteController;
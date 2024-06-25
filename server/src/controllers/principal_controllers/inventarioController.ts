import { Request, Response } from 'express';
import db from '../../database/database'; // Ruta al archivo db.ts

class InventarioController{

    public async listarInventario(req:Request, res:Response):Promise<any>{
        try {
            const personas=await db.query('select * from t_inventario')
            res.json(personas['rows']);
        } catch (error) {
            console.error('Error al obtener lista de inventarios:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
        
    }
    public async listarInventarioDetalle(req:Request, res:Response):Promise<any>{
        try {
          
            const consulta= `SELECT
                            i.id_inventario,
                            i.anio,
                            i.cantidad,
                            i.tipo_doc,
                            i.serie_doc,
                            i.especialidad_inventario,
                            i.contador,
                            i.estado_preparado,
                            u.id_usuario,
                            u.nombre_usuario,
                            u.perfil,
                            u.estado,
                            p.nombre,
                            p.ap_paterno,
                            p.ap_materno
                        
                        FROM
                            t_inventario i
                        JOIN
                            t_usuario u ON i.id_supervisor = u.id_usuario
                        JOIN
                            t_persona p ON u.id_persona = p.id_persona; `;
            const inventario = await db.query(consulta);

            if (inventario && inventario['rows'].length > 0) {
                res.json(inventario['rows']);
            } else {
                res.status(404).json({ text: 'la lista de inventario no existe' });
            }

        } catch (error) {
            console.error('Error al obtener lista de inventario:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
        
    }

    public async ObtenerInventarioXid(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const consulta= `SELECT
                            i.id_inventario,
                            i.anio,
                            i.cantidad,
                            i.tipo_doc,
                            i.serie_doc,
                            i.estado_preparado,
                            i.especialidad_inventario,
                            i.contador,
                            u.id_usuario,
                            u.nombre_usuario,
                            u.perfil,
                            u.estado,
                            p.nombre,
                            p.ap_paterno,
                            p.ap_materno
                        
                        FROM
                            t_inventario i
                        JOIN
                            t_usuario u ON i.id_supervisor = u.id_usuario
                        JOIN
                            t_persona p ON u.id_persona = p.id_persona
                        WHERE 
                            i.id_inventario=$1
                             `;
            const inventario = await db.query(consulta,[id]);

            if (inventario && inventario['rows'].length > 0) {
                res.json(inventario['rows']);
            } else {
                res.status(404).json({ text: 'el inventario no existe' });
            }

        } catch (error) {
            console.error('Error al obtener inventario:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }

    public async CrearInventario(req: Request, res: Response): Promise<void> {
        try {
            const { id_supervisor, anio, cantidad, tipo_doc, serie_doc, especialidad_inventario, contador,estado_preparado } = req.body;

            const consulta = `
                    INSERT INTO t_inventario(id_supervisor, anio, cantidad, tipo_doc, serie_doc, especialidad_inventario, contador,estado_preparado)
                       VALUES ( $1, $2, $3, $4, $5, $6, $7,$8)
                    RETURNING id_inventario; -- Devolver el ID de la persona insertada
            `;
            
            const valores = [id_supervisor, anio, cantidad, tipo_doc, serie_doc, especialidad_inventario, contador,estado_preparado];
            
            db.query(consulta, valores, (error, resultado) => {
                if (error) {
                    console.error('Error al insertar persona:', error);
                    res.status(500).json({ error: 'Error interno del servidor' });
                } else {
                    const idinventario = resultado.rows[0]['id_inventario']; // ID se encuentra en la primera fila
                    console.log('datos de inventario en BD:', idinventario);
                    res.json({id_inventario:idinventario,text: 'el inventario se creó correctamente' });
                }
            });

         } catch (error) {
            console.error('Error al crear inventario:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
         }
    }


    public async ModificarInventario(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const { id_supervisor, anio, cantidad, tipo_doc, serie_doc, especialidad_inventario, contador,estado_preparado } = req.body;

            const consulta = `
                 

                  UPDATE public.t_inventario
                    SET  id_supervisor=$1, anio=$2, cantidad=$3, tipo_doc=$4, serie_doc=$5, especialidad_inventario=$6, contador=$7,estado_preparado=$8
                    WHERE id_inventario=$9;
                
                `;
            const valores = [id_supervisor, anio, cantidad, tipo_doc, serie_doc, especialidad_inventario, contador,estado_preparado,id];

            db.query(consulta, valores, (error, resultado) => {
                if (error) {
                    console.error('Error al modificar inventario:', error);
                } else {
                    console.log('inventario modificado correctamente');
                    res.json({ text: 'La inventario se modifico correctamente' });
                }
            });
        } catch (error) {
            console.error('Error al modificar inventario:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
    public async ModificarEstadoInventario(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const { estado_preparado } = req.body;

            const consulta = `
                 

                  UPDATE public.t_inventario
                    SET  estado_preparado=$1
                    WHERE id_inventario=$2;
                
                `;
            const valores = [estado_preparado,id];

            db.query(consulta, valores, (error, resultado) => {
                if (error) {
                    console.error('Error al modificar estado inventario:', error);
                } else {
                    console.log('estado inventario modificado correctamente');
                    res.json({ text: 'el estado del inventario se modifico correctamente' });
                }
            });
        } catch (error) {
            console.error('Error al modificar estado del inventario:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }

}
const inventarioController = new InventarioController();
export default inventarioController;
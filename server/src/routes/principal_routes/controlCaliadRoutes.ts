import { Router } from "express";
import controlCalidadController from "../../controllers/principal_controllers/controlCalidadController";


class ControlCalidadRoutes{

    public router: Router;

    constructor(){
        this.router=Router();
        this.config();
        
    }//ObtenerDetalleControlXidExpediente
    config():void{
        //consultas para personas 
        this.router.get('/api/controlcalidad/:id_expediente',controlCalidadController.ObtenerDetalleControlXidExpediente)
        this.router.get('/api/controlcalidad',controlCalidadController.listarCotrolesCalidad)
        this.router.post('/api/controlcalidad',controlCalidadController.CrearControlCalidad) 
       
    }

}

const controlCalidadRoutes = new ControlCalidadRoutes
export default controlCalidadRoutes.router;
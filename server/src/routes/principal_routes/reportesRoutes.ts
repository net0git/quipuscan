import { Router } from "express";
import reportesController from "../../controllers/principal_controllers/reportesController";

class ReportesRoutes{

    public router: Router;

    constructor(){
        this.router=Router();
        this.config();
        
    }
    config():void{
        //consultas para las tuc - 
         this.router.get('/api/reportes/expedientes/:id',reportesController.listarExpedientesDetalle)
 
          
    }
}

const reportesRoutes = new ReportesRoutes
export default reportesRoutes.router;
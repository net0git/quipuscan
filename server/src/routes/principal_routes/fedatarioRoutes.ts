import { Router } from "express";
import fedatarioController from "../../controllers/principal_controllers/fedatarioController";


class InventarioRoutes{

    public router: Router;

    constructor(){
        this.router=Router();
        this.config();
        
    }
    config():void{
        //consultas para personas 
        this.router.get('/api/fedatar',fedatarioController.listarFedatados)
        this.router.get('/api/fedatar/detalle/expediente/:id_expediente',fedatarioController.ObtenerExpedienteDetalleXidExpediente)
        this.router.get('/api/fedatar/estado/:id_expediente',fedatarioController.ObtenerFedatadoEstadoIdExpediente)
        this.router.get('/api/fedatar/responsables/:id_expediente',fedatarioController.ObtenerResponsablesExpediente)
        this.router.post('/api/fedatar',fedatarioController.CrearFedatado)
       
      

        
        
    }


}

const inventarioRoutes = new InventarioRoutes
export default inventarioRoutes.router;
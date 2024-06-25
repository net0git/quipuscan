import { Router } from "express";
import resoucionController from "../../controllers/principal_controllers/resolucionController";


class TucRoutes{

    public router: Router;

    constructor(){
        this.router=Router();
        this.config();
        
    }
    config():void{
        //consultas para las resoluciones - 
         this.router.get('/api/resolucion',resoucionController.listarResolucion)
         this.router.get('/api/resolucion/:id',resoucionController.ObtenerResolucion)
         this.router.get('/api/resolucion/detalle/:nro_resolucion/:anio_resolucion',resoucionController.ObtenerResolucionPorNroAnio)
         this.router.post('/api/resolucion',resoucionController.CrearResolucion)
         this.router.put('/api/resolucion/:id',resoucionController.ModificarResolucion)    
    }
}

const tucRoutes = new TucRoutes
export default tucRoutes.router;
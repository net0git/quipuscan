import { Router } from "express";
import digitalizacionController from "../../controllers/principal_controllers/digitalizacionController";

class DigitalizacionRoutes{

    public router: Router;

    constructor(){
        this.router=Router();
        this.config();
        
    }
    config():void{
        //consultas para personas 
        this.router.get('/api/digitalizacion/listaporidexpediente/:id_expediente',digitalizacionController.ObtenerDatosDigitalizadoXidExpediente)
        this.router.get('/api/digitalizacion/:id_digitalizacion',digitalizacionController.ObtenerDatosDigitalizadoID)
        this.router.put('/api/digitalizacion/modificar/documento/:id_digitalizacion',digitalizacionController.ModificarDocumentoDigitalizado)
        this.router.put('/api/digitalizacion/modificar/:id',digitalizacionController.ModificarDigitalizado)
        this.router.post('/api/digitalizacion',digitalizacionController.CrearDigitalizacion) 
        this.router.get('/api/digitalizacion/documento/:id_expediente',digitalizacionController.ObtenerDocumentoDigitalizadoXidExpediente)
    }

}

const digitalizacionRoutes = new DigitalizacionRoutes
export default digitalizacionRoutes.router;
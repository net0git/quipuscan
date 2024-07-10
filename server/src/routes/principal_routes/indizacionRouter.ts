import { Router } from "express";

import indizacionController from "../../controllers/principal_controllers/indizacionController";

class InventarioRoutes{

    public router: Router;

    constructor(){
        this.router=Router();
        this.config();
        
    }
    config():void{
        //consultas para personas 
        this.router.get('/api/indizacion',indizacionController.listarIndizaciones)
        this.router.get('/api/indizacion/detalleporexpediente/:id_expediente',indizacionController.ObtenerDetalleIndizacinXidExpediente)
        //ModificarIndizacionIndex
    
        this.router.post('/api/indizacion',indizacionController.CrearIndizacion)
        this.router.put('/api/indizacion/:id',indizacionController.ModificarIndizacion)
        this.router.put('/api/indizacion/modificar/:id',indizacionController.ModificarIndizacionIndex)
      

        
        
    }


}

const inventarioRoutes = new InventarioRoutes
export default inventarioRoutes.router;
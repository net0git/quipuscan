import { Router } from "express";
import parteController from "../../controllers/principal_controllers/parteController";


class PersonaRoutes{

    public router: Router;

    constructor(){
        this.router=Router();
        this.config();
        
    }
    config():void{
        //consultas para personas 
        this.router.get('/api/parte/listaporexpediente/:id_expediente',parteController.listarPartesDetalleXidExpediente)
        this.router.get('/api/parte/:id',parteController.ObtenerParteXid)
        this.router.post('/api/parte',parteController.CrearParte)
        this.router.put('/api/parte/:id',parteController.ModificarParte)
        this.router.delete('/api/parte/:id',parteController.EliminarParte)
        
        
    }


}

const personaRoutes = new PersonaRoutes
export default personaRoutes.router;
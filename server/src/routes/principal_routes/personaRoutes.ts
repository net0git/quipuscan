import { Router } from "express";
import personaController from '../../controllers/principal_controllers/personaController'


class PersonaRoutes{

    public router: Router;

    constructor(){
        this.router=Router();
        this.config();
        
    }
    config():void{
        //consultas para personas 
        this.router.get('/api/persona',personaController.listarPersonas)
        this.router.get('/api/persona/:id',personaController.ObtenerPersona)
        this.router.post('/api/persona',personaController.CrearPersona)
        this.router.put('/api/persona/:id',personaController.ModificarPersona)
        this.router.delete('/api/persona/:id',personaController.EliminarPersona)
        
        
    }


}

const personaRoutes = new PersonaRoutes
export default personaRoutes.router;
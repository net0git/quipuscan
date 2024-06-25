import { Router } from "express";
import usuarioController from "../../controllers/principal_controllers/usuarioController";


class UsuariosRoutes{

    public router: Router;

    constructor(){
        this.router=Router();
        this.config();
        
    }
    config():void{
        //consultas para las tuc - 
         this.router.get('/api/usuario',usuarioController.listarUsuarios)
         this.router.get('/api/usuario/detalle',usuarioController.listarUsuariosDetalle)
         this.router.get('/api/usuario/:id',usuarioController.ObtenerUsuario)
         this.router.get('/api/usuario/detalle/:nombre_usuario',usuarioController.ObtenerUsuarioPorNombre)
         this.router.post('/api/usuario/register',usuarioController.CrearUsuario)
         this.router.post('/api/usuario/login',usuarioController.ValidarLogin)
         this.router.put('/api/usuario/modificar/datos/:id',usuarioController.ModificarUsuarioDatos)   
         this.router.put('/api/usuario/modificar/password/:id',usuarioController.ModificarUsuarioPassword) 
          
    }
}

const usuariosRoutes = new UsuariosRoutes
export default usuariosRoutes.router;
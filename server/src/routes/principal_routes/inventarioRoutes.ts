import { Router } from "express";
import inventarioController from "../../controllers/principal_controllers/inventarioController";

class InventarioRoutes{

    public router: Router;

    constructor(){
        this.router=Router();
        this.config();
        
    }
    config():void{
        //consultas para personas 
        this.router.get('/api/inventario',inventarioController.listarInventario)
        this.router.get('/api/inventario/listadetallada',inventarioController.listarInventarioDetalle)
        this.router.get('/api/inventario/detalle/:id',inventarioController.ObtenerInventarioXid)
        this.router.post('/api/inventario',inventarioController.CrearInventario)
        this.router.put('/api/inventario/:id',inventarioController.ModificarInventario)
        this.router.put('/api/inventario/modificarestado/:id',inventarioController.ModificarEstadoInventario)

        
        
    }


}

const inventarioRoutes = new InventarioRoutes
export default inventarioRoutes.router;
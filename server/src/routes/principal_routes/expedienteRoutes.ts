import { Router } from "express";
import expedienteController from "../../controllers/principal_controllers/expedienteController";

class ExpedienteRoutes{

    public router: Router;

    constructor(){
        this.router=Router();
        this.config();
        
    }
    config():void{
        //consultas para personas 
        this.router.get('/api/expediente/listaporinventario/:id_inventario',expedienteController.listarExpedientesXidInventario)//
        this.router.get('/api/expediente/listatotalporinventario/:id_inventario',expedienteController.listarTotalExpedientesXidInventario)//
        this.router.get('/api/expediente/:id',expedienteController.ObtenerExpedienteDetalleXid)
        this.router.get('/api/expediente/limpiar/:id_expediente',expedienteController.LimpiarProcesoExpediente)
        this.router.post('/api/expediente',expedienteController.CrearExpediente)
        this.router.put('/api/expediente/:id',expedienteController.ModificarExpediente)
        this.router.put('/api/expediente/estado_preparado/:id',expedienteController.ModificarEstadoPreparado)
        this.router.put('/api/expediente/estado_digitalizado/:id',expedienteController.ModificarEstadoDigitalizado)
        this.router.put('/api/expediente/estado_indizado/:id',expedienteController.ModificarEstadoIndizado)
        this.router.put('/api/expediente/estado_controlado/:id',expedienteController.ModificarEstadoControlado)
        this.router.put('/api/expediente/estado_fedatado/:id',expedienteController.ModificarEstadoFedatado)
        this.router.delete('/api/expediente/:id',expedienteController.EliminarExpediente)
        
        
    }


}

const expedienteRoutes = new ExpedienteRoutes
export default expedienteRoutes.router;
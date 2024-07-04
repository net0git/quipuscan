import { Component, OnInit } from '@angular/core';
import { Router ,ActivatedRoute} from '@angular/router';
import { ExpedienteService } from 'src/app/servicios/expediente/expediente.service';
import { InventarioService } from 'src/app/servicios/inventario/inventario.service';
declare var bootstrap: any;

@Component({
  selector: 'app-indizador-expediente',
  templateUrl: './indizador-expediente.component.html',
  styleUrls: ['./indizador-expediente.component.css']
})
export class IndizadorExpedienteComponent implements OnInit {

  expedientesList:any=[]
  expedientesListTemp:any=[]
  inventarioDetalle:any=[]
  private myModal: any;
  objetosFiltrados:any=[];
  p: number = 1;
  exp_count_pendientes:number=0
  expedientesHabilitados:any=[]
  
  constructor(private activatedRoute:ActivatedRoute,private router:Router,private expedienteService:ExpedienteService,private inventarioService:InventarioService){}
expedientetemp:any={}
ngOnInit(): void {
  this.detalleInventario()
  this.listarExpedientesXidInventario()
}

//--------------------------------------------------------------------------------------
openModal() {
  this.myModal = new bootstrap.Modal(document.getElementById('exampleModalCenter'));
  this.myModal.show();
}

mensajeIndizacion(){
  alert('El Expediente ya ha sido indizado')
}
detalleInventario(){
  const params=this.activatedRoute.snapshot.params
  this.inventarioService.obtenerDetalleInventario(params['id_inventario']).subscribe(
    res=>{
      this.inventarioDetalle=res
      this.inventarioDetalle=this.inventarioDetalle[0]
    
      
    },
    err=>{
      console.error(err)
    }
  )
}
listarExpedientesXidInventario(){
  const params=this.activatedRoute.snapshot.params
  console.log(params['id_inventario'])
  this.expedienteService.listaExpedientesXinventario(params['id_inventario']).subscribe(
    res=>{
       this.expedientesHabilitados= res
      this.expedientesList=this.expedientesHabilitados.filter((expediente: { estado_digitalizado: boolean; }) => expediente.estado_digitalizado ===true);
      this.expedientesListTemp=this.expedientesList 
      this.expedientesList.forEach((expediente: any) => {
        if(expediente.estado_indizado==null){
           this.exp_count_pendientes=this.exp_count_pendientes+1
        }
    })
 
    },
    err=>{
      console.error(err)
    }
  )
  //this.expedientetemp = this.buscarPorId(params['id_inventario']);
//  console.log(this.expedientetemp)
}
MostrarFormularioExpediente(id_expediente:number){
  //NECESITAMOS LOS DATOS DE LA TUC
  // this.vehiculo_detalle = this.lista_vehiculos.filter((detalle: { id_vehiculo: number; }) => detalle.id_vehiculo == id_vehiculo);
  // this.vehiculo_detalle=this.vehiculo_detalle[0]
  this.openModal()

}


closeModal() {
  // Ocultar el modal utilizando la instancia almacenada
  this.myModal.hide();
}

buscarEnObjeto(event: any) {
  const textoBusqueda = event.target.value.toLowerCase();
    
    // Filtrar los objetos según el texto de búsqueda
    this.objetosFiltrados = this.expedientesListTemp.filter((objeto: 
      { 
        nombre_expediente: string;
      

       }) => {
      
      const nombre_expediente = objeto.nombre_expediente.toLowerCase();
     

      return nombre_expediente.includes(textoBusqueda);
    });
    this.expedientesList=this.objetosFiltrados
}

volver(){
  this.router.navigate(['/principal/indizador'])
}
IndizarExpediente(id_expediente:number){
  this.router.navigate(['/principal/indizador/expedientes/formulario/',id_expediente])
}
}

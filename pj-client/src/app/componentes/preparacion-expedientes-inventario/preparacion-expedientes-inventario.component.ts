import { Component, OnInit} from '@angular/core';
import { Router ,ActivatedRoute} from '@angular/router';
import { ExpedienteService } from 'src/app/servicios/expediente/expediente.service';
import { InventarioService } from 'src/app/servicios/inventario/inventario.service';

declare var bootstrap: any;
@Component({
  selector: 'app-preparacion-expedientes-inventario',
  templateUrl: './preparacion-expedientes-inventario.component.html',
  styleUrls: ['./preparacion-expedientes-inventario.component.css']
})
export class PreparacionExpedientesInventarioComponent implements OnInit{
 

  expedientesList:any=[]
  expedientesListTemp:any=[]
  inventarioDetalle:any=[]
  private myModal: any;
  objetosFiltrados:any=[];

  p: number = 1;
  constructor(private activatedRoute:ActivatedRoute,private router:Router,private expedienteService:ExpedienteService,private inventarioService:InventarioService){}
expedientetemp:any={}
ngOnInit(): void {
  this.detalleInventario()
  this.listarExpedientesXidInventario()
}
mensajePreparacion(){
  alert('el expediente ya ha sido preparado')
}
//--------------------------------------------------------------------------------------
openModal() {
  this.myModal = new bootstrap.Modal(document.getElementById('exampleModalCenter'));
  this.myModal.show();
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
      this.expedientesList=res
      this.expedientesListTemp=res
 
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


volver(){
  this.router.navigate(['/principal/preparaciondocumentos'])
}

preparacionExpediente(id_expediente:any){
  this.router.navigate(['/principal/preparaciondocumentos/preparacionexpedientesinventario/formulario/',id_expediente])
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

}

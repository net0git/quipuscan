import { Component, OnInit} from '@angular/core';
import { Router ,ActivatedRoute} from '@angular/router';
import { ExpedienteService } from 'src/app/servicios/expediente/expediente.service';
import { InventarioService } from 'src/app/servicios/inventario/inventario.service';
import { DatosCompartidosService } from 'src/app/servicios/datoslogin/datos-compartidos.service';
import { Row } from 'jspdf-autotable';

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
  data_expediente:any={}
  p: number = 1;
  id_expediente:number=0;
  nombre_expediente:string=''
  exp_count_pendientes:number=0
  disablebotonModificar='display: none';
  tituloBoton='Guardar'
  
constructor(private datosCompartidosService:DatosCompartidosService,private activatedRoute:ActivatedRoute,private router:Router,private expedienteService:ExpedienteService,private inventarioService:InventarioService){}
ngOnInit(): void {
  this.detalleInventario()
  this.listarExpedientesXidInventario()

}
mensajePreparacion(){
  alert('el expediente ya ha sido preparado')
}
//--------------------------------------------------------------------------------------
openModal(id_expediente:number) {
  this.myModal = new bootstrap.Modal(document.getElementById('exampleModalCenter'));
  this.myModal.show();
  this.buscarExpedienteXid(id_expediente)
}

buscarExpedienteXid(id_expediente:number){
  this.expedienteService.obtenerExpedienteDetalle(id_expediente).subscribe(
    res=>{
       this.data_expediente = res;  // Asignar el resultado a this.data_expediente
      console.log(this.data_expediente);
      // Asegúrate de que 'observaciones' es el ID correcto del elemento input
      // const textoGuardado: string = this.data_expediente.fojas_obs.replace(/\\n/g, '\n');

      (<HTMLInputElement>document.getElementById('observaciones')).value =this.data_expediente.fojas_obs;
      (<HTMLInputElement>document.getElementById('inputfojas')).value = this.data_expediente.fojas;
      (<HTMLInputElement>document.getElementById('inputfojasunacara')).value = this.data_expediente.fojas_unacara;
      (<HTMLInputElement>document.getElementById('inputfojasdoscaras')).value = this.data_expediente.fojas_doscaras;
      (<HTMLInputElement>document.getElementById('original')).checked= this.data_expediente.copias_originales;
      (<HTMLInputElement>document.getElementById('copia')).checked = this.data_expediente.copias_simples;
      this.id_expediente=this.data_expediente.id_expediente
      this.nombre_expediente=this.data_expediente.nombre_expediente
      if(this.data_expediente.estado_preparado){
        this.tituloBoton='Modificar'
      }
      else{
        this.tituloBoton='Guardar'
      }
      if (this.data_expediente.estado_digitalizado) {
        this.disablebotonModificar = 'display: none';
        
      } else {

        this.disablebotonModificar = 'display: block';
      }

      ;
    },
    err=>{
      console.error(err)
    }
  )
}

guardarTexto() {
  const params=this.activatedRoute.snapshot.params
  // Obtener el texto del primer textarea
 
  // Obtener el texto del primer textarea
  const observacion = (<HTMLInputElement>document.getElementById('observaciones')).value;
  const fojas_fisicas = (<HTMLInputElement>document.getElementById('inputfojas')).value;
  const fojas_unacara = (<HTMLInputElement>document.getElementById('inputfojasunacara')).value;
  const fojas_doscaras = (<HTMLInputElement>document.getElementById('inputfojasdoscaras')).value;
  const original = (<HTMLInputElement>document.getElementById('original')).checked;
  const copia = (<HTMLInputElement>document.getElementById('copia')).checked;
  
  // Crear un objeto con los datos
  let data: any = {
    id_inventario:params['id_inventario'],
    id_responsable:this.datosCompartidosService.credentials.id_usuario,
    nombre_expediente:this.nombre_expediente,
    fojas_obs: observacion,
    fojas: fojas_fisicas,
    fojas_unacara: fojas_unacara,
    fojas_doscaras: fojas_doscaras,
    copias_originales:original,
    copias_simples:copia,
    estado_preparado:true
  };

  console.log(data);
  
  // Mostrar el texto guardado en el segundo textarea

  // (<HTMLInputElement>document.getElementById('observaciones_prueba')).value = data.fojas_obs;

  this.expedienteService.modificarPreparacionExpediente(data,this.id_expediente).subscribe(
    res=>{
      //id_inventario, id_responsable, nombre_expediente, fojas, fojas_unacara, fojas_doscaras, fojas_obs, copias_originales, copias_simples, estado_preparado, estado_digitalizado, estado_controlado, estado_fedatado, estado_indizado
        console.log()
        this.listarExpedientesXidInventario()
        this.closeModal()
    },
    err=>{
        console.error(err)
    }
  )
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

  async listarExpedientesXidInventario(){
    const params=this.activatedRoute.snapshot.params
    console.log(params['id_inventario'])
    try {
     
      this.expedientesList = await this.expedienteService.listaExpedientesXinventario(params['id_inventario']).toPromise();
      this.expedientesListTemp=this.expedientesList;  
      this.exp_count_pendientes=0
          this.expedientesList.forEach((expediente: any) => {
              if(expediente.estado_preparado==false){
                 this.exp_count_pendientes=this.exp_count_pendientes+1
              }
          })
          ///this.modificarCantidadInvenario()
       
    } catch (err) {
      console.error(err);
    }
  // this.expedienteService.listaExpedientesXinventario(params['id_inventario']).subscribe(
  //   res=>{
  //     this.expedientesList=res
  //     this.expedientesListTemp=res
  //     this.exp_count_pendientes=0
  //     this.expedientesList.forEach((expediente: any) => {
  //         if(expediente.estado_preparado==false){
  //            this.exp_count_pendientes=this.exp_count_pendientes+1
  //         }
  //     })
  //   },
  //   err=>{
  //     console.error(err)
  //   }
  // )
  //this.expedientetemp = this.buscarPorId(params['id_inventario']);
//  console.log(this.expedientetemp)
}
// MostrarFormularioExpediente(id_expediente:number){
//   //NECESITAMOS LOS DATOS DE LA TUC
//   // this.vehiculo_detalle = this.lista_vehiculos.filter((detalle: { id_vehiculo: number; }) => detalle.id_vehiculo == id_vehiculo);
//   // this.vehiculo_detalle=this.vehiculo_detalle[0]
//   this.openModal(id_expediente)

// }


closeModal() {
  // Ocultar el modal utilizando la instancia almacenada
  this.myModal.hide();
  this.id_expediente=0

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

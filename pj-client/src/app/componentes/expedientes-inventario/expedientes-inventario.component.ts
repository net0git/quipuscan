import { Component, OnInit } from '@angular/core';
import { Router ,ActivatedRoute} from '@angular/router';
import { ExpedienteService } from 'src/app/servicios/expediente/expediente.service';
import { InventarioService } from 'src/app/servicios/inventario/inventario.service';
import { LectorBarrasService } from 'src/app/servicios/lectorbarras/lector-barras.service';


import Swal from 'sweetalert2';

@Component({
  selector: 'app-expedientes-inventario',
  templateUrl: './expedientes-inventario.component.html',
  styleUrls: ['./expedientes-inventario.component.css']
})
export class ExpedientesInventarioComponent implements OnInit{
habilitarPreparacion=true
habilitarAgregar=false
disablePreparador='display: block';
disableMensajePreparador='display: none'

data_expediente:any={
  id_inventario:null,
  id_responsable:null,
  nombre_expediente:null,
  fojas:null,
  fojas_unacara:null,
  fojas_doscaras:null,
  fojas_obs:null,
  observaciones:null,
  lote:null,
  estado_preparado:null,
  estado_digitalizado:null,
  estado_indizado:null,
  estado_controlado:null,
  estado_fedatado:null
}

expedientesList:any=[]
expedientesListTemp:any=[]//servira como respaldo para no tener que volver a consulta a la base de datos
// expedientesPendientes:any=[] 
// expedientesEmPreparacion:any=[]
exp_count_pendientes:number=0

p: number = 1;

inventarioDetalle:any=[]
constructor(private lectorBarrasService:LectorBarrasService,private activatedRoute:ActivatedRoute,private router:Router,private expedienteService:ExpedienteService, private inventarioService:InventarioService){}
expedientetemp:any={}
async ngOnInit(): Promise<void> {
  try {
    await this.detalleInventario();
    await this.listarTotalExpedientesXidInventario();
  } catch (error) {
    console.error(error);
  }
}

async detalleInventario(): Promise<void> {
  const params = this.activatedRoute.snapshot.params;
  try {
    const res = await this.inventarioService.obtenerDetalleInventario(params['id_inventario']).toPromise();
    this.inventarioDetalle = res;
    this.inventarioDetalle=this.inventarioDetalle[0]
    if (this.inventarioDetalle.estado_preparado) {
    
      this.disableMensajePreparador = 'display: block';
      console.log(this.inventarioDetalle.id_inventario+'  '+this.inventarioDetalle.estado_preparado)
    }
  } catch (err) {
    console.error(err);
  }
}

async listarTotalExpedientesXidInventario(): Promise<void> {
  const params = this.activatedRoute.snapshot.params;
  try {
    const res = await this.expedienteService.listaTotalExpedientesXinventario(params['id_inventario']).toPromise();
    this.expedientesList = res;
    this.expedientesListTemp=res;  
    this.exp_count_pendientes=0
        this.expedientesList.forEach((expediente: any) => {
            if(expediente.estado_preparado==null){
               this.exp_count_pendientes=this.exp_count_pendientes+1
            }
        })
        this.modificarCantidadInvenario()
     
  } catch (err) {
    console.error(err);
  }
}

listarExpedientesPendientes(){
  this.p=1
  this.expedientesList = this.expedientesListTemp.filter((expediente: any) => {
    return expediente.estado_preparado == null;
    
});
}
restaurarLista(){
  this.expedientesList=this.expedientesListTemp
}

agregarExpediente(){
  if(this.data_expediente.nombre_expediente==''||this.data_expediente.nombre_expediente==null ){
    alert('por favor complete los campos')
  }
  
  else{
  const expeditenbody=this.data_expediente
  expeditenbody.nombre_expediente= this.data_expediente.nombre_expediente
  expeditenbody.id_inventario=this.inventarioDetalle.id_inventario
  console.log(expeditenbody)
  this.expedienteService.guardarExpedienteInventario(expeditenbody).subscribe(
    res=>{
        console.log(res)
        this.mensajeExpedienteGuardado()
        this.listarTotalExpedientesXidInventario()
        this.limpiarIngreso()

    },
    err=>{
      console.error(err)
    }
  )
}
}
exmodificarExpediente(expediente: any) {
  if (expediente.estado_preparado == null) {
    this.modificarExpediente(expediente)
  } else {
    alert('El expediente no puede ser modificado');
  }
}

exEliminarExpediente(expediente: any) {
  if (expediente.estado_preparado == null) {
    this.mensajePreEliminar(expediente)
  } else {
    alert('El expediente no puede ser eliminado');
  }
}

modificarEstadoInventario(){
  const params=this.activatedRoute.snapshot.params
  console.log(params['id_inventario'])
  // this.inventarioDetalle.estado_preparado=true
 // this.inventarioService.modificarInventario(this.inventarioDetalle,this.inventarioDetalle)
  this.inventarioService.modificarEstadoInventario({estado_preparado:true},params['id_inventario']).subscribe(
    res=>{
      console.log(res)
    },
    err=>{
      console.error(err)
    }
    
  )
}

enviarApreparacion(){
//enviaremos a preparacion cambiando los valores de estado null a false
this.expedientesList.forEach((expediente: any) => {
  // Realiza la acción que necesites con cada expediente 
  console.log(expediente);
  // el expediente pasa a ser falso indicando asi que esta listo para preparacion pero que aun no se ha preparado, 
  // null: esta en inventario, false: listo para preparacion, cuando este en true significa que ya se ha preparado
  if(expediente.estado_preparado==null){
    expediente.estado_preparado=false
  this.expedienteService.modificarEstadoPreparado(expediente,expediente.id_expediente).subscribe(
    res=>{
        console.log(res)
        this.listarTotalExpedientesXidInventario()
    },
    err=>{
        console.error(err)

    }
  )
  }
  
})

this.modificarEstadoInventario()
this.habilitarPreparacion=false
this.habilitarAgregar=true
this.mensajeEnviadoaPreparacion()

}

modificarCantidadInvenario(){
  const params=this.activatedRoute.snapshot.params
  console.log(params['id_inventario'])
  this.inventarioService.modificarCantidadInventario({cantidad: this.expedientesList.length},params['id_inventario']).subscribe(
    res=>{
      console.log(res)
    },
    err=>{
      console.error(err)
    }
  )
}



eliminarExpedienteDeBD(expediente:any){

    this.expedienteService.eliminarExpediente(expediente.id_expediente).subscribe(
      res=>{
        console.log(res)
        this.listarTotalExpedientesXidInventario()
        this.habilitarPreparacion=true
        this.habilitarAgregar=false
      },
      err=>{
        console.error(err)
       
      }
    )
  
 
}
async modificarExpediente(expediente:any){
  const { value: nombre_expediente } = await Swal.fire({
    title: "MODIFICAR NOMBRE DEL EXPEDIENTE",
    input: "text",
    inputValue:expediente.nombre_expediente
  })
  if (nombre_expediente) {
   // Swal.fire(`Entered email: ${nombre_expediente}`);
    console.log(expediente)
    expediente.nombre_expediente=nombre_expediente
    this.expedienteService.modificarExpediente(expediente,expediente.id_expediente).subscribe(
      res=>{
        console.log(res)
        this.listarTotalExpedientesXidInventario()
      
      },
      err=>{
        console.error(err)
      }
    )
    //listarExpedientesXidInventario()
  }
}

limpiarIngreso(){
  this.data_expediente.nombre_expediente=''
}

volver(){
  this.router.navigate(['/principal/inventario'])
}


mensajePreEliminar(expediente:any){
  Swal.fire({
    title: "estas seguro de eliminar?!",
    text: "esta accion no es reversible",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "si, eliminar!"
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Eliminado!",
        text: "Tu archivo ha sido eliminado.",
        icon: "success"
      });

      this.eliminarExpedienteDeBD(expediente)
    }
  });

}

mensajeEnviadoaPreparacion(){
  Swal.fire({
    title: "BUEN TRABAJO!",
    text: "los expedientes se enviaron a preparacion!",
    icon: "success"
  });
}

mensajeExpedienteGuardado(){
  Swal.fire({
    toast: true,
    position: "top-end",
    icon: "success",
    title: "expediente registrado ",
    showConfirmButton: false,
    timer: 1500
  });
}
 
onEnterPress(event: KeyboardEvent) {
  if (event.key === 'Enter') {
    console.log('Enter key pressed:', this.data_expediente.nombre_expediente);
    this.lectorBarrasService.obtener_nombreExpediente(this.data_expediente.nombre_expediente).subscribe(
      res=>{
          let nombre_expediente_tem:any=res
          if(nombre_expediente_tem.estado=='EXITO'){
            console.log(nombre_expediente_tem.results[0].x_formato)
            this.data_expediente.nombre_expediente=nombre_expediente_tem.results[0].x_formato

          }
          else{
            alert('no se encuentra el expediente')
          }
          
      },
      err=>{
          console.log(err)
      }
    )
    // Aquí puedes agregar la lógica que quieres ejecutar cuando se presiona Enter
  }
}
buscarEnObjeto(event: any) {
  let objetosFiltrados=[]
  const textoBusqueda = event.target.value.toLowerCase();
    
    // Filtrar los objetos según el texto de búsqueda
    objetosFiltrados = this.expedientesListTemp.filter((objeto: 
      { 
        nombre_expediente: string;
      

       }) => {
      
      const nombre_expediente = objeto.nombre_expediente.toLowerCase();
     

      return nombre_expediente.includes(textoBusqueda);
    });
    this.expedientesList=objetosFiltrados
}
}

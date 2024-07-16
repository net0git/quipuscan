import { Component, OnInit } from '@angular/core';
import { Router ,ActivatedRoute} from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ExpedienteService } from 'src/app/servicios/expediente/expediente.service';
import { InventarioService } from 'src/app/servicios/inventario/inventario.service';
import { DigitalizacionService } from 'src/app/servicios/digitalizacion/digitalizacion.service';
import { ControlCalidadService } from 'src/app/servicios/controlcalidad/control-calidad.service';
import { DatosCompartidosService } from 'src/app/servicios/datoslogin/datos-compartidos.service';
import Swal from 'sweetalert2';
declare var bootstrap: any;

@Component({
  selector: 'app-control-calidad-expediente',
  templateUrl: './control-calidad-expediente.component.html',
  styleUrls: ['./control-calidad-expediente.component.css']
})
export class ControlCalidadExpedienteComponent implements OnInit{

  expedientesList:any=[]
  expedientesListTemp:any=[]
  inventarioDetalle:any=[]
  objetosFiltrados:any=[]
  expedientetemp:any=[]
  private myModal: any;
  p: number = 1;
  ExpedientesHabilitados:any=[]
  exp_count_pendientes:number=0
    //ruta prefinida para pdfURL  
    pdfUrl: SafeResourceUrl | null =null;

    //datos del collapse para la tabla de vehiculos----------------------------------------
  isExpanded: boolean[] = [];

 
constructor(private datosCompartidosService:DatosCompartidosService,private controlCalidadService:ControlCalidadService,private digitalizacionService:DigitalizacionService,private sanitizer: DomSanitizer,private inventarioService:InventarioService ,private expedienteService:ExpedienteService,private activatedRoute:ActivatedRoute,private router:Router){
  this.isExpanded = this.expedientesList.map(() => false);
}



ngOnInit(): void {
  this.detalleInventario()
  this.listarExpedientesXidInventario()
  this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`assets/documentos/error/error_carga2.pdf`);
  
}

toggleCollapse(index: number) {
     // Si el elemento ya está expandido, simplemente colapsa todos
              if (this.isExpanded[index]) {
                this.isExpanded[index] = false;
              } else {
                // Colapsa todos los elementos
                this.isExpanded = this.isExpanded.map(() => false);
                // Expande el elemento seleccionado
                this.isExpanded[index] = true;
              }
  
  // Cambiar el estado de la fila en el índice dado
  // console.log(index)
  // this.isExpanded[index] = !this.isExpanded[index];
}
//--------------------------------------------------------------------------------------
openModal() {
  this.myModal = new bootstrap.Modal(document.getElementById('exampleModalCenter'));
  this.myModal.show();
}
closeModal() {

  // Ocultar el modal utilizando la instancia almacenada
  this.myModal.hide();
  this.limpiarModal()
}
mensajeEstado(){
  alert('El expediente ya ha pasado el control de calidad')
}
limpiarModal(){

  (<HTMLInputElement>document.getElementById('controlcalidad_checkbox_formato')).checked=false;
  (<HTMLInputElement>document.getElementById('controlcalidad_checkbox_peso')).checked=false;
  (<HTMLInputElement>document.getElementById('controlcalidad_checkbox_nitidez')).checked=false;
  (<HTMLInputElement>document.getElementById('controlcalidad_checkbox_pruebas')).checked=false;
  (<HTMLInputElement>document.getElementById('controlcalidad_textarea')).value='';

    
}


MostrarModal(id_expediente:number){

  for (let element of this.expedientesList) {
    if(element.id_expediente==id_expediente){
      this.expedientetemp=element
      console.log(this.expedientetemp)
      break;
    }
    
  }
this.openModal()
}

aprobarControlCalidad(){

  let body:any={}

  body.formato = (<HTMLInputElement>document.getElementById('controlcalidad_checkbox_formato')).checked;
  body.peso = (<HTMLInputElement>document.getElementById('controlcalidad_checkbox_peso')).checked;
  body.nitidez = (<HTMLInputElement>document.getElementById('controlcalidad_checkbox_nitidez')).checked;
  body.pruebas = (<HTMLInputElement>document.getElementById('controlcalidad_checkbox_pruebas')).checked;
  body.observacion = (<HTMLInputElement>document.getElementById('controlcalidad_textarea')).value;
  body.estado_concluido=true
  body.id_expediente=this.expedientetemp.id_expediente
  body.id_responsable=this.datosCompartidosService.credentials.id_usuario

  console.log(body)

  this.controlCalidadService.crearControlCalidad(body).subscribe(
    res=>{
             console.log(res)
             console.log(body)
             
             this.cambiarEstadoExpediente()
             this.mensajeAprobado()
    },
    err=>{
           console.error(err)
           this.closeModal()
             this.limpiarModal()
    }
  )
}

cambiarEstadoExpediente(){
  this.expedienteService.modificarEstadoControlado({estado_controlado:true},this.expedientetemp.id_expediente).subscribe(
    res=>{
      console.log(res)
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
listarExpedientesXidInventario(){
  const params=this.activatedRoute.snapshot.params
  console.log(params['id_inventario'])
  this.expedienteService.listaExpedientesXinventario(params['id_inventario']).subscribe(
    res=>{
      this.ExpedientesHabilitados = res
        
        
      this.expedientesList=this.ExpedientesHabilitados.filter((expediente: { estado_indizado: boolean; }) => expediente.estado_indizado ===true);
    
      this.expedientesListTemp=this.expedientesList  
      this.expedientesList.forEach((expediente: any) => {
          if(expediente.estado_controlado==null){
             this.exp_count_pendientes=this.exp_count_pendientes+1
          }
      })
      console.log(this.expedientesList)
      
 
    },
    err=>{
      console.error(err)
    }
  )
  //this.expedientetemp = this.buscarPorId(params['id_inventario']);
//  console.log(this.expedientetemp)
}

  async MensajeDeGuardado(){
  const { value: text } = await Swal.fire({
    input: "textarea",
    inputLabel: "observaciones",
    
    inputAttributes: {
      "aria-label": "Type your message here",
      
    },
    showCancelButton: true
  });
  // if (text) {
  //   Swal.fire(text);
  // }
}

obtenerDocumentoDigitalizado(id_expediente:number){
  this.digitalizacionService.obtenerDocumentoXidExpediente(id_expediente).subscribe(
    res=>{
            let documento:any=res
            
            console.log(documento)
           this.mostrarDocumento(documento.documento)
    },
    err=>{
          console.log(err)
         
    }
  )
}
//#region ==========CONVERTIR DE BASE64 A PDF PARA MOSTRARSE EN EL VISUALIZADOR DE DEL NAVEGADOR===================== 
  // convertir de base64 a pdf
  // Paso 1: Decodificar el string Base64
  base64ToBytes(base64:string) {
    const binaryString = atob(base64);
    const length = binaryString.length;
    const bytes = new Uint8Array(length);
  
    for (let i = 0; i < length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
  
    return bytes;
  }
  
  // Paso 2: Crear un objeto Blob para un PDF
  base64ToPdfBlob(base64:string) {
    const bytes = this.base64ToBytes(base64);
    return new Blob([bytes], { type: "application/pdf" });
  }
  
  // Ejemplo de uso
  //para hacegurar un correcto respaldo del documento realizamos una previsualizacion del archivo en base64 que guardaremos en la base de datos
  mostrarDocumento(documento:string){ 
    const pdfBlob = this.base64ToPdfBlob(documento);
    console.log(pdfBlob)
   this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(pdfBlob));
  
   }
  //#endregion ====================================================================================================

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
mensajeAprobado(){
  Swal.fire({
   
    icon: "success",
    title: "CONTROL DE CALIDAD APROBADO",
    showConfirmButton: false,
    timer: 1500
  });
  this.listarExpedientesXidInventario()
  this.limpiarModal()
  this.closeModal()
}

volver(){
  this.router.navigate(['/principal/controlcalidad'])
}
verificar(id_expediente:number){
  //{ path:'principal/controlcalidad/expediente/verificar/:id_expediente',component:ControlCalidadExpedienteComponent},
  // this.router.navigate(['principal/indizador/expedientes/',id_expediente])
  // alert('principal/indizador/expedientes/'+id_expediente)
   this.router.navigate(['principal/controlcalidad/verificar/',id_expediente])
  //  console.log('principal/controlcalidad/expediente/verificar/'+id_expediente)
}
}

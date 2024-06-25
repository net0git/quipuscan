import { Component, OnInit } from '@angular/core';
import { Router ,ActivatedRoute} from '@angular/router';
import { ExpedienteService } from 'src/app/servicios/expediente/expediente.service';
import { ParteService } from 'src/app/servicios/parte/parte.service';
import { DatosCompartidosService } from 'src/app/servicios/datoslogin/datos-compartidos.service';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { IndizacionService } from 'src/app/servicios/indizacion/indizacion.service';
import { DigitalizacionService } from 'src/app/servicios/digitalizacion/digitalizacion.service';
import Swal from 'sweetalert2';
declare var bootstrap: any;
@Component({
  selector: 'app-indizador-expediente-form',
  templateUrl: './indizador-expediente-form.component.html',
  styleUrls: ['./indizador-expediente-form.component.css']
})
export class IndizadorExpedienteFormComponent implements OnInit{
  constructor(private digitalizacionService:DigitalizacionService,private indizacionService:IndizacionService,private sanitizer: DomSanitizer,private activatedRoute:ActivatedRoute,private router:Router, private expedienteService:ExpedienteService, private parteService:ParteService, private datosCompartidosService:DatosCompartidosService ){}
  detalleExpediente:any=[]//contempla todos los detalles que corresponde al expediente de presentación 
  observacionDigitalizado:string=''
  data_expediente:any={
    id_inventario: null,
    id_responsable: null,
    nombre_expediente: null,
    fojas: null,
    fojas_unacara: null,
    fojas_doscaras: null,
    fojas_obs: null,
    copias_originales: null,
    copias_simples: null,
    observaciones: null,
    lote: null,
    estado_preparado:true,
    estado_digitalizado: null,
    estado_indizado: null,
    estado_controlado: null,
    estado_fedatado:null  
}

listaTempDemanantes:any=[]//[]//lista temporal de demandantes
listaTempDemandados:any=[]// lista temporal de demandador
listaTempIndizacion:any=[]//lista indizacion
//[{"nombre":"ernesto","ap_paterno":"francisco","ap_materno":"arangure","dni":"45785623"},{"nombre":"francisco","ap_paterno":"arangure","ap_materno":"torres","dni":"19635784"}]
TempDemandante:any={
  nombre:'',
  ap_paterno:'',
  ap_materno:'',
  dni:'',
}
TempDemandado:any={
  nombre:'',
  ap_paterno:'',
  ap_materno:'',
  dni:'',

}

//datos del collapse para la tabla de vehiculos----------------------------------------



pdfUrl: SafeResourceUrl | null =null;
private myModal: any;
ngOnInit(): void {
  const params=this.activatedRoute.snapshot.params

    console.log(params['id_expediente'])

    this.expedienteService.obtenerExpedienteDetalle(params['id_expediente']).subscribe(
        res=>{
           this.detalleExpediente=res
            this.detalleExpediente=this.detalleExpediente[0]
           console.log(this.detalleExpediente)
           this.data_expediente.id_inventario= this.detalleExpediente.id_inventario
           this.data_expediente.id_responsable= this.datosCompartidosService.credentials.id_usuario
           this.data_expediente.nombre_expediente= this.detalleExpediente.nombre_expediente
           this.obtenerDocumentoDigitalizado(this.detalleExpediente.id_expediente)
        },
        err=>{
          console.error(err)
        }   
       )

      
       this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`assets/documentos/error/error_carga2.pdf`);
}


obtenerDocumentoDigitalizado(id_expediente:number){
  this.digitalizacionService.obtenerDocumentoXidExpediente(id_expediente).subscribe(
    res=>{
            let digitalizado:any=res
            
            console.log(digitalizado)
           this.mostrarDocumento(digitalizado.documento)
           this.observacionDigitalizado=digitalizado.observaciones
    },
    err=>{
          console.log(err)
         
    }
  )
}

limpiarCamposDemandante(){
   (<HTMLInputElement>document.getElementById('demandante_nombre')).value='';
  (<HTMLInputElement>document.getElementById('demandante_ap_paterno')).value='';
   (<HTMLInputElement>document.getElementById('demandante_ap_materno')).value='';
   (<HTMLInputElement>document.getElementById('demandante_dni')).value='';
}
limpiarCamposDemandado(){
  (<HTMLInputElement>document.getElementById('demandado_nombre')).value='';
  (<HTMLInputElement>document.getElementById('demandado_ap_paterno')).value='';
  (<HTMLInputElement>document.getElementById('demandado_ap_materno')).value='';
  (<HTMLInputElement>document.getElementById('demandado_dni')).value='';
}

limpiarCamposIndizacion(){
 
  (<HTMLInputElement>document.getElementById('indizacion_descripcion')).value='';
  (<HTMLInputElement>document.getElementById('indizacion_indice')).value='';
  (<HTMLInputElement>document.getElementById('indizacion_fojas')).value='';
  (<HTMLInputElement>document.getElementById('indizacion_checkbox_original')).checked=false;
  (<HTMLInputElement>document.getElementById('indizacion_checkbox_copia')).checked=false;
  (<HTMLInputElement>document.getElementById('indizacion_checkbox_color')).checked=false;
  (<HTMLInputElement>document.getElementById('indizacion_checkbox_escalagris')).checked=false;
  (<HTMLInputElement>document.getElementById('indizacion_textarea')).value='';

  
 
}
enviarTablaIndexacion(){
  // Obtener datos la indexacion
  let  datosIndex:any={}
  datosIndex.descripcion = (<HTMLInputElement>document.getElementById('indizacion_descripcion')).value;
  datosIndex.indice = (<HTMLInputElement>document.getElementById('indizacion_indice')).value;
  datosIndex.fojas = (<HTMLInputElement>document.getElementById('indizacion_fojas')).value;
  datosIndex.check_original = (<HTMLInputElement>document.getElementById('indizacion_checkbox_original')).checked;
  datosIndex.check_copia = (<HTMLInputElement>document.getElementById('indizacion_checkbox_copia')).checked;
  datosIndex.check_color = (<HTMLInputElement>document.getElementById('indizacion_checkbox_color')).checked;
  datosIndex.check_escalagris = (<HTMLInputElement>document.getElementById('indizacion_checkbox_escalagris')).checked;
  datosIndex.check_textarea = (<HTMLInputElement>document.getElementById('indizacion_textarea')).value;

  //agregar a la lista listaTempIndizacion

  console.log(this.listaTempIndizacion)
  this.listaTempIndizacion.push(datosIndex)
  this.closeModal();
  this.limpiarCamposIndizacion();
}

 enviarTablaDemandantes() {
   // Obtener datos del demandante
   let  datosDemandante:any={}
   datosDemandante.nombre = (<HTMLInputElement>document.getElementById('demandante_nombre')).value;
   datosDemandante.ap_paterno = (<HTMLInputElement>document.getElementById('demandante_ap_paterno')).value;
   datosDemandante.ap_materno = (<HTMLInputElement>document.getElementById('demandante_ap_materno')).value;
   datosDemandante.dni = (<HTMLInputElement>document.getElementById('demandante_dni')).value;


   // Agregar los datos a la lista temporal
   this.listaTempDemanantes.push(datosDemandante);
 

   // Cerrar el modal
   this.closeModal();
   this.limpiarCamposDemandante();
}
enviarTablaDemandados(){
  // Obtener datos del demandante
  let  datosDemandado:any={}
  datosDemandado.nombre = (<HTMLInputElement>document.getElementById('demandado_nombre')).value;
  datosDemandado.ap_paterno = (<HTMLInputElement>document.getElementById('demandado_ap_paterno')).value;
  datosDemandado.ap_materno = (<HTMLInputElement>document.getElementById('demandado_ap_materno')).value;
  datosDemandado.dni = (<HTMLInputElement>document.getElementById('demandado_dni')).value;


  // Agregar los datos a la lista temporal
  this.listaTempDemandados.push(datosDemandado);


  // Cerrar el modal
  this.closeModal();
  this.limpiarCamposDemandado();
}
guardar(){
  // this.ModificarExpediente()
  // this.GuardarPartes()
  // this.MensajeDeGuardado()
}

//en este caso usaremos el modificar ya que el preparado es un agregado al expediente alistado por el supervisor
ModificarExpediente(){
  const params=this.activatedRoute.snapshot.params
  const id_expediente=params['id_expediente']
  this.expedienteService.modificarExpediente(this.data_expediente,id_expediente).subscribe(
    res=>{
      console.log(res)
    },
    err=>{
      console.error(err)
    }
  )

}
//en este caso si guardaremos la tabla de demandados y demandantes
GuardarPartes(){
  this.GuardarDemandantes();
  this.GuardarDemandados();
}
GuardarDemandantes(){
  for (let element of this.listaTempDemanantes) {
    console.log(element);
      this.parteService.crearParte(element).subscribe(
        res=>{
          console.log(res)
        },
        err=>{
          console.error(err)
        }
      )
  }
}
GuardarDemandados(){
  for (let element of this.listaTempDemandados) {
    this.parteService.crearParte(element).subscribe(
      res=>{
        console.log(res)
      },
      err=>{
        console.error(err)
      }
    )
  }
}
 


  openModalIndizador() {
    this.myModal = new bootstrap.Modal(document.getElementById('Modal_Indizador'));
    this.myModal.show();
  }
  openModalDemandado() {
    this.myModal = new bootstrap.Modal(document.getElementById('Modal_Demandado'));
    this.myModal.show();
  }
  openModalDemandante() {
    this.myModal = new bootstrap.Modal(document.getElementById('Modal_Demandante'));
    this.myModal.show();
  }
  closeModal() {
    // Ocultar el modal utilizando la instancia almacenada
    this.myModal.hide();
    
  }


  preparacionGuardadoDatos(){
    
   

    let body:any={}

    body.id_expediente=this.detalleExpediente.id_expediente;
    body.id_responsable=this.datosCompartidosService.credentials.id_usuario
    body.juzgado_origen=(<HTMLInputElement>document.getElementById('select_juzgado_origen')).value;
    body.materia=(<HTMLInputElement>document.getElementById('input_materia')).value;
    body.tipo_proceso=(<HTMLInputElement>document.getElementById('select_tipo_proceso')).value;
    body.observaciones=(<HTMLInputElement>document.getElementById('observaciones_generales')).value;
    body.estado_concluido=true
    
   
    

    // Verificar si los campos de entrada están vacíos
if (!body.juzgado_origen || !body.materia || !body.tipo_proceso ) {
  alert('Por favor, complete los datos complementarios.');
} 
// Verificar si las listas temporales están vacías
else if (this.listaTempDemanantes.length === 0 || this.listaTempDemandados.length === 0 || this.listaTempIndizacion.length === 0) {
  alert('Las listas de demandantes, demandados y de indización no pueden estar vacías.');
} 
else {
  // Proceder con el procesamiento de los datos si todas las validaciones pasan
  console.log('Datos validados correctamente', body);
  let jsonStringDemanantes = JSON.stringify(this.listaTempDemanantes);
  let jsonStringDemandados = JSON.stringify(this.listaTempDemandados);
  let jsonStringIndizacion = JSON.stringify(this.listaTempIndizacion);
    body.demandante=jsonStringDemanantes
    body.demandado=jsonStringDemandados
    body.indizacion=jsonStringIndizacion
    console.log(body)
   this.indizacionService.crearIndizacion(body).subscribe(
    res=>{
         console.log(res)
         this.modificarEstadoIndizadoExpediente()
         this.mensajeGuardado()
    },
    err=>{
         console.error(err)
    }
   )
}
}

  modificarEstadoIndizadoExpediente(){
    this.expedienteService.modificarEstadoIndizado({estado_indizado:true},this.detalleExpediente.id_expediente).subscribe(
      res=>{
           console.log(res)
      },
      err=>{
           console.error(err)
      }
    )
  }

  volver(){
    this.router.navigate(['/principal/indizador/expedientes/',this.detalleExpediente.id_inventario])
  }

  mensajeGuardado(){
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "LA INDIZACION HA SIDO GUARDADO",
      showConfirmButton: false,
      timer: 1500
    });
    this.volver()
  }

  //==========CONVERTIR DE BASE64 A PDF PARA MOSTRARSE EN EL VISUALIZADOR DE DEL NAVEGADOR===================== 
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
  //====================================================================================================





  
}

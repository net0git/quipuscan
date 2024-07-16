import { Component, OnInit } from '@angular/core';
import { Router ,ActivatedRoute} from '@angular/router';
import { IndizacionService } from 'src/app/servicios/indizacion/indizacion.service';
import { ExpedienteService } from 'src/app/servicios/expediente/expediente.service';
import { DigitalizacionService } from 'src/app/servicios/digitalizacion/digitalizacion.service';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { DatosCompartidosService } from 'src/app/servicios/datoslogin/datos-compartidos.service';
import { ControlCalidadService } from 'src/app/servicios/controlcalidad/control-calidad.service';
import Swal from 'sweetalert2';
declare var bootstrap: any;

@Component({
  selector: 'app-control-calidad-expediente-form',
  templateUrl: './control-calidad-expediente-form.component.html',
  styleUrls: ['./control-calidad-expediente-form.component.css']
})
export class ControlCalidadExpedienteFormComponent implements OnInit{

  listaTempDemanantes:any=[]//[]//lista temporal de demandantes
  listaTempDemandados:any=[]// lista temporal de demandador
  detalleExpediente:any=[]//contempla todos los detalles que corresponde al expediente de presentación 
  indizacion:any = [];
  pdfUrl: SafeResourceUrl | null =null;
  private myModal: any;
  observacionDigitalizado:string=''
  obvervaciones_indizacion:string=''

   constructor(private controlCalidadService:ControlCalidadService,private datosCompartidosService:DatosCompartidosService,private sanitizer: DomSanitizer,private digitalizacionService:DigitalizacionService,private expedienteService:ExpedienteService,private indizacionService:IndizacionService,private router:Router, private activatedRoute:ActivatedRoute){}
  
   ngOnInit(): void {
    const params=this.activatedRoute.snapshot.params

    console.log(params['id_expediente'])

    this.expedienteService.obtenerExpedienteDetalle(params['id_expediente']).subscribe(
        res=>{
           this.detalleExpediente=res
            this.detalleExpediente=this.detalleExpediente
           console.log(this.detalleExpediente)
          
            
            this.RecuperarDatos(this.detalleExpediente.id_expediente,this.detalleExpediente.juzgado_origen,this.detalleExpediente.tipo_proceso,this.detalleExpediente.materia,this.detalleExpediente.fecha_inicial,this.detalleExpediente.fecha_final,this.detalleExpediente.demandante,this.detalleExpediente.demandado)
           
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
          let digitalizadoTemp:any=res
          console.log(digitalizadoTemp)
          this.mostrarDocumento(digitalizadoTemp.documento)
          this.observacionDigitalizado=digitalizadoTemp.observaciones
      },
      err=>{
          console.error(err)
      }
    )
  }

  preAprobacion(){
    this.myModal = new bootstrap.Modal(document.getElementById('exampleModalCenter'));
    this.myModal.show();
  
  }

  RecuperarDatos(id_expediente:number,juzgado_origen: string, tipo_proceso: string, materia: string, fecha_inicio: string, fecha_final: string, demandantes:string,demandados:string) {
    (document.getElementById('input_juzgado_origen') as HTMLInputElement).value = juzgado_origen;
    (document.getElementById('select_tipo_proceso') as HTMLInputElement).value = tipo_proceso;
    (document.getElementById('input_materia') as HTMLInputElement).value = materia;
  
    // Extraer la parte de la fecha (YYYY-MM-DD) de la cadena ISO
    const fechaInicioStr = fecha_inicio.split('T')[0];
    const fechaFinalStr = fecha_final.split('T')[0];
  
    (document.getElementById('fecha_inicio') as HTMLInputElement).value = fechaInicioStr;
    (document.getElementById('fecha_final') as HTMLInputElement).value = fechaFinalStr;
  
    
    this.listaTempDemanantes = JSON.parse(demandantes);
    this.listaTempDemandados = JSON.parse(demandados);
    
  
    this.indizacionService.indizacionDetalleXidExpediente(id_expediente).subscribe(
      res=>{
          let datosIndizacion:any=res
          this.indizacion= JSON.parse(datosIndizacion[0].indizacion)
          this.obvervaciones_indizacion=datosIndizacion[0].observaciones
          // this.id_indizacion=datosIndizacion[0].id_indizacion;
          console.log(datosIndizacion[0]);
          // (<HTMLInputElement>document.getElementById('observaciones_generales')).value= datosIndizacion[0].observaciones;
      },
      err=>{
          console.error(err)
      }
    )
  
  }
  aprobarControlCalidad(){
    let body:any={}
    body.id_expediente=this.detalleExpediente.id_expediente
    body.id_responsable=this.datosCompartidosService.credentials.id_usuario
    body.val_observaciones=(<HTMLInputElement>document.getElementById('controlcalidad_checkbox_observaciones')).checked
    body.val_datos=(<HTMLInputElement>document.getElementById('controlcalidad_checkbox_datos')).checked
    body.val_nitidez=(<HTMLInputElement>document.getElementById('controlcalidad_checkbox_nitidez')).checked
    body.val_pruebas_impresion=(<HTMLInputElement>document.getElementById('controlcalidad_checkbox_pruebas')).checked
    body.val_copia_fiel=(<HTMLInputElement>document.getElementById('controlcalidad_checkbox_copia_fiel')).checked
    body.observacion=(<HTMLInputElement>document.getElementById('controlcalidad_textarea')).value

    // console.log(body)

    this.controlCalidadService.crearControlCalidad(body).subscribe(
      res=>{
        console.log(res)
        this.cambiarEstadoExpediente()
        this.closeModal()
        this.MensajeDeGuardado()
        
      },
      err=>{
        console.error(err)
      }
    )
    
    
  }

  cambiarEstadoExpediente(){
    this.expedienteService.modificarEstadoControlado({estado_controlado:true},this.detalleExpediente.id_expediente).subscribe(
      res=>{
        console.log(res)
      },
      err=>{
        console.error(err)
      }
    )
  }

  convertDateFormat(dateString: string): string {
    if(dateString===""){
      return ""
    }
    else{
      const [year, month, day] = dateString.split('-');
      return `${day}/${month}/${year}`;
      
    }
    
  }
  MostrarObservaciones(items: any[], index: number) {
    this.myModal = new bootstrap.Modal(document.getElementById('Modal_Indizador_observaciones'));
    this.myModal.show();
  
    const formattedDate = this.convertDateFormat(items[index].fecha);
  
      (<HTMLInputElement>document.getElementById('indizacion_descripcion_2')).innerText=items[index].descripcion;
      (<HTMLInputElement>document.getElementById('indizacion_indice_2')).value=items[index].indice;
      (<HTMLInputElement>document.getElementById('indizacion_fojas_2')).value=items[index].fojas;
      (<HTMLInputElement>document.getElementById('fecha_indice_2')).value=formattedDate;
      (<HTMLInputElement>document.getElementById('indizacion_checkbox_original_2')).checked=items[index].check_original;
      (<HTMLInputElement>document.getElementById('indizacion_checkbox_copia_2')).checked=items[index].check_copia;
      (<HTMLInputElement>document.getElementById('indizacion_checkbox_color_2')).checked=items[index].check_color;
      (<HTMLInputElement>document.getElementById('indizacion_checkbox_escalagris_2')).checked=items[index].check_escalagris;
      (<HTMLInputElement>document.getElementById('indizacion_textarea_2')).value=items[index].check_textarea;
  }
  
  closeModal() {
    // Ocultar el modal utilizando la instancia almacenada
    this.myModal.hide();
  
    
  }

  volver(){
    this.router.navigate(['/principal/controlcalidad/expedientres/',this.detalleExpediente.id_inventario])
  }


  MensajeDeGuardado(){
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'EL EXPEDIENTE PASO EL CONTROL DE CALIDAD',
      showConfirmButton: false,
      timer: 1500
    })
    this.volver()
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

}

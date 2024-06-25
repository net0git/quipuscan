import { Component, OnInit } from '@angular/core';
import { SafeResourceUrl,DomSanitizer } from '@angular/platform-browser';
import { Router ,ActivatedRoute} from '@angular/router';
import { FedatarService } from 'src/app/servicios/fedatar/fedatar.service';
import { DatosCompartidosService } from 'src/app/servicios/datoslogin/datos-compartidos.service';
import { ExpedienteService } from 'src/app/servicios/expediente/expediente.service';
import { DigitalizacionService } from 'src/app/servicios/digitalizacion/digitalizacion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-fedatario-expedientes-form',
  templateUrl: './fedatario-expedientes-form.component.html',
  styleUrls: ['./fedatario-expedientes-form.component.css']
})
export class FedatarioExpedientesFormComponent implements OnInit{
//ruta prefinida para pdfURL  

pdfUrl: SafeResourceUrl | null =null;

nombre_espediente:string=''

data_expediente:any=[]

demandantes:any=[]
demandados:any=[]
indizacion:any=[]

documento:string=''

responsablesExpediente:any={}

data_fedatado:any=[]


disabledButon='display: none';
constructor(private digitalizacionService:DigitalizacionService,private expedienteService:ExpedienteService,private activatedRoute:ActivatedRoute,private datosCompartidosService:DatosCompartidosService,private fedatarService:FedatarService,private sanitizer: DomSanitizer,private router:Router){}
 
ngOnInit(): void {
  
  this.ExpedieIndizadoDocumentado()
  this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`assets/documentos/error/error_carga2.pdf`);
}

limpiarCampos(){
  this.data_expediente=''
  this.nombre_espediente=''
  this.demandados=[]
  this.demandantes=[]
  this.data_fedatado=[]
  this.indizacion=[]
  this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`assets/documentos/error/error_carga2.pdf`);
}

volver(){
  this.router.navigate(['/principal/fedatario/expedientes/',this.data_expediente.id_inventario])
}

// expedienteFedatado(){
//   const params=this.activatedRoute.snapshot.params
//   const id_expediente=params['id_expediente']
//   this.fedatarService.OptenerFedatadoEstadoXidExpediente(id_expediente).subscribe(
//     res=>{
//         this.data_fedatado=res
//         this.data_fedatado=this.data_fedatado[0]
//         console.log(this.data_fedatado)
//     },
//     err=>{  
//         console.error(err)
//     }
//   )
// }

ExpedieIndizadoDocumentado(){
  const params=this.activatedRoute.snapshot.params
  const id_expediente=params['id_expediente']

  this.fedatarService.OptenerExpedienteDetalle(id_expediente).subscribe(
    res=>{
          
          this.data_expediente=res
          this.data_expediente=this.data_expediente[0]
          if(this.data_expediente.estado_fedatado===true){
              this.disabledButon='display: none';
          }
          else{
            this.disabledButon='display: block';
          }
          console.log(this.data_expediente)
          this.nombre_espediente=''
          this.mostrarDocumento(this.data_expediente.documento)
          this.demandantes=JSON.parse(this.data_expediente.demandante) 
          this.demandados=JSON.parse(this.data_expediente.demandado)
          this.indizacion=JSON.parse(this.data_expediente.indizacion)
          
          this.ObtenerResponsables()
          
    },
    err=>{
          console.error(err)      
    }
   )
}

ObtenerResponsables(){
  const params=this.activatedRoute.snapshot.params
  const id_expediente=params['id_expediente']
  this.fedatarService.OptenerResponsablesXidExpediente(id_expediente).subscribe(
       res=>{
            let responsables:any=res
            this.responsablesExpediente=responsables[0]
            console.log(responsables)
       },
       err=>{
            console.error(err)
       }
  )
}

async aceptarFedatado() {
  const { value: file } = await Swal.fire({
    title: "Seleccionar expediente firmado",
    input: "file",
    inputAttributes: {
      "accept": "application/pdf",
      "aria-label": "Cargar tu documento PDF"
    }
  });

  if (!file) {
    Swal.fire({
      icon: 'info',
      title: 'Alerta',
      text: 'No  ha seleccionado ningún archivo.'
    });
    return;
  }

  const reader = new FileReader();

  reader.onload = (e) => {
    const target = e.target;
    if (target && typeof target.result === 'string') {
      // Obtener la cadena base64 del archivo
      this.documento = target.result.split(',')[1]; // Remover el prefijo de la URL de datos

      // Mostrar la cadena base64 en la consola
      console.log(this.documento);
      this.modificarDocumentoGigitalizacion(this.documento,this.data_expediente.id_digitalizacion)
      // Mostrar la alerta de éxito
      Swal.fire({
        icon: 'success',
        title: 'Buen trabajo',
        text: 'El expediente se ha guardado con exito.'
      });
    } else {
      alert("Tipo de resultado inesperado o el destino es nulo");
    }
  };

  reader.onerror = (error) => {
    console.error("Error al leer el archivo:", error);
    alert("Hubo un error al leer el archivo. Inténtalo de nuevo.");
  };

  reader.readAsDataURL(file);


   let body:any={}
  body.id_expediente=this.data_expediente.id_expediente
  body.id_responsable=this.datosCompartidosService.credentials.id_usuario
  body.observaciones='ninguna observacion'
  body.estado_concluido=true

  console.log(body)
  
  this.fedatarService.crearFedatar(body).subscribe(
    res=>{
      console.log(res)
      this.cambiarEstadoExpediente()
      //this.mensajeDeGuardado()
    },
    err=>{
      console.error(err)
    }
  )
  // Actualizar la URL del PDF de manera segura
  this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(file));
}

modificarDocumentoGigitalizacion(documento_cadena:string,id_digitalizacion:number){
  this.digitalizacionService.modificarDocumentoId({documento:documento_cadena},id_digitalizacion).subscribe(
    res=>{
        console.log(res)
    },
    err=>{
        console.error(err)
    }
  )
}

async prepararBodyFedatar(){

  const { value: file } = await Swal.fire({
    title: "SUBA EL EXPEDIENTE FIRMADO",
    input: "file",
    inputAttributes: {
      "accept": "application/pdf",
      "aria-label": "Upload your PDF document"
    }
  });
  
  if (file) {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      // Swal.fire({
      //   title: "Tu archivo pdf",
      //   text: "El EXPEDIENTE SE CARGO CORRECTAMENTE.",
       
        
      // });
      const base64String = reader.result as string;
     
      //console.log(this.documento)
    };
    
    // this.convertToBase64(file) 
    
      this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(file));
  }

  

  // let body:any={}
  // body.id_expediente=this.data_expediente.id_expediente
  // body.id_responsable=this.datosCompartidosService.credentials.id_usuario
  // body.observaciones='ninguna observacion'
  // body.estado_concluido=true

  // console.log(body)

  // this.fedatarService.crearFedatar(body).subscribe(
  //   res=>{
  //     console.log(res)
  //     this.mensajeDeGuardado()
  //   },
  //   err=>{
  //     console.error(err)
  //   }
  // )
}


  // CONVERTIR A BASE64 Y ALMACENAR EL CODIGO EN LA PROPIEDAD CERTIFICADO.DOCUMENTO
  convertToBase64(file: File): void {
    const reader = new FileReader();
    reader.onload = (e) => {
      const base64String = reader.result as string;
      // Almacena la cadena en base64 en la propiedad documento del objeto resolucion
      this.documento = base64String.split(',')[1];
      console.log(this.documento)

    };
  }

cambiarEstadoExpediente(){
  const params=this.activatedRoute.snapshot.params
  const id_expediente=params['id_expediente']
  
  this.expedienteService.modificarEstadoFedatario({estado_fedatado:true},id_expediente).subscribe(

  )
}

mensajeDeGuardado(){

  const Toast = Swal.mixin({
    toast: true,
    position: "top-start",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });
  Toast.fire({
    icon: "success",
    title: "Signed in successfully"
  });
  this.cambiarEstadoExpediente()

  setTimeout(() => {
    Swal.fire({
      title: "BUEN TRABAJO!",
      text: "EL EXPEDIENTE HA SIDO APROBADO CON EXITO!",
      icon: "success"
    }).then(() => {
      this.volver();
    });
  }, 3000);
  
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

import { Component, OnInit } from '@angular/core';
import { Router ,ActivatedRoute} from '@angular/router';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { ExpedienteService } from 'src/app/servicios/expediente/expediente.service';
import { InventarioService } from 'src/app/servicios/inventario/inventario.service';
import { DatosCompartidosService } from 'src/app/servicios/datoslogin/datos-compartidos.service';
import { DigitalizacionService } from 'src/app/servicios/digitalizacion/digitalizacion.service';
import Swal from 'sweetalert2';

declare var bootstrap: any;

@Component({
  selector: 'app-digitalizacion-expedientes-comparacion',
  templateUrl: './digitalizacion-expedientes-comparacion.component.html',
  styleUrls: ['./digitalizacion-expedientes-comparacion.component.css']
})
export class DigitalizacionExpedientesComparacionComponent implements OnInit{
  expedientesList:any=[];
  expedientesListTemp:any=[];
  objetosFiltrados:any=[]
  inventarioDetalle:any=[];
  private myModal: any;

  message: string = '';
  isMatch: boolean = false;
  pdfUrl: SafeResourceUrl | null =null;

  constructor(private digitalizacionService:DigitalizacionService,private sanitizer: DomSanitizer,private activatedRoute:ActivatedRoute,private router:Router,private expedienteService:ExpedienteService, private inventarioService:InventarioService,private datosCompartidosService:DatosCompartidosService){}

  expedientetemp:any=[]
  documento:any=[]
  peso_documento:number=0

  data_digitalizacion:any={
        id_expediente:null, 
        id_responsable:null, 
        fojas:null, 
        fojas_unacara:null, 
        fojas_doscaras:null, 
        escala_gris:null, 
        color:null, 
        observaciones:null, 
        documento:null,
        estado_concluido:null, 
        ocr:null
  }
ngOnInit(): void {
  this.detalleInventario()
  this.listarExpedientesXidInventario()
  this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`assets/documentos/error/error_carga2.pdf`);
 
}

//--------------------------------------------------------------------------------------
openModal() {
  this.limpiarcamposDigitalizacion()
  this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`assets/documentos/error/error_carga2.pdf`);
  this.myModal = new bootstrap.Modal(document.getElementById('exampleModalCenter'));
  this.myModal.show();
  this.message=''
}

onBlur(): void {
  if ((this.expedientetemp.fojas_unacara === this.data_digitalizacion.fojas_unacara) && 
      (this.expedientetemp.fojas_doscaras === this.data_digitalizacion.fojas_doscaras)) {
        this.isMatch = true;
    this.message = 'correcto, los datos coinciden';
  } else {
    this.message = '¡los datos no coinciden!';
    this.isMatch = false;
  }
}
// onBlur(): void {{
//   // console.log('Valor ingresado:', this.data_digitalizacion.fojas_doscaras);
 
//   // if( this.data_digitalizacion.fojas_doscaras!=''){
//   //   console.log('Valor ingresado:', this.data_digitalizacion.fojas_doscaras, 'boolean:',this.datosIgualdad);
//   // }
//   // Aquí puedes añadir más lógica para manejar el cambio de valor
// }

MostrarFormularioExpediente(id_expediente:number){

    for (let element of this.expedientesList) {
      if(element.id_expediente==id_expediente){
        this.expedientetemp=element
        console.log(this.expedientetemp)
        break;
      }
      
    }
  this.openModal()

}
closeModal() {
  // Ocultar el modal utilizando la instancia almacenada
  this.myModal.hide();
  
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
      const ExpedientesHabilitados:any = res
        
        
      this.expedientesList=ExpedientesHabilitados.filter((expediente: { estado_preparado: boolean; }) => expediente.estado_preparado ===true);
    
      this.expedientesListTemp=this.expedientesList  
      console.log(this.expedientesList)
    },
    err=>{
      console.error(err)
    }
  )
  //this.expedientetemp = this.buscarPorId(params['id_inventario']);
//  console.log(this.expedientetemp)
}



// mostrarDatos(){
//   const body_digitalizacion:any={
//           id_expediente:null, 
//           id_responsable:null, 
//           fojas:null, 
//           fojas_unacara:null, 
//           fojas_doscaras:null, 
//           escala_gris:null, 
//           color:null, 
//           observaciones:null, 
//           documento:null,
//           peso_doc:null,
//           estado_concluido:null, 
//           ocr:null
//     }
//     body_digitalizacion.fojas = (<HTMLInputElement>document.getElementById('total_fojas')).value;
//     body_digitalizacion.fojas_unacara = (<HTMLInputElement>document.getElementById('fojas_unacara')).value; 
//     body_digitalizacion.fojas_doscaras = (<HTMLInputElement>document.getElementById('fojas_doscara')).value;
//     body_digitalizacion.observaciones = (<HTMLInputElement>document.getElementById('observaciones')).value;
//     body_digitalizacion.escala_gris = (<HTMLInputElement>document.getElementById('escala_gris')).value;
//     body_digitalizacion.color = (<HTMLInputElement>document.getElementById('color')).value;
//     body_digitalizacion.ocr = (<HTMLInputElement>document.getElementById('ocr')).value;

//   body_digitalizacion.id_expediente=this.expedientetemp.id_expediente
//   body_digitalizacion.id_responsable=this.datosCompartidosService.credentials.id_usuario
//   body_digitalizacion.estado_concluido=true
//   body_digitalizacion.documento=this.documento
//   body_digitalizacion.peso_doc=this.peso_documento

//   console.log(body_digitalizacion)

// }

GuardarDigitalizacion(){
  const body_digitalizacion:any={
    id_expediente:null, 
    id_responsable:null, 
    fojas:null, 
    fojas_unacara:null, 
    fojas_doscaras:null, 
    escala_gris:null, 
    color:null, 
    observaciones:null, 
    documento:null,
    peso_doc:null,
    estado_concluido:null, 
    ocr:null
}
body_digitalizacion.fojas = (<HTMLInputElement>document.getElementById('total_fojas')).value;
body_digitalizacion.fojas_unacara = (<HTMLInputElement>document.getElementById('fojas_unacara')).value; 
body_digitalizacion.fojas_doscaras = (<HTMLInputElement>document.getElementById('fojas_doscara')).value;
body_digitalizacion.observaciones = (<HTMLInputElement>document.getElementById('observaciones')).value;
body_digitalizacion.escala_gris = (<HTMLInputElement>document.getElementById('escala_gris')).value;
body_digitalizacion.color = (<HTMLInputElement>document.getElementById('color')).value;
body_digitalizacion.ocr = (<HTMLInputElement>document.getElementById('ocr')).value;

body_digitalizacion.id_expediente=this.expedientetemp.id_expediente
body_digitalizacion.id_responsable=this.datosCompartidosService.credentials.id_usuario
body_digitalizacion.estado_concluido=true
body_digitalizacion.documento=this.documento
body_digitalizacion.peso_doc=this.peso_documento

this.digitalizacionService.crearDigitalizacion(body_digitalizacion).subscribe(
  res=>{
      console.log(res)
      //modificamos tambien el estado_digitalizado de la tabla t_expediente para indicar que se completo correctamente el proceso
      this.modificarEstadoDigitalExpediente()
      
      this.MensajeDeGuardado()
  },
  err=>{
      console.error(err)
  }
 )
}

modificarEstadoDigitalExpediente(){
  const body_expedienteTemp=this.expedientetemp
  // delete body_expedienteTemp.id_expediente
  body_expedienteTemp.estado_digitalizado=true

  this.expedienteService.modificarExpediente(body_expedienteTemp,body_expedienteTemp.id_expediente).subscribe(
    res=>{
      console.log(res)
    },
    err=>{
      console.error(err)
    }
  )
  
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
 
limpiarcamposDigitalizacion(){
this.data_digitalizacion.documento=null
this.data_digitalizacion.fojas=null
this.data_digitalizacion.fojas_unacara=null
this.data_digitalizacion.fojas_doscaras=null
this.data_digitalizacion.escala_gris=null
this.data_digitalizacion.color=null
this.data_digitalizacion.observaciones=null
this.data_digitalizacion.ocr=null

}
 volver(){
      this.router.navigate(['principal/digitalizacion'])
  }


   //EVENTO SELECCIONADOR DE DOCUMENTO
 onFileSelected(event:any) {
  const selectedFile = event.target.files[0];
  if (selectedFile) {
    this.convertToBase64(selectedFile);
    //this. mostrarDocumento();
    this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(selectedFile));
  }  
}

// CONVERTIR A BASE64 Y ALMACENAR EL CODIGO EN LA PROPIEDAD CERTIFICADO.DOCUMENTO
convertToBase64(file: File): void {
  const reader = new FileReader();
  
  
  reader.onload = (e) => {
    const base64String = reader.result as string;
    // Almacena la cadena en base64 en la propiedad documento del objeto resolucion
    this.documento = base64String.split(',')[1];
    this.peso_documento = file.size;
      // console.log('el tamaño del archivo es:'+peso)
      // console.log(`Tipo de dato de this.tamano: ${typeof peso}`);
  };

  reader.readAsDataURL(file);
}
mensajeDigitalizacion(){
  alert('el documento ya se ha digitalizado')
}
//MENSAJE 
MensajeDeGuardado(){
  Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: 'Digitalizacion completada con Exito',
    showConfirmButton: false,
    timer: 1500
  })
  this.listarExpedientesXidInventario()
   this.closeModal()
}
  
}





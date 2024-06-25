import { Component, OnInit } from '@angular/core';
import { SafeResourceUrl,DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ResolucionService } from 'src/app/servicios/resolucion/resolucion.service';

@Component({
  selector: 'app-resoluciones',
  templateUrl: './resoluciones.component.html',
  styleUrls: ['./resoluciones.component.css']
})
export class ResolucionesComponent implements OnInit {


  //ruta prefinida para pdfURL  
  pdfUrl: SafeResourceUrl | null =null;



  data_resolucion:any={
    id_resolucion:0,
    nro_resolucion:0,
    anio_resolucion:'',
    nombre_resolucion:'',
    fecha_resolucion:null,
    tomo_resolucion:null,
    documento:'',
    empresa_cod_id:0,
    nombre_empresa:'',
    expediente:'',
    descripcion:''

  }
constructor(private sanitizer: DomSanitizer,private resolucionService:ResolucionService,private router:Router){}

ngOnInit(): void {
  this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`assets/documentos/error/error_carga2.pdf`);
}

//obtener datos de la resolucion
obternerDatosResolucion(nro_resolucion:number, anio_resolucion:string){

    this.resolucionService.ObtenerResolucionPorNroAnio(nro_resolucion,anio_resolucion).subscribe(
      res=>{
        this.data_resolucion=res
        this.data_resolucion=this.data_resolucion[0]
        console.log(this.data_resolucion)
        this.mostrarDocumento()
      },
      err=>{
        console.error(err)

        this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`assets/documentos/error/error_carga2.pdf`);
      }
    )
}

buscarDocumento(){
  let nro = (<HTMLInputElement>document.getElementById('floatingInput1')).value;
  let anio = (<HTMLInputElement>document.getElementById('floatingInput2')).value;
  if(nro=='' || anio==''){
    alert('por favor complete los datos')
  }
  else{
    
    this.obternerDatosResolucion( parseInt(nro), anio)
    
  }
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
   mostrarDocumento(){ 
    const pdfBlob = this.base64ToPdfBlob(this.data_resolucion.documento);
    console.log(pdfBlob)
   this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(pdfBlob));
  
   }
  //====================================================================================================


//BOTON PARA VOLVER
  volver(){
    this.router.navigate(['/principal'])
  }
}

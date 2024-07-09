import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { DatosCompartidosService } from 'src/app/servicios/datoslogin/datos-compartidos.service';
import { ExpedienteService } from 'src/app/servicios/expediente/expediente.service';


@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

      // disableInventario='display: none';
      // disablePreparador='display: none';
      // disableDigitalizador='display: none';
      // disableIndizador='display: none';
      // disableControlCalidad='display: none';
      // disableFedatario='display: none';
      // disableLeyenda='display: none';
      // disableUsuarios='display: none';
      // disableBusqueda='display: none';
      // disableReporte='display: none';
      // disableConfiguracion='display: none';

      disableInventario='display: block';
      disablePreparador='display: block';
      disableDigitalizador='display: block';
      disableIndizador='display: block';
      disableControlCalidad='display: block';
      disableFedatario='display: block';
      disableLeyenda='display: block';
      disableUsuarios='display: block';
      disableBusqueda='display: block';
      disableReporte='display: block';
      disableConfiguracion='display: block';
      




  constructor(private expedienteService:ExpedienteService,private datosCompartidosService:DatosCompartidosService ,private activatedRoute:ActivatedRoute, private router:Router){}


  ngOnInit(): void {
      this.permisos()
  }

  permisos(){
      if(this.datosCompartidosService.credentials.perfil=='SUPERVISOR'|| this.datosCompartidosService.credentials.perfil=='ADMINISTRADOR'){
            this.disableInventario='display: block';
            this.disablePreparador='display: block';
            this.disableDigitalizador='display: block';
            this.disableIndizador='display: block';
            this.disableControlCalidad='display: block';
            this.disableFedatario='display: block';
            this.disableLeyenda='display: block';
            this.disableUsuarios='display: block';
            this.disableBusqueda='display: block';
            this.disableReporte='display: block';
            this.disableConfiguracion='display: block';
            
      }
      // if(this.datosCompartidosService.credentials.perfil=='SUPERVISOR'){

      // }
      if(this.datosCompartidosService.credentials.perfil=='PREPARADOR'){
            
            this.disablePreparador='display: block';
     
      }
      if(this.datosCompartidosService.credentials.perfil=='DIGITALIZADOR'){
           
            this.disableDigitalizador='display: block';
          
            
      }
      if(this.datosCompartidosService.credentials.perfil=='INDIZADOR'){
           
            this.disableIndizador='display: block';
  
      }
      if(this.datosCompartidosService.credentials.perfil=='CONTROLADOR'){
           
            this.disableControlCalidad='display: block';   
            
      }
      if(this.datosCompartidosService.credentials.perfil=='FEDATARIO'){
           
            this.disableFedatario='display: block';
                     
      }
                              
  }

//   limpiarProcesoExpediente(){
//       //cambiar de acuerdo al expediente
//       this.expedienteService.limpiarProcesoExpediente(158).subscribe(
//             res=>{
//                   console.log(res)
//             },
//             err=>{
//                   console.error(err)
//             }
//       )
//   }

  inventario_digitalizacion(){
        this.router.navigate(['principal/inventario']);
  }

  preparacion_documentos(){
      this.router.navigate(['principal/preparaciondocumentos']);
}

  digitalizacion(){
        this.router.navigate(['principal/digitalizacion']);
  }

  controlCalidad(){
      this.router.navigate(['principal/controlcalidad'])
  }
  
  indizador(){
      this.router.navigate(['principal/indizador'])
  }

  usuarios(){
        this.router.navigate(['/principal/usuario']);
  }

  fedatario(){
        this.router.navigate(['/principal/fedatario'])
  }

 

  reporte(){
        this.router.navigate(['/principal/reportes'])
  }

  busqueda_por_historial(){
        this.router.navigate(['principal/busqueda'])
  }

  resoluciones(){
        this.router.navigate(['principal/resoluciones'])
  }
}

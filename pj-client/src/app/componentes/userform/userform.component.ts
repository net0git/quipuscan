import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/servicios/usuario/usuario.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { DatosCompartidosService } from 'src/app/servicios/datoslogin/datos-compartidos.service';
import { PersonaService } from 'src/app/servicios/persona/persona.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-userform',
  templateUrl: './userform.component.html',
  styleUrls: ['./userform.component.css']
})
export class UserformComponent implements OnInit{

    data_usuario:any={
    id_usuario:0,
    nombre_usuario:'',
    perfil:'',
    password:'',
    id_persona:0,
    estado:''
  };

  data_persona:any={
    id_persona:0,
    nombre:'',
    ap_paterno:'',
    ap_materno:'',
    dni:'',
    telefono:'',
    correo:''
  };

  constructor(private personaService:PersonaService,private usuarioService:UsuarioService, private router:Router, private activateRoute:ActivatedRoute, private datosCompartidosService:DatosCompartidosService){}
  credenciales=this.datosCompartidosService.credentials

  ngOnInit(): void {
    const params=this.activateRoute.snapshot.params;
    
    if(params['id']){
      this.usuarioService.ObtenerUsuario(params['id']).subscribe(
        res=>{
            this.data_usuario=res;
            this.data_usuario=this.data_usuario[0]
            
            this.ObtenerDatosPersonal(this.data_usuario.id_persona)
        },
        err=>{
            console.error(err);
        }
      )
    }  
  }

  //COMBERTIR A MAYUSCULAR
 convertirAMayusculas(valor: string): string {
  return valor.toUpperCase();
} 

// CONVERTIR A MINUSCULAS
convertirAMinusculas(valor: string): string {
  return valor.toLowerCase();
}

  ObtenerDatosPersonal(id:number){
    this.personaService.ObtenerPersona(id).subscribe(
      res=>{
          this.data_persona=res
          this.data_persona=this.data_persona[0];
  
          
          
        
      
      
      },
      err=>{
        console.error(err)
      }
    )
  }
  ModificarUsurio(){
    delete this.data_persona.id_persona;
    // console.log(this.data_usuario['id_persona'] + ' ' + JSON.stringify(this.data_persona));
       this.personaService.ModificarPersona(this.data_usuario['id_persona'], this.data_persona).subscribe(
          res=>{
              console.log(res)
              this.MensajeModificado()
          },
          err=>{
              console.error(err)
          }
       )
  }
  //MENSAJES ANIMADOS
  MensajeModificado(){
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    
    Toast.fire({
      icon: 'success',
      title: 'modificacion exitosa'
    })
  }

}

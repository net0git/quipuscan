import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PersonaService } from 'src/app/servicios/persona/persona.service';
import { UsuarioService } from 'src/app/servicios/usuario/usuario.service';
import Swal from 'sweetalert2';
import { takeWhile } from 'rxjs';


@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  titulo='Creacion de Usuario'
  titulo_boton='CREAR USUARIO'
  modificar=false;//esta variable nos indicara si el estado de la ventana sera de creacion de usuario o modificacion, todo esto en funcion a la url que llegue a activiar la ventana

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

  data_id_auxi:any=[];//almacena el id_persona creado por la base de detos de manera temporal, este proceso se realiza mendiante la funcion GuardarDatosPersona()
  constructor(private router:Router, private usuarioService:UsuarioService, private personaService:PersonaService, private  activatedRoute:ActivatedRoute){}
  claseBoton: string = 'btn btn-lg btn-success mt-3 text-white ';
  
  ngOnInit(): void {
    const params=this.activatedRoute.snapshot.params
    if(params['id']){
      this.modificar=true;
      this.titulo='Modificar usuario';
      this.titulo_boton='MODIFICAR USUARIO'
      this.claseBoton = 'btn btn-lg btn-warning mt-3';
      this.usuarioService.ObtenerUsuario(params['id']).subscribe(
        res=>{
          this.data_usuario=res;
          this.data_usuario=this.data_usuario[0]
          this.data_usuario.password=''
          console.log(this.data_usuario)//obtnemos los datos del usuario 
          //Obtenemos los datos de la persona
           this.personaService.ObtenerPersona(this.data_usuario.id_persona).subscribe(
            res=>{
              this.data_persona=res;
              this.data_persona=this.data_persona[0]
            
              console.log(this.data_persona);

            },
            err=>{
              console.error(err)
            }
           )
        },
        err=>{
          console.error(err);
        }
      )
    }  
    
  }
  volverListaUsuario(){
    this.router.navigate(['/principal/usuario'])
  }

//COMBERTIR A MAYUSCULAR
 convertirAMayusculas(valor: string): string {
  return valor.toUpperCase();
} 

// CONVERTIR A MINUSCULAS
convertirAMinusculas(valor: string): string {
  return valor.toLowerCase();
}
  //GUARDAR DATOS USUARIO---------------------------------------------------------------------------------------------
 //1) GUARDAR DATOS PERSONA
  GuardarDatosPersona(){

    this.personaService.CrearPersona(this.data_persona).subscribe(
      res => {
        console.log('Respuesta del servicio:', res); // Verifica si res tiene el formato correcto.
        this.data_id_auxi = res;
        this.data_usuario.id_persona = this.data_id_auxi.id_persona;
        console.log('ID de la persona:', this.data_usuario.id_persona); // Verifica el valor de id_persona.
        if (this.data_id_auxi.length === 0) {
          alert('El dato está vacío, por favor ingrese un valor.');
        } else {
          //eliminamos el id_usuario para que pueda entrar como cuerpo solo el contenido
          delete this.data_usuario.id_usuario;
          console.log(this.data_usuario);
          this.GuardarDatosUsuario(this.data_usuario);
          
        }
      },
      err => {
        console.error('Error al ingresar la persona:', err);
      }
    )

  }
//2)GUARDAR DATOS USUARIO
  GuardarDatosUsuario(nuevoDatoUsuario:any){
    
    this.usuarioService.CrearUsuario(nuevoDatoUsuario).subscribe(
      res=>{
            console.log(res)
            this.MensajeDeGuardado()
            this.router.navigate(['principal/usuario'])
      },
      err=>{
          console.error(err)
      }
    )
  }

//3) GUARDAR DATOS SI NO EXISTE DOS USUARIOS IGUALES
  grabarDatosUsuarioBD(){
    //buscamos si existe un usuario con el mismo nombre
    this.usuarioService.ObtenerDetalleUsuarioPorNombre(this.data_usuario.nombre_usuario).subscribe(
      res=>{
        let temp:any=res       
        if(temp.length>0){
          alert('el nombre del usuario ya existe en el sistema')
        }

      },
      err=>{
          console.error(err)
          this.GuardarDatosPersona()
      }
    )
  }


//------------------------------------------------------------------------------------------------------------------
  validarCampos_CrearUsuario() {
    if (!this.data_usuario.nombre_usuario || !this.data_usuario.perfil || !this.data_usuario.password ) {
      this.MensajeDeError();
    } else {
      // this.GuardarDatosPersona();
        this.grabarDatosUsuarioBD()

    }
  }

 ModificarDatosUsuario(){

    this.usuarioService.ModificarUsuarioDatos(this.data_usuario['id_usuario'],this.data_usuario).subscribe(
      res=>{
          console.log(res);
          if (this.data_usuario.password!='') {
            this.usuarioService.ModificarUsuarioPassword(this.data_usuario['id_usuario'],this.data_usuario).subscribe(
              res=>{
                console.log(res);
                this.router.navigate(['principal/usuario'])
              },
              err=>{
                console.error(err);
               
              }
            )    
        } 
        this.router.navigate(['principal/usuario'])
      },
      err=>{

      }
    )
   
     this.personaService.ModificarPersona(this.data_persona['id_persona'],this.data_persona).subscribe(
      res=>{
        console.log(res);
      },
      err=>{
        console.error(err)
      }
      
     )

     this.MensajeDeModificado()
 
 }

MensajeDeGuardado(){
  Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: 'Usuario Creado con Exito',
    showConfirmButton: false,
    timer: 1500
  })
}

MensajeDeModificado(){
  Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: 'Usuario Modificado con Exito',
    showConfirmButton: false,
    timer: 1500
  })
}

MensajeDeError(){
  Swal.fire({
    icon: 'error',
    title: 'Error',
    text: 'Complete todos los campos de Usuario',

  })
}

// navegador de url
VolverListaUsuarios(){
  this.router.navigate(['principal/usuario'])
}
}

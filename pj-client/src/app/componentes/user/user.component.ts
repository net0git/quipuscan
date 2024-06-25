import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/servicios/usuario/usuario.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit{
  

usuariodetalleAux=[];//concervamos los datos originales para restablecer el que usuaria la tabla 

usuariosdetalle:any=[]//datos que usuara la tabla 

objetosFiltrados:any=[];



  buscarEnObjeto(event: any) {
    const textoBusqueda = event.target.value.toLowerCase();
    
    // Filtrar los objetos según el texto de búsqueda
    this.objetosFiltrados = this.usuariodetalleAux.filter((objeto: 
      { tipo_doc: string; 
        nombre: string;
        ap_paterno: string;
        ap_materno: string;
        nombre_usuario: string;
        correo: string;
        perfil: string;
        estado: string;
       }) => {
      const tipo_doc = objeto.tipo_doc.toLowerCase();
      const nombre = objeto.nombre.toLowerCase();
      const ap_paterno = objeto.ap_paterno.toLowerCase();
      const ap_materno = objeto.ap_materno.toLowerCase();
      const nombre_usuario = objeto.nombre_usuario.toLowerCase();
      const correo = objeto.correo.toLowerCase();
      const rol = objeto.perfil.toLowerCase();
      const estado = objeto.estado.toLowerCase();
      
      return tipo_doc.includes(textoBusqueda) || nombre.includes(textoBusqueda)|| ap_paterno.includes(textoBusqueda) ||ap_materno.includes(textoBusqueda) || nombre_usuario.includes(textoBusqueda)|| correo.includes(textoBusqueda)|| rol.includes(textoBusqueda)|| estado.includes(textoBusqueda);
    });

    this.usuariosdetalle=this.objetosFiltrados
  }

constructor(private usuarioService:UsuarioService, private router:Router){}
ngOnInit(): void {
  this.ObtenerListaUsuarios();
}





ObtenerListaUsuarios(){
  this.usuarioService.listarUsuarioDetalle().subscribe(
    res=>{
        this.usuariosdetalle=res;
        this.usuariodetalleAux=this.usuariosdetalle;
      
    },
    err=>{
        console.error(err)
    }
  )
}


AgregarUsuario(){
   this.router.navigate(['/principal/usuario/crear'])
}

ModificarUsuario(id:number){
  this.router.navigate(['principal/usuario/modificar/',id]);
}

VolverMuenu(){
  this.router.navigate(['/principal'])
}



}

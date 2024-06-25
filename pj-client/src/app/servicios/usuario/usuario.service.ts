import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { AppConfiguration } from "read-appsettings-json";

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  api_uri_usuario='http://'+AppConfiguration.Setting().ipClient+':3000/api/usuario'; ///api/usuario
  // api_uri_usuario='http://localhost:3000/api/usuario'; ///api/usuario

  constructor( private http:HttpClient) { }

  //obtiene los datos de un usuario buscado por su id 
  ObtenerUsuario(id:number){
    return this.http.get(this.api_uri_usuario+'/'+id);
  }
 
  //obrener los detalles de un solo usuairo buscado por su nombre_usuario
  ObtenerDetalleUsuarioPorNombre(nombre_usuario:string){
     return this.http.get(this.api_uri_usuario+'/detalle/'+nombre_usuario)
  }

  //modifica solo los datos de la tabla usuario considerar en el body solo nombre_usuario, rol, estado
  ModificarUsuarioDatos(id:number,body:any){
    return this.http.put(this.api_uri_usuario+'/modificar/datos/'+id,body);
  }

  //modificar password de usuario considerar en el body solo el password que deseamos cambiar
  ModificarUsuarioPassword(id:number,body:any){
    return this.http.put(this.api_uri_usuario+'/modificar/password/'+id,body)
  }

  //lista los usuarios incluidos sus datos personales
  listarUsuarioDetalle(){
    return this.http.get(this.api_uri_usuario+'/detalle');
  }

  
  
  //creamos un usuario nuevo
  CrearUsuario(body:any){
    return this.http.post(this.api_uri_usuario+'/register',body);
  }
}

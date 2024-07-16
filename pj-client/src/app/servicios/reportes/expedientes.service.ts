import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { AppConfiguration } from "read-appsettings-json";

@Injectable({
  providedIn: 'root'
})

export class ExpedientesService {
  api_uri_reportes='http://'+AppConfiguration.Setting().ipClient+':3000/api/reportes'; ///api/usuario
  // api_uri_usuario='http://localhost:3000/api/usuario'; ///api/usuario

  constructor( private http:HttpClient) { }

  //obtiene los datos de un usuario buscado por su id 
  ObtenerExpedientesDetalle(id_inventario:number){
    return this.http.get(this.api_uri_reportes+'/expedientes/'+id_inventario);
  }
 
  
  }

  



import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfiguration } from "read-appsettings-json";

@Injectable({
  providedIn: 'root'
})
export class ParteService {
//import { AppConfiguration } from "read-appsettings-json";
api_uri_parte='http://'+AppConfiguration.Setting().ipClient+':3000/api/parte';
  //api_uri_parte='http://localhost:3000/api/parte';

  constructor(private http:HttpClient) { }

  listarPartesDetalleXidExpediente(id_expediente:number){
   // /api/parte/listaporexpediente/:id_expediente'
    return this.http.get(this.api_uri_parte+'/listaporexpediente/'+id_expediente)
  }

  obtenerParteXid(id_parte:number){
    return this.http.get(this.api_uri_parte+'/'+id_parte)
  }

  crearParte(body:any){
    return this.http.post(this.api_uri_parte,body)
  }

  eliminarParte(id_parte:number){
    return this.http.delete(this.api_uri_parte+'/'+id_parte)
  }
}

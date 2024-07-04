import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfiguration } from "read-appsettings-json";

@Injectable({
  providedIn: 'root'
})
export class DigitalizacionService {
  //import { AppConfiguration } from "read-appsettings-json";
  api_uri_digitalizacion='http://'+AppConfiguration.Setting().ipClient+':3000/api/digitalizacion';
  //api_uri_digitalizacion='http://localhost:3000/api/digitalizacion';

  constructor(private http:HttpClient) { }

  listaDigitalizacionXidExpediente(id_expediente:number){
    return this.http.get(this.api_uri_digitalizacion+'/poridexpediente/'+id_expediente)
  }

  obtenerDigitalizacionXid(id_digitalizacion:number){
    return this.http.get(this.api_uri_digitalizacion+'/'+id_digitalizacion)
  }

  crearDigitalizacion(body:any){
    return this.http.post(this.api_uri_digitalizacion,body)
  }

  obtenerDocumentoXidExpediente(id_expediente:number){
    return this.http.get(this.api_uri_digitalizacion+'/documento/'+id_expediente)
  }

  modificarDocumentoId(body:any,id_digitalizacion:number){
    return this.http.put(this.api_uri_digitalizacion+'/modificar/documento/'+id_digitalizacion,body)
  }

  modificarDigitalizado(body:any,id_digitalizacion:number){
    return this.http.put(this.api_uri_digitalizacion+'/modificar/'+id_digitalizacion,body)
  }
 
}

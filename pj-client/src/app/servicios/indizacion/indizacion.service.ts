import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfiguration } from "read-appsettings-json";

@Injectable({
  providedIn: 'root'
})
export class IndizacionService {
///api/indizacion/detalleporexpediente/id_expediente
  api_uri_indizaicon='http://'+AppConfiguration.Setting().ipClient+':3000/api/indizacion';
  constructor(private http:HttpClient) { }

  indizacionDetalleXidExpediente(id_expediente:number){
        return this.http.get(this.api_uri_indizaicon+'/detalleporexpediente/'+id_expediente)
  }

  crearIndizacion(body:any){
        return this.http.post(this.api_uri_indizaicon,body)
  }

  modificarIndizacion(body:any,id_indizacion:number){
        return this.http.put(this.api_uri_indizaicon+'/'+id_indizacion,body)
  }
}

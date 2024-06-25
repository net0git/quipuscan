import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfiguration } from "read-appsettings-json";

@Injectable({
  providedIn: 'root'
})
export class ControlCalidadService {
///api/controlcalidad
  api_uri_control_calidad='http://'+AppConfiguration.Setting().ipClient+':3000/api/controlcalidad';
  constructor(private http:HttpClient) { }

  obternerControlCaliadXidExpediente(id_expediente:number){
    return this.http.get(this.api_uri_control_calidad+'/'+id_expediente)
  }
  
  crearControlCalidad(body:any){
    return this.http.post(this.api_uri_control_calidad,body)
  }

  // obtenerDocumentoXidExpediente(id_expediente:number){
  //   return this.http.get(this.api_uri_digitalizacion+'/documento/'+id_expediente)
  // }
}

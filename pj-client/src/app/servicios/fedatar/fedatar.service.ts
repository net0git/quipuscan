import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfiguration } from "read-appsettings-json";

@Injectable({
  providedIn: 'root'
})
export class FedatarService {

  api_uri_fedatar='http://'+AppConfiguration.Setting().ipClient+':3000/api/fedatar';
  constructor(private http:HttpClient) { }
  ///api/fedatar/detalle/expediente/:nombre_expediente

  crearFedatar(body:any){
    return this.http.post(this.api_uri_fedatar,body)
  }

  OptenerExpedienteDetalle(id_expediente:number){
    return this.http.get(this.api_uri_fedatar+'/detalle/expediente/'+id_expediente)
  }

  OptenerFedatadoEstadoXidExpediente(id_expediente:number){
    return this.http.get(this.api_uri_fedatar+'/estado/'+id_expediente)
  }

  OptenerResponsablesXidExpediente(id_expediente:number){
    return this.http.get(this.api_uri_fedatar+'/responsables/'+id_expediente)
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfiguration } from "read-appsettings-json";

@Injectable({
  providedIn: 'root'
})
export class ResolucionService {

  api_url_resolucion='http://'+AppConfiguration.Setting().ipClient+':3000/api/resolucion';
  //  api_url_resolucion='http://localhost:3000/api/resolucion';

  constructor(private http:HttpClient ) { }

  //obtener resolucion por id
  ObtenerResolucion(id:number){
    return this.http.get(this.api_url_resolucion+'/'+id);
  }
  //obtener resolucion por numero y año
  ObtenerResolucionPorNroAnio(nro_resolucion:number,anio_resolucion:string){
   return this.http.get(this.api_url_resolucion+'/detalle/'+nro_resolucion+'/'+anio_resolucion)
  }

  CrearResolucion(body:any){
    return this.http.post(this.api_url_resolucion,body)
  }

  ModificarResolucion(id:number, body:any){
    return this.http.put(this.api_url_resolucion+'/'+id,body)
  }
}

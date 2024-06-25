import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfiguration } from "read-appsettings-json";

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  url_api_personas='http://'+AppConfiguration.Setting().ipClient+':3000/api/persona';
  //  url_api_personas='http://localhost:3000/api/persona';
  constructor(private http:HttpClient) { }


  ObtenerPersona(id:number){
    return this.http.get(this.url_api_personas+'/'+id)
  }
  ModificarPersona(id:number,cuerpo:any){
    return this.http.put(this.url_api_personas+'/'+id,cuerpo)
  }
  CrearPersona(cuerpo:any){
    return this.http.post(this.url_api_personas,cuerpo)
  }
  //elimiar persona
  EliminarPersona(id:number){
    return this.http.delete(this.url_api_personas+'/'+id)
  }
}

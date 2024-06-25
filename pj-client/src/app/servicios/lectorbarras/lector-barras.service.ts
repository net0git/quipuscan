import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class LectorBarrasService {

  constructor(private http:HttpClient) { }

  api_uri_parte='http://172.17.66.220:8081/api/v1/getnumeroexpediente?codbarra=';

  obtener_nombreExpediente(codigo:number){
      return this.http.get(this.api_uri_parte+codigo)
  }
}

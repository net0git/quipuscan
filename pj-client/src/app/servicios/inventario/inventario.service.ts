import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfiguration } from "read-appsettings-json";
@Injectable({
  providedIn: 'root'
})
export class InventarioService {
//import { AppConfiguration } from "read-appsettings-json";
api_uri_inventario='http://'+AppConfiguration.Setting().ipClient+':3000/api/inventario';
  
  //api_uri_inventario='http://localhost:3000/api/inventario';

  constructor(private http:HttpClient) { }

  listaInventarios(){
    return this.http.get(this.api_uri_inventario)
  }
 //devuelve la lista detallada junto con el nombre de usuario el nombre de la persona asociada
  listaDetalladaInventarios(){
    return this.http.get(this.api_uri_inventario+'/listadetallada')
  }

  guardarInventario(body:any){
    return this.http.post(this.api_uri_inventario,body)
  }


  obtenerDetalleInventario(id_inventario:number){
    ///api/inventario/detalle/:id
    return this.http.get(this.api_uri_inventario+'/detalle/'+id_inventario)
  }

    
  modificarEstadoInventario(body:any,id_inventario:number){
    ///api/inventario/modificarestado
    return this.http.put(this.api_uri_inventario+'/modificarestado/'+id_inventario,body)
  }
}

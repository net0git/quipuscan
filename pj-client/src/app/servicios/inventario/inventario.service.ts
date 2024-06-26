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

//obtiene un invenario mas detallado
  obtenerDetalleInventario(id_inventario:number){
    return this.http.get(this.api_uri_inventario+'/detalle/'+id_inventario)
  }
//obtener un inventario basico 
  obtenerInventarioGeneral(id_inventario:number){
    return this.http.get(this.api_uri_inventario+'/general/'+id_inventario)
  }

    
  modificarEstadoInventario(body:any,id_inventario:number){
    return this.http.put(this.api_uri_inventario+'/modificarestado/'+id_inventario,body)
  }
  modificarCantidadInventario(body:any,id_inventario:number){
    return this.http.put(this.api_uri_inventario+'/modificarcantidad/'+id_inventario,body)
  }

  modificarCuerpoInventario(body:any, id_inventario:number){
    return this.http.put(this.api_uri_inventario+'/modificarcuerpo/'+id_inventario,body)
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfiguration } from "read-appsettings-json";
@Injectable({
  providedIn: 'root'
})
export class ExpedienteService {
//import { AppConfiguration } from "read-appsettings-json";
api_uri_expediente='http://'+AppConfiguration.Setting().ipClient+':3000/api/expediente';
//  api_uri_expediente='http://localhost:3000/api/expediente';

  constructor(private http:HttpClient) { }

  listaExpedientesXinventario(id_inventario:number){
///api/expediente/listaporinventario/:id_inventario
    return this.http.get(this.api_uri_expediente+'/listaporinventario/'+id_inventario)
  }
 //devuelve la lista detallada junto con el nombre de usuario el nombre de la persona asociada
  listaDetalladaExpedientes(){
    return this.http.get(this.api_uri_expediente+'/listadetallada')
  }

  obtenerExpedienteDetalle(id_expediente:number){
    return this.http.get(this.api_uri_expediente+'/'+id_expediente)
  }
  //guardar el expediente con los datos necesarios en la caja de inventario 
  guardarExpedienteInventario(body:any){
    return this.http.post(this.api_uri_expediente,body)
  }

  //modificar expediente
  modificarExpediente(body:any,id_expediente:number){
    return this.http.put(this.api_uri_expediente+'/'+id_expediente,body)
  }

  eliminarExpediente(id_expedietne:number){
    return this.http.delete(this.api_uri_expediente+'/'+id_expedietne)
  }


  //MODIFICAR ESTADOS DE EXPEDIENTE
  //estado_preparado
  modificarEstadoPreparado(body:any,id_expediente:number){
    return this.http.put(this.api_uri_expediente+'/estado_preparado/'+id_expediente,body)
  }

 //estado_digitalizado
 modificarEstadoDigitalizado(body:any,id_expediente:number){
  return this.http.put(this.api_uri_expediente+'/estado_digitalizado/'+id_expediente,body)
}
 
  //estado_indizado
  modificarEstadoIndizado(body:any,id_expediente:number){
    return this.http.put(this.api_uri_expediente+'/estado_indizado/'+id_expediente,body)
  }

  //estado_controlado
  modificarEstadoControlado(body:any,id_expediente:number){
    return this.http.put(this.api_uri_expediente+'/estado_controlado/'+id_expediente,body)
  }
  
  //estado_fedatario
  modificarEstadoFedatario(body:any,id_expediente:number){
    return this.http.put(this.api_uri_expediente+'/estado_fedatado/'+id_expediente,body)
  }


  ///api/expediente/limpiar
  limpiarProcesoExpediente(id_expediente:number){
    ///api/expediente/listaporinventario/:id_inventario
        return this.http.get(this.api_uri_expediente+'/limpiar/'+id_expediente)
      }
}

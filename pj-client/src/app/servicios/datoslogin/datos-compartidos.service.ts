import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatosCompartidosService {

  private _credentials: any = {
    id_usuario:0,
    nombre_usuario: '',
    password: '',
    perfil:'',
  };

  

  constructor() { }

  get credentials(): any {
    return this._credentials;
  }

  set credentials(value: any) {
    this._credentials = value;
  }
}

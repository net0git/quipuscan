import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatosCompartidosService } from '../datoslogin/datos-compartidos.service';
 import { AppConfiguration } from "read-appsettings-json";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;
  url_api_login='http://'+AppConfiguration.Setting().ipClient+':3000/api/usuario/login';
  

  constructor(private http: HttpClient, private datosCompartidosService:DatosCompartidosService) { }

  async authenticate(credentials: any): Promise<any> {
    try {
      const response = await this.http.post<any>(this.url_api_login, credentials).toPromise();
      return response; // Debe contener al menos un campo "text" y "id_usuario" que indique si la autenticación fue exitosa
    } catch (error) {
      throw error;
    }
  }

  async login(credenciales:any): Promise<boolean> {
    // Realiza la lógica de autenticación aquí, como verificar las credenciales con un servidor.
    // Si la autenticación es exitosa, establece isAuthenticated en true.
    const response = await this.http.post<any>(this.url_api_login, credenciales).toPromise();
    if(response.text==='true'){
      this.datosCompartidosService.credentials.id_usuario=response.id_usuario;
      this.datosCompartidosService.credentials.perfil=response.perfil
      this.isAuthenticated = true;
      return true;
    }
    else{
      return false;
    }
    
  }

  logout(): void {
    // Cierra la sesión del usuario
    this.isAuthenticated = false;
  }

  isAuthenticatedUser(): boolean {
    return this.isAuthenticated;
  }
}




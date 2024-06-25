import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from 'src/app/servicios/autentificacion/auth.service';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router, private activateRoute:ActivatedRoute) {}
  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    

    // Aquí puedes utilizar los datos compartidos desde el servicio como necesites.
    

    
    try {

      // Llamada a tu servicio de autenticación personalizado que verifica en el servidor
      const authResponse = this.authService.isAuthenticatedUser();      
      
      if (authResponse) {
      console.log() 
      return true; // Permitir acceso a la ruta protegida
      } else {
        this.router.navigate(['/login']); // Redirigir al inicio de sesión en caso de fallo de autenticación
        return false; // Denegar acceso
      }
     
    } catch (error) {
      console.error('Error en la autenticación:', error);
      this.router.navigate(['/login']); // Manejar errores de autenticación
      return false; // Denegar acceso
    }
  }
  
}

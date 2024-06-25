import { Component} from '@angular/core';
import { DatosCompartidosService } from 'src/app/servicios/datoslogin/datos-compartidos.service';
import { AuthService } from 'src/app/servicios/autentificacion/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navegador',
  templateUrl: './navegador.component.html',
  styleUrls: ['./navegador.component.css']
})
export class NavegadorComponent {
  constructor(private datosCompartidosService: DatosCompartidosService, private authService:AuthService, private router:Router){}
  credenciales=this.datosCompartidosService.credentials

 

  //alerta de mensaje antes de salir de la aplicacion
  confirmarSalida() {
    Swal.fire({
      title: '¿Desea salir del sistema?',
      text: 'Se cerrará la sesión actual.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, salir',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // Realiza la acción para salir del sistema, por ejemplo, redirección o cierre de sesión
        console.log('Saliendo del sistema...');
        this.authService.logout();
        this.router.navigate(['/login'])
      }
    });
  }
}

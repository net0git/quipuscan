import { Component, OnInit ,EventEmitter ,Output,Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/autentificacion/auth.service';
import { DatosCompartidosService } from 'src/app/servicios/datoslogin/datos-compartidos.service';

import { AppConfiguration } from "read-appsettings-json";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  @Output() loggedIn = new EventEmitter<boolean>();
  credentials: any = {
    nombre_usuario: '',
    password: '',
  };
  imagePaths: string[] = [
    '/assets/imagenes/portada_login/portada_login1.jpg',
    '/assets/imagenes/portada_login/portada_login2.jpg',
    '/assets/imagenes/portada_login/portada_login3.jpg',
    '/assets/imagenes/portada_login/portada_login4.jpg',
    
    // Agrega más rutas de imágenes según sea necesario
  ];


  


  constructor(private authService: AuthService, private router: Router,private datosCompartidosService: DatosCompartidosService,private renderer: Renderer2) { }

  ngOnInit(): void {
    this.preloadImages(this.imagePaths);
    this.changeBackgroundImage();
    console.log(AppConfiguration.Setting().ipClient)
  }
  async login() {
    // console.log(this.credentials)
    try {
      const authResponse = await this.authService.login(this.credentials); //el valor que devuelve login es verdadero o falso
          this.datosCompartidosService.credentials.nombre_usuario=this.credentials.nombre_usuario;//pasamos los valosres del usuairo a datos compartidos
          this.datosCompartidosService.credentials.password=this.credentials.password; //pasamos los valores a datos compartidos
        

      if (authResponse) {
        console.log('se logueo corectamente:'+this.authService.isAuthenticatedUser())
        this.router.navigate(['principal']);
      } else {
        alert('Credenciales incorrectas');
        console.log('estamos dentro del else de login:')
      }
    } catch (error) {
      console.error(error);
      alert('Error al intentar autenticar');
    }
   }
   getRandomImageIndex(): number {
    return Math.floor(Math.random() * this.imagePaths.length);
  }
   changeBackgroundImage(): void {
    const backgroundContainer = document.getElementById('background-container');
    const randomImageIndex = this.getRandomImageIndex();
    const randomImagePath = this.imagePaths[randomImageIndex];
    if (backgroundContainer) {
      backgroundContainer.style.backgroundImage = `url(${randomImagePath})`;
    }
  }
  preloadImages(imageSrcList: string[]): void {
    imageSrcList.forEach(src => {
      const img = this.renderer.createElement('img');
      this.renderer.setAttribute(img, 'src', src);
      this.renderer.setStyle(img, 'display', 'none');
      this.renderer.appendChild(document.body, img);
    });
  }
}

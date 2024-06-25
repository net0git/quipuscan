import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './componentes/login/login.component';
import { NavegadorComponent } from './componentes/navegador/navegador.component';
import { UserComponent } from './componentes/user/user.component';
import { UserformComponent } from './componentes/userform/userform.component';

import {HttpClientModule} from '@angular/common/http';
import { AuthService } from './servicios/autentificacion/auth.service';
import { FormsModule } from '@angular/forms';
import { PrincipalComponent } from './componentes/principal/principal.component';
import { CreateUserComponent } from './componentes/create-user/create-user.component';
import { ResolucionFormComponent } from './componentes/resolucion-form/resolucion-form.component';
import { ResolucionesComponent } from './componentes/resoluciones/resoluciones.component';


import { InventarioFormComponent } from './componentes/inventario-form/inventario-form.component';
import { ExpedientesInventarioComponent } from './componentes/expedientes-inventario/expedientes-inventario.component';
import { PreparacionDocumentosComponent } from './componentes/preparacion-documentos/preparacion-documentos.component';
import { PreparacionExpedientesInventarioComponent } from './componentes/preparacion-expedientes-inventario/preparacion-expedientes-inventario.component';
import { PreparacionExpedientesFormularioComponent } from './componentes/preparacion-expedientes-formulario/preparacion-expedientes-formulario.component';
import { DigitalizacionExpedientesComponent } from './componentes/digitalizacion-expedientes/digitalizacion-expedientes.component';
import { DigitalizacionExpedientesComparacionComponent } from './componentes/digitalizacion-expedientes-comparacion/digitalizacion-expedientes-comparacion.component';
import { ControlCalidadComponent } from './componentes/control-calidad/control-calidad.component';
import { ControlCalidadExpedienteComponent } from './componentes/control-calidad-expediente/control-calidad-expediente.component';
import { IndizadorComponent } from './componentes/indizador/indizador.component';
import { IndizadorExpedienteComponent } from './componentes/indizador-expediente/indizador-expediente.component';
import { IndizadorExpedienteFormComponent } from './componentes/indizador-expediente-form/indizador-expediente-form.component';
import { InventarioComponent } from './componentes/inventario/inventario.component';
import { FedatarioComponent } from './componentes/fedatario/fedatario.component';
import { FedatarioExpedientesComponent } from './componentes/fedatario-expedientes/fedatario-expedientes.component';
import { FedatarioExpedientesFormComponent } from './componentes/fedatario-expedientes-form/fedatario-expedientes-form.component';










@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavegadorComponent,
    UserComponent,
    UserformComponent,
    PrincipalComponent,
 
    CreateUserComponent,
   
    ResolucionFormComponent,
  
    ResolucionesComponent,

  
    InventarioFormComponent,
    ExpedientesInventarioComponent,
    PreparacionDocumentosComponent,
    PreparacionExpedientesInventarioComponent,
    PreparacionExpedientesFormularioComponent,
    DigitalizacionExpedientesComponent,
    DigitalizacionExpedientesComparacionComponent,
    ControlCalidadComponent,
    ControlCalidadExpedienteComponent,
    IndizadorComponent,
    IndizadorExpedienteComponent,
    IndizadorExpedienteFormComponent,
    InventarioComponent,
    FedatarioComponent,
    FedatarioExpedientesComponent,
    FedatarioExpedientesFormComponent,

 
    

  
  ],
  imports: [
    
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  
    
   
  ],
  providers: [
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

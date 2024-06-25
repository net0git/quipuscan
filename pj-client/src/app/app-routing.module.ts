import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { AuthGuard } from './Guardian/auth.guard';
import { PrincipalComponent } from './componentes/principal/principal.component';
import { UserformComponent } from './componentes/userform/userform.component';

import { UserComponent } from './componentes/user/user.component';
import { CreateUserComponent } from './componentes/create-user/create-user.component';




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


const routes: Routes = [
  {
    path:'',
    redirectTo:'/login',
    pathMatch:'full'
  },
  { path:'login', component: LoginComponent},
  { path:'principal', component: PrincipalComponent ,canActivate: [AuthGuard]},
  { path:'principal/inventario',component:InventarioComponent ,canActivate: [AuthGuard]},
  { path:'principal/inventario/inventarioform',component:InventarioFormComponent ,canActivate: [AuthGuard]},
  { path:'principal/inventario/expedientesinventario/:id_inventario',component:ExpedientesInventarioComponent ,canActivate: [AuthGuard]},
  { path:'principal/preparaciondocumentos',component:PreparacionDocumentosComponent ,canActivate: [AuthGuard]},
  { path:'principal/preparaciondocumentos/preparacionexpedientesinventario/:id_inventario',component:PreparacionExpedientesInventarioComponent ,canActivate: [AuthGuard]},
  { path:'principal/preparaciondocumentos/preparacionexpedientesinventario/formulario/:id_expediente', component:PreparacionExpedientesFormularioComponent ,canActivate: [AuthGuard]},
  { path:'principal/digitalizacion',component: DigitalizacionExpedientesComponent ,canActivate: [AuthGuard]},
  { path:'principal/digitalizacion/expedientespreparados/:id_inventario',component:DigitalizacionExpedientesComparacionComponent ,canActivate: [AuthGuard]},
  { path:'principal/controlcalidad',component:ControlCalidadComponent ,canActivate: [AuthGuard]},
  { path:'principal/controlcalidad/expedientres/:id_inventario',component:ControlCalidadExpedienteComponent ,canActivate: [AuthGuard]},
  { path:'principal/indizador',component:IndizadorComponent ,canActivate: [AuthGuard]},
  { path:'principal/indizador/expedientes/:id_inventario',component:IndizadorExpedienteComponent ,canActivate: [AuthGuard]},
  { path:'principal/indizador/expedientes/formulario/:id_expediente',component:IndizadorExpedienteFormComponent ,canActivate: [AuthGuard]},
  { path:'principal/fedatario',component:FedatarioComponent ,canActivate: [AuthGuard]},
  { path:'principal/fedatario/expedientes/:id_inventario',component:FedatarioExpedientesComponent ,canActivate: [AuthGuard]},
  { path:'principal/fedatario/expedientes/form/:id_expediente',component:FedatarioExpedientesFormComponent ,canActivate: [AuthGuard]},

  { path:'principal/usuario', component: UserComponent ,canActivate: [AuthGuard] },
  { path:'principal/usuario/crear', component:CreateUserComponent ,canActivate: [AuthGuard] },
  { path:'principal/usuario/modificar/:id',component:CreateUserComponent ,canActivate: [AuthGuard] },
  { path:'principal/usuarioform/:id', component:UserformComponent  ,canActivate: [AuthGuard]},

  
  { path:'principal/resoluciones', component:ResolucionesComponent},
 
  { path: '**', redirectTo: '/login' } // Ruta de comodín para URLs desconocidas
];

// const routes: Routes = [
//   {
//     path:'',
//     redirectTo:'/login',
//     pathMatch:'full'
//   },
//   { path:'login', component: LoginComponent},
//   { path:'principal', component: PrincipalComponent },
//   { path:'principal/inventario',component:InventarioComponent},
//   { path:'principal/inventario/inventarioform',component:InventarioFormComponent},
//   { path:'principal/inventario/expedientesinventario/:id_inventario',component:ExpedientesInventarioComponent},
//   { path:'principal/preparaciondocumentos',component:PreparacionDocumentosComponent},
//   { path:'principal/preparaciondocumentos/preparacionexpedientesinventario/:id_inventario',component:PreparacionExpedientesInventarioComponent},
//   { path:'principal/preparaciondocumentos/preparacionexpedientesinventario/formulario/:id_expediente', component:PreparacionExpedientesFormularioComponent},
//   { path:'principal/digitalizacion',component: DigitalizacionExpedientesComponent},
//   { path:'principal/digitalizacion/expedientespreparados/:id_inventario',component:DigitalizacionExpedientesComparacionComponent},
//   { path:'principal/controlcalidad',component:ControlCalidadComponent},
//   { path:'principal/controlcalidad/expedientres/:id_inventario',component:ControlCalidadExpedienteComponent},
//   { path:'principal/indizador',component:IndizadorComponent},
//   { path:'principal/indizador/expedientes/:id_inventario',component:IndizadorExpedienteComponent},
//   { path:'principal/indizador/expedientes/formulario/:id_expediente',component:IndizadorExpedienteFormComponent},
//   { path:'principal/fedatario',component:FedatarioComponent},
//   { path:'principal/fedatario/expedientes/:id_inventario',component:FedatarioExpedientesComponent},
//   { path:'principal/fedatario/expedientes/form/:id_expediente',component:FedatarioExpedientesFormComponent},

//   { path:'principal/usuario', component: UserComponent },
//   { path:'principal/usuario/crear', component:CreateUserComponent },
//   { path:'principal/usuario/modificar/:id',component:CreateUserComponent },
//   { path:'principal/usuarioform/:id', component:UserformComponent },

  
//   { path:'principal/resoluciones', component:ResolucionesComponent},
 
//   { path: '**', redirectTo: '/login' } // Ruta de comodín para URLs desconocidas
// ];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DatosCompartidosService } from 'src/app/servicios/datoslogin/datos-compartidos.service';
import { InventarioService } from 'src/app/servicios/inventario/inventario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inventario-form',
  templateUrl: './inventario-form.component.html',
  styleUrls: ['./inventario-form.component.css']
})
export class InventarioFormComponent {


  constructor(private router:Router, private datoslogin:DatosCompartidosService, private inventarioService:InventarioService){}
    data_inventario:any={
        especialidad_inventario:'',
        anio:null,
        cantidad:null,
        tipo_doc:'',
        serie_doc:null,
        id_supervisor:this.datoslogin.credentials.id_usuario,
        contador:0
  }

  guardarInventario(){
    console.log(this.data_inventario)
    this.inventarioService.guardarInventario(this.data_inventario).subscribe(
      res=>{
        console.log(res)
        this.MensajeDeGuardado()
      },
      err=>{
        console.error(err)
      }
    )
  }

  MensajeDeGuardado(){
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Inventario Creado con Exito',
      showConfirmButton: false,
      timer: 1500
    })
    this.Volver()
  }
  Volver(){
    this.router.navigate(['/principal/inventario'])
  }



}


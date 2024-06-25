import { Component, OnInit } from '@angular/core';
import { Router ,ActivatedRoute} from '@angular/router';
import { ExpedienteService } from 'src/app/servicios/expediente/expediente.service';
import { ParteService } from 'src/app/servicios/parte/parte.service';
import { DatosCompartidosService } from 'src/app/servicios/datoslogin/datos-compartidos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-preparacion-expedientes-formulario',
  templateUrl: './preparacion-expedientes-formulario.component.html',
  styleUrls: ['./preparacion-expedientes-formulario.component.css']
})
export class PreparacionExpedientesFormularioComponent implements OnInit {

  constructor(private activatedRoute:ActivatedRoute,private router:Router, private expedienteService:ExpedienteService, private parteService:ParteService, private datosCompartidosService:DatosCompartidosService ){}

  detalleExpediente:any=[]//contempla todos los detalles que corresponde al expediente de presentación 

  data_expediente:any={
    
      id_inventario: null,
      id_responsable: null,
      nombre_expediente: null,
      fojas: null,
      fojas_unacara: null,
      fojas_doscaras: null,
      fojas_obs: null,
      copias_originales: null,
      copias_simples: null,
      observaciones: null,
      lote: null,
      estado_preparado:true,
      estado_digitalizado: null,
      estado_indizado: null,
      estado_controlado: null,
      estado_fedatado:null  
  }

  listaTempDemanantes:any=[]//lista temporal de demandantes
  listaTempDemandados:any=[]// lista temporal de demandador

  TempDemandante:any={
    id_expediente:null,
    nombre_parte:'',
    ap_parte:'',
    am_parte:'',
    dni:'',
    tipo_parte:'DEMANDANTE'

  }
  TempDemandado:any={
    id_expediente:null,
    nombre_parte:'',
    ap_parte:'',
    am_parte:'',
    dni:'',
    tipo_parte:'DEMANDADO'
  }


  ngOnInit(): void {
    const params=this.activatedRoute.snapshot.params

    console.log(params['id_expediente'])

    this.expedienteService.obtenerExpedienteDetalle(params['id_expediente']).subscribe(
        res=>{
           this.detalleExpediente=res
            this.detalleExpediente=this.detalleExpediente[0]
           console.log(this.detalleExpediente)
           this.data_expediente.id_inventario= this.detalleExpediente.id_inventario
           this.data_expediente.id_responsable= this.datosCompartidosService.credentials.id_usuario
           this.data_expediente.nombre_expediente= this.detalleExpediente.nombre_expediente
        },
        err=>{
          console.error(err)
        }   
       )
  }

  limpiarCamposDemandante(){
   
  (<HTMLInputElement>document.getElementById('demandante_nombre')).value='';
  (<HTMLInputElement>document.getElementById('demandante_ap')).value='';
  (<HTMLInputElement>document.getElementById('demandante_am')).value='';
  (<HTMLInputElement>document.getElementById('demandante_dni')).value='';
  }
  limpiarCamposDemandado(){
   
    (<HTMLInputElement>document.getElementById('demandado_nombre')).value='';
    (<HTMLInputElement>document.getElementById('demandado_ap')).value='';
    (<HTMLInputElement>document.getElementById('demandado_am')).value='';
    (<HTMLInputElement>document.getElementById('demandado_dni')).value='';
  }
  enviarTablaDemandantes(){
    const params=this.activatedRoute.snapshot.params
    let  dato_demandante:any={}
    dato_demandante.id_expediente = Number(params['id_expediente']);
    dato_demandante.nombre_parte=(<HTMLInputElement>document.getElementById('demandante_nombre')).value;
    dato_demandante.ap_parte=(<HTMLInputElement>document.getElementById('demandante_ap')).value;
    dato_demandante.am_parte=(<HTMLInputElement>document.getElementById('demandante_am')).value;
    dato_demandante.dni=(<HTMLInputElement>document.getElementById('demandante_dni')).value;
    dato_demandante.tipo_parte='DEMANDANTE'


        if (!dato_demandante.id_expediente || !dato_demandante.nombre_parte || !dato_demandante.ap_parte || !dato_demandante.am_parte || !dato_demandante.dni) {
          alert('Por favor, complete todos los campos antes de continuar.');
        } else {
          this.listaTempDemanantes.push(dato_demandante);
          this.limpiarCamposDemandante();
        }

  }
  enviarTablaDemandados(){
    const params=this.activatedRoute.snapshot.params
    let  dato_demandado:any={}
    dato_demandado.id_expediente = Number(params['id_expediente']);
    dato_demandado.nombre_parte=(<HTMLInputElement>document.getElementById('demandado_nombre')).value;
    dato_demandado.ap_parte=(<HTMLInputElement>document.getElementById('demandado_ap')).value;
    dato_demandado.am_parte=(<HTMLInputElement>document.getElementById('demandado_am')).value;
    dato_demandado.dni=(<HTMLInputElement>document.getElementById('demandado_dni')).value;
    dato_demandado.tipo_parte='DEMANDADO'

    

     if (!dato_demandado.id_expediente || !dato_demandado.nombre_parte || !dato_demandado.ap_parte || !dato_demandado.am_parte || !dato_demandado.dni) {
      alert('Por favor, complete todos los campos antes de continuar.');
    } else {
      this.listaTempDemandados.push(dato_demandado)
      this.limpiarCamposDemandado()
    }
    
  }

  guardar(){
    if(this.listaTempDemanantes.length!=0 && this.listaTempDemandados.length!=0 && this.data_expediente.fojas!=null && this.data_expediente.fojas_unacara!=null && this.data_expediente.fojas_doscaras!=null){
      

      this.ModificarEstadoExpediente()
      this.GuardarPartes()
      this.MensajeDeGuardado()
    }
    else{
      alert('campos icompletos')
    }
    
  }

  //en este caso usaremos el modificar ya que el preparado es un agregado al expediente alistado por el supervisor
  ModificarEstadoExpediente(){
    const params=this.activatedRoute.snapshot.params
    const id_expediente=params['id_expediente']
    this.expedienteService.modificarExpediente(this.data_expediente,id_expediente).subscribe(
      res=>{
        console.log(res)
      },
      err=>{
        console.error(err)
      }
    )

  }
  //en este caso si guardaremos la tabla de demandados y demandantes
  GuardarPartes(){
    this.GuardarDemandantes();
    this.GuardarDemandados();
  }
  GuardarDemandantes(){
    for (let element of this.listaTempDemanantes) {
      console.log(element);
        this.parteService.crearParte(element).subscribe(
          res=>{
            console.log(res)
          },
          err=>{
            console.error(err)
          }
        )
    }
  }
  GuardarDemandados(){
    for (let element of this.listaTempDemandados) {
      this.parteService.crearParte(element).subscribe(
        res=>{
          console.log(res)
        },
        err=>{
          console.error(err)
        }
      )
    }
  }
 

  MensajeDeGuardado(){
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'EXPEDIENTE PREPARADO CON EXITO',
      showConfirmButton: false,
      timer: 1500
    })
    this.volver()
  }
  volver(){

     this.router.navigate(['/principal/preparaciondocumentos/preparacionexpedientesinventario/'+this.detalleExpediente.id_inventario])
  }

}

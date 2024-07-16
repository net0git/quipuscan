import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExpedienteService } from 'src/app/servicios/expediente/expediente.service';
import { InventarioService } from 'src/app/servicios/inventario/inventario.service';
import { ExpedientesService as ExpedientesReporteService } from 'src/app/servicios/reportes/expedientes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-expedientes',
  templateUrl: './expedientes.component.html',
  styleUrls: ['./expedientes.component.css']
})
export class ExpedientesComponent implements OnInit{
  habilitarPreparacion=true
  habilitarAgregar=false
  disablePreparador='display: block';
  disableMensajePreparador='display: none'
  
  data_expediente:any={
    id_inventario:null,
    id_responsable:null,
    nombre_expediente:null,
    fojas:null,
    fojas_unacara:null,
    fojas_doscaras:null,
    fojas_obs:null,
    observaciones:null,
    lote:null,
    estado_preparado:null,
    estado_digitalizado:null,
    estado_indizado:null,
    estado_controlado:null,
    estado_fedatado:null
  }
  isLoading: boolean = false;
  expedientesList:any=[]
  expedientesListTemp:any=[]//servira como respaldo para no tener que volver a consulta a la base de datos
  // expedientesPendientes:any=[] 
  // expedientesEmPreparacion:any=[]
  exp_count_pendientes:number=0
  
  p: number = 1;
  
  inventarioDetalle:any=[]
  constructor(private expedientesReporteService:ExpedientesReporteService,private activatedRoute:ActivatedRoute,private router:Router,private expedienteService:ExpedienteService, private inventarioService:InventarioService){}
  expedientetemp:any={}
  async ngOnInit(): Promise<void> {
    try {
      await this.detalleInventario();
      await this.listarTotalExpedientesXidInventario();
    } catch (error) {
      console.error(error);
    }
  }
  
  async detalleInventario(): Promise<void> {
    const params = this.activatedRoute.snapshot.params;
    try {
      const res = await this.inventarioService.obtenerDetalleInventario(params['id_inventario']).toPromise();
      this.inventarioDetalle = res;
      this.inventarioDetalle=this.inventarioDetalle[0]
      if (this.inventarioDetalle.estado_preparado) {
      
        this.disableMensajePreparador = 'display: block';
        console.log(this.inventarioDetalle.id_inventario+'  '+this.inventarioDetalle.estado_preparado)
      }
    } catch (err) {
      console.error(err);
    }
  }
  


  async listarTotalExpedientesXidInventario(): Promise<void> {
    const params = this.activatedRoute.snapshot.params;
    try {
      const res = await this.expedientesReporteService.ObtenerExpedientesDetalle(params['id_inventario']).toPromise();
      this.expedientesList = res;
      this.ordenarExpedientes()
      
      
      this.exp_count_pendientes=0
          this.expedientesList.forEach((expediente: any) => {
              if(expediente.estado_preparado==null){
                 this.exp_count_pendientes=this.exp_count_pendientes+1
                }
              })
        
    } catch (err) {
      console.error(err);
    }
  }

  ordenarExpedientes(): void {
    this.expedientesList.sort((a:any, b:any) => {
      if (a.usuario_responsable_expediente && !b.usuario_responsable_expediente) {
        return -1;
      }
      if (!a.usuario_responsable_expediente && b.usuario_responsable_expediente) {
        return 1;
      }
      return 0;
    });
    this.expedientesListTemp=this.expedientesList; 
  }
  
  listarExpedientesPendientes(){
    this.p=1
    this.expedientesList = this.expedientesListTemp.filter((expediente: any) => {
      return expediente.estado_preparado == null;
      
  });
  }
  restaurarLista(){
    this.expedientesList=this.expedientesListTemp
  }
  
  agregarExpediente(){
    if(this.data_expediente.nombre_expediente==''||this.data_expediente.nombre_expediente==null ){
      alert('por favor complete los campos')
    }
    
    else{
    const expeditenbody=this.data_expediente
    expeditenbody.nombre_expediente= this.data_expediente.nombre_expediente
    expeditenbody.id_inventario=this.inventarioDetalle.id_inventario
    console.log(expeditenbody)
    this.expedienteService.guardarExpedienteInventario(expeditenbody).subscribe(
      res=>{
          console.log(res)
          this.mensajeExpedienteGuardado()
          this.listarTotalExpedientesXidInventario()
          this.limpiarIngreso()
  
      },
      err=>{
        console.error(err)
      }
    )
  }
  }
  exmodificarExpediente(expediente: any) {
    if (expediente.estado_preparado == null) {
      this.modificarExpediente(expediente)
    } else {
      alert('El expediente no puede ser modificado');
    }
  }
  
  exEliminarExpediente(expediente: any) {
    if (expediente.estado_preparado == null) {
      this.mensajePreEliminar(expediente)
    } else {
      alert('El expediente no puede ser eliminado');
    }
  }
  
  modificarEstadoInventario(){
    const params=this.activatedRoute.snapshot.params
    console.log(params['id_inventario'])
    // this.inventarioDetalle.estado_preparado=true
   // this.inventarioService.modificarInventario(this.inventarioDetalle,this.inventarioDetalle)
    this.inventarioService.modificarEstadoInventario({estado_preparado:true},params['id_inventario']).subscribe(
      res=>{
        console.log(res)
      },
      err=>{
        console.error(err)
      }
      
    )
  }
  showAlert() {
    const cantidad_expedientes=this.exp_count_pendientes;
    let timerInterval: any;
    Swal.fire({
      title: 'Auto close alert!',
      html: 'I will close in <b></b> milliseconds.',
      timer: cantidad_expedientes,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
        const timer = Swal.getHtmlContainer()?.querySelector('b');
                this.expedientesList.forEach((expediente: any) => {
            // Realiza la acción que necesites con cada expediente 
                  console.log(expediente);
                  // el expediente pasa a ser falso indicando asi que esta listo para preparacion pero que aun no se ha preparado, 
                  // null: esta en inventario, false: listo para preparacion, cuando este en true significa que ya se ha preparado
                  if(expediente.estado_preparado==null && timer){
                    expediente.estado_preparado=false
                  this.expedienteService.modificarEstadoPreparado(expediente,expediente.id_expediente).subscribe(
                    res=>{
                        console.log(res)
                        this.listarTotalExpedientesXidInventario()
                        timerInterval = setInterval(() => {
                          if (timer) {
                            timer.textContent = `${Swal.getTimerLeft()}`;
                          }
                        }, 100);
                    },
                    err=>{
                        console.error(err)
                
                    }
                  )
                  }
                  
                })
        // timerInterval = setInterval(() => {
        //   if (timer) {
        //     timer.textContent = `${Swal.getTimerLeft()}`;
        //   }
        // }, 100);
      },
      willClose: () => {
        clearInterval(timerInterval);
      }
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log('I was closed by the timer');
      }
    });
  }
  enviarApreparacion(){
    console.log(this.expedientesList.length)
    const cantidad_expedientes=this.exp_count_pendientes;
    this.isLoading = true;
        this.expedientesList.forEach((expediente: any) => {
            // console.log(expediente);
            
            if(expediente.estado_preparado==null){
            this.expedienteService.modificarEstadoPreparado({estado_preparado:false},expediente.id_expediente).subscribe(
              res=>{
                  console.log(res)
              },
              err=>{
                  console.error(err)
                  // console.log('error en ',expediente)
              }
            )
            }
          }) 
          this.modificarEstadoInventario()
        setTimeout(() => {
             this.isLoading = false;
             this.listarTotalExpedientesXidInventario()
        }, cantidad_expedientes); 
    }
  
  
  // async enviarApreparacion(){
  //   //enviaremos a preparacion cambiando los valores de estado null a false
  //   console.log(this.expedientesList.length)
  //   const cantidad_expedientes=this.exp_count_pendientes;
  //   this.isLoading = true;
  //   let timerInterval:any;
  // Swal.fire({
  //   title: "Auto close alert!",
  //   html: "I will close in <b></b> milliseconds.",
  //   timer: cantidad_expedientes,
  //   timerProgressBar: true,
  //   didOpen: () => {
  //     Swal.showLoading();
  //     const timer = Swal.getPopup().querySelector("b");
  //     timerInterval = setInterval(() => {
  //       timer.textContent = `${Swal.getTimerLeft()}`;
  //     }, 100);
  //   },
  //   willClose: () => {
  //     clearInterval(timerInterval);
  //   }
  // }).then((result) => {
  //   /* Read more about handling dismissals below */
  //   if (result.dismiss === Swal.DismissReason.timer) {
  //     console.log("I was closed by the timer");
  //   }
  // });
    
  //       // setTimeout(() => {
  //       //   // if (this.exp_count_pendientes > 0) {
  //       //   //   this.isLoading = false;
  //       //   // }
  //       //   this.expedientesList.forEach((expediente: any) => {
  //       //     // Realiza la acción que necesites con cada expediente 
  //       //     console.log(expediente);
  //       //     // el expediente pasa a ser falso indicando asi que esta listo para preparacion pero que aun no se ha preparado, 
  //       //     // null: esta en inventario, false: listo para preparacion, cuando este en true significa que ya se ha preparado
  //       //     if(expediente.estado_preparado==null){
  //       //       expediente.estado_preparado=false
  //       //     this.expedienteService.modificarEstadoPreparado(expediente,expediente.id_expediente).subscribe(
  //       //       res=>{
  //       //           console.log(res)
  //       //           this.listarTotalExpedientesXidInventario()
  //       //       },
  //       //       err=>{
  //       //           console.error(err)
          
  //       //       }
  //       //     )
  //       //     }
            
  //       //   })
          
  //       //   this.modificarEstadoInventario()
  //       //   // this.habilitarPreparacion=false
  //       //   // this.habilitarAgregar=true
          
  //       //    this.mensajeEnviadoaPreparacion()
           
  //       //    this.isLoading = false;
          
  //       // }, cantidad_expedientes); // Simula un delay en funcion a la cantidad de expedientes pendientes
      
  
    
    
  //   }
  
  //  enviarApreparacion(){
  // //enviaremos a preparacion cambiando los valores de estado null a false
  // console.log(this.expedientesList.length)
  // const cantidad_expedientes=this.exp_count_pendientes;
  // this.isLoading = true;
  // this.expedientesList.forEach((expediente: any) => {
  //         // Realiza la acción que necesites con cada expediente 
  //         console.log(expediente);
  //         // el expediente pasa a ser falso indicando asi que esta listo para preparacion pero que aun no se ha preparado, 
  //         // null: esta en inventario, false: listo para preparacion, cuando este en true significa que ya se ha preparado
  //         if(expediente.estado_preparado==null){
  //         this.expedienteService.modificarEstadoPreparado({estado_preparado:false},expediente.id_expediente).subscribe(
  //           res=>{
  //               console.log(res)
  //               //this.listarTotalExpedientesXidInventario()
  //           },
  //           err=>{
  //               console.error(err)
  //               // console.log('aqui nos quedamos con el expediente: '+expediente)
  //               // return
        
  //           }
  //         )
  //         }
          
  //       })
        
  //       this.modificarEstadoInventario()
  //       // this.habilitarPreparacion=false
  //       // this.habilitarAgregar=true
        
  //       //  this.mensajeEnviadoaPreparacion()
         
  //       //  this.isLoading = false;
  
  //     setTimeout(() => {
  //       // if (this.exp_count_pendientes > 0) {
  //       //   this.isLoading = false;
  //       // }
        
  //          this.isLoading = false;
  //     }, cantidad_expedientes); // Simula un delay en funcion a la cantidad de expedientes pendientes
    
  // // this.expedientesList.forEach((expediente: any) => {
  // //   // Realiza la acción que necesites con cada expediente 
  // //   // console.log(expediente);
  // //   // this.expedienteService.modificarEstadoPreparado(expediente,expediente.id_expediente).subscribe(
  // //   //   res=>{
  // //   //       console.log(res)
          
  // //   //   },
  // //   //   err=>{
  // //   //       console.error(err)
  
  // //   //   }
  // //   // )
  // //   // el expediente pasa a ser falso indicando asi que esta listo para preparacion pero que aun no se ha preparado, 
  // //   // null: esta en inventario, false: listo para preparacion, cuando este en true significa que ya se ha preparado
  // //         if(expediente.estado_preparado==null){
  // //           expediente.estado_preparado=false
  // //           this.expedienteService.modificarEstadoPreparado(expediente,expediente.id_expediente).subscribe(
  // //             res=>{
  // //                 console.log(res)
                  
  // //             },
  // //             err=>{
  // //                 console.error(err)
  
  // //             }
  // //           )
  // //         }
    
  // // })
  // // this.mensajeEnviadoaPreparacion()
  // // this.modificarEstadoInventario()
  // // // this.habilitarPreparacion=false
  // // // this.habilitarAgregar=true
  
  // // this.listarTotalExpedientesXidInventario()
  
  
  
  // }
  
  modificarCantidadInvenario(){
    const params=this.activatedRoute.snapshot.params
    console.log(params['id_inventario'])
    this.inventarioService.modificarCantidadInventario({cantidad: this.expedientesList.length},params['id_inventario']).subscribe(
      res=>{
        console.log(res)
      },
      err=>{
        console.error(err)
      }
    )
  }
  
  
  
  eliminarExpedienteDeBD(expediente:any){
  
      this.expedienteService.eliminarExpediente(expediente.id_expediente).subscribe(
        res=>{
          console.log(res)
          this.listarTotalExpedientesXidInventario()
          this.habilitarPreparacion=true
          this.habilitarAgregar=false
        },
        err=>{
          console.error(err)
         
        }
      )
    
   
  }
  async modificarExpediente(expediente:any){
    const { value: nombre_expediente } = await Swal.fire({
      title: "MODIFICAR NOMBRE DEL EXPEDIENTE",
      input: "text",
      inputValue:expediente.nombre_expediente
    })
    if (nombre_expediente) {
     // Swal.fire(`Entered email: ${nombre_expediente}`);
      console.log(expediente)
      expediente.nombre_expediente=nombre_expediente
      this.expedienteService.modificarExpediente(expediente,expediente.id_expediente).subscribe(
        res=>{
          console.log(res)
          this.listarTotalExpedientesXidInventario()
        
        },
        err=>{
          console.error(err)
        }
      )
      //listarExpedientesXidInventario()
    }
  }
  
  limpiarIngreso(){
    this.data_expediente.nombre_expediente=''
  }
  
  volver(){
    this.router.navigate(['/principal/reportes'])
  }
  
  
  mensajePreEliminar(expediente:any){
    Swal.fire({
      title: "estas seguro de eliminar?!",
      text: "esta accion no es reversible",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "si, eliminar!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Eliminado!",
          text: "Tu archivo ha sido eliminado.",
          icon: "success"
        });
  
        this.eliminarExpedienteDeBD(expediente)
      }
    });
  
  }
  
  mensajeEnviadoaPreparacion(){
    Swal.fire({
      title: "BUEN TRABAJO!",
      text: "los expedientes se enviaron a preparacion!",
      icon: "success"
    });
     
  }
  
  mensajeExpedienteGuardado(){
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "success",
      title: "expediente registrado ",
      showConfirmButton: false,
      timer: 1500
    });
  }
   

  buscarEnObjeto(event: any) {
    let objetosFiltrados=[]
    const textoBusqueda = event.target.value.toLowerCase();
      
      // Filtrar los objetos según el texto de búsqueda
      objetosFiltrados = this.expedientesListTemp.filter((objeto: 
        { 
          nombre_expediente: string;
        
  
         }) => {
        
        const nombre_expediente = objeto.nombre_expediente.toLowerCase();
       
  
        return nombre_expediente.includes(textoBusqueda);
      });
      this.expedientesList=objetosFiltrados
  }
}

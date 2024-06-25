import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InventarioService } from 'src/app/servicios/inventario/inventario.service';

@Component({
  selector: 'app-preparacion-documentos',
  templateUrl: './preparacion-documentos.component.html',
  styleUrls: ['./preparacion-documentos.component.css']
})
export class PreparacionDocumentosComponent implements OnInit {
  inventarios:any=[]
  inventariosTem:any=[]
  objetosFiltrados:any=[];
  constructor(private router:Router,private inventarioService:InventarioService){}

  ngOnInit(): void {
    this.listarInventarioHabilitadoPreparado()
  }
  listarInventarioHabilitadoPreparado(){
    this.inventarioService.listaDetalladaInventarios().subscribe(
      res=>{
        let inventariosHabilitados:any = res
        
       this.inventarios=inventariosHabilitados.filter((inventario: { estado_preparado: boolean; }) => inventario.estado_preparado ==true);
       this.inventariosTem=this.inventarios
        console.log(this.inventariosTem)
      },
      err=>{
        console.error(err)
      }
    )
  }
  buscarEnObjeto(event: any) {
    const textoBusqueda = event.target.value.toLowerCase();
      
      // Filtrar los objetos según el texto de búsqueda
      this.objetosFiltrados = this.inventariosTem.filter((objeto: 
        { 
          especialidad_inventario: string; 
          anio:number;
          tipo_doc:string;
          serie_doc:string;
          nombre:string;
  
         }) => {
        
        const especialidad = objeto.especialidad_inventario.toLowerCase();
        const anio = objeto.anio.toString().toLowerCase();
        const tipo_doc=objeto.tipo_doc.toString().toLowerCase();
        const serie_doc=objeto.serie_doc.toString().toLowerCase();
        const nombre=objeto.nombre.toString().toLowerCase();

        return especialidad.includes(textoBusqueda)|| anio.includes(textoBusqueda)|| tipo_doc.includes(textoBusqueda)|| serie_doc.includes(textoBusqueda)|| nombre.includes(textoBusqueda);
      });
      this.inventarios=this.objetosFiltrados
  }
  volver(){
    this.router.navigate(['/principal'])
  }
  PreparacionExpedientesInventario(id_inventario:any){
    this.router.navigate(['principal/preparaciondocumentos/preparacionexpedientesinventario/',id_inventario])
  }
}

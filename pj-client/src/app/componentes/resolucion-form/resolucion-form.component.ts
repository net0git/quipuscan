import { Component, OnInit } from '@angular/core';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

declare var bootstrap: any;
var totalPagesExp = '{total_pages_count_string}';

@Component({
  selector: 'app-resolucion-form',
  templateUrl: './resolucion-form.component.html',
  styleUrls: ['./resolucion-form.component.css']
})
export class ResolucionFormComponent implements OnInit {

  rows: any[];
  sections: number = 0;
  constructor() {
    this.rows = [];
  }
  ngOnInit(): void {
    this.rows = this.createRows(1000);
    this.sections = 3;
  }

  createRows(count: number): any[] {
    const rows = [];
    for (let i = 1; i <= count; i++) {
      const indiceExpediente = String(i).padStart(2, '0');
      const codigoExpediente = `000${indiceExpediente}-2010-0-1004-JM-FC-01`;
      rows.push([i, codigoExpediente]);
    }
    return rows;
  }
  //funcion que genera todo el pdf
  generatePDF() {
    //obtener la fecha y hora actual
    const fechaHoraActual = new Date();
    const dia = fechaHoraActual.getDate().toString().padStart(2, '0');
    const mes = (fechaHoraActual.getMonth() + 1).toString().padStart(2, '0');
    const anio = fechaHoraActual.getFullYear().toString();
    const hora = fechaHoraActual.getHours().toString().padStart(2, '0');
    const minutos = fechaHoraActual.getMinutes().toString().padStart(2, '0');
    const segundos = fechaHoraActual.getSeconds().toString().padStart(2, '0');
    const horaFormateada = `${hora}:${minutos}:${segundos}`;
    const fechaFormateada = `${dia}/${mes}/${anio}`;
    //formatea la hoja
    const doc = new jsPDF({
      orientation: 'p',
      unit: 'mm',
      format: 'a4',
      putOnlyUsedFonts: true,
    });
    // overall margin
    const margin = {
      left: 4,
      right: 4,
      //donde empieza la tabla
      top: 40.5,
      bottom: 12,
    };
    //crea la cabecera de la tabla
    const headers = [['N°', 'EXPEDIENTE']];

  //para calcular y colocar las columnas adicionales en la tabla
  const printWidth = doc.internal.pageSize.width - (margin.left + margin.right);
  const sectionWidth = (printWidth - (this.sections - 1) * 5) / this.sections;

  // add an initial empty page that will be deleted later,
  // it is needed for the first setPage(previous_page) call
  doc.addPage();
    //estilos para la tabla
    const tableStyles = {
      tableLineColor: [192, 192, 192], // Gris
      lineWidth: 0.1, // Grosor de las líneas de la tabla
      fontSize: 7, // Tamaño del texto en la tabla
    };
    //para que genere la autotabla
    autoTable(doc, {
      head: headers,
      body: this.rows,
      tableWidth: sectionWidth,
      margin,
       columnStyles: {
        0: { cellWidth: 10 },
        1: { cellWidth: 54 },
      },
      styles: tableStyles,
      rowPageBreak: 'avoid', // avoid breaking rows into multiple sections
      didDrawPage: ({
        table,
        pageNumber,
      }:{
        table: any;
        pageNumber: number;
      })=>{
        /REGION cabecera del documento/
        doc.setFont('times', 'bold');
        doc.setFontSize(12);
        doc.text('SISTEMA DE DIGITALIZACION DE ARCHIVOS', 60, 10);

        doc.setFont('times', 'regular');
        doc.setFontSize(11);
        doc.text('INVENTARIO DE EXPEDIENTES', 77, 15);

        doc.line(10, 17, 200, 17);
        doc.setFontSize(10);

        doc.text('CODIGO DE INVENTARIO: 1', 10, 23);
        doc.text('SUPERVISOR: RRAMIRO', 140, 23);

        doc.text('TIPO DE DOCUMENTO: EXPEDIENTE JURISDICCIONAL', 10, 28);
        doc.text(`FECHA Y HORA: ${fechaFormateada} ${horaFormateada}`, 140, 28);

        doc.text('ESPECIALIDAD: FT', 10, 33);
        doc.text('CANTIDAD: 1000', 60, 33);

        doc.text(
          'SERIE DOCUMENTAL: EXPEDIENTES JURISDICCIONALES DE FAMILIA CIVIL AÑO 2020', 10, 38);
        //linea que divide la cabecera de la tabla
        doc.line(10, 40, 200, 40);
        //ENDREGION FIN CABECERA DE DOCUMENTO
        let currentPageNum = doc.getCurrentPageInfo().pageNumber-1;
        // PIE DE PAGINA
        var str = 'Página ' + currentPageNum; //doc.internal.getNumberOfPages();
        // Total page number plugin only available in jspdf v1.0+
        if (typeof doc.putTotalPages === 'function') {
          str = str + ' de ' + totalPagesExp;
        }
        //doc.setFontStyle('normal');
        var pageSize = doc.internal.pageSize;
        var pageHeight = pageSize.height? pageSize.height : pageSize.getHeight();
        
        doc.text(str, 140, 33);
        doc.text(str, 180, pageHeight - 10);



        const docPage = doc.getNumberOfPages();
        const nextShouldWrap = pageNumber % this.sections;
        if (nextShouldWrap) {
          // move to previous page, so when autoTable calls
          // addPage() it will still be the same current page
          doc.setPage(docPage - 1);

          // change left margin which will control x position
          table.settings.margin.left += sectionWidth + 5;
        } else {
          // reset left margin for the first section in every page
          table.settings.margin.left = margin.left;
        }
      },
    });
    // activate last page for further printing
    doc.setPage(doc.getNumberOfPages()); // last page number (see doc.getNumberOfPages());

    // delete unused empty page
    doc.deletePage(1);

     if (typeof doc.putTotalPages === 'function') {
       doc.putTotalPages(totalPagesExp);
     }

     if (typeof doc.putTotalPages === 'function') {
       doc.putTotalPages(totalPagesExp);
     }

    doc.save('tabla.pdf');
}
  
}

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
// import html2canvas from 'html2canvas';

// import jsPDF from 'jspdf';
// import pdfMake from 'pdfmake/build/pdfmake';
// import pdfFonts from 'pdfmake/build/vfs_fonts';
// pdfMake.vfs = pdfFonts.pdfMake.vfs;
// import htmlToPdfmake from 'html-to-pdfmake';

@Component({
  selector: 'app-invoice-detail',
  templateUrl: './invoice-detail.component.html',
  styleUrls: ['./invoice-detail.component.scss'],
})
export class InvoiceDetailComponent implements OnInit {
  constructor() {}
  title = 'Invoice';
  ngOnInit() {}
  @ViewChild('invoiceData') pdfTable: ElementRef;
  downloadAsPDF() {
    // const doc = new jsPDF();
    // const pdfTable = this.pdfTable.nativeElement;
    // var html = htmlToPdfmake(pdfTable.innerHTML,{imagesByReference:true});
    // console.log(html);
    // const documentDefinition = { content: html.content,images:html.images };
    // pdfMake.createPdf(documentDefinition).download();

    // html2canvas(document.getElementById('invoiceData')).then((canvas) => {
    //   var data = canvas.toDataURL();
    //   console.log(data);
    //   var docDefinition = {
    //     content: [
    //       {
    //         image: data,
            
    //       },
    //     ],
    //   };
    //   pdfMake.createPdf(docDefinition).download('Score_Details.pdf');
    // });
  }
  products = [
    {
      SerialNo: '1',
      ProductId: '45',
      ProductName: 'artwork Pandora',
      Quantity: '10',
      Price: '4000',
    },
    {
      SerialNo: '1',
      ProductId: '45',
      ProductName: 'artwork Pandora',
      Quantity: '10',
      Price: '4000',
    },
    {
      SerialNo: '1',
      ProductId: '45',
      ProductName: 'artwork Pandora',
      Quantity: '10',
      Price: '4000',
    },
    {
      SerialNo: '1',
      ProductId: '45',
      ProductName: 'artwork Pandora',
      Quantity: '10',
      Price: '4000',
    },
    {
      SerialNo: '1',
      ProductId: '45',
      ProductName: 'artwork Pandora',
      Quantity: '10',
      Price: '4000',
    },
    {
      SerialNo: '1',
      ProductId: '45',
      ProductName: 'artwork Pandora',
      Quantity: '10',
      Price: '4000',
    },
    {
      SerialNo: '1',
      ProductId: '45',
      ProductName: 'artwork Pandora',
      Quantity: '10',
      Price: '4000',
    },
    {
      SerialNo: '1',
      ProductId: '45',
      ProductName: 'artwork Pandora',
      Quantity: '10',
      Price: '4000',
    },
  ];
}



import { Injectable } from '@angular/core';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { UserOptions } from 'jspdf-autotable';
interface jsPDFWithPlugin extends jsPDF {
  autoTable: (options: UserOptions) => jsPDF;
}
@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  doc = new jsPDF() as jsPDFWithPlugin;
  async getBase64ImageFromUrl(imageUrl) {
    var res = await fetch(imageUrl);
    var blob = await res.blob();

    return new Promise((resolve, reject) => {
      var reader = new FileReader();
      reader.addEventListener(
        'load',
        function () {
          resolve(reader.result);
        },
        false
      );

      reader.onerror = () => {
        return reject(this);
      };
      reader.readAsDataURL(blob);
    });
  }
  gstin: string = '27AAACR532F1Z4';
  addressline1: string = 'Khalpara, Siliguri Darjeeling';
  address: string = '2nd Flr, Sarvottam Complex M. R. Road';
  state: string = 'West Bengal';
  pincode: string = '734005';
  createInvoice(data,shippingDetail) {
    let body = [];
    for (let i of data){
      body.push([i.productName, i.quantity, i.finalPrice,(i.finalPrice*i.quantity)-(((i.finalPrice*i.quantity)/100)*15)]);
    }
    body.push(['','','Subtotal',shippingDetail.subTotal])
    body.push(['', '', 'Tax & Charges', shippingDetail.taxCharges]);
    if (shippingDetail.discount.available==true){
      body.push(['Dicount Code', shippingDetail.discount.code, 'Discount', shippingDetail.discount.discount]);
    }
    body.push(['', '', 'Grand Total', shippingDetail.grandTotal]);
    this.getBase64ImageFromUrl('./assets/icon.png')
      .then((base64: any) => {
        this.doc.addImage(base64, 'PNG', 10, 10, 30, 30);
        this.doc.text('Hello Santa', 10, 45);
        this.doc.setFontSize(10);
        this.doc.text(`GSTIN:${this.gstin}`, 10, 50);
        this.doc.text(`Invoice No:${Math.floor(Math.random() * 100)}`, 10, 55);
        this.doc.text(`Date:${new Date().toLocaleDateString()}`, 10, 60);
        this.doc.text(`${this.addressline1}`, 200, 30, { align: 'right' });
        this.doc.text(`${this.address}`, 200, 35, { align: 'right' });
        this.doc.text(`${this.state}`, 200, 40, { align: 'right' });
        this.doc.text(`${this.pincode}`, 200, 45, { align: 'right' });
        this.doc.setDrawColor(113, 76, 207);
        this.doc.line(10, 70, 200, 70);
        this.doc
          .setDrawColor(0, 0, 0)
          .setFontSize(10)
          .setFont(undefined, 'bold');
        this.doc.text('Country of Supply', 10, 80).setFont(undefined, 'normal');
        this.doc
          .text('India', 50, 80)
          .setFontSize(8)
          .setFontSize(10)
          .setFont(undefined, 'bold');
        this.doc
          .text('Place of Supply', 80, 80)
          .setFontSize(8)
          .setFont(undefined, 'normal');
        this.doc.text('Siliguri Darjeeling', 110, 80).setFont(undefined, 'bold');
        this.doc.text('Billing Customer Name', 10, 85).setFont(undefined, 'normal');
        this.doc.text(shippingDetail.name, 50, 85).setFont(undefined, 'bold');
        this.doc.text('Billing Customer Address', 10, 90).setFont(undefined, 'normal');
        this.doc.text(shippingDetail.address, 50, 90).setFont(undefined, 'bold');
        this.doc.text('Billing City', 10, 95).setFont(undefined, 'normal');
        this.doc.text(shippingDetail.city, 50, 95).setFont(undefined, 'bold');
        this.doc.text('Billing State', 10, 100).setFont(undefined, 'normal');
        this.doc.text(shippingDetail.state, 50, 100).setFont(undefined, 'bold');
        this.doc.text('Billing Pincode', 10, 105).setFont(undefined, 'normal');
        this.doc.text(shippingDetail.pincode, 50, 105).setFont(undefined, 'bold');
        this.doc.text('Billing Email', 10, 110).setFont(undefined, 'normal');
        this.doc.text(shippingDetail.email, 50, 110).setFont(undefined, 'bold');
        this.doc.text('Billing Mobile', 10, 115).setFont(undefined, 'normal');
        this.doc.text(shippingDetail.mobile, 50, 115).setFont(undefined, 'bold');
        this.doc.text('Payment Method', 10, 120).setFont(undefined, 'normal');
        this.doc.text('Prepaid', 50, 120);
        this.doc.setDrawColor(113, 76, 207);
        this.doc.line(10, 125, 200, 125);
        this.doc.setDrawColor(0, 0, 0);
        this.doc.setFontSize(8);
        this.doc.autoTable({
          startY: 130,
          styles: { overflow: 'linebreak', fontSize: 7 },
          headStyles: {
            minCellHeight: 5,
            fontSize: 7,
            fontStyle: 'bold',
            halign: 'center',
            lineWidth: 0.02,
            fillColor: [159, 115, 255],
            lineColor: [217, 216, 216],
          },
          theme: 'grid',
          head: [['Item', 'Quantity', 'Price','Total']],
          body: body,
        });

        this.doc.save('a4.pdf');
      })
      .catch((error) => {
        // console.log('Error occured', error);
      });
  }

  constructor() {}
}

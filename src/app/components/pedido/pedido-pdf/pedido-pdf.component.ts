import { Component, OnInit, Inject } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ComponentsService } from 'app/components/components.service';

@Component({
  selector: 'app-pedido-pdf',
  templateUrl: './pedido-pdf.component.html',
  styleUrls: ['./pedido-pdf.component.scss']
})
export class PedidoPdfComponent implements OnInit {
  pdfSrc: Blob;
  pageurl: SafeResourceUrl;
  constructor(
    public dialogRef: MatDialogRef<PedidoPdfComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private domSanitizer: DomSanitizer,
    private api:ComponentsService
  ) { }

  ngOnInit() {
    this.api.getPedidoPDF().subscribe(
      data => {
        this.pdfSrc = new Blob([data], { type: 'application/pdf' });
        console.log(this.pdfSrc);
        this.pageurl = this.domSanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(this.pdfSrc));
        console.log(this.pageurl);
      })
  }
  getInit(){

  }
}

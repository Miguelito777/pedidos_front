import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-det-pedido',
  templateUrl: './det-pedido.component.html',
  styleUrls: ['./det-pedido.component.scss']
})
export class DetPedidoComponent implements OnInit {
  displayedColumns: string[] = ['PEDIDO', 'OBSERVACIONES', 'CANTIDAD', 'PRECIO', 'SUBTOTAL'];
  detPedido:any[]=[];
  dataSource = new MatTableDataSource(this.detPedido);
  totalPedido=0;
  constructor(
    public dialogRef: MatDialogRef<DetPedidoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    
    for(var i in data.det_pedido){
      let subTotalPedido = 0;
      subTotalPedido = data.det_pedido[i].cantidad * data.det_pedido[i].precio;
      this.totalPedido += subTotalPedido;
    }
    this.dataSource = new MatTableDataSource(data.det_pedido);
  }

ngOnInit() {
}
applyFilter(filterValue: string) {
  this.dataSource.filter = filterValue.trim().toLowerCase();
}
  /** Gets the total cost of all transactions. */
  /*getTotalCost() {
    return this.data.det_pedido.map(t => t.cost).reduce((acc, value) => acc + value, 0);
  }*/
}

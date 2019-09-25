import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { ComponentsService } from '../components.service';
import { MatDialog } from '@angular/material';
import { DetPedidoComponent } from './det-pedido/det-pedido.component';
import { PedidoPdfComponent } from './pedido-pdf/pedido-pdf.component';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.scss']
})
export class PedidoComponent implements OnInit {
  displayedColumns: string[] = ['CODIGO', 'FECHA_ENTREGA', 'CLIENTE', 'ANTICIPO', 'OPCIONES'];
  pedidos:any[]=[];
  dataSource = new MatTableDataSource(this.pedidos);

  constructor(
    private api: ComponentsService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.api.getPedidos().subscribe(
      data => {
        this.dataSource = new MatTableDataSource(data);
      }
    )
    /*this.api.getMadres().subscribe(
      data => {
        console.log(data);
      }
    )*/
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  detPedido(item){
    console.log(item);
    
    const dialogRef = this.dialog.open(DetPedidoComponent, {
      width: '800px',
      data: item
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //this.animal = result;
    });
  }
  getPDF(row){
    window.open('http://localhost:8000/PEDIDOS/pedidos/pedidoPDF/'+row.id);
    /*const dialogRef = this.dialog.open(PedidoPdfComponent, {
      data: { }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataService

      }
    });*/
  }
}

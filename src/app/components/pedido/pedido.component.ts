import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { ComponentsService } from '../components.service';
import { MatDialog, MatPaginator, MatSort } from '@angular/material';
import { DetPedidoComponent } from './det-pedido/det-pedido.component';
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
  displayedColumns: string[] = ['CODIGO', 'FECHA_ENTREGA', 'CLIENTE', 'TOTAL', 'ANTICIPO', 'SALDO', 'ENTREGA', 'OPCIONES'];
  pedidos:any[]=[];
  dataSource = new MatTableDataSource(this.pedidos);
  @ViewChild('paginatorPedidos') paginatorPedidos: MatPaginator;
  @ViewChild('sortPedidos') sortPedidos: MatSort; 
  constructor(
    private api: ComponentsService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.api.getPedidos().subscribe(
      data => {
        for(let i in data){          
          data[i].fecha_entrega = this.formatDate(data[i].fecha_entrega);           
        }
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginatorPedidos;
        this.dataSource.sort = this.sortPedidos;
      }
    )
  }
  private formatDate(date){
    var FECHA = new Date(date.split(' ')[0]);
    var dd = FECHA.getDate().toString();
    var mm = (FECHA.getMonth() + 1).toString(); //January is 0!
    var yyyy = FECHA.getFullYear();

    if (+dd < 10) {
      dd = '0' + dd;
    }
    if (+mm < 10) {
      mm = '0' + mm;
    }
    var newFECHA = dd + '/' + mm + '/' + yyyy;
    return newFECHA;
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  detPedido(item){   
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
  }
}

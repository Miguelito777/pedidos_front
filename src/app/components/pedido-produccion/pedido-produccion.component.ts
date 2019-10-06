import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { ComponentsService } from '../components.service';
import { MatDialog } from '@angular/material';
import { DetPedidoComponent } from '../pedido/det-pedido/det-pedido.component';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-pedido-produccion',
  templateUrl: './pedido-produccion.component.html',
  styleUrls: ['./pedido-produccion.component.scss']
})
export class PedidoProduccionComponent implements OnInit {
  displayedColumns: string[] = ['CODIGO', 'FECHA_ENTREGA', 'DETALLE', 'OBSERVACIONES', 'OPCIONES'];
  pedidos:any[]=[];
  dataSource = new MatTableDataSource(this.pedidos);

  constructor(
    private api: ComponentsService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.api.getPedidos().subscribe(
      data => {
        for(let i in data){          
          data[i].fecha_entrega = this.formatDate(data[i].fecha_entrega); 
          data[i].detalle = '';                    
          for(let j in data[i].det_pedido){
            data[i].detalle += '*'+data[i].det_pedido[j].cantidad+' '+data[i].det_pedido[j].det_pedido+' '+data[i].det_pedido[j].observaciones;
            if(j+1 < data[i].det_pedido.length){
              data[i].detalle += ',  '
            }
          }
        }
        this.dataSource = new MatTableDataSource(data);
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

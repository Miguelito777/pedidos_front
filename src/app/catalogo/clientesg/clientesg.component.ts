import { Component, OnInit } from '@angular/core';
import { CatalogoService } from '../catalogo.service';
import Responsive from 'datatables.net-responsive';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { recursosVarios } from 'app/recursos/recursosVarios';

declare interface DataTable {
  dataRows: any;
}

declare const $: any;

@Component({
  selector: 'app-clientesg',
  templateUrl: './clientesg.component.html',
  styleUrls: ['./clientesg.component.scss']
})  
export class ClientesgComponent implements OnInit {
  public dataTable: DataTable = {
    dataRows:[]
  };
  formCliente:FormGroup;

  constructor(
    private catalogoService: CatalogoService,
    private fb:FormBuilder
  ) {
    this.formCliente = this.fb.group({
      cliente:['',Validators.required],
      correo:[],
      telefono:[],
      dpi:[],
      nit:[],
      observaciones:['ninguna'],
      id_estado:[1],
      id_usuario_crea:[1],
      id_usuario_modifica:[1]
    })
   }
  refreshDataTable(){
    var self = this;
    setTimeout(function () {
      self.initTable();
    }, 10);
  }
  ngOnInit() {
    var self = this;
    this.catalogoService.getClientes().subscribe(
      data => {
        this.dataTable.dataRows = data;
        this.refreshDataTable();
      }
    );
  }
  addCliente(){
    if(this.formCliente.valid){
      this.catalogoService.setCliente(this.formCliente.value).subscribe(
        data=>{
          if(data != undefined && data.id != undefined && data.id != null && +data.id > 0){
            new recursosVarios().showNotification('top', 'right', "Cliente agregado exitosamente", 2);
            this.dataTable.dataRows.push(data);
            this.formCliente.controls.cliente.setValue(null);
            this.formCliente.controls.correo.setValue(null);
            this.formCliente.controls.telefono.setValue(null);
            this.formCliente.controls.dpi.setValue(null);
            this.formCliente.controls.nit.setValue(null);
            this.refreshDataTable();
          }else{
            new recursosVarios().showNotification('top', 'right', "Error al ingresar al cliente, intentelo de nuevo", 4);
          };
        }
      )
    }
  }
  /*ngAfterViewInit() {
    $('#datatables').DataTable({
      "pagingType": "full_numbers",
      "lengthMenu": [
        [10, 25, 50, -1],
        [10, 25, 50, "All"]
      ],
      responsive: true,
      language: {
        search: "_INPUT_",
        searchPlaceholder: "Search records",
      }

    });

    const table = $('#datatables').DataTable();

    // Edit record
    table.on('click', '.edit', function (e) {
      const $tr = $(this).closest('tr');
      const data = table.row($tr).data();
      alert('You press on Row: ' + data[0] + ' ' + data[1] + ' ' + data[2] + '\'s row.');
      e.preventDefault();
    });

    // Delete a record
    table.on('click', '.remove', function (e) {
      const $tr = $(this).closest('tr');
      table.row($tr).remove().draw();
      e.preventDefault();
    });

    //Like record
    table.on('click', '.like', function (e) {
      alert('You clicked on Like button');
      e.preventDefault();
    });

    $('.card .material-datatables label').addClass('form-group');
  }*/

  private initTable() {
    var table = $('#datatables').DataTable({
      "autoWidth": true,
      "pagingType": "numbers",
      "lengthMenu": [
        [5, 10, 25, 50, -1],
        [5, 10, 25, 50, "Todos"]
      ],
      "columnDefs": [
        { "width": "10px", "targets": 0 },
      ],
      "order": [[1, "desc"]],
      responsive: {
        details: {
          renderer: Responsive.renderer.listHiddenNodes()
        }
      },
      language: {
        lengthMenu: "Mostrar _MENU_ Registros por Página",
        search: "_INPUT_",
        searchPlaceholder: "Filtrar registros",
        info: "Mostrando Página _PAGE_ de _PAGES_",
        infoEmpty: "No hay Registros",
        zeroRecords: "No hay Registros",
        infoFiltered: "(Total de Registros: _MAX_)",
        paginate: {
          first: "Primero",
          last: "Último",
          next: "Siguiente",
          previous: "Anterior"
        },
      },
      "bDestroy": true
    });
  }
}

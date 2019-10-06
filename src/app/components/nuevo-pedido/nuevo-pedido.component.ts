import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ReplaySubject, Subject, Observable } from 'rxjs';
import { MatSelect } from '@angular/material';
import { takeUntil, startWith, map } from 'rxjs/operators';
import { ComponentsService } from '../components.service';
import {MatTableDataSource} from '@angular/material/table';
import { recursosVarios } from 'app/recursos/recursosVarios';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nuevo-pedido',
  templateUrl: './nuevo-pedido.component.html',
  styleUrls: ['./nuevo-pedido.component.scss']
})
export class NuevoPedidoComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  optionsDirecciones: any[] = [];
  filteredDirecciones: Observable<any[]>;
  myControlDireccion = new FormControl();
    /** list of banks */
    protected clientes: any[] = [];
    protected productos: any[] = [];
    protected direcciones: any[] = [];

    /** control for the selected bank */
    public bankCtrl: FormControl = new FormControl();
    public productCtrl: FormControl = new FormControl();
  
    /** control for the MatSelect filter keyword */
    public bankFilterCtrl: FormControl = new FormControl();
    public productFilterCtrl: FormControl = new FormControl();
  
    /** list of banks filtered by search keyword */
    public filteredBanks: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
    public filteredProducts: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);

    
    @ViewChild('singleSelect') singleSelect: MatSelect;
    @ViewChild('productoSelect') productoSelect: MatSelect;

    /** Subject that emits when the component has been destroyed. */
    protected _onDestroy = new Subject<void>();

    displayedColumns: string[] = ['PRODUCTO', 'CANTIDAD', 'PRECIO', 'SUBTOTAL'];
    dataSource = new MatTableDataSource([]);

  private detPedido: any[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private api:ComponentsService,
    public router: Router
  ) { }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  ngOnInit() {
    this.api.getCatalogo().subscribe(
      data => { 
        this.clientes = data.clientes;
        this.productos = data.productos;
        this.direcciones = data.direcciones;
        //clientes
        this.bankCtrl.setValue(this.clientes);
        this.filteredBanks.next(this.clientes.slice());
        this.bankFilterCtrl.valueChanges
          .pipe(takeUntil(this._onDestroy))
          .subscribe(() => {
            this.filterBanks();
          });

        //productos
        this.productCtrl.setValue(this.productos);
        this.filteredProducts.next(this.productos.slice());
        this.productFilterCtrl.valueChanges
          .pipe(takeUntil(this._onDestroy))
          .subscribe(() => {
            this.filterProducts();
          });
       
        // DIRECCIONES DE ENTREGA        
        this.optionsDirecciones = this.direcciones;
        this.filteredDirecciones = this.myControlDireccion.valueChanges
        .pipe(
          startWith<string | any>(''),
          map(value => typeof value === 'string' ? value : value.direccion_pedido),
          map(direccion_pedido => direccion_pedido ? this._filterDir(direccion_pedido) : this.optionsDirecciones.slice())
        );   
      } 
    );

    this.registerForm = this.formBuilder.group({
      fecha_entrega: ['', Validators.required],
      hora_entrega: ['', Validators.required],
      id_cliente: [],
      anticipo: [1, [Validators.min(1),Validators.required]],
      productos: [],
      cantidad: [''],
      precio: [{value:'', disabled: true}],
      FECHA_INICIO : [new Date()],
      id_direccion_pedido:[null],
      direccion_pedido:[null],
      observaciones:[null],
      observacionesProd:[null]
      //,email: ['', [Validators.required, Validators.email]],
      //password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  protected filterBanks() {
    if (!this.clientes) {
      return;
    }
    // get the search keyword
    let search = this.bankFilterCtrl.value;
    if (!search) {
      this.filteredBanks.next(this.clientes.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredBanks.next(
      this.clientes.filter(bank => bank.cliente.toLowerCase().indexOf(search) > -1)
    );
  }
  protected filterProducts() {
    if (!this.productos) {
      return;
    }
    // get the search keyword
    let search = this.productFilterCtrl.value;
    if (!search) {
      this.filteredProducts.next(this.productos.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredProducts.next(
      this.productos.filter(bank => bank.producto.toLowerCase().indexOf(search) > -1)
    );
  }
    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }
  selectProduct(){
    this.registerForm.controls.precio.setValue(this.productCtrl.value.precio);
    this.registerForm.controls.cantidad.setValue(1);
  }
  selectCliente(){
    this.registerForm.controls.id_cliente.setValue(this.bankCtrl.value.id);
  }
  addProducto() {    
    let agregar = true;
    if (this.productCtrl.value instanceof Array || !(Number.isInteger(+this.registerForm.controls.cantidad.value) && +this.registerForm.controls.cantidad.value > 0)  || (this.registerForm.controls.precio.value == null || +this.registerForm.controls.precio.value <= 0)) {
      new recursosVarios().showNotification('top', 'right', "Elemento incorrecto", 4)
    }else{
      
      if(this.registerForm.controls.productos.value instanceof Array){
        for(var i in this.registerForm.controls.productos.value){          
          if(+this.registerForm.controls.productos.value[i].id_producto == +this.productCtrl.value.id){
            agregar = false;
          }
        }
      }
      if(agregar){        
        let prodPed = {
          id_producto:this.productCtrl.value.id,
          det_pedido:this.productCtrl.value.producto,
          observaciones:this.registerForm.value.observacionesProd,
          cantidad:this.registerForm.controls.cantidad.value,
          precio:this.registerForm.controls.precio.value,
          subtotal:+this.registerForm.controls.precio.value * +this.registerForm.controls.cantidad.value 
        } 
        this.detPedido.push(prodPed);
    
        this.dataSource = new MatTableDataSource(this.detPedido);
    
        this.registerForm.controls.productos.setValue(this.detPedido);
        this.productCtrl.setValue(this.productos);
        this.registerForm.controls.cantidad.setValue('');
        this.registerForm.controls.observacionesProd.setValue('');
        this.registerForm.controls.precio.setValue(''); 
      }else{
        new recursosVarios().showNotification('top', 'right', "Producto ya agregado, si desea aumentar la cantidad del pedido, anule el agregado y registrelo nuevamente con el total", 4);
      }
    }    
  }
  onSubmit() {
    
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }
    
    if(!(this.registerForm.controls.productos.value instanceof Array) || this.registerForm.controls.productos.value.length == 0){
      new recursosVarios().showNotification('top', 'right', "Debe agregar al menos un producto al pedido", 4);
    }else{
      var FECHA_INICIO = this.registerForm.controls.FECHA_INICIO.value;
      var dd = FECHA_INICIO.getDate();
      var mm = FECHA_INICIO.getMonth() + 1; //January is 0!
      var yyyy = FECHA_INICIO.getFullYear();
  
      if (dd < 10) {
        dd = '0' + dd;
      }
      if (mm < 10) {
        mm = '0' + mm;
      }
      FECHA_INICIO = dd + '/' + mm + '/' + yyyy;
  
      var FECHA_FIN = this.registerForm.controls.fecha_entrega.value;
      var dd = FECHA_FIN.getDate();
      var mm = FECHA_FIN.getMonth() + 1; //January is 0!
  
      var yyyy = FECHA_FIN.getFullYear();
      if (dd < 10) {
        dd = '0' + dd;
      }
      if (mm < 10) {
        mm = '0' + mm;
      }
      FECHA_FIN = dd + '/' + mm + '/' + yyyy;
  
      if (this.verifyStartEndDate(FECHA_INICIO, FECHA_FIN)) {
        this.registerForm.value.id_estado = 1;
        this.registerForm.value.id_usuario_crea = 1;
        this.registerForm.value.id_usuario_modifica = 1;
        //this.registerForm.value.observaciones = "NINGUNA";
        this.registerForm.value.pedido = "NUEVO PEDIDO";
        delete this.registerForm.value.observacionesProd;
        console.log(this.registerForm.value);
        
        this.api.setPedido(this.registerForm.value).subscribe(
          data => {
            new recursosVarios().showNotification('top', 'right', "Pedido realizado exitosamente", 2);
            this.router.navigate(['/components/PedidosVentas']);
          }
        );
      }else{
        new recursosVarios().showNotification('top', 'right', "La fecha de entrega debe de ser posterior a la fecha actual", 4);
      }   
    }
  }
  private verifyStartEndDate(start, end) {
    let validDate = false;
    //el formato de la fecha de entrada debe de ser dd/mm/yyy
    let startTemp = start.split("/");
    let endTemp = end.split("/");

    if (+endTemp[2] >= +startTemp[2]) {//año de inicio mayor igual al fin
      if (+endTemp[2] == +startTemp[2]) {//año de inicio igual al fin
        if (+startTemp[1] == +endTemp[1]) {//mes igual al del fin
          if (+endTemp[0] >= +startTemp[0]) {//dia mayor o igual al del fin
            validDate = true;
          }
        } else if (+endTemp[1] > +startTemp[1]) {//mes mayor al del fin
          validDate = true;
        }
      } else if (+endTemp[2] > +startTemp[2]) {
        validDate = true;
      }
    }
    return validDate;
  }
  displaydir(user?: any): string | undefined {
    return user ? user.direccion_pedido : undefined;
  }
  private _filterDir(name: string): any[] {
    const filterValue = name.toLowerCase();
    return this.optionsDirecciones.filter(option => option.direccion_pedido.toLowerCase().indexOf(filterValue) === 0);
  }
  changeDir(){
    if(this.myControlDireccion.value.id != undefined){
      this.registerForm.controls.id_direccion_pedido.setValue(this.myControlDireccion.value.id);
    }else{
      this.registerForm.controls.direccion_pedido.setValue(this.myControlDireccion.value);
    };
  }
}

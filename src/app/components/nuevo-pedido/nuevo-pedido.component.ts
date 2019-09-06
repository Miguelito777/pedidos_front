import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ReplaySubject, Subject } from 'rxjs';
import { MatSelect } from '@angular/material';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-nuevo-pedido',
  templateUrl: './nuevo-pedido.component.html',
  styleUrls: ['./nuevo-pedido.component.scss']
})
export class NuevoPedidoComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;

    /** list of banks */
    protected banks: any[] = [];

    /** control for the selected bank */
    public bankCtrl: FormControl = new FormControl();
  
    /** control for the MatSelect filter keyword */
    public bankFilterCtrl: FormControl = new FormControl();
  
    /** list of banks filtered by search keyword */
    public filteredBanks: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  
    @ViewChild('singleSelect') singleSelect: MatSelect;
  
    /** Subject that emits when the component has been destroyed. */
    protected _onDestroy = new Subject<void>();


  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    // set initial selection
    this.bankCtrl.setValue(this.banks);

    // load the initial bank list
    this.filteredBanks.next(this.banks.slice());

    // listen for search field value changes
    this.bankFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterBanks();
      });

    this.registerForm = this.formBuilder.group({
      fecha_entrega: ['', Validators.required],
      anticipo: ['', Validators.required],
      //email: ['', [Validators.required, Validators.email]],
      //password: ['', [Validators.required, Validators.minLength(6)]]
  });
  }
  protected filterBanks() {
    if (!this.banks) {
      return;
    }
    // get the search keyword
    let search = this.bankFilterCtrl.value;
    if (!search) {
      this.filteredBanks.next(this.banks.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredBanks.next(
      this.banks.filter(bank => bank.cliente.toLowerCase().indexOf(search) > -1)
    );
  }
    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }
    onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.registerForm.invalid) {
          return;
      }

      alert('SUCCESS!! :-)')
  }
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatalogoRoutingModule } from './catalogo-routing.module';
import { ClientesgComponent } from './clientesg/clientesg.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'app/app.module';

@NgModule({
  imports: [
    CommonModule,
    CatalogoRoutingModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  declarations: [ClientesgComponent]
})
export class CatalogoModule { }

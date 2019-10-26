import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientesgComponent } from './clientesg/clientesg.component';

const routes: Routes = [
  {
    path: 'clientes',
    component:ClientesgComponent
  }/*,
  {
    path: 'test-routing',
    component:TestPagComponent
  }*/
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogoRoutingModule {}

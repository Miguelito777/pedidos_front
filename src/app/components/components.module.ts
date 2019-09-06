import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../app.module';

import { ButtonsComponent } from './buttons/buttons.component';
import { ComponentsRoutes } from './components.routing';
import { GridSystemComponent } from './grid/grid.component';
import { IconsComponent } from './icons/icons.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { PanelsComponent } from './panels/panels.component';
import { SweetAlertComponent } from './sweetalert/sweetalert.component';
import { TypographyComponent } from './typography/typography.component';
import { PedidoComponent } from './pedido/pedido.component';
import { NuevoPedidoComponent } from './nuevo-pedido/nuevo-pedido.component';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatInputModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ComponentsRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MaterialModule,
    NgxMatSelectSearchModule
  ],
  declarations: [
      ButtonsComponent,
      GridSystemComponent,
      IconsComponent,
      NotificationsComponent,
      PanelsComponent,
      SweetAlertComponent,
      TypographyComponent,
      PedidoComponent,
      NuevoPedidoComponent
  ]
})

export class ComponentsModule {}

import { Routes } from '@angular/router';

import { ButtonsComponent } from './buttons/buttons.component';
import { GridSystemComponent } from './grid/grid.component';
import { IconsComponent } from './icons/icons.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { PanelsComponent } from './panels/panels.component';
import { SweetAlertComponent } from './sweetalert/sweetalert.component';
import { TypographyComponent } from './typography/typography.component';
import { PedidoComponent } from './pedido/pedido.component';
import { NuevoPedidoComponent } from './nuevo-pedido/nuevo-pedido.component';


export const ComponentsRoutes: Routes = [
    {
      path: '',
      children: [ {
        path: 'Pedidos',
        component: PedidoComponent
    },{
        path: 'nuevo-pedido',
        component: NuevoPedidoComponent
    }]}, {
    path: '',
    children: [ {
      path: 'grid',
      component: GridSystemComponent
    }]
    }, {
      path: '',
      children: [ {
        path: 'icons',
        component: IconsComponent
        }]
    }, {
        path: '',
        children: [ {
            path: 'notifications',
            component: NotificationsComponent
        }]
    }, {
        path: '',
        children: [ {
            path: 'panels',
            component: PanelsComponent
        }]
    }, {
        path: '',
        children: [ {
            path: 'sweet-alert',
            component: SweetAlertComponent
        }]
    }, {
        path: '',
        children: [ {
            path: 'typography',
            component: TypographyComponent
        }]
    }
];

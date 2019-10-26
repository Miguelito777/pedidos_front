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
import { PedidoProduccionComponent } from './pedido-produccion/pedido-produccion.component';
import { PedidosTallerComponent } from './pedidos-taller/pedidos-taller.component';
import { PedidosAdministracionComponent } from './pedidos-administracion/pedidos-administracion.component';


export const ComponentsRoutes: Routes = [
    {
      path: '',
      children: [{
        path: 'PedidosVentas',
        component: PedidoComponent
    },{
        path: 'nuevo-pedido',
        component: NuevoPedidoComponent
    },
    {
        path: 'PedidosProduccion',
        component: PedidoProduccionComponent
    },
    {
        path: 'PedidosTaller',
        component: PedidosTallerComponent
    },
    {
        path: 'PedidosAdministracion',
        component: PedidosAdministracionComponent
    }
    ]}, {
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

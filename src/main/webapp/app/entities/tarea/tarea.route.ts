import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { TareaComponent } from './tarea.component';
import { TareaDetailComponent } from './tarea-detail.component';
import { TareaPopupComponent } from './tarea-dialog.component';
import { TareaDeletePopupComponent } from './tarea-delete-dialog.component';

export const tareaRoute: Routes = [
    {
        path: 'tarea',
        component: TareaComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.tarea.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'tarea/:id',
        component: TareaDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.tarea.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const tareaPopupRoute: Routes = [
    {
        path: 'tarea-new',
        component: TareaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.tarea.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tarea/:id/edit',
        component: TareaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.tarea.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tarea/:id/delete',
        component: TareaDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.tarea.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

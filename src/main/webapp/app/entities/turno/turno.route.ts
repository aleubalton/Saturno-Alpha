import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { TurnoComponent } from './turno.component';
import { TurnoDetailComponent } from './turno-detail.component';
import { TurnoPopupComponent } from './turno-dialog.component';
import { TurnoDeletePopupComponent } from './turno-delete-dialog.component';

export const turnoRoute: Routes = [
    {
        path: 'turno',
        component: TurnoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.turno.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'turno/:id',
        component: TurnoDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.turno.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const turnoPopupRoute: Routes = [
    {
        path: 'turno-new',
        component: TurnoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.turno.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'turno/:id/edit',
        component: TurnoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.turno.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'turno/:id/delete',
        component: TurnoDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.turno.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

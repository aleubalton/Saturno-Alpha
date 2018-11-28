import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { IntervaloComponent } from './intervalo.component';
import { IntervaloDetailComponent } from './intervalo-detail.component';
import { IntervaloPopupComponent } from './intervalo-dialog.component';
import { IntervaloDeletePopupComponent } from './intervalo-delete-dialog.component';

export const intervaloRoute: Routes = [
    {
        path: 'intervalo',
        component: IntervaloComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.intervalo.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'intervalo/:id',
        component: IntervaloDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.intervalo.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const intervaloPopupRoute: Routes = [
    {
        path: 'intervalo-new',
        component: IntervaloPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.intervalo.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'intervalo/:id/edit',
        component: IntervaloPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.intervalo.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'intervalo/:id/delete',
        component: IntervaloDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.intervalo.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

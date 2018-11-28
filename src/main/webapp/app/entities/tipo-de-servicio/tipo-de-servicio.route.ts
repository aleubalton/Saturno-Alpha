import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { TipoDeServicioComponent } from './tipo-de-servicio.component';
import { TipoDeServicioDetailComponent } from './tipo-de-servicio-detail.component';
import { TipoDeServicioPopupComponent } from './tipo-de-servicio-dialog.component';
import { TipoDeServicioDeletePopupComponent } from './tipo-de-servicio-delete-dialog.component';

export const tipoDeServicioRoute: Routes = [
    {
        path: 'tipo-de-servicio',
        component: TipoDeServicioComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.tipoDeServicio.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'tipo-de-servicio/:id',
        component: TipoDeServicioDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.tipoDeServicio.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const tipoDeServicioPopupRoute: Routes = [
    {
        path: 'tipo-de-servicio-new',
        component: TipoDeServicioPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.tipoDeServicio.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tipo-de-servicio/:id/edit',
        component: TipoDeServicioPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.tipoDeServicio.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tipo-de-servicio/:id/delete',
        component: TipoDeServicioDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.tipoDeServicio.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

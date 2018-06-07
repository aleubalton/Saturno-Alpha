import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { MascotaMySuffixComponent } from './mascota-my-suffix.component';
import { MascotaMySuffixDetailComponent } from './mascota-my-suffix-detail.component';
import { MascotaMySuffixPopupComponent } from './mascota-my-suffix-dialog.component';
import { MascotaMySuffixDeletePopupComponent } from './mascota-my-suffix-delete-dialog.component';

export const mascotaRoute: Routes = [
    {
        path: 'mascota-my-suffix',
        component: MascotaMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.mascota.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'mascota-my-suffix/:id',
        component: MascotaMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.mascota.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const mascotaPopupRoute: Routes = [
    {
        path: 'mascota-my-suffix-new',
        component: MascotaMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.mascota.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'mascota-my-suffix/:id/edit',
        component: MascotaMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.mascota.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'mascota-my-suffix/:id/delete',
        component: MascotaMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.mascota.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

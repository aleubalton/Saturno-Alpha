import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { DiaNoLaborableComponent } from './dia-no-laborable.component';
import { DiaNoLaborableDetailComponent } from './dia-no-laborable-detail.component';
import { DiaNoLaborablePopupComponent } from './dia-no-laborable-dialog.component';
import { DiaNoLaborableDeletePopupComponent } from './dia-no-laborable-delete-dialog.component';

export const diaNoLaborableRoute: Routes = [
    {
        path: 'dia-no-laborable',
        component: DiaNoLaborableComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.diaNoLaborable.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'dia-no-laborable/:id',
        component: DiaNoLaborableDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.diaNoLaborable.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const diaNoLaborablePopupRoute: Routes = [
    {
        path: 'dia-no-laborable-new',
        component: DiaNoLaborablePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.diaNoLaborable.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'dia-no-laborable/:id/edit',
        component: DiaNoLaborablePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.diaNoLaborable.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'dia-no-laborable/:id/delete',
        component: DiaNoLaborableDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.diaNoLaborable.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

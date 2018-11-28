import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { AgendaComponent } from './agenda.component';
import { AgendaDetailComponent } from './agenda-detail.component';
import { AgendaPopupComponent } from './agenda-dialog.component';
import { AgendaDeletePopupComponent } from './agenda-delete-dialog.component';

export const agendaRoute: Routes = [
    {
        path: 'agenda',
        component: AgendaComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.agenda.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'agenda/:id',
        component: AgendaDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.agenda.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const agendaPopupRoute: Routes = [
    {
        path: 'agenda-new',
        component: AgendaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.agenda.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'agenda/:id/edit',
        component: AgendaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.agenda.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'agenda/:id/delete',
        component: AgendaDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.agenda.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

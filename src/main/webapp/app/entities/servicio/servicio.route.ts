import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { ServicioComponent } from './servicio.component';
import { ServicioDetailComponent } from './servicio-detail.component';
import { ServicioPopupComponent } from './servicio-dialog.component';
import { ServicioDeletePopupComponent } from './servicio-delete-dialog.component';

@Injectable()
export class ServicioResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const servicioRoute: Routes = [
    {
        path: 'servicio',
        component: ServicioComponent,
        resolve: {
            'pagingParams': ServicioResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.servicio.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'servicio/:id',
        component: ServicioDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.servicio.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const servicioPopupRoute: Routes = [
    {
        path: 'servicio-new',
        component: ServicioPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.servicio.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'servicio/:id/edit',
        component: ServicioPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.servicio.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'servicio/:id/delete',
        component: ServicioDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.servicio.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { PrecioServicioComponent } from './precio-servicio.component';
import { PrecioServicioDetailComponent } from './precio-servicio-detail.component';
import { PrecioServicioPopupComponent } from './precio-servicio-dialog.component';
import { PrecioServicioDeletePopupComponent } from './precio-servicio-delete-dialog.component';

@Injectable()
export class PrecioServicioResolvePagingParams implements Resolve<any> {

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

export const precioServicioRoute: Routes = [
    {
        path: 'precio-servicio',
        component: PrecioServicioComponent,
        resolve: {
            'pagingParams': PrecioServicioResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.precioServicio.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'precio-servicio/:id',
        component: PrecioServicioDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.precioServicio.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const precioServicioPopupRoute: Routes = [
    {
        path: 'precio-servicio-new',
        component: PrecioServicioPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.precioServicio.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'precio-servicio/:id/edit',
        component: PrecioServicioPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.precioServicio.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'precio-servicio/:id/delete',
        component: PrecioServicioDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.precioServicio.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

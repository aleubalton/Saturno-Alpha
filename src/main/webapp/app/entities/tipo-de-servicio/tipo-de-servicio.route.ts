import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { TipoDeServicioComponent } from './tipo-de-servicio.component';
import { TipoDeServicioDetailComponent } from './tipo-de-servicio-detail.component';
import { TipoDeServicioPopupComponent } from './tipo-de-servicio-dialog.component';
import { TipoDeServicioDeletePopupComponent } from './tipo-de-servicio-delete-dialog.component';

@Injectable()
export class TipoDeServicioResolvePagingParams implements Resolve<any> {

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

export const tipoDeServicioRoute: Routes = [
    {
        path: 'tipo-de-servicio',
        component: TipoDeServicioComponent,
        resolve: {
            'pagingParams': TipoDeServicioResolvePagingParams
        },
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

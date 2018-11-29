import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { VehiculoComponent } from './vehiculo.component';
import { VehiculoDetailComponent } from './vehiculo-detail.component';
import { VehiculoPopupComponent } from './vehiculo-dialog.component';
import { VehiculoDeletePopupComponent } from './vehiculo-delete-dialog.component';

@Injectable()
export class VehiculoResolvePagingParams implements Resolve<any> {

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

export const vehiculoRoute: Routes = [
    {
        path: 'vehiculo',
        component: VehiculoComponent,
        resolve: {
            'pagingParams': VehiculoResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.vehiculo.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'vehiculo/:id',
        component: VehiculoDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.vehiculo.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const vehiculoPopupRoute: Routes = [
    {
        path: 'vehiculo-new',
        component: VehiculoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.vehiculo.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'vehiculo/:id/edit',
        component: VehiculoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.vehiculo.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'vehiculo/:id/delete',
        component: VehiculoDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.vehiculo.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

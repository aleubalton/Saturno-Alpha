import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { IntervaloComponent } from './intervalo.component';
import { IntervaloDetailComponent } from './intervalo-detail.component';
import { IntervaloPopupComponent } from './intervalo-dialog.component';
import { IntervaloDeletePopupComponent } from './intervalo-delete-dialog.component';

@Injectable()
export class IntervaloResolvePagingParams implements Resolve<any> {

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

export const intervaloRoute: Routes = [
    {
        path: 'intervalo',
        component: IntervaloComponent,
        resolve: {
            'pagingParams': IntervaloResolvePagingParams
        },
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

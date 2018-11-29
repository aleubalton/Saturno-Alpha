import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { DiaNoLaborableComponent } from './dia-no-laborable.component';
import { DiaNoLaborableDetailComponent } from './dia-no-laborable-detail.component';
import { DiaNoLaborablePopupComponent } from './dia-no-laborable-dialog.component';
import { DiaNoLaborableDeletePopupComponent } from './dia-no-laborable-delete-dialog.component';

@Injectable()
export class DiaNoLaborableResolvePagingParams implements Resolve<any> {

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

export const diaNoLaborableRoute: Routes = [
    {
        path: 'dia-no-laborable',
        component: DiaNoLaborableComponent,
        resolve: {
            'pagingParams': DiaNoLaborableResolvePagingParams
        },
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

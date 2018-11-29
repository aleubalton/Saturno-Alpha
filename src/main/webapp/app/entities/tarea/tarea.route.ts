import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { TareaComponent } from './tarea.component';
import { TareaDetailComponent } from './tarea-detail.component';
import { TareaPopupComponent } from './tarea-dialog.component';
import { TareaDeletePopupComponent } from './tarea-delete-dialog.component';

@Injectable()
export class TareaResolvePagingParams implements Resolve<any> {

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

export const tareaRoute: Routes = [
    {
        path: 'tarea',
        component: TareaComponent,
        resolve: {
            'pagingParams': TareaResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.tarea.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'tarea/:id',
        component: TareaDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.tarea.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const tareaPopupRoute: Routes = [
    {
        path: 'tarea-new',
        component: TareaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.tarea.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tarea/:id/edit',
        component: TareaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.tarea.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tarea/:id/delete',
        component: TareaDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.tarea.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

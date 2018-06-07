import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { PersonaMySuffixComponent } from './persona-my-suffix.component';
import { PersonaMySuffixDetailComponent } from './persona-my-suffix-detail.component';
import { PersonaMySuffixPopupComponent } from './persona-my-suffix-dialog.component';
import { PersonaMySuffixDeletePopupComponent } from './persona-my-suffix-delete-dialog.component';

@Injectable()
export class PersonaMySuffixResolvePagingParams implements Resolve<any> {

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

export const personaRoute: Routes = [
    {
        path: 'persona-my-suffix',
        component: PersonaMySuffixComponent,
        resolve: {
            'pagingParams': PersonaMySuffixResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.persona.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'persona-my-suffix/:id',
        component: PersonaMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.persona.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const personaPopupRoute: Routes = [
    {
        path: 'persona-my-suffix-new',
        component: PersonaMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.persona.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'persona-my-suffix/:id/edit',
        component: PersonaMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.persona.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'persona-my-suffix/:id/delete',
        component: PersonaMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.persona.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

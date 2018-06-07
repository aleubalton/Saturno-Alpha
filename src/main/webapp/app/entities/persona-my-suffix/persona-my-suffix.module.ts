import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSharedModule } from '../../shared';
import {
    PersonaMySuffixService,
    PersonaMySuffixPopupService,
    PersonaMySuffixComponent,
    PersonaMySuffixDetailComponent,
    PersonaMySuffixDialogComponent,
    PersonaMySuffixPopupComponent,
    PersonaMySuffixDeletePopupComponent,
    PersonaMySuffixDeleteDialogComponent,
    personaRoute,
    personaPopupRoute,
    PersonaMySuffixResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...personaRoute,
    ...personaPopupRoute,
];

@NgModule({
    imports: [
        JhipsterSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        PersonaMySuffixComponent,
        PersonaMySuffixDetailComponent,
        PersonaMySuffixDialogComponent,
        PersonaMySuffixDeleteDialogComponent,
        PersonaMySuffixPopupComponent,
        PersonaMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        PersonaMySuffixComponent,
        PersonaMySuffixDialogComponent,
        PersonaMySuffixPopupComponent,
        PersonaMySuffixDeleteDialogComponent,
        PersonaMySuffixDeletePopupComponent,
    ],
    providers: [
        PersonaMySuffixService,
        PersonaMySuffixPopupService,
        PersonaMySuffixResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterPersonaMySuffixModule {}

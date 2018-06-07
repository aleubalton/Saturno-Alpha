import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSharedModule } from '../../shared';
import {
    MascotaMySuffixService,
    MascotaMySuffixPopupService,
    MascotaMySuffixComponent,
    MascotaMySuffixDetailComponent,
    MascotaMySuffixDialogComponent,
    MascotaMySuffixPopupComponent,
    MascotaMySuffixDeletePopupComponent,
    MascotaMySuffixDeleteDialogComponent,
    mascotaRoute,
    mascotaPopupRoute,
} from './';

const ENTITY_STATES = [
    ...mascotaRoute,
    ...mascotaPopupRoute,
];

@NgModule({
    imports: [
        JhipsterSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        MascotaMySuffixComponent,
        MascotaMySuffixDetailComponent,
        MascotaMySuffixDialogComponent,
        MascotaMySuffixDeleteDialogComponent,
        MascotaMySuffixPopupComponent,
        MascotaMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        MascotaMySuffixComponent,
        MascotaMySuffixDialogComponent,
        MascotaMySuffixPopupComponent,
        MascotaMySuffixDeleteDialogComponent,
        MascotaMySuffixDeletePopupComponent,
    ],
    providers: [
        MascotaMySuffixService,
        MascotaMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterMascotaMySuffixModule {}

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSharedModule } from '../../shared';
import {
    DiaNoLaborableService,
    DiaNoLaborablePopupService,
    DiaNoLaborableComponent,
    DiaNoLaborableDetailComponent,
    DiaNoLaborableDialogComponent,
    DiaNoLaborablePopupComponent,
    DiaNoLaborableDeletePopupComponent,
    DiaNoLaborableDeleteDialogComponent,
    diaNoLaborableRoute,
    diaNoLaborablePopupRoute,
} from './';

const ENTITY_STATES = [
    ...diaNoLaborableRoute,
    ...diaNoLaborablePopupRoute,
];

@NgModule({
    imports: [
        JhipsterSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        DiaNoLaborableComponent,
        DiaNoLaborableDetailComponent,
        DiaNoLaborableDialogComponent,
        DiaNoLaborableDeleteDialogComponent,
        DiaNoLaborablePopupComponent,
        DiaNoLaborableDeletePopupComponent,
    ],
    entryComponents: [
        DiaNoLaborableComponent,
        DiaNoLaborableDialogComponent,
        DiaNoLaborablePopupComponent,
        DiaNoLaborableDeleteDialogComponent,
        DiaNoLaborableDeletePopupComponent,
    ],
    providers: [
        DiaNoLaborableService,
        DiaNoLaborablePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterDiaNoLaborableModule {}

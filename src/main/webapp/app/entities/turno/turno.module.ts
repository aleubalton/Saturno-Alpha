import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSharedModule } from '../../shared';
import {
    TurnoService,
    TurnoPopupService,
    TurnoComponent,
    TurnoDetailComponent,
    TurnoDialogComponent,
    TurnoPopupComponent,
    TurnoDeletePopupComponent,
    TurnoDeleteDialogComponent,
    turnoRoute,
    turnoPopupRoute,
} from './';

const ENTITY_STATES = [
    ...turnoRoute,
    ...turnoPopupRoute,
];

@NgModule({
    imports: [
        JhipsterSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        TurnoComponent,
        TurnoDetailComponent,
        TurnoDialogComponent,
        TurnoDeleteDialogComponent,
        TurnoPopupComponent,
        TurnoDeletePopupComponent,
    ],
    entryComponents: [
        TurnoComponent,
        TurnoDialogComponent,
        TurnoPopupComponent,
        TurnoDeleteDialogComponent,
        TurnoDeletePopupComponent,
    ],
    providers: [
        TurnoService,
        TurnoPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterTurnoModule {}

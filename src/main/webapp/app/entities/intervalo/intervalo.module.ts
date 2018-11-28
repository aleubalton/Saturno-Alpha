import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSharedModule } from '../../shared';
import {
    IntervaloService,
    IntervaloPopupService,
    IntervaloComponent,
    IntervaloDetailComponent,
    IntervaloDialogComponent,
    IntervaloPopupComponent,
    IntervaloDeletePopupComponent,
    IntervaloDeleteDialogComponent,
    intervaloRoute,
    intervaloPopupRoute,
} from './';

const ENTITY_STATES = [
    ...intervaloRoute,
    ...intervaloPopupRoute,
];

@NgModule({
    imports: [
        JhipsterSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        IntervaloComponent,
        IntervaloDetailComponent,
        IntervaloDialogComponent,
        IntervaloDeleteDialogComponent,
        IntervaloPopupComponent,
        IntervaloDeletePopupComponent,
    ],
    entryComponents: [
        IntervaloComponent,
        IntervaloDialogComponent,
        IntervaloPopupComponent,
        IntervaloDeleteDialogComponent,
        IntervaloDeletePopupComponent,
    ],
    providers: [
        IntervaloService,
        IntervaloPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterIntervaloModule {}

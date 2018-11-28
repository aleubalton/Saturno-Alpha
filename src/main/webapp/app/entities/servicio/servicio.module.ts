import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSharedModule } from '../../shared';
import {
    ServicioService,
    ServicioPopupService,
    ServicioComponent,
    ServicioDetailComponent,
    ServicioDialogComponent,
    ServicioPopupComponent,
    ServicioDeletePopupComponent,
    ServicioDeleteDialogComponent,
    servicioRoute,
    servicioPopupRoute,
} from './';

const ENTITY_STATES = [
    ...servicioRoute,
    ...servicioPopupRoute,
];

@NgModule({
    imports: [
        JhipsterSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ServicioComponent,
        ServicioDetailComponent,
        ServicioDialogComponent,
        ServicioDeleteDialogComponent,
        ServicioPopupComponent,
        ServicioDeletePopupComponent,
    ],
    entryComponents: [
        ServicioComponent,
        ServicioDialogComponent,
        ServicioPopupComponent,
        ServicioDeleteDialogComponent,
        ServicioDeletePopupComponent,
    ],
    providers: [
        ServicioService,
        ServicioPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterServicioModule {}

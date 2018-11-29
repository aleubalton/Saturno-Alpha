import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSharedModule } from '../../shared';
import {
    PrecioServicioService,
    PrecioServicioPopupService,
    PrecioServicioComponent,
    PrecioServicioDetailComponent,
    PrecioServicioDialogComponent,
    PrecioServicioPopupComponent,
    PrecioServicioDeletePopupComponent,
    PrecioServicioDeleteDialogComponent,
    precioServicioRoute,
    precioServicioPopupRoute,
    PrecioServicioResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...precioServicioRoute,
    ...precioServicioPopupRoute,
];

@NgModule({
    imports: [
        JhipsterSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        PrecioServicioComponent,
        PrecioServicioDetailComponent,
        PrecioServicioDialogComponent,
        PrecioServicioDeleteDialogComponent,
        PrecioServicioPopupComponent,
        PrecioServicioDeletePopupComponent,
    ],
    entryComponents: [
        PrecioServicioComponent,
        PrecioServicioDialogComponent,
        PrecioServicioPopupComponent,
        PrecioServicioDeleteDialogComponent,
        PrecioServicioDeletePopupComponent,
    ],
    providers: [
        PrecioServicioService,
        PrecioServicioPopupService,
        PrecioServicioResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterPrecioServicioModule {}

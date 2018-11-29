import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSharedModule } from '../../shared';
import {
    TipoDeServicioService,
    TipoDeServicioPopupService,
    TipoDeServicioComponent,
    TipoDeServicioDetailComponent,
    TipoDeServicioDialogComponent,
    TipoDeServicioPopupComponent,
    TipoDeServicioDeletePopupComponent,
    TipoDeServicioDeleteDialogComponent,
    tipoDeServicioRoute,
    tipoDeServicioPopupRoute,
    TipoDeServicioResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...tipoDeServicioRoute,
    ...tipoDeServicioPopupRoute,
];

@NgModule({
    imports: [
        JhipsterSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        TipoDeServicioComponent,
        TipoDeServicioDetailComponent,
        TipoDeServicioDialogComponent,
        TipoDeServicioDeleteDialogComponent,
        TipoDeServicioPopupComponent,
        TipoDeServicioDeletePopupComponent,
    ],
    entryComponents: [
        TipoDeServicioComponent,
        TipoDeServicioDialogComponent,
        TipoDeServicioPopupComponent,
        TipoDeServicioDeleteDialogComponent,
        TipoDeServicioDeletePopupComponent,
    ],
    providers: [
        TipoDeServicioService,
        TipoDeServicioPopupService,
        TipoDeServicioResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterTipoDeServicioModule {}

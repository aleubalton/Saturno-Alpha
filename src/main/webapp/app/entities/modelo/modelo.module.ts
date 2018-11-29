import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSharedModule } from '../../shared';
import {
    ModeloService,
    ModeloPopupService,
    ModeloComponent,
    ModeloDetailComponent,
    ModeloDialogComponent,
    ModeloPopupComponent,
    ModeloDeletePopupComponent,
    ModeloDeleteDialogComponent,
    modeloRoute,
    modeloPopupRoute,
    ModeloResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...modeloRoute,
    ...modeloPopupRoute,
];

@NgModule({
    imports: [
        JhipsterSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ModeloComponent,
        ModeloDetailComponent,
        ModeloDialogComponent,
        ModeloDeleteDialogComponent,
        ModeloPopupComponent,
        ModeloDeletePopupComponent,
    ],
    entryComponents: [
        ModeloComponent,
        ModeloDialogComponent,
        ModeloPopupComponent,
        ModeloDeleteDialogComponent,
        ModeloDeletePopupComponent,
    ],
    providers: [
        ModeloService,
        ModeloPopupService,
        ModeloResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterModeloModule {}

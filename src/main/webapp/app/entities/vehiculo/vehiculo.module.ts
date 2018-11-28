import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSharedModule } from '../../shared';
import {
    VehiculoService,
    VehiculoPopupService,
    VehiculoComponent,
    VehiculoDetailComponent,
    VehiculoDialogComponent,
    VehiculoPopupComponent,
    VehiculoDeletePopupComponent,
    VehiculoDeleteDialogComponent,
    vehiculoRoute,
    vehiculoPopupRoute,
} from './';

const ENTITY_STATES = [
    ...vehiculoRoute,
    ...vehiculoPopupRoute,
];

@NgModule({
    imports: [
        JhipsterSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        VehiculoComponent,
        VehiculoDetailComponent,
        VehiculoDialogComponent,
        VehiculoDeleteDialogComponent,
        VehiculoPopupComponent,
        VehiculoDeletePopupComponent,
    ],
    entryComponents: [
        VehiculoComponent,
        VehiculoDialogComponent,
        VehiculoPopupComponent,
        VehiculoDeleteDialogComponent,
        VehiculoDeletePopupComponent,
    ],
    providers: [
        VehiculoService,
        VehiculoPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterVehiculoModule {}

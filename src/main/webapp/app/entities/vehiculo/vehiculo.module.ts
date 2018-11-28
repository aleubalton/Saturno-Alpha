import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSharedModule } from 'app/shared';
import {
  VehiculoComponent,
  VehiculoDetailComponent,
  VehiculoUpdateComponent,
  VehiculoDeletePopupComponent,
  VehiculoDeleteDialogComponent,
  vehiculoRoute,
  vehiculoPopupRoute
} from './';

const ENTITY_STATES = [...vehiculoRoute, ...vehiculoPopupRoute];

@NgModule({
  imports: [JhipsterSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    VehiculoComponent,
    VehiculoDetailComponent,
    VehiculoUpdateComponent,
    VehiculoDeleteDialogComponent,
    VehiculoDeletePopupComponent
  ],
  entryComponents: [VehiculoComponent, VehiculoUpdateComponent, VehiculoDeleteDialogComponent, VehiculoDeletePopupComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterVehiculoModule {}

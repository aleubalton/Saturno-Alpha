import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSharedModule } from 'app/shared';
import {
  ServicioComponent,
  ServicioDetailComponent,
  ServicioUpdateComponent,
  ServicioDeletePopupComponent,
  ServicioDeleteDialogComponent,
  servicioRoute,
  servicioPopupRoute
} from './';

const ENTITY_STATES = [...servicioRoute, ...servicioPopupRoute];

@NgModule({
  imports: [JhipsterSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    ServicioComponent,
    ServicioDetailComponent,
    ServicioUpdateComponent,
    ServicioDeleteDialogComponent,
    ServicioDeletePopupComponent
  ],
  entryComponents: [ServicioComponent, ServicioUpdateComponent, ServicioDeleteDialogComponent, ServicioDeletePopupComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterServicioModule {}

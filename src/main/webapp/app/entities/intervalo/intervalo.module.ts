import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSharedModule } from 'app/shared';
import {
  IntervaloComponent,
  IntervaloDetailComponent,
  IntervaloUpdateComponent,
  IntervaloDeletePopupComponent,
  IntervaloDeleteDialogComponent,
  intervaloRoute,
  intervaloPopupRoute
} from './';

const ENTITY_STATES = [...intervaloRoute, ...intervaloPopupRoute];

@NgModule({
  imports: [JhipsterSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    IntervaloComponent,
    IntervaloDetailComponent,
    IntervaloUpdateComponent,
    IntervaloDeleteDialogComponent,
    IntervaloDeletePopupComponent
  ],
  entryComponents: [IntervaloComponent, IntervaloUpdateComponent, IntervaloDeleteDialogComponent, IntervaloDeletePopupComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterIntervaloModule {}

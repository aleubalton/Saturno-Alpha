import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSharedModule } from 'app/shared';
import {
  TareaComponent,
  TareaDetailComponent,
  TareaUpdateComponent,
  TareaDeletePopupComponent,
  TareaDeleteDialogComponent,
  tareaRoute,
  tareaPopupRoute
} from './';

const ENTITY_STATES = [...tareaRoute, ...tareaPopupRoute];

@NgModule({
  imports: [JhipsterSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [TareaComponent, TareaDetailComponent, TareaUpdateComponent, TareaDeleteDialogComponent, TareaDeletePopupComponent],
  entryComponents: [TareaComponent, TareaUpdateComponent, TareaDeleteDialogComponent, TareaDeletePopupComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterTareaModule {}

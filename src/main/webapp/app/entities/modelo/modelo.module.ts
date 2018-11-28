import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSharedModule } from 'app/shared';
import {
  ModeloComponent,
  ModeloDetailComponent,
  ModeloUpdateComponent,
  ModeloDeletePopupComponent,
  ModeloDeleteDialogComponent,
  modeloRoute,
  modeloPopupRoute
} from './';

const ENTITY_STATES = [...modeloRoute, ...modeloPopupRoute];

@NgModule({
  imports: [JhipsterSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [ModeloComponent, ModeloDetailComponent, ModeloUpdateComponent, ModeloDeleteDialogComponent, ModeloDeletePopupComponent],
  entryComponents: [ModeloComponent, ModeloUpdateComponent, ModeloDeleteDialogComponent, ModeloDeletePopupComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterModeloModule {}

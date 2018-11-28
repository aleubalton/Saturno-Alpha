import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSharedModule } from 'app/shared';
import {
  AgendaComponent,
  AgendaDetailComponent,
  AgendaUpdateComponent,
  AgendaDeletePopupComponent,
  AgendaDeleteDialogComponent,
  agendaRoute,
  agendaPopupRoute
} from './';

const ENTITY_STATES = [...agendaRoute, ...agendaPopupRoute];

@NgModule({
  imports: [JhipsterSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [AgendaComponent, AgendaDetailComponent, AgendaUpdateComponent, AgendaDeleteDialogComponent, AgendaDeletePopupComponent],
  entryComponents: [AgendaComponent, AgendaUpdateComponent, AgendaDeleteDialogComponent, AgendaDeletePopupComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterAgendaModule {}

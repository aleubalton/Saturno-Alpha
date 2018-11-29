import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSharedModule } from '../../shared';
import {
    AgendaService,
    AgendaPopupService,
    AgendaComponent,
    AgendaDetailComponent,
    AgendaDialogComponent,
    AgendaPopupComponent,
    AgendaDeletePopupComponent,
    AgendaDeleteDialogComponent,
    agendaRoute,
    agendaPopupRoute,
    AgendaResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...agendaRoute,
    ...agendaPopupRoute,
];

@NgModule({
    imports: [
        JhipsterSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        AgendaComponent,
        AgendaDetailComponent,
        AgendaDialogComponent,
        AgendaDeleteDialogComponent,
        AgendaPopupComponent,
        AgendaDeletePopupComponent,
    ],
    entryComponents: [
        AgendaComponent,
        AgendaDialogComponent,
        AgendaPopupComponent,
        AgendaDeleteDialogComponent,
        AgendaDeletePopupComponent,
    ],
    providers: [
        AgendaService,
        AgendaPopupService,
        AgendaResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterAgendaModule {}

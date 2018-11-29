import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSharedModule } from '../../shared';
import {
    TareaService,
    TareaPopupService,
    TareaComponent,
    TareaDetailComponent,
    TareaDialogComponent,
    TareaPopupComponent,
    TareaDeletePopupComponent,
    TareaDeleteDialogComponent,
    tareaRoute,
    tareaPopupRoute,
    TareaResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...tareaRoute,
    ...tareaPopupRoute,
];

@NgModule({
    imports: [
        JhipsterSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        TareaComponent,
        TareaDetailComponent,
        TareaDialogComponent,
        TareaDeleteDialogComponent,
        TareaPopupComponent,
        TareaDeletePopupComponent,
    ],
    entryComponents: [
        TareaComponent,
        TareaDialogComponent,
        TareaPopupComponent,
        TareaDeleteDialogComponent,
        TareaDeletePopupComponent,
    ],
    providers: [
        TareaService,
        TareaPopupService,
        TareaResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterTareaModule {}

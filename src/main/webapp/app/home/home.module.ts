import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSharedModule } from '../shared';

import { HOME_ROUTE, HomeComponent, LoginService} from './';

@NgModule({
    imports: [
        JhipsterSharedModule,
        RouterModule.forChild([ HOME_ROUTE ])
    ],
    declarations: [
        HomeComponent,
    ],
    entryComponents: [
    ],
    providers: [
        LoginService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterHomeModule {}

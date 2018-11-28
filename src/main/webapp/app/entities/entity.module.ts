import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { JhipsterTurnoModule } from './turno/turno.module';
import { JhipsterClienteModule } from './cliente/cliente.module';
import { JhipsterVehiculoModule } from './vehiculo/vehiculo.module';
import { JhipsterModeloModule } from './modelo/modelo.module';
import { JhipsterTipoDeServicioModule } from './tipo-de-servicio/tipo-de-servicio.module';
import { JhipsterServicioModule } from './servicio/servicio.module';
import { JhipsterTareaModule } from './tarea/tarea.module';
import { JhipsterAgendaModule } from './agenda/agenda.module';
import { JhipsterIntervaloModule } from './intervalo/intervalo.module';
import { JhipsterDiaNoLaborableModule } from './dia-no-laborable/dia-no-laborable.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        JhipsterTurnoModule,
        JhipsterClienteModule,
        JhipsterVehiculoModule,
        JhipsterModeloModule,
        JhipsterTipoDeServicioModule,
        JhipsterServicioModule,
        JhipsterTareaModule,
        JhipsterAgendaModule,
        JhipsterIntervaloModule,
        JhipsterDiaNoLaborableModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterEntityModule {}

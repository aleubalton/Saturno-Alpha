import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { TipoDeServicio } from './tipo-de-servicio.model';
import { TipoDeServicioService } from './tipo-de-servicio.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-tipo-de-servicio',
    templateUrl: './tipo-de-servicio.component.html'
})
export class TipoDeServicioComponent implements OnInit, OnDestroy {
tipoDeServicios: TipoDeServicio[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private tipoDeServicioService: TipoDeServicioService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.tipoDeServicioService.query().subscribe(
            (res: HttpResponse<TipoDeServicio[]>) => {
                this.tipoDeServicios = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInTipoDeServicios();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: TipoDeServicio) {
        return item.id;
    }
    registerChangeInTipoDeServicios() {
        this.eventSubscriber = this.eventManager.subscribe('tipoDeServicioListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}

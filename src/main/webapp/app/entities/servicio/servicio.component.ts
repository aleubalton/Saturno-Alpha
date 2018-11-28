import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Servicio } from './servicio.model';
import { ServicioService } from './servicio.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-servicio',
    templateUrl: './servicio.component.html'
})
export class ServicioComponent implements OnInit, OnDestroy {
servicios: Servicio[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private servicioService: ServicioService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.servicioService.query().subscribe(
            (res: HttpResponse<Servicio[]>) => {
                this.servicios = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInServicios();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Servicio) {
        return item.id;
    }
    registerChangeInServicios() {
        this.eventSubscriber = this.eventManager.subscribe('servicioListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}

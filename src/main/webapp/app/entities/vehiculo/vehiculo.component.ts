import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Vehiculo } from './vehiculo.model';
import { VehiculoService } from './vehiculo.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-vehiculo',
    templateUrl: './vehiculo.component.html'
})
export class VehiculoComponent implements OnInit, OnDestroy {
vehiculos: Vehiculo[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private vehiculoService: VehiculoService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.vehiculoService.query().subscribe(
            (res: HttpResponse<Vehiculo[]>) => {
                this.vehiculos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInVehiculos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Vehiculo) {
        return item.id;
    }
    registerChangeInVehiculos() {
        this.eventSubscriber = this.eventManager.subscribe('vehiculoListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}

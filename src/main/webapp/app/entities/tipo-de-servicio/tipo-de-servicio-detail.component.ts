import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { TipoDeServicio } from './tipo-de-servicio.model';
import { TipoDeServicioService } from './tipo-de-servicio.service';

@Component({
    selector: 'jhi-tipo-de-servicio-detail',
    templateUrl: './tipo-de-servicio-detail.component.html'
})
export class TipoDeServicioDetailComponent implements OnInit, OnDestroy {

    tipoDeServicio: TipoDeServicio;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private tipoDeServicioService: TipoDeServicioService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTipoDeServicios();
    }

    load(id) {
        this.tipoDeServicioService.find(id)
            .subscribe((tipoDeServicioResponse: HttpResponse<TipoDeServicio>) => {
                this.tipoDeServicio = tipoDeServicioResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInTipoDeServicios() {
        this.eventSubscriber = this.eventManager.subscribe(
            'tipoDeServicioListModification',
            (response) => this.load(this.tipoDeServicio.id)
        );
    }
}

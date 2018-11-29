import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { PrecioServicio } from './precio-servicio.model';
import { PrecioServicioService } from './precio-servicio.service';

@Component({
    selector: 'jhi-precio-servicio-detail',
    templateUrl: './precio-servicio-detail.component.html'
})
export class PrecioServicioDetailComponent implements OnInit, OnDestroy {

    precioServicio: PrecioServicio;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private precioServicioService: PrecioServicioService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInPrecioServicios();
    }

    load(id) {
        this.precioServicioService.find(id)
            .subscribe((precioServicioResponse: HttpResponse<PrecioServicio>) => {
                this.precioServicio = precioServicioResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPrecioServicios() {
        this.eventSubscriber = this.eventManager.subscribe(
            'precioServicioListModification',
            (response) => this.load(this.precioServicio.id)
        );
    }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Intervalo } from './intervalo.model';
import { IntervaloService } from './intervalo.service';

@Component({
    selector: 'jhi-intervalo-detail',
    templateUrl: './intervalo-detail.component.html'
})
export class IntervaloDetailComponent implements OnInit, OnDestroy {

    intervalo: Intervalo;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private intervaloService: IntervaloService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInIntervalos();
    }

    load(id) {
        this.intervaloService.find(id)
            .subscribe((intervaloResponse: HttpResponse<Intervalo>) => {
                this.intervalo = intervaloResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInIntervalos() {
        this.eventSubscriber = this.eventManager.subscribe(
            'intervaloListModification',
            (response) => this.load(this.intervalo.id)
        );
    }
}

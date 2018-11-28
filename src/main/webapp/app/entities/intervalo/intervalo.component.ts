import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Intervalo } from './intervalo.model';
import { IntervaloService } from './intervalo.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-intervalo',
    templateUrl: './intervalo.component.html'
})
export class IntervaloComponent implements OnInit, OnDestroy {
intervalos: Intervalo[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private intervaloService: IntervaloService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.intervaloService.query().subscribe(
            (res: HttpResponse<Intervalo[]>) => {
                this.intervalos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInIntervalos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Intervalo) {
        return item.id;
    }
    registerChangeInIntervalos() {
        this.eventSubscriber = this.eventManager.subscribe('intervaloListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}

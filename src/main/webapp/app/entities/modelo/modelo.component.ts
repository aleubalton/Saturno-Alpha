import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Modelo } from './modelo.model';
import { ModeloService } from './modelo.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-modelo',
    templateUrl: './modelo.component.html'
})
export class ModeloComponent implements OnInit, OnDestroy {
modelos: Modelo[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private modeloService: ModeloService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.modeloService.query().subscribe(
            (res: HttpResponse<Modelo[]>) => {
                this.modelos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInModelos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Modelo) {
        return item.id;
    }
    registerChangeInModelos() {
        this.eventSubscriber = this.eventManager.subscribe('modeloListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}

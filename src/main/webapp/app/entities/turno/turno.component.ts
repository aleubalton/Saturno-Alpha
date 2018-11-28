import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Turno } from './turno.model';
import { TurnoService } from './turno.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-turno',
    templateUrl: './turno.component.html'
})
export class TurnoComponent implements OnInit, OnDestroy {
turnos: Turno[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private turnoService: TurnoService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.turnoService.query().subscribe(
            (res: HttpResponse<Turno[]>) => {
                this.turnos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInTurnos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Turno) {
        return item.id;
    }
    registerChangeInTurnos() {
        this.eventSubscriber = this.eventManager.subscribe('turnoListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}

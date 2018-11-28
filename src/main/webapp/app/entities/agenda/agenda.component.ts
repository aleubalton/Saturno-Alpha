import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Agenda } from './agenda.model';
import { AgendaService } from './agenda.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-agenda',
    templateUrl: './agenda.component.html'
})
export class AgendaComponent implements OnInit, OnDestroy {
agenda: Agenda[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private agendaService: AgendaService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.agendaService.query().subscribe(
            (res: HttpResponse<Agenda[]>) => {
                this.agenda = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInAgenda();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Agenda) {
        return item.id;
    }
    registerChangeInAgenda() {
        this.eventSubscriber = this.eventManager.subscribe('agendaListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}

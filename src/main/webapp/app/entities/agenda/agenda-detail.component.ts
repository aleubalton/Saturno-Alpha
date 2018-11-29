import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Agenda } from './agenda.model';
import { AgendaService } from './agenda.service';

@Component({
    selector: 'jhi-agenda-detail',
    templateUrl: './agenda-detail.component.html'
})
export class AgendaDetailComponent implements OnInit, OnDestroy {

    agenda: Agenda;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private agendaService: AgendaService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInAgenda();
    }

    load(id) {
        this.agendaService.find(id)
            .subscribe((agendaResponse: HttpResponse<Agenda>) => {
                this.agenda = agendaResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInAgenda() {
        this.eventSubscriber = this.eventManager.subscribe(
            'agendaListModification',
            (response) => this.load(this.agenda.id)
        );
    }
}

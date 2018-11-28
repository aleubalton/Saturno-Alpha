import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Tarea } from './tarea.model';
import { TareaService } from './tarea.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-tarea',
    templateUrl: './tarea.component.html'
})
export class TareaComponent implements OnInit, OnDestroy {
tareas: Tarea[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private tareaService: TareaService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.tareaService.query().subscribe(
            (res: HttpResponse<Tarea[]>) => {
                this.tareas = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInTareas();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Tarea) {
        return item.id;
    }
    registerChangeInTareas() {
        this.eventSubscriber = this.eventManager.subscribe('tareaListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}

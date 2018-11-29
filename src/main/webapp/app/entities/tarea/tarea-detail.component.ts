import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Tarea } from './tarea.model';
import { TareaService } from './tarea.service';

@Component({
    selector: 'jhi-tarea-detail',
    templateUrl: './tarea-detail.component.html'
})
export class TareaDetailComponent implements OnInit, OnDestroy {

    tarea: Tarea;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private tareaService: TareaService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTareas();
    }

    load(id) {
        this.tareaService.find(id)
            .subscribe((tareaResponse: HttpResponse<Tarea>) => {
                this.tarea = tareaResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInTareas() {
        this.eventSubscriber = this.eventManager.subscribe(
            'tareaListModification',
            (response) => this.load(this.tarea.id)
        );
    }
}

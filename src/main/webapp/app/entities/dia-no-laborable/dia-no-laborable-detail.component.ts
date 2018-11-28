import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { DiaNoLaborable } from './dia-no-laborable.model';
import { DiaNoLaborableService } from './dia-no-laborable.service';

@Component({
    selector: 'jhi-dia-no-laborable-detail',
    templateUrl: './dia-no-laborable-detail.component.html'
})
export class DiaNoLaborableDetailComponent implements OnInit, OnDestroy {

    diaNoLaborable: DiaNoLaborable;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private diaNoLaborableService: DiaNoLaborableService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInDiaNoLaborables();
    }

    load(id) {
        this.diaNoLaborableService.find(id)
            .subscribe((diaNoLaborableResponse: HttpResponse<DiaNoLaborable>) => {
                this.diaNoLaborable = diaNoLaborableResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInDiaNoLaborables() {
        this.eventSubscriber = this.eventManager.subscribe(
            'diaNoLaborableListModification',
            (response) => this.load(this.diaNoLaborable.id)
        );
    }
}

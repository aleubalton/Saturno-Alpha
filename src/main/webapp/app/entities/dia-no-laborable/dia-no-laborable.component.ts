import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { DiaNoLaborable } from './dia-no-laborable.model';
import { DiaNoLaborableService } from './dia-no-laborable.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-dia-no-laborable',
    templateUrl: './dia-no-laborable.component.html'
})
export class DiaNoLaborableComponent implements OnInit, OnDestroy {
diaNoLaborables: DiaNoLaborable[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private diaNoLaborableService: DiaNoLaborableService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.diaNoLaborableService.query().subscribe(
            (res: HttpResponse<DiaNoLaborable[]>) => {
                this.diaNoLaborables = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInDiaNoLaborables();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: DiaNoLaborable) {
        return item.id;
    }
    registerChangeInDiaNoLaborables() {
        this.eventSubscriber = this.eventManager.subscribe('diaNoLaborableListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { MascotaMySuffix } from './mascota-my-suffix.model';
import { MascotaMySuffixService } from './mascota-my-suffix.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-mascota-my-suffix',
    templateUrl: './mascota-my-suffix.component.html'
})
export class MascotaMySuffixComponent implements OnInit, OnDestroy {
mascotas: MascotaMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private mascotaService: MascotaMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.mascotaService.query().subscribe(
            (res: HttpResponse<MascotaMySuffix[]>) => {
                this.mascotas = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInMascotas();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: MascotaMySuffix) {
        return item.id;
    }
    registerChangeInMascotas() {
        this.eventSubscriber = this.eventManager.subscribe('mascotaListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { MascotaMySuffix } from './mascota-my-suffix.model';
import { MascotaMySuffixService } from './mascota-my-suffix.service';

@Component({
    selector: 'jhi-mascota-my-suffix-detail',
    templateUrl: './mascota-my-suffix-detail.component.html'
})
export class MascotaMySuffixDetailComponent implements OnInit, OnDestroy {

    mascota: MascotaMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private mascotaService: MascotaMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInMascotas();
    }

    load(id) {
        this.mascotaService.find(id)
            .subscribe((mascotaResponse: HttpResponse<MascotaMySuffix>) => {
                this.mascota = mascotaResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInMascotas() {
        this.eventSubscriber = this.eventManager.subscribe(
            'mascotaListModification',
            (response) => this.load(this.mascota.id)
        );
    }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { PersonaMySuffix } from './persona-my-suffix.model';
import { PersonaMySuffixService } from './persona-my-suffix.service';

@Component({
    selector: 'jhi-persona-my-suffix-detail',
    templateUrl: './persona-my-suffix-detail.component.html'
})
export class PersonaMySuffixDetailComponent implements OnInit, OnDestroy {

    persona: PersonaMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private personaService: PersonaMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInPersonas();
    }

    load(id) {
        this.personaService.find(id)
            .subscribe((personaResponse: HttpResponse<PersonaMySuffix>) => {
                this.persona = personaResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPersonas() {
        this.eventSubscriber = this.eventManager.subscribe(
            'personaListModification',
            (response) => this.load(this.persona.id)
        );
    }
}

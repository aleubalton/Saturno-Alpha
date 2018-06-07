import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { PersonaMySuffix } from './persona-my-suffix.model';
import { PersonaMySuffixPopupService } from './persona-my-suffix-popup.service';
import { PersonaMySuffixService } from './persona-my-suffix.service';

@Component({
    selector: 'jhi-persona-my-suffix-dialog',
    templateUrl: './persona-my-suffix-dialog.component.html'
})
export class PersonaMySuffixDialogComponent implements OnInit {

    persona: PersonaMySuffix;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private personaService: PersonaMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.persona.id !== undefined) {
            this.subscribeToSaveResponse(
                this.personaService.update(this.persona));
        } else {
            this.subscribeToSaveResponse(
                this.personaService.create(this.persona));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<PersonaMySuffix>>) {
        result.subscribe((res: HttpResponse<PersonaMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: PersonaMySuffix) {
        this.eventManager.broadcast({ name: 'personaListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-persona-my-suffix-popup',
    template: ''
})
export class PersonaMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private personaPopupService: PersonaMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.personaPopupService
                    .open(PersonaMySuffixDialogComponent as Component, params['id']);
            } else {
                this.personaPopupService
                    .open(PersonaMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { MascotaMySuffix } from './mascota-my-suffix.model';
import { MascotaMySuffixPopupService } from './mascota-my-suffix-popup.service';
import { MascotaMySuffixService } from './mascota-my-suffix.service';
import { PersonaMySuffix, PersonaMySuffixService } from '../persona-my-suffix';

@Component({
    selector: 'jhi-mascota-my-suffix-dialog',
    templateUrl: './mascota-my-suffix-dialog.component.html'
})
export class MascotaMySuffixDialogComponent implements OnInit {

    mascota: MascotaMySuffix;
    isSaving: boolean;

    personas: PersonaMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private mascotaService: MascotaMySuffixService,
        private personaService: PersonaMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.personaService.query()
            .subscribe((res: HttpResponse<PersonaMySuffix[]>) => { this.personas = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.mascota.id !== undefined) {
            this.subscribeToSaveResponse(
                this.mascotaService.update(this.mascota));
        } else {
            this.subscribeToSaveResponse(
                this.mascotaService.create(this.mascota));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<MascotaMySuffix>>) {
        result.subscribe((res: HttpResponse<MascotaMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: MascotaMySuffix) {
        this.eventManager.broadcast({ name: 'mascotaListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackPersonaById(index: number, item: PersonaMySuffix) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-mascota-my-suffix-popup',
    template: ''
})
export class MascotaMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private mascotaPopupService: MascotaMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.mascotaPopupService
                    .open(MascotaMySuffixDialogComponent as Component, params['id']);
            } else {
                this.mascotaPopupService
                    .open(MascotaMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

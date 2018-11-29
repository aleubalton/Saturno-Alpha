import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Intervalo } from './intervalo.model';
import { IntervaloPopupService } from './intervalo-popup.service';
import { IntervaloService } from './intervalo.service';
import { Agenda, AgendaService } from '../agenda';

@Component({
    selector: 'jhi-intervalo-dialog',
    templateUrl: './intervalo-dialog.component.html'
})
export class IntervaloDialogComponent implements OnInit {

    intervalo: Intervalo;
    isSaving: boolean;

    agenda: Agenda[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private intervaloService: IntervaloService,
        private agendaService: AgendaService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.agendaService.query()
            .subscribe((res: HttpResponse<Agenda[]>) => { this.agenda = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.intervalo.id !== undefined) {
            this.subscribeToSaveResponse(
                this.intervaloService.update(this.intervalo));
        } else {
            this.subscribeToSaveResponse(
                this.intervaloService.create(this.intervalo));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Intervalo>>) {
        result.subscribe((res: HttpResponse<Intervalo>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Intervalo) {
        this.eventManager.broadcast({ name: 'intervaloListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackAgendaById(index: number, item: Agenda) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}

@Component({
    selector: 'jhi-intervalo-popup',
    template: ''
})
export class IntervaloPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private intervaloPopupService: IntervaloPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.intervaloPopupService
                    .open(IntervaloDialogComponent as Component, params['id']);
            } else {
                this.intervaloPopupService
                    .open(IntervaloDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { DiaNoLaborable } from './dia-no-laborable.model';
import { DiaNoLaborablePopupService } from './dia-no-laborable-popup.service';
import { DiaNoLaborableService } from './dia-no-laborable.service';
import { Agenda, AgendaService } from '../agenda';

@Component({
    selector: 'jhi-dia-no-laborable-dialog',
    templateUrl: './dia-no-laborable-dialog.component.html'
})
export class DiaNoLaborableDialogComponent implements OnInit {

    diaNoLaborable: DiaNoLaborable;
    isSaving: boolean;

    agenda: Agenda[];
    fechaDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private diaNoLaborableService: DiaNoLaborableService,
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
        if (this.diaNoLaborable.id !== undefined) {
            this.subscribeToSaveResponse(
                this.diaNoLaborableService.update(this.diaNoLaborable));
        } else {
            this.subscribeToSaveResponse(
                this.diaNoLaborableService.create(this.diaNoLaborable));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<DiaNoLaborable>>) {
        result.subscribe((res: HttpResponse<DiaNoLaborable>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: DiaNoLaborable) {
        this.eventManager.broadcast({ name: 'diaNoLaborableListModification', content: 'OK'});
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
    selector: 'jhi-dia-no-laborable-popup',
    template: ''
})
export class DiaNoLaborablePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private diaNoLaborablePopupService: DiaNoLaborablePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.diaNoLaborablePopupService
                    .open(DiaNoLaborableDialogComponent as Component, params['id']);
            } else {
                this.diaNoLaborablePopupService
                    .open(DiaNoLaborableDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

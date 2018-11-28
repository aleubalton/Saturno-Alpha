import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Agenda } from './agenda.model';
import { AgendaPopupService } from './agenda-popup.service';
import { AgendaService } from './agenda.service';
import { Intervalo, IntervaloService } from '../intervalo';
import { DiaNoLaborable, DiaNoLaborableService } from '../dia-no-laborable';

@Component({
    selector: 'jhi-agenda-dialog',
    templateUrl: './agenda-dialog.component.html'
})
export class AgendaDialogComponent implements OnInit {

    agenda: Agenda;
    isSaving: boolean;

    intervalos: Intervalo[];

    dianolaborables: DiaNoLaborable[];
    fechaDesdeDp: any;
    fechaHastaDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private agendaService: AgendaService,
        private intervaloService: IntervaloService,
        private diaNoLaborableService: DiaNoLaborableService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.intervaloService.query()
            .subscribe((res: HttpResponse<Intervalo[]>) => { this.intervalos = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.diaNoLaborableService.query()
            .subscribe((res: HttpResponse<DiaNoLaborable[]>) => { this.dianolaborables = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.agenda.id !== undefined) {
            this.subscribeToSaveResponse(
                this.agendaService.update(this.agenda));
        } else {
            this.subscribeToSaveResponse(
                this.agendaService.create(this.agenda));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Agenda>>) {
        result.subscribe((res: HttpResponse<Agenda>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Agenda) {
        this.eventManager.broadcast({ name: 'agendaListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackIntervaloById(index: number, item: Intervalo) {
        return item.id;
    }

    trackDiaNoLaborableById(index: number, item: DiaNoLaborable) {
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
    selector: 'jhi-agenda-popup',
    template: ''
})
export class AgendaPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private agendaPopupService: AgendaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.agendaPopupService
                    .open(AgendaDialogComponent as Component, params['id']);
            } else {
                this.agendaPopupService
                    .open(AgendaDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

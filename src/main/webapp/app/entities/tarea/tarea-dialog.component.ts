import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Tarea } from './tarea.model';
import { TareaPopupService } from './tarea-popup.service';
import { TareaService } from './tarea.service';
import { Servicio, ServicioService } from '../servicio';

@Component({
    selector: 'jhi-tarea-dialog',
    templateUrl: './tarea-dialog.component.html'
})
export class TareaDialogComponent implements OnInit {

    tarea: Tarea;
    isSaving: boolean;

    servicios: Servicio[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private tareaService: TareaService,
        private servicioService: ServicioService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.servicioService.query()
            .subscribe((res: HttpResponse<Servicio[]>) => { this.servicios = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.tarea.id !== undefined) {
            this.subscribeToSaveResponse(
                this.tareaService.update(this.tarea));
        } else {
            this.subscribeToSaveResponse(
                this.tareaService.create(this.tarea));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Tarea>>) {
        result.subscribe((res: HttpResponse<Tarea>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Tarea) {
        this.eventManager.broadcast({ name: 'tareaListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackServicioById(index: number, item: Servicio) {
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
    selector: 'jhi-tarea-popup',
    template: ''
})
export class TareaPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tareaPopupService: TareaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.tareaPopupService
                    .open(TareaDialogComponent as Component, params['id']);
            } else {
                this.tareaPopupService
                    .open(TareaDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

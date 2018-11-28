import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Servicio } from './servicio.model';
import { ServicioPopupService } from './servicio-popup.service';
import { ServicioService } from './servicio.service';
import { TipoDeServicio, TipoDeServicioService } from '../tipo-de-servicio';
import { Tarea, TareaService } from '../tarea';
import { Turno, TurnoService } from '../turno';

@Component({
    selector: 'jhi-servicio-dialog',
    templateUrl: './servicio-dialog.component.html'
})
export class ServicioDialogComponent implements OnInit {

    servicio: Servicio;
    isSaving: boolean;

    tipodeservicios: TipoDeServicio[];

    tareas: Tarea[];

    turnos: Turno[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private servicioService: ServicioService,
        private tipoDeServicioService: TipoDeServicioService,
        private tareaService: TareaService,
        private turnoService: TurnoService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.tipoDeServicioService.query()
            .subscribe((res: HttpResponse<TipoDeServicio[]>) => { this.tipodeservicios = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.tareaService.query()
            .subscribe((res: HttpResponse<Tarea[]>) => { this.tareas = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.turnoService.query()
            .subscribe((res: HttpResponse<Turno[]>) => { this.turnos = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.servicio.id !== undefined) {
            this.subscribeToSaveResponse(
                this.servicioService.update(this.servicio));
        } else {
            this.subscribeToSaveResponse(
                this.servicioService.create(this.servicio));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Servicio>>) {
        result.subscribe((res: HttpResponse<Servicio>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Servicio) {
        this.eventManager.broadcast({ name: 'servicioListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackTipoDeServicioById(index: number, item: TipoDeServicio) {
        return item.id;
    }

    trackTareaById(index: number, item: Tarea) {
        return item.id;
    }

    trackTurnoById(index: number, item: Turno) {
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
    selector: 'jhi-servicio-popup',
    template: ''
})
export class ServicioPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private servicioPopupService: ServicioPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.servicioPopupService
                    .open(ServicioDialogComponent as Component, params['id']);
            } else {
                this.servicioPopupService
                    .open(ServicioDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

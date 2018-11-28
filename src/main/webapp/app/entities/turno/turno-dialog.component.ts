import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Turno } from './turno.model';
import { TurnoPopupService } from './turno-popup.service';
import { TurnoService } from './turno.service';
import { Agenda, AgendaService } from '../agenda';
import { Servicio, ServicioService } from '../servicio';
import { Cliente, ClienteService } from '../cliente';
import { Vehiculo, VehiculoService } from '../vehiculo';

@Component({
    selector: 'jhi-turno-dialog',
    templateUrl: './turno-dialog.component.html'
})
export class TurnoDialogComponent implements OnInit {

    turno: Turno;
    isSaving: boolean;

    agenda: Agenda[];

    servicios: Servicio[];

    clientes: Cliente[];

    vehiculos: Vehiculo[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private turnoService: TurnoService,
        private agendaService: AgendaService,
        private servicioService: ServicioService,
        private clienteService: ClienteService,
        private vehiculoService: VehiculoService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.agendaService.query()
            .subscribe((res: HttpResponse<Agenda[]>) => { this.agenda = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.servicioService.query()
            .subscribe((res: HttpResponse<Servicio[]>) => { this.servicios = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.clienteService.query()
            .subscribe((res: HttpResponse<Cliente[]>) => { this.clientes = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.vehiculoService.query()
            .subscribe((res: HttpResponse<Vehiculo[]>) => { this.vehiculos = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.turno.id !== undefined) {
            this.subscribeToSaveResponse(
                this.turnoService.update(this.turno));
        } else {
            this.subscribeToSaveResponse(
                this.turnoService.create(this.turno));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Turno>>) {
        result.subscribe((res: HttpResponse<Turno>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Turno) {
        this.eventManager.broadcast({ name: 'turnoListModification', content: 'OK'});
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

    trackServicioById(index: number, item: Servicio) {
        return item.id;
    }

    trackClienteById(index: number, item: Cliente) {
        return item.id;
    }

    trackVehiculoById(index: number, item: Vehiculo) {
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
    selector: 'jhi-turno-popup',
    template: ''
})
export class TurnoPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private turnoPopupService: TurnoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.turnoPopupService
                    .open(TurnoDialogComponent as Component, params['id']);
            } else {
                this.turnoPopupService
                    .open(TurnoDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

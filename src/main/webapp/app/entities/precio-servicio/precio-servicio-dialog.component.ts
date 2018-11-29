import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { PrecioServicio } from './precio-servicio.model';
import { PrecioServicioPopupService } from './precio-servicio-popup.service';
import { PrecioServicioService } from './precio-servicio.service';
import { Modelo, ModeloService } from '../modelo';
import { Servicio, ServicioService } from '../servicio';

@Component({
    selector: 'jhi-precio-servicio-dialog',
    templateUrl: './precio-servicio-dialog.component.html'
})
export class PrecioServicioDialogComponent implements OnInit {

    precioServicio: PrecioServicio;
    isSaving: boolean;

    modelos: Modelo[];

    servicios: Servicio[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private precioServicioService: PrecioServicioService,
        private modeloService: ModeloService,
        private servicioService: ServicioService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.modeloService.query()
            .subscribe((res: HttpResponse<Modelo[]>) => { this.modelos = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.servicioService.query()
            .subscribe((res: HttpResponse<Servicio[]>) => { this.servicios = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.precioServicio.id !== undefined) {
            this.subscribeToSaveResponse(
                this.precioServicioService.update(this.precioServicio));
        } else {
            this.subscribeToSaveResponse(
                this.precioServicioService.create(this.precioServicio));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<PrecioServicio>>) {
        result.subscribe((res: HttpResponse<PrecioServicio>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: PrecioServicio) {
        this.eventManager.broadcast({ name: 'precioServicioListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackModeloById(index: number, item: Modelo) {
        return item.id;
    }

    trackServicioById(index: number, item: Servicio) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-precio-servicio-popup',
    template: ''
})
export class PrecioServicioPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private precioServicioPopupService: PrecioServicioPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.precioServicioPopupService
                    .open(PrecioServicioDialogComponent as Component, params['id']);
            } else {
                this.precioServicioPopupService
                    .open(PrecioServicioDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

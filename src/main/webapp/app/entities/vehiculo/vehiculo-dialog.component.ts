import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Vehiculo } from './vehiculo.model';
import { VehiculoPopupService } from './vehiculo-popup.service';
import { VehiculoService } from './vehiculo.service';
import { Modelo, ModeloService } from '../modelo';

@Component({
    selector: 'jhi-vehiculo-dialog',
    templateUrl: './vehiculo-dialog.component.html'
})
export class VehiculoDialogComponent implements OnInit {

    vehiculo: Vehiculo;
    isSaving: boolean;

    modelos: Modelo[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private vehiculoService: VehiculoService,
        private modeloService: ModeloService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.modeloService.query()
            .subscribe((res: HttpResponse<Modelo[]>) => { this.modelos = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.vehiculo.id !== undefined) {
            this.subscribeToSaveResponse(
                this.vehiculoService.update(this.vehiculo));
        } else {
            this.subscribeToSaveResponse(
                this.vehiculoService.create(this.vehiculo));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Vehiculo>>) {
        result.subscribe((res: HttpResponse<Vehiculo>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Vehiculo) {
        this.eventManager.broadcast({ name: 'vehiculoListModification', content: 'OK'});
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
}

@Component({
    selector: 'jhi-vehiculo-popup',
    template: ''
})
export class VehiculoPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private vehiculoPopupService: VehiculoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.vehiculoPopupService
                    .open(VehiculoDialogComponent as Component, params['id']);
            } else {
                this.vehiculoPopupService
                    .open(VehiculoDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TipoDeServicio } from './tipo-de-servicio.model';
import { TipoDeServicioPopupService } from './tipo-de-servicio-popup.service';
import { TipoDeServicioService } from './tipo-de-servicio.service';

@Component({
    selector: 'jhi-tipo-de-servicio-dialog',
    templateUrl: './tipo-de-servicio-dialog.component.html'
})
export class TipoDeServicioDialogComponent implements OnInit {

    tipoDeServicio: TipoDeServicio;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private tipoDeServicioService: TipoDeServicioService,
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
        if (this.tipoDeServicio.id !== undefined) {
            this.subscribeToSaveResponse(
                this.tipoDeServicioService.update(this.tipoDeServicio));
        } else {
            this.subscribeToSaveResponse(
                this.tipoDeServicioService.create(this.tipoDeServicio));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<TipoDeServicio>>) {
        result.subscribe((res: HttpResponse<TipoDeServicio>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: TipoDeServicio) {
        this.eventManager.broadcast({ name: 'tipoDeServicioListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-tipo-de-servicio-popup',
    template: ''
})
export class TipoDeServicioPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tipoDeServicioPopupService: TipoDeServicioPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.tipoDeServicioPopupService
                    .open(TipoDeServicioDialogComponent as Component, params['id']);
            } else {
                this.tipoDeServicioPopupService
                    .open(TipoDeServicioDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

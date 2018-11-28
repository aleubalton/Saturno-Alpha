import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TipoDeServicio } from './tipo-de-servicio.model';
import { TipoDeServicioPopupService } from './tipo-de-servicio-popup.service';
import { TipoDeServicioService } from './tipo-de-servicio.service';

@Component({
    selector: 'jhi-tipo-de-servicio-delete-dialog',
    templateUrl: './tipo-de-servicio-delete-dialog.component.html'
})
export class TipoDeServicioDeleteDialogComponent {

    tipoDeServicio: TipoDeServicio;

    constructor(
        private tipoDeServicioService: TipoDeServicioService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.tipoDeServicioService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'tipoDeServicioListModification',
                content: 'Deleted an tipoDeServicio'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-tipo-de-servicio-delete-popup',
    template: ''
})
export class TipoDeServicioDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tipoDeServicioPopupService: TipoDeServicioPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.tipoDeServicioPopupService
                .open(TipoDeServicioDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

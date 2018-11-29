import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { PrecioServicio } from './precio-servicio.model';
import { PrecioServicioPopupService } from './precio-servicio-popup.service';
import { PrecioServicioService } from './precio-servicio.service';

@Component({
    selector: 'jhi-precio-servicio-delete-dialog',
    templateUrl: './precio-servicio-delete-dialog.component.html'
})
export class PrecioServicioDeleteDialogComponent {

    precioServicio: PrecioServicio;

    constructor(
        private precioServicioService: PrecioServicioService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.precioServicioService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'precioServicioListModification',
                content: 'Deleted an precioServicio'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-precio-servicio-delete-popup',
    template: ''
})
export class PrecioServicioDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private precioServicioPopupService: PrecioServicioPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.precioServicioPopupService
                .open(PrecioServicioDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

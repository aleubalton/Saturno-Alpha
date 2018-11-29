import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Intervalo } from './intervalo.model';
import { IntervaloPopupService } from './intervalo-popup.service';
import { IntervaloService } from './intervalo.service';

@Component({
    selector: 'jhi-intervalo-delete-dialog',
    templateUrl: './intervalo-delete-dialog.component.html'
})
export class IntervaloDeleteDialogComponent {

    intervalo: Intervalo;

    constructor(
        private intervaloService: IntervaloService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.intervaloService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'intervaloListModification',
                content: 'Deleted an intervalo'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-intervalo-delete-popup',
    template: ''
})
export class IntervaloDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private intervaloPopupService: IntervaloPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.intervaloPopupService
                .open(IntervaloDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

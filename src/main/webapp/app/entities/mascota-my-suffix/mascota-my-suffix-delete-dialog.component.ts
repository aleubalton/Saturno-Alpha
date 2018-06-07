import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { MascotaMySuffix } from './mascota-my-suffix.model';
import { MascotaMySuffixPopupService } from './mascota-my-suffix-popup.service';
import { MascotaMySuffixService } from './mascota-my-suffix.service';

@Component({
    selector: 'jhi-mascota-my-suffix-delete-dialog',
    templateUrl: './mascota-my-suffix-delete-dialog.component.html'
})
export class MascotaMySuffixDeleteDialogComponent {

    mascota: MascotaMySuffix;

    constructor(
        private mascotaService: MascotaMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.mascotaService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'mascotaListModification',
                content: 'Deleted an mascota'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-mascota-my-suffix-delete-popup',
    template: ''
})
export class MascotaMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private mascotaPopupService: MascotaMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.mascotaPopupService
                .open(MascotaMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

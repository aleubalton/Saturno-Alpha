import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { DiaNoLaborable } from './dia-no-laborable.model';
import { DiaNoLaborablePopupService } from './dia-no-laborable-popup.service';
import { DiaNoLaborableService } from './dia-no-laborable.service';

@Component({
    selector: 'jhi-dia-no-laborable-delete-dialog',
    templateUrl: './dia-no-laborable-delete-dialog.component.html'
})
export class DiaNoLaborableDeleteDialogComponent {

    diaNoLaborable: DiaNoLaborable;

    constructor(
        private diaNoLaborableService: DiaNoLaborableService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.diaNoLaborableService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'diaNoLaborableListModification',
                content: 'Deleted an diaNoLaborable'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-dia-no-laborable-delete-popup',
    template: ''
})
export class DiaNoLaborableDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private diaNoLaborablePopupService: DiaNoLaborablePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.diaNoLaborablePopupService
                .open(DiaNoLaborableDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

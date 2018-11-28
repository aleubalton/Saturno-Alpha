import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Tarea } from './tarea.model';
import { TareaPopupService } from './tarea-popup.service';
import { TareaService } from './tarea.service';

@Component({
    selector: 'jhi-tarea-delete-dialog',
    templateUrl: './tarea-delete-dialog.component.html'
})
export class TareaDeleteDialogComponent {

    tarea: Tarea;

    constructor(
        private tareaService: TareaService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.tareaService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'tareaListModification',
                content: 'Deleted an tarea'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-tarea-delete-popup',
    template: ''
})
export class TareaDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tareaPopupService: TareaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.tareaPopupService
                .open(TareaDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

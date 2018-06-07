import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { PersonaMySuffix } from './persona-my-suffix.model';
import { PersonaMySuffixPopupService } from './persona-my-suffix-popup.service';
import { PersonaMySuffixService } from './persona-my-suffix.service';

@Component({
    selector: 'jhi-persona-my-suffix-delete-dialog',
    templateUrl: './persona-my-suffix-delete-dialog.component.html'
})
export class PersonaMySuffixDeleteDialogComponent {

    persona: PersonaMySuffix;

    constructor(
        private personaService: PersonaMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.personaService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'personaListModification',
                content: 'Deleted an persona'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-persona-my-suffix-delete-popup',
    template: ''
})
export class PersonaMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private personaPopupService: PersonaMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.personaPopupService
                .open(PersonaMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

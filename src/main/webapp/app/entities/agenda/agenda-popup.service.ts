import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { Agenda } from './agenda.model';
import { AgendaService } from './agenda.service';

@Injectable()
export class AgendaPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private agendaService: AgendaService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.agendaService.find(id)
                    .subscribe((agendaResponse: HttpResponse<Agenda>) => {
                        const agenda: Agenda = agendaResponse.body;
                        if (agenda.fechaDesde) {
                            agenda.fechaDesde = {
                                year: agenda.fechaDesde.getFullYear(),
                                month: agenda.fechaDesde.getMonth() + 1,
                                day: agenda.fechaDesde.getDate()
                            };
                        }
                        if (agenda.fechaHasta) {
                            agenda.fechaHasta = {
                                year: agenda.fechaHasta.getFullYear(),
                                month: agenda.fechaHasta.getMonth() + 1,
                                day: agenda.fechaHasta.getDate()
                            };
                        }
                        this.ngbModalRef = this.agendaModalRef(component, agenda);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.agendaModalRef(component, new Agenda());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    agendaModalRef(component: Component, agenda: Agenda): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.agenda = agenda;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}

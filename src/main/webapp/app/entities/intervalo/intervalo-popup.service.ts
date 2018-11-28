import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { Intervalo } from './intervalo.model';
import { IntervaloService } from './intervalo.service';

@Injectable()
export class IntervaloPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private intervaloService: IntervaloService

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
                this.intervaloService.find(id)
                    .subscribe((intervaloResponse: HttpResponse<Intervalo>) => {
                        const intervalo: Intervalo = intervaloResponse.body;
                        intervalo.fechaHoraDesde = this.datePipe
                            .transform(intervalo.fechaHoraDesde, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.intervaloModalRef(component, intervalo);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.intervaloModalRef(component, new Intervalo());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    intervaloModalRef(component: Component, intervalo: Intervalo): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.intervalo = intervalo;
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

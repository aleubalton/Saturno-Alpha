import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { TipoDeServicio } from './tipo-de-servicio.model';
import { TipoDeServicioService } from './tipo-de-servicio.service';

@Injectable()
export class TipoDeServicioPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private tipoDeServicioService: TipoDeServicioService

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
                this.tipoDeServicioService.find(id)
                    .subscribe((tipoDeServicioResponse: HttpResponse<TipoDeServicio>) => {
                        const tipoDeServicio: TipoDeServicio = tipoDeServicioResponse.body;
                        this.ngbModalRef = this.tipoDeServicioModalRef(component, tipoDeServicio);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.tipoDeServicioModalRef(component, new TipoDeServicio());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    tipoDeServicioModalRef(component: Component, tipoDeServicio: TipoDeServicio): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.tipoDeServicio = tipoDeServicio;
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

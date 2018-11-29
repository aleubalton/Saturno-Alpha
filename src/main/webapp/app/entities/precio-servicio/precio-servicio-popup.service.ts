import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { PrecioServicio } from './precio-servicio.model';
import { PrecioServicioService } from './precio-servicio.service';

@Injectable()
export class PrecioServicioPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private precioServicioService: PrecioServicioService

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
                this.precioServicioService.find(id)
                    .subscribe((precioServicioResponse: HttpResponse<PrecioServicio>) => {
                        const precioServicio: PrecioServicio = precioServicioResponse.body;
                        this.ngbModalRef = this.precioServicioModalRef(component, precioServicio);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.precioServicioModalRef(component, new PrecioServicio());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    precioServicioModalRef(component: Component, precioServicio: PrecioServicio): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.precioServicio = precioServicio;
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

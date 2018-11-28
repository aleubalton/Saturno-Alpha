import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IServicio } from 'app/shared/model/servicio.model';
import { Principal } from 'app/core';
import { ServicioService } from './servicio.service';

@Component({
  selector: 'jhi-servicio',
  templateUrl: './servicio.component.html'
})
export class ServicioComponent implements OnInit, OnDestroy {
  servicios: IServicio[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    private servicioService: ServicioService,
    private jhiAlertService: JhiAlertService,
    private eventManager: JhiEventManager,
    private principal: Principal
  ) {}

  loadAll() {
    this.servicioService.query().subscribe(
      (res: HttpResponse<IServicio[]>) => {
        this.servicios = res.body;
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  ngOnInit() {
    this.loadAll();
    this.principal.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInServicios();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IServicio) {
    return item.id;
  }

  registerChangeInServicios() {
    this.eventSubscriber = this.eventManager.subscribe('servicioListModification', response => this.loadAll());
  }

  private onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}

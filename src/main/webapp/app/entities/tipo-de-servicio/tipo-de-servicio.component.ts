import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ITipoDeServicio } from 'app/shared/model/tipo-de-servicio.model';
import { Principal } from 'app/core';
import { TipoDeServicioService } from './tipo-de-servicio.service';

@Component({
  selector: 'jhi-tipo-de-servicio',
  templateUrl: './tipo-de-servicio.component.html'
})
export class TipoDeServicioComponent implements OnInit, OnDestroy {
  tipoDeServicios: ITipoDeServicio[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    private tipoDeServicioService: TipoDeServicioService,
    private jhiAlertService: JhiAlertService,
    private eventManager: JhiEventManager,
    private principal: Principal
  ) {}

  loadAll() {
    this.tipoDeServicioService.query().subscribe(
      (res: HttpResponse<ITipoDeServicio[]>) => {
        this.tipoDeServicios = res.body;
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  ngOnInit() {
    this.loadAll();
    this.principal.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInTipoDeServicios();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ITipoDeServicio) {
    return item.id;
  }

  registerChangeInTipoDeServicios() {
    this.eventSubscriber = this.eventManager.subscribe('tipoDeServicioListModification', response => this.loadAll());
  }

  private onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}

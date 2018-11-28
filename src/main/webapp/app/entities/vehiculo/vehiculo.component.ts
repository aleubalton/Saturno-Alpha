import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IVehiculo } from 'app/shared/model/vehiculo.model';
import { Principal } from 'app/core';
import { VehiculoService } from './vehiculo.service';

@Component({
  selector: 'jhi-vehiculo',
  templateUrl: './vehiculo.component.html'
})
export class VehiculoComponent implements OnInit, OnDestroy {
  vehiculos: IVehiculo[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    private vehiculoService: VehiculoService,
    private jhiAlertService: JhiAlertService,
    private eventManager: JhiEventManager,
    private principal: Principal
  ) {}

  loadAll() {
    this.vehiculoService.query().subscribe(
      (res: HttpResponse<IVehiculo[]>) => {
        this.vehiculos = res.body;
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  ngOnInit() {
    this.loadAll();
    this.principal.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInVehiculos();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IVehiculo) {
    return item.id;
  }

  registerChangeInVehiculos() {
    this.eventSubscriber = this.eventManager.subscribe('vehiculoListModification', response => this.loadAll());
  }

  private onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}

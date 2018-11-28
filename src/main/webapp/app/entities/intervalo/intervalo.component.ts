import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IIntervalo } from 'app/shared/model/intervalo.model';
import { Principal } from 'app/core';
import { IntervaloService } from './intervalo.service';

@Component({
  selector: 'jhi-intervalo',
  templateUrl: './intervalo.component.html'
})
export class IntervaloComponent implements OnInit, OnDestroy {
  intervalos: IIntervalo[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    private intervaloService: IntervaloService,
    private jhiAlertService: JhiAlertService,
    private eventManager: JhiEventManager,
    private principal: Principal
  ) {}

  loadAll() {
    this.intervaloService.query().subscribe(
      (res: HttpResponse<IIntervalo[]>) => {
        this.intervalos = res.body;
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  ngOnInit() {
    this.loadAll();
    this.principal.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInIntervalos();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IIntervalo) {
    return item.id;
  }

  registerChangeInIntervalos() {
    this.eventSubscriber = this.eventManager.subscribe('intervaloListModification', response => this.loadAll());
  }

  private onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}

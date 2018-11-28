import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IAgenda } from 'app/shared/model/agenda.model';
import { Principal } from 'app/core';
import { AgendaService } from './agenda.service';

@Component({
  selector: 'jhi-agenda',
  templateUrl: './agenda.component.html'
})
export class AgendaComponent implements OnInit, OnDestroy {
  agenda: IAgenda[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    private agendaService: AgendaService,
    private jhiAlertService: JhiAlertService,
    private eventManager: JhiEventManager,
    private principal: Principal
  ) {}

  loadAll() {
    this.agendaService.query().subscribe(
      (res: HttpResponse<IAgenda[]>) => {
        this.agenda = res.body;
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  ngOnInit() {
    this.loadAll();
    this.principal.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInAgenda();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IAgenda) {
    return item.id;
  }

  registerChangeInAgenda() {
    this.eventSubscriber = this.eventManager.subscribe('agendaListModification', response => this.loadAll());
  }

  private onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ITarea } from 'app/shared/model/tarea.model';
import { Principal } from 'app/core';
import { TareaService } from './tarea.service';

@Component({
  selector: 'jhi-tarea',
  templateUrl: './tarea.component.html'
})
export class TareaComponent implements OnInit, OnDestroy {
  tareas: ITarea[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    private tareaService: TareaService,
    private jhiAlertService: JhiAlertService,
    private eventManager: JhiEventManager,
    private principal: Principal
  ) {}

  loadAll() {
    this.tareaService.query().subscribe(
      (res: HttpResponse<ITarea[]>) => {
        this.tareas = res.body;
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  ngOnInit() {
    this.loadAll();
    this.principal.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInTareas();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ITarea) {
    return item.id;
  }

  registerChangeInTareas() {
    this.eventSubscriber = this.eventManager.subscribe('tareaListModification', response => this.loadAll());
  }

  private onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}

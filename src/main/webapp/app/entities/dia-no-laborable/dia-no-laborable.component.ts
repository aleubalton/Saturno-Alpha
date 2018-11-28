import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IDiaNoLaborable } from 'app/shared/model/dia-no-laborable.model';
import { Principal } from 'app/core';
import { DiaNoLaborableService } from './dia-no-laborable.service';

@Component({
  selector: 'jhi-dia-no-laborable',
  templateUrl: './dia-no-laborable.component.html'
})
export class DiaNoLaborableComponent implements OnInit, OnDestroy {
  diaNoLaborables: IDiaNoLaborable[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    private diaNoLaborableService: DiaNoLaborableService,
    private jhiAlertService: JhiAlertService,
    private eventManager: JhiEventManager,
    private principal: Principal
  ) {}

  loadAll() {
    this.diaNoLaborableService.query().subscribe(
      (res: HttpResponse<IDiaNoLaborable[]>) => {
        this.diaNoLaborables = res.body;
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  ngOnInit() {
    this.loadAll();
    this.principal.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInDiaNoLaborables();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IDiaNoLaborable) {
    return item.id;
  }

  registerChangeInDiaNoLaborables() {
    this.eventSubscriber = this.eventManager.subscribe('diaNoLaborableListModification', response => this.loadAll());
  }

  private onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}

/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterTestModule } from '../../../test.module';
import { DiaNoLaborableDialogComponent } from '../../../../../../main/webapp/app/entities/dia-no-laborable/dia-no-laborable-dialog.component';
import { DiaNoLaborableService } from '../../../../../../main/webapp/app/entities/dia-no-laborable/dia-no-laborable.service';
import { DiaNoLaborable } from '../../../../../../main/webapp/app/entities/dia-no-laborable/dia-no-laborable.model';
import { AgendaService } from '../../../../../../main/webapp/app/entities/agenda';

describe('Component Tests', () => {

    describe('DiaNoLaborable Management Dialog Component', () => {
        let comp: DiaNoLaborableDialogComponent;
        let fixture: ComponentFixture<DiaNoLaborableDialogComponent>;
        let service: DiaNoLaborableService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterTestModule],
                declarations: [DiaNoLaborableDialogComponent],
                providers: [
                    AgendaService,
                    DiaNoLaborableService
                ]
            })
            .overrideTemplate(DiaNoLaborableDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DiaNoLaborableDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DiaNoLaborableService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new DiaNoLaborable(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.diaNoLaborable = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'diaNoLaborableListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new DiaNoLaborable();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.diaNoLaborable = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'diaNoLaborableListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});

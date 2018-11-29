/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterTestModule } from '../../../test.module';
import { DiaNoLaborableDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/dia-no-laborable/dia-no-laborable-delete-dialog.component';
import { DiaNoLaborableService } from '../../../../../../main/webapp/app/entities/dia-no-laborable/dia-no-laborable.service';

describe('Component Tests', () => {

    describe('DiaNoLaborable Management Delete Component', () => {
        let comp: DiaNoLaborableDeleteDialogComponent;
        let fixture: ComponentFixture<DiaNoLaborableDeleteDialogComponent>;
        let service: DiaNoLaborableService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterTestModule],
                declarations: [DiaNoLaborableDeleteDialogComponent],
                providers: [
                    DiaNoLaborableService
                ]
            })
            .overrideTemplate(DiaNoLaborableDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DiaNoLaborableDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DiaNoLaborableService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});

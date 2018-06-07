/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterTestModule } from '../../../test.module';
import { MascotaMySuffixDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/mascota-my-suffix/mascota-my-suffix-delete-dialog.component';
import { MascotaMySuffixService } from '../../../../../../main/webapp/app/entities/mascota-my-suffix/mascota-my-suffix.service';

describe('Component Tests', () => {

    describe('MascotaMySuffix Management Delete Component', () => {
        let comp: MascotaMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<MascotaMySuffixDeleteDialogComponent>;
        let service: MascotaMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterTestModule],
                declarations: [MascotaMySuffixDeleteDialogComponent],
                providers: [
                    MascotaMySuffixService
                ]
            })
            .overrideTemplate(MascotaMySuffixDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MascotaMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MascotaMySuffixService);
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

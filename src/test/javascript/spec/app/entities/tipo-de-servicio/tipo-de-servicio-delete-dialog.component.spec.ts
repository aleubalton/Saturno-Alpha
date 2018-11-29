/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterTestModule } from '../../../test.module';
import { TipoDeServicioDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/tipo-de-servicio/tipo-de-servicio-delete-dialog.component';
import { TipoDeServicioService } from '../../../../../../main/webapp/app/entities/tipo-de-servicio/tipo-de-servicio.service';

describe('Component Tests', () => {

    describe('TipoDeServicio Management Delete Component', () => {
        let comp: TipoDeServicioDeleteDialogComponent;
        let fixture: ComponentFixture<TipoDeServicioDeleteDialogComponent>;
        let service: TipoDeServicioService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterTestModule],
                declarations: [TipoDeServicioDeleteDialogComponent],
                providers: [
                    TipoDeServicioService
                ]
            })
            .overrideTemplate(TipoDeServicioDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TipoDeServicioDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TipoDeServicioService);
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
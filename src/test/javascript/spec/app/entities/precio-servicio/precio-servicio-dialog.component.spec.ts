/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterTestModule } from '../../../test.module';
import { PrecioServicioDialogComponent } from '../../../../../../main/webapp/app/entities/precio-servicio/precio-servicio-dialog.component';
import { PrecioServicioService } from '../../../../../../main/webapp/app/entities/precio-servicio/precio-servicio.service';
import { PrecioServicio } from '../../../../../../main/webapp/app/entities/precio-servicio/precio-servicio.model';
import { ModeloService } from '../../../../../../main/webapp/app/entities/modelo';
import { ServicioService } from '../../../../../../main/webapp/app/entities/servicio';

describe('Component Tests', () => {

    describe('PrecioServicio Management Dialog Component', () => {
        let comp: PrecioServicioDialogComponent;
        let fixture: ComponentFixture<PrecioServicioDialogComponent>;
        let service: PrecioServicioService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterTestModule],
                declarations: [PrecioServicioDialogComponent],
                providers: [
                    ModeloService,
                    ServicioService,
                    PrecioServicioService
                ]
            })
            .overrideTemplate(PrecioServicioDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PrecioServicioDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PrecioServicioService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new PrecioServicio(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.precioServicio = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'precioServicioListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new PrecioServicio();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.precioServicio = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'precioServicioListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});

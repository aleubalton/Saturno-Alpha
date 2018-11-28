/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterTestModule } from '../../../test.module';
import { TurnoDialogComponent } from '../../../../../../main/webapp/app/entities/turno/turno-dialog.component';
import { TurnoService } from '../../../../../../main/webapp/app/entities/turno/turno.service';
import { Turno } from '../../../../../../main/webapp/app/entities/turno/turno.model';
import { AgendaService } from '../../../../../../main/webapp/app/entities/agenda';
import { ServicioService } from '../../../../../../main/webapp/app/entities/servicio';
import { ClienteService } from '../../../../../../main/webapp/app/entities/cliente';
import { VehiculoService } from '../../../../../../main/webapp/app/entities/vehiculo';

describe('Component Tests', () => {

    describe('Turno Management Dialog Component', () => {
        let comp: TurnoDialogComponent;
        let fixture: ComponentFixture<TurnoDialogComponent>;
        let service: TurnoService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterTestModule],
                declarations: [TurnoDialogComponent],
                providers: [
                    AgendaService,
                    ServicioService,
                    ClienteService,
                    VehiculoService,
                    TurnoService
                ]
            })
            .overrideTemplate(TurnoDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TurnoDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TurnoService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Turno(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.turno = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'turnoListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Turno();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.turno = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'turnoListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});

/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { JhipsterTestModule } from '../../../test.module';
import { VehiculoDetailComponent } from '../../../../../../main/webapp/app/entities/vehiculo/vehiculo-detail.component';
import { VehiculoService } from '../../../../../../main/webapp/app/entities/vehiculo/vehiculo.service';
import { Vehiculo } from '../../../../../../main/webapp/app/entities/vehiculo/vehiculo.model';

describe('Component Tests', () => {

    describe('Vehiculo Management Detail Component', () => {
        let comp: VehiculoDetailComponent;
        let fixture: ComponentFixture<VehiculoDetailComponent>;
        let service: VehiculoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterTestModule],
                declarations: [VehiculoDetailComponent],
                providers: [
                    VehiculoService
                ]
            })
            .overrideTemplate(VehiculoDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(VehiculoDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(VehiculoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Vehiculo(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.vehiculo).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});

/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterTestModule } from '../../../test.module';
import { VehiculoComponent } from '../../../../../../main/webapp/app/entities/vehiculo/vehiculo.component';
import { VehiculoService } from '../../../../../../main/webapp/app/entities/vehiculo/vehiculo.service';
import { Vehiculo } from '../../../../../../main/webapp/app/entities/vehiculo/vehiculo.model';

describe('Component Tests', () => {

    describe('Vehiculo Management Component', () => {
        let comp: VehiculoComponent;
        let fixture: ComponentFixture<VehiculoComponent>;
        let service: VehiculoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterTestModule],
                declarations: [VehiculoComponent],
                providers: [
                    VehiculoService
                ]
            })
            .overrideTemplate(VehiculoComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(VehiculoComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(VehiculoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Vehiculo(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.vehiculos[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});

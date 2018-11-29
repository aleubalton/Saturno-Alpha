/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { JhipsterTestModule } from '../../../test.module';
import { PrecioServicioDetailComponent } from '../../../../../../main/webapp/app/entities/precio-servicio/precio-servicio-detail.component';
import { PrecioServicioService } from '../../../../../../main/webapp/app/entities/precio-servicio/precio-servicio.service';
import { PrecioServicio } from '../../../../../../main/webapp/app/entities/precio-servicio/precio-servicio.model';

describe('Component Tests', () => {

    describe('PrecioServicio Management Detail Component', () => {
        let comp: PrecioServicioDetailComponent;
        let fixture: ComponentFixture<PrecioServicioDetailComponent>;
        let service: PrecioServicioService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterTestModule],
                declarations: [PrecioServicioDetailComponent],
                providers: [
                    PrecioServicioService
                ]
            })
            .overrideTemplate(PrecioServicioDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PrecioServicioDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PrecioServicioService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new PrecioServicio(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.precioServicio).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});

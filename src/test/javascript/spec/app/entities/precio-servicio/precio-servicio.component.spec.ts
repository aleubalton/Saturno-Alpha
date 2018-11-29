/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterTestModule } from '../../../test.module';
import { PrecioServicioComponent } from '../../../../../../main/webapp/app/entities/precio-servicio/precio-servicio.component';
import { PrecioServicioService } from '../../../../../../main/webapp/app/entities/precio-servicio/precio-servicio.service';
import { PrecioServicio } from '../../../../../../main/webapp/app/entities/precio-servicio/precio-servicio.model';

describe('Component Tests', () => {

    describe('PrecioServicio Management Component', () => {
        let comp: PrecioServicioComponent;
        let fixture: ComponentFixture<PrecioServicioComponent>;
        let service: PrecioServicioService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterTestModule],
                declarations: [PrecioServicioComponent],
                providers: [
                    PrecioServicioService
                ]
            })
            .overrideTemplate(PrecioServicioComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PrecioServicioComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PrecioServicioService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new PrecioServicio(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.precioServicios[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});

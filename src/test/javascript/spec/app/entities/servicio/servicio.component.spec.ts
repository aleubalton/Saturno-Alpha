/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterTestModule } from '../../../test.module';
import { ServicioComponent } from '../../../../../../main/webapp/app/entities/servicio/servicio.component';
import { ServicioService } from '../../../../../../main/webapp/app/entities/servicio/servicio.service';
import { Servicio } from '../../../../../../main/webapp/app/entities/servicio/servicio.model';

describe('Component Tests', () => {

    describe('Servicio Management Component', () => {
        let comp: ServicioComponent;
        let fixture: ComponentFixture<ServicioComponent>;
        let service: ServicioService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterTestModule],
                declarations: [ServicioComponent],
                providers: [
                    ServicioService
                ]
            })
            .overrideTemplate(ServicioComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ServicioComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ServicioService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Servicio(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.servicios[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});

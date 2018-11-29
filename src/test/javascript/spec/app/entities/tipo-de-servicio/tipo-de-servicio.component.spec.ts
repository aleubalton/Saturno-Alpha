/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterTestModule } from '../../../test.module';
import { TipoDeServicioComponent } from '../../../../../../main/webapp/app/entities/tipo-de-servicio/tipo-de-servicio.component';
import { TipoDeServicioService } from '../../../../../../main/webapp/app/entities/tipo-de-servicio/tipo-de-servicio.service';
import { TipoDeServicio } from '../../../../../../main/webapp/app/entities/tipo-de-servicio/tipo-de-servicio.model';

describe('Component Tests', () => {

    describe('TipoDeServicio Management Component', () => {
        let comp: TipoDeServicioComponent;
        let fixture: ComponentFixture<TipoDeServicioComponent>;
        let service: TipoDeServicioService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterTestModule],
                declarations: [TipoDeServicioComponent],
                providers: [
                    TipoDeServicioService
                ]
            })
            .overrideTemplate(TipoDeServicioComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TipoDeServicioComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TipoDeServicioService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new TipoDeServicio(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.tipoDeServicios[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});

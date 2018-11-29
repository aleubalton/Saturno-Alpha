/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { JhipsterTestModule } from '../../../test.module';
import { TipoDeServicioDetailComponent } from '../../../../../../main/webapp/app/entities/tipo-de-servicio/tipo-de-servicio-detail.component';
import { TipoDeServicioService } from '../../../../../../main/webapp/app/entities/tipo-de-servicio/tipo-de-servicio.service';
import { TipoDeServicio } from '../../../../../../main/webapp/app/entities/tipo-de-servicio/tipo-de-servicio.model';

describe('Component Tests', () => {

    describe('TipoDeServicio Management Detail Component', () => {
        let comp: TipoDeServicioDetailComponent;
        let fixture: ComponentFixture<TipoDeServicioDetailComponent>;
        let service: TipoDeServicioService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterTestModule],
                declarations: [TipoDeServicioDetailComponent],
                providers: [
                    TipoDeServicioService
                ]
            })
            .overrideTemplate(TipoDeServicioDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TipoDeServicioDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TipoDeServicioService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new TipoDeServicio(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.tipoDeServicio).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});

/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterTestModule } from '../../../test.module';
import { IntervaloComponent } from '../../../../../../main/webapp/app/entities/intervalo/intervalo.component';
import { IntervaloService } from '../../../../../../main/webapp/app/entities/intervalo/intervalo.service';
import { Intervalo } from '../../../../../../main/webapp/app/entities/intervalo/intervalo.model';

describe('Component Tests', () => {

    describe('Intervalo Management Component', () => {
        let comp: IntervaloComponent;
        let fixture: ComponentFixture<IntervaloComponent>;
        let service: IntervaloService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterTestModule],
                declarations: [IntervaloComponent],
                providers: [
                    IntervaloService
                ]
            })
            .overrideTemplate(IntervaloComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(IntervaloComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(IntervaloService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Intervalo(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.intervalos[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});

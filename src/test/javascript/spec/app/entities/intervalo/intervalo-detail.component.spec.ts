/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { JhipsterTestModule } from '../../../test.module';
import { IntervaloDetailComponent } from '../../../../../../main/webapp/app/entities/intervalo/intervalo-detail.component';
import { IntervaloService } from '../../../../../../main/webapp/app/entities/intervalo/intervalo.service';
import { Intervalo } from '../../../../../../main/webapp/app/entities/intervalo/intervalo.model';

describe('Component Tests', () => {

    describe('Intervalo Management Detail Component', () => {
        let comp: IntervaloDetailComponent;
        let fixture: ComponentFixture<IntervaloDetailComponent>;
        let service: IntervaloService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterTestModule],
                declarations: [IntervaloDetailComponent],
                providers: [
                    IntervaloService
                ]
            })
            .overrideTemplate(IntervaloDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(IntervaloDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(IntervaloService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Intervalo(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.intervalo).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});

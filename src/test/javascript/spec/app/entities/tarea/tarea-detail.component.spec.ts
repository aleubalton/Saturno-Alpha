/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { JhipsterTestModule } from '../../../test.module';
import { TareaDetailComponent } from '../../../../../../main/webapp/app/entities/tarea/tarea-detail.component';
import { TareaService } from '../../../../../../main/webapp/app/entities/tarea/tarea.service';
import { Tarea } from '../../../../../../main/webapp/app/entities/tarea/tarea.model';

describe('Component Tests', () => {

    describe('Tarea Management Detail Component', () => {
        let comp: TareaDetailComponent;
        let fixture: ComponentFixture<TareaDetailComponent>;
        let service: TareaService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterTestModule],
                declarations: [TareaDetailComponent],
                providers: [
                    TareaService
                ]
            })
            .overrideTemplate(TareaDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TareaDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TareaService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Tarea(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.tarea).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});

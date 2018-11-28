/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterTestModule } from '../../../test.module';
import { TareaComponent } from '../../../../../../main/webapp/app/entities/tarea/tarea.component';
import { TareaService } from '../../../../../../main/webapp/app/entities/tarea/tarea.service';
import { Tarea } from '../../../../../../main/webapp/app/entities/tarea/tarea.model';

describe('Component Tests', () => {

    describe('Tarea Management Component', () => {
        let comp: TareaComponent;
        let fixture: ComponentFixture<TareaComponent>;
        let service: TareaService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterTestModule],
                declarations: [TareaComponent],
                providers: [
                    TareaService
                ]
            })
            .overrideTemplate(TareaComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TareaComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TareaService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Tarea(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.tareas[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});

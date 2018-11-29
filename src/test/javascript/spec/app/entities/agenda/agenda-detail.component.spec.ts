/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { JhipsterTestModule } from '../../../test.module';
import { AgendaDetailComponent } from '../../../../../../main/webapp/app/entities/agenda/agenda-detail.component';
import { AgendaService } from '../../../../../../main/webapp/app/entities/agenda/agenda.service';
import { Agenda } from '../../../../../../main/webapp/app/entities/agenda/agenda.model';

describe('Component Tests', () => {

    describe('Agenda Management Detail Component', () => {
        let comp: AgendaDetailComponent;
        let fixture: ComponentFixture<AgendaDetailComponent>;
        let service: AgendaService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterTestModule],
                declarations: [AgendaDetailComponent],
                providers: [
                    AgendaService
                ]
            })
            .overrideTemplate(AgendaDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AgendaDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AgendaService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Agenda(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.agenda).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});

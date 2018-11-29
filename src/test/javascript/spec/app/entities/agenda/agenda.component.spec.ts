/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterTestModule } from '../../../test.module';
import { AgendaComponent } from '../../../../../../main/webapp/app/entities/agenda/agenda.component';
import { AgendaService } from '../../../../../../main/webapp/app/entities/agenda/agenda.service';
import { Agenda } from '../../../../../../main/webapp/app/entities/agenda/agenda.model';

describe('Component Tests', () => {

    describe('Agenda Management Component', () => {
        let comp: AgendaComponent;
        let fixture: ComponentFixture<AgendaComponent>;
        let service: AgendaService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterTestModule],
                declarations: [AgendaComponent],
                providers: [
                    AgendaService
                ]
            })
            .overrideTemplate(AgendaComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AgendaComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AgendaService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Agenda(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.agenda[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});

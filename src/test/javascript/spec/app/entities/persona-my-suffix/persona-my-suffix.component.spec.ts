/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterTestModule } from '../../../test.module';
import { PersonaMySuffixComponent } from '../../../../../../main/webapp/app/entities/persona-my-suffix/persona-my-suffix.component';
import { PersonaMySuffixService } from '../../../../../../main/webapp/app/entities/persona-my-suffix/persona-my-suffix.service';
import { PersonaMySuffix } from '../../../../../../main/webapp/app/entities/persona-my-suffix/persona-my-suffix.model';

describe('Component Tests', () => {

    describe('PersonaMySuffix Management Component', () => {
        let comp: PersonaMySuffixComponent;
        let fixture: ComponentFixture<PersonaMySuffixComponent>;
        let service: PersonaMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterTestModule],
                declarations: [PersonaMySuffixComponent],
                providers: [
                    PersonaMySuffixService
                ]
            })
            .overrideTemplate(PersonaMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PersonaMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PersonaMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new PersonaMySuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.personas[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});

/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { JhipsterTestModule } from '../../../test.module';
import { PersonaMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/persona-my-suffix/persona-my-suffix-detail.component';
import { PersonaMySuffixService } from '../../../../../../main/webapp/app/entities/persona-my-suffix/persona-my-suffix.service';
import { PersonaMySuffix } from '../../../../../../main/webapp/app/entities/persona-my-suffix/persona-my-suffix.model';

describe('Component Tests', () => {

    describe('PersonaMySuffix Management Detail Component', () => {
        let comp: PersonaMySuffixDetailComponent;
        let fixture: ComponentFixture<PersonaMySuffixDetailComponent>;
        let service: PersonaMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterTestModule],
                declarations: [PersonaMySuffixDetailComponent],
                providers: [
                    PersonaMySuffixService
                ]
            })
            .overrideTemplate(PersonaMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PersonaMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PersonaMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new PersonaMySuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.persona).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});

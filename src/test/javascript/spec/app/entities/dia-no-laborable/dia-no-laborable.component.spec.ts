/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterTestModule } from '../../../test.module';
import { DiaNoLaborableComponent } from '../../../../../../main/webapp/app/entities/dia-no-laborable/dia-no-laborable.component';
import { DiaNoLaborableService } from '../../../../../../main/webapp/app/entities/dia-no-laborable/dia-no-laborable.service';
import { DiaNoLaborable } from '../../../../../../main/webapp/app/entities/dia-no-laborable/dia-no-laborable.model';

describe('Component Tests', () => {

    describe('DiaNoLaborable Management Component', () => {
        let comp: DiaNoLaborableComponent;
        let fixture: ComponentFixture<DiaNoLaborableComponent>;
        let service: DiaNoLaborableService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterTestModule],
                declarations: [DiaNoLaborableComponent],
                providers: [
                    DiaNoLaborableService
                ]
            })
            .overrideTemplate(DiaNoLaborableComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DiaNoLaborableComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DiaNoLaborableService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new DiaNoLaborable(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.diaNoLaborables[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});

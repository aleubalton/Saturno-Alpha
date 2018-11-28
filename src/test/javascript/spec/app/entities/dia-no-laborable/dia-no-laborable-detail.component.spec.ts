/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { JhipsterTestModule } from '../../../test.module';
import { DiaNoLaborableDetailComponent } from '../../../../../../main/webapp/app/entities/dia-no-laborable/dia-no-laborable-detail.component';
import { DiaNoLaborableService } from '../../../../../../main/webapp/app/entities/dia-no-laborable/dia-no-laborable.service';
import { DiaNoLaborable } from '../../../../../../main/webapp/app/entities/dia-no-laborable/dia-no-laborable.model';

describe('Component Tests', () => {

    describe('DiaNoLaborable Management Detail Component', () => {
        let comp: DiaNoLaborableDetailComponent;
        let fixture: ComponentFixture<DiaNoLaborableDetailComponent>;
        let service: DiaNoLaborableService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterTestModule],
                declarations: [DiaNoLaborableDetailComponent],
                providers: [
                    DiaNoLaborableService
                ]
            })
            .overrideTemplate(DiaNoLaborableDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DiaNoLaborableDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DiaNoLaborableService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new DiaNoLaborable(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.diaNoLaborable).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});

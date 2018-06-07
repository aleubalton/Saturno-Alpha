/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { JhipsterTestModule } from '../../../test.module';
import { MascotaMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/mascota-my-suffix/mascota-my-suffix-detail.component';
import { MascotaMySuffixService } from '../../../../../../main/webapp/app/entities/mascota-my-suffix/mascota-my-suffix.service';
import { MascotaMySuffix } from '../../../../../../main/webapp/app/entities/mascota-my-suffix/mascota-my-suffix.model';

describe('Component Tests', () => {

    describe('MascotaMySuffix Management Detail Component', () => {
        let comp: MascotaMySuffixDetailComponent;
        let fixture: ComponentFixture<MascotaMySuffixDetailComponent>;
        let service: MascotaMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterTestModule],
                declarations: [MascotaMySuffixDetailComponent],
                providers: [
                    MascotaMySuffixService
                ]
            })
            .overrideTemplate(MascotaMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MascotaMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MascotaMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new MascotaMySuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.mascota).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});

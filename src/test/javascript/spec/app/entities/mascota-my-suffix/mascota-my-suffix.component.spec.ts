/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterTestModule } from '../../../test.module';
import { MascotaMySuffixComponent } from '../../../../../../main/webapp/app/entities/mascota-my-suffix/mascota-my-suffix.component';
import { MascotaMySuffixService } from '../../../../../../main/webapp/app/entities/mascota-my-suffix/mascota-my-suffix.service';
import { MascotaMySuffix } from '../../../../../../main/webapp/app/entities/mascota-my-suffix/mascota-my-suffix.model';

describe('Component Tests', () => {

    describe('MascotaMySuffix Management Component', () => {
        let comp: MascotaMySuffixComponent;
        let fixture: ComponentFixture<MascotaMySuffixComponent>;
        let service: MascotaMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterTestModule],
                declarations: [MascotaMySuffixComponent],
                providers: [
                    MascotaMySuffixService
                ]
            })
            .overrideTemplate(MascotaMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MascotaMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MascotaMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new MascotaMySuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.mascotas[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});

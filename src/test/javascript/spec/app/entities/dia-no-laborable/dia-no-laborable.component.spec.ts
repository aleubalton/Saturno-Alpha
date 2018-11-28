/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterTestModule } from '../../../test.module';
import { DiaNoLaborableComponent } from 'app/entities/dia-no-laborable/dia-no-laborable.component';
import { DiaNoLaborableService } from 'app/entities/dia-no-laborable/dia-no-laborable.service';
import { DiaNoLaborable } from 'app/shared/model/dia-no-laborable.model';

describe('Component Tests', () => {
  describe('DiaNoLaborable Management Component', () => {
    let comp: DiaNoLaborableComponent;
    let fixture: ComponentFixture<DiaNoLaborableComponent>;
    let service: DiaNoLaborableService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterTestModule],
        declarations: [DiaNoLaborableComponent],
        providers: []
      })
        .overrideTemplate(DiaNoLaborableComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DiaNoLaborableComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DiaNoLaborableService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new DiaNoLaborable(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.diaNoLaborables[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});

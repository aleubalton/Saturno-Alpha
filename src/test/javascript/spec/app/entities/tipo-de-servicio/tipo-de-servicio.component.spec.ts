/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterTestModule } from '../../../test.module';
import { TipoDeServicioComponent } from 'app/entities/tipo-de-servicio/tipo-de-servicio.component';
import { TipoDeServicioService } from 'app/entities/tipo-de-servicio/tipo-de-servicio.service';
import { TipoDeServicio } from 'app/shared/model/tipo-de-servicio.model';

describe('Component Tests', () => {
  describe('TipoDeServicio Management Component', () => {
    let comp: TipoDeServicioComponent;
    let fixture: ComponentFixture<TipoDeServicioComponent>;
    let service: TipoDeServicioService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterTestModule],
        declarations: [TipoDeServicioComponent],
        providers: []
      })
        .overrideTemplate(TipoDeServicioComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TipoDeServicioComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TipoDeServicioService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new TipoDeServicio(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.tipoDeServicios[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});

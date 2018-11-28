/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterTestModule } from '../../../test.module';
import { VehiculoComponent } from 'app/entities/vehiculo/vehiculo.component';
import { VehiculoService } from 'app/entities/vehiculo/vehiculo.service';
import { Vehiculo } from 'app/shared/model/vehiculo.model';

describe('Component Tests', () => {
  describe('Vehiculo Management Component', () => {
    let comp: VehiculoComponent;
    let fixture: ComponentFixture<VehiculoComponent>;
    let service: VehiculoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterTestModule],
        declarations: [VehiculoComponent],
        providers: []
      })
        .overrideTemplate(VehiculoComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(VehiculoComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(VehiculoService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Vehiculo(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.vehiculos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});

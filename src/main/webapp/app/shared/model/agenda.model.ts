import { Moment } from 'moment';
import { IIntervalo } from 'app/shared/model//intervalo.model';
import { IDiaNoLaborable } from 'app/shared/model//dia-no-laborable.model';
import { ITurno } from 'app/shared/model//turno.model';

export const enum TipoRecurso {
  BAHIA = 'BAHIA',
  LAVADERO = 'LAVADERO',
  ASESOR = 'ASESOR',
  TECNICO = 'TECNICO'
}

export interface IAgenda {
  id?: number;
  nombre?: string;
  tipoDeRecurso?: TipoRecurso;
  fechaDesde?: Moment;
  fechaHasta?: Moment;
  duracionEvento?: number;
  estado?: string;
  intervalos?: IIntervalo[];
  diaNoLaborables?: IDiaNoLaborable[];
  turnos?: ITurno[];
}

export class Agenda implements IAgenda {
  constructor(
    public id?: number,
    public nombre?: string,
    public tipoDeRecurso?: TipoRecurso,
    public fechaDesde?: Moment,
    public fechaHasta?: Moment,
    public duracionEvento?: number,
    public estado?: string,
    public intervalos?: IIntervalo[],
    public diaNoLaborables?: IDiaNoLaborable[],
    public turnos?: ITurno[]
  ) {}
}

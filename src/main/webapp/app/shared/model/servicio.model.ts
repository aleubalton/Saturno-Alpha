import { ITarea } from 'app/shared/model//tarea.model';
import { ITurno } from 'app/shared/model//turno.model';

export const enum Categoria {
  AUTOMOVIL = 'AUTOMOVIL',
  CARGA = 'CARGA',
  REMOLQUE = 'REMOLQUE',
  TRANSPORTE = 'TRANSPORTE'
}

export interface IServicio {
  id?: number;
  nombre?: string;
  codigo?: string;
  kilometraje?: number;
  duracion?: number;
  precio?: number;
  categoria?: Categoria;
  tipoCodigo?: string;
  tipoId?: number;
  tareas?: ITarea[];
  turnos?: ITurno[];
}

export class Servicio implements IServicio {
  constructor(
    public id?: number,
    public nombre?: string,
    public codigo?: string,
    public kilometraje?: number,
    public duracion?: number,
    public precio?: number,
    public categoria?: Categoria,
    public tipoCodigo?: string,
    public tipoId?: number,
    public tareas?: ITarea[],
    public turnos?: ITurno[]
  ) {}
}

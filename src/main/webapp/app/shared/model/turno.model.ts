import { Moment } from 'moment';
import { IServicio } from 'app/shared/model//servicio.model';

export const enum Estado {
  RESERVADO = 'RESERVADO',
  EXPIRADO = 'EXPIRADO',
  VALIDADO = 'VALIDADO',
  CONFIRMADO = 'CONFIRMADO',
  CANCELADO = 'CANCELADO',
  FINALIZADO = 'FINALIZADO'
}

export interface ITurno {
  id?: number;
  fechaHora?: Moment;
  estado?: Estado;
  agendaNombre?: string;
  agendaId?: number;
  servicios?: IServicio[];
  clienteApellido?: string;
  clienteId?: number;
  vehiculoPatente?: string;
  vehiculoId?: number;
}

export class Turno implements ITurno {
  constructor(
    public id?: number,
    public fechaHora?: Moment,
    public estado?: Estado,
    public agendaNombre?: string,
    public agendaId?: number,
    public servicios?: IServicio[],
    public clienteApellido?: string,
    public clienteId?: number,
    public vehiculoPatente?: string,
    public vehiculoId?: number
  ) {}
}

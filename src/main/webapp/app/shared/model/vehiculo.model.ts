import { ITurno } from 'app/shared/model//turno.model';

export interface IVehiculo {
  id?: number;
  anio?: number;
  patente?: string;
  kilometraje?: number;
  turnos?: ITurno[];
  modeloNombre?: string;
  modeloId?: number;
}

export class Vehiculo implements IVehiculo {
  constructor(
    public id?: number,
    public anio?: number,
    public patente?: string,
    public kilometraje?: number,
    public turnos?: ITurno[],
    public modeloNombre?: string,
    public modeloId?: number
  ) {}
}

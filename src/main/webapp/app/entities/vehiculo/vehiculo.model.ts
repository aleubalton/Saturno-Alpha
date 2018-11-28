import { BaseEntity } from './../../shared';

export class Vehiculo implements BaseEntity {
    constructor(
        public id?: number,
        public anio?: number,
        public patente?: string,
        public kilometraje?: number,
        public turnos?: BaseEntity[],
        public modeloNombre?: string,
        public modeloId?: number,
    ) {
    }
}

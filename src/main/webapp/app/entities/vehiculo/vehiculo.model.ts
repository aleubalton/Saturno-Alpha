import { BaseEntity } from './../../shared';

export class Vehiculo implements BaseEntity {
    constructor(
        public id?: number,
        public patente?: string,
        public anio?: number,
        public kilometraje?: number,
        public modeloNombre?: string,
        public modeloId?: number,
        public turnos?: BaseEntity[],
    ) {
    }
}

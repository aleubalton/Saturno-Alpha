import { BaseEntity } from './../../shared';

export const enum Categoria {
    'AUTOMOVIL',
    'CARGA',
    'REMOLQUE',
    'TRANSPORTE'
}

export class Servicio implements BaseEntity {
    constructor(
        public id?: number,
        public nombre?: string,
        public codigo?: string,
        public kilometraje?: number,
        public duracion?: number,
        public categoria?: Categoria,
        public precios?: BaseEntity[],
        public tipoCodigo?: string,
        public tipoId?: number,
        public tareas?: BaseEntity[],
        public turnos?: BaseEntity[],
    ) {
    }
}

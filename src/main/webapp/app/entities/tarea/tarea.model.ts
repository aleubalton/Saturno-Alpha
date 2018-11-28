import { BaseEntity } from './../../shared';

export const enum TipoTarea {
    'CAMBIO',
    'INSPECCION'
}

export class Tarea implements BaseEntity {
    constructor(
        public id?: number,
        public codigo?: string,
        public descripcion?: string,
        public tipo?: TipoTarea,
        public servicios?: BaseEntity[],
    ) {
    }
}

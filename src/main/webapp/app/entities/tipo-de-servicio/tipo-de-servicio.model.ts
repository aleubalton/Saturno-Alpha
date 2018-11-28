import { BaseEntity } from './../../shared';

export const enum TipoRecurso {
    'BAHIA',
    'LAVADERO',
    'ASESOR',
    'TECNICO'
}

export class TipoDeServicio implements BaseEntity {
    constructor(
        public id?: number,
        public nombre?: string,
        public codigo?: string,
        public interno?: boolean,
        public tipoDeRecurso?: TipoRecurso,
        public servicios?: BaseEntity[],
    ) {
        this.interno = false;
    }
}

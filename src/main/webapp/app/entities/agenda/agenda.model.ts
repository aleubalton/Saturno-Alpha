import { BaseEntity } from './../../shared';

export const enum TipoRecurso {
    'BAHIA',
    'LAVADERO',
    'ASESOR',
    'TECNICO'
}

export class Agenda implements BaseEntity {
    constructor(
        public id?: number,
        public nombre?: string,
        public tipoDeRecurso?: TipoRecurso,
        public fechaDesde?: any,
        public fechaHasta?: any,
        public duracionEvento?: number,
        public estado?: string,
        public intervalos?: BaseEntity[],
        public diaNoLaborables?: BaseEntity[],
        public turnos?: BaseEntity[],
    ) {
    }
}

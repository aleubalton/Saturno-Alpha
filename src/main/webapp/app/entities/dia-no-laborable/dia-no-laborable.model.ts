import { BaseEntity } from './../../shared';

export const enum Dia {
    'LUNES',
    'MARTES',
    'MIERCOLES',
    'JUEVES',
    'VIERNES',
    'SABADO',
    'DOMINGO',
    'TODOS'
}

export class DiaNoLaborable implements BaseEntity {
    constructor(
        public id?: number,
        public fecha?: any,
        public dia?: Dia,
        public repite?: boolean,
        public agenda?: BaseEntity[],
    ) {
        this.repite = false;
    }
}

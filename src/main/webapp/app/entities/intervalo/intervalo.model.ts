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

export class Intervalo implements BaseEntity {
    constructor(
        public id?: number,
        public fechaHoraDesde?: any,
        public duracion?: number,
        public dia?: Dia,
        public repite?: boolean,
        public agenda?: BaseEntity[],
    ) {
        this.repite = false;
    }
}

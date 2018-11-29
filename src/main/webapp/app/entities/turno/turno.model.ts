import { BaseEntity } from './../../shared';

export const enum Estado {
    'RESERVADO',
    'EXPIRADO',
    'VALIDADO',
    'CONFIRMADO',
    'CANCELADO',
    'FINALIZADO'
}

export class Turno implements BaseEntity {
    constructor(
        public id?: number,
        public fechaHora?: any,
        public estado?: Estado,
        public agendaNombre?: string,
        public agendaId?: number,
        public vehiculoPatente?: string,
        public vehiculoId?: number,
        public servicios?: BaseEntity[],
        public clienteApellido?: string,
        public clienteId?: number,
    ) {
    }
}

import { BaseEntity } from './../../shared';

export class Cliente implements BaseEntity {
    constructor(
        public id?: number,
        public nombre?: string,
        public apellido?: string,
        public email?: string,
        public telefono?: string,
        public celular?: string,
        public turnos?: BaseEntity[],
    ) {
    }
}

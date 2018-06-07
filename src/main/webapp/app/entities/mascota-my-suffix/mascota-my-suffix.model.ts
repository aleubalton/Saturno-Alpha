import { BaseEntity } from './../../shared';

export class MascotaMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public nombre?: string,
        public apodo?: string,
        public personaId?: number,
    ) {
    }
}

import { BaseEntity } from './../../shared';

export class PersonaMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public nombre?: string,
        public apellido?: string,
        public dni?: number,
        public direccion?: string,
        public mascotas?: BaseEntity[],
    ) {
    }
}

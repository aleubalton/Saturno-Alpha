import { BaseEntity } from './../../shared';

export const enum Marca {
    'TOYOTA',
    'LEXUS'
}

export const enum Categoria {
    'AUTOMOVIL',
    'CARGA',
    'REMOLQUE',
    'TRANSPORTE'
}

export class Modelo implements BaseEntity {
    constructor(
        public id?: number,
        public codigo?: string,
        public nombre?: string,
        public marca?: Marca,
        public categoria?: Categoria,
        public anioInicioProduccion?: number,
        public aniofinProduccion?: number,
        public vehiculos?: BaseEntity[],
    ) {
    }
}

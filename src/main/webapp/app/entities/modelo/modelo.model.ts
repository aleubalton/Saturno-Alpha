import { BaseEntity } from './../../shared';

export const enum Marca {
    'TOYOTA',
    'LEXUS',
    'HINO'
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
        public anioInicioProduccion?: number,
        public anioFinProduccion?: number,
        public marca?: Marca,
        public categoria?: Categoria,
        public precios?: BaseEntity[],
        public vehiculos?: BaseEntity[],
    ) {
    }
}

import { BaseEntity } from './../../shared';

export class PrecioServicio implements BaseEntity {
    constructor(
        public id?: number,
        public precio?: number,
        public modeloNombre?: string,
        public modeloId?: number,
        public servicioNombre?: string,
        public servicioId?: number,
    ) {
    }
}

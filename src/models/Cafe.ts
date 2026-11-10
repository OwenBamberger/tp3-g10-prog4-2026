import { Producto } from './Producto';

export type Variedad = 'Brasil' | 'Colombia' | 'Etiopía';
export type Tamano = 'Pocillo' | 'Mediano' | 'Taza grande';

/** Precio por gramo de café según la variedad ($). */
export const PRECIO_POR_GRAMO: Record<Variedad, number> = {
  Brasil: 140,
  Colombia: 180,
  Etiopía: 240,
};

export abstract class Cafe extends Producto {
  constructor(
    id: number,
    nombre: string,
    precioBase: number,
    public readonly tamano: Tamano,
    public readonly variedad: Variedad,
    public readonly gramos: number,
  ) {
    super(id, nombre, precioBase);
  }

  /** Costo del café = gramos * precio por gramo de la variedad. */
  calcularCostoCafe(): number {
    return this.gramos * PRECIO_POR_GRAMO[this.variedad];
  }

  /** Precio final = precioBase (máquina) + costo del café. */
  calcularPrecio(): number {
    return this.precioBase + this.calcularCostoCafe();
  }
}

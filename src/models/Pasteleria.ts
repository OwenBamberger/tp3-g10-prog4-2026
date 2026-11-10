import { Producto } from './Producto';

export class Pasteleria extends Producto {
  /** En pastelería el precio es fijo: precioBase. */
  calcularPrecio(): number {
    return this.precioBase;
  }
}

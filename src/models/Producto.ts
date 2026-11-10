export abstract class Producto {
  constructor(
    public readonly id: number,
    public readonly nombre: string,
    public readonly precioBase: number,
  ) {}

  /** Cada subclase decide cómo se calcula su precio final. */
  abstract calcularPrecio(): number;
}

import { Cafe, Tamano, Variedad } from './Cafe';

export const GRAMOS_FILTRADO: Record<Tamano, number> = {
  Pocillo: 6,
  Mediano: 15,
  'Taza grande': 25,
};

export class Filtrado extends Cafe {
  static readonly PRECIO_BASE = 3200;

  constructor(id: number, tamano: Tamano, variedad: Variedad) {
    super(
      id,
      `Filtrado ${tamano} ${variedad}`,
      Filtrado.PRECIO_BASE,
      tamano,
      variedad,
      GRAMOS_FILTRADO[tamano],
    );
  }
}

import { Cafe, Tamano, Variedad } from './Cafe';

export const GRAMOS_EXPRESO: Record<Tamano, number> = {
  Pocillo: 18,
  Mediano: 27,
  'Taza grande': 36,
};

export class Expreso extends Cafe {
  static readonly PRECIO_BASE = 2500;

  constructor(id: number, tamano: Tamano, variedad: Variedad) {
    super(
      id,
      `Expreso ${tamano} ${variedad}`,
      Expreso.PRECIO_BASE,
      tamano,
      variedad,
      GRAMOS_EXPRESO[tamano],
    );
  }
}

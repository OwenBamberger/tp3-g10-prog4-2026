import { Producto } from '../models/Producto';
import { Expreso } from '../models/Expreso';
import { Filtrado } from '../models/Filtrado';
import { Pasteleria } from '../models/Pasteleria';
import { Tamano, Variedad } from '../models/Cafe';

const TAMANOS: Tamano[] = ['Pocillo', 'Mediano', 'Taza grande'];
const VARIEDADES: Variedad[] = ['Brasil', 'Colombia', 'Etiopía'];

export class ProductoRepository {
  private productos: Producto[] = [];

  constructor() {
    this.cargarCatalogo();
  }

  /** Genera el catálogo completo: 9 expresos, 9 filtrados y 2 pastelerías (ids 1..20). */
  private cargarCatalogo(): void {
    let id = 1;
    for (const tamano of TAMANOS) {
      for (const variedad of VARIEDADES) {
        this.productos.push(new Expreso(id++, tamano, variedad));
      }
    }
    for (const tamano of TAMANOS) {
      for (const variedad of VARIEDADES) {
        this.productos.push(new Filtrado(id++, tamano, variedad));
      }
    }
    this.productos.push(new Pasteleria(id++, 'Muffin de chocolate', 2500));
    this.productos.push(new Pasteleria(id++, 'Torta selva negra', 4200));
  }

  listar(): Producto[] {
    return [...this.productos];
  }

  buscarPorId(id: number): Producto | undefined {
    return this.productos.find((p) => p.id === id);
  }
}

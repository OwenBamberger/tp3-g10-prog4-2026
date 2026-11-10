import { ProductoRepository } from '../repositories/ProductoRepository';
import { Producto } from '../models/Producto';
import { NoEncontradoError } from './errors';

export interface ProductoDTO {
  id: number;
  nombre: string;
  precioBase: number;
  precio: number;
}

export class ProductoService {
  constructor(private repo: ProductoRepository) {}

  static aDTO(p: Producto): ProductoDTO {
    return { id: p.id, nombre: p.nombre, precioBase: p.precioBase, precio: p.calcularPrecio() };
  }

  listar(): ProductoDTO[] {
    return this.repo.listar().map(ProductoService.aDTO);
  }

  obtener(id: number): ProductoDTO {
    const producto = this.repo.buscarPorId(id);
    if (!producto) throw new NoEncontradoError(`Producto ${id} no encontrado`);
    return ProductoService.aDTO(producto);
  }
}

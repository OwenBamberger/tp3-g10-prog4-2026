import { PedidoRepository } from '../repositories/PedidoRepository';
import { ProductoRepository } from '../repositories/ProductoRepository';
import { PedidoService } from './PedidoService';
import { NoEncontradoError } from './errors';

export class ReporteService {
  constructor(
    private pedidos: PedidoRepository,
    private productos: ProductoRepository,
    private pedidoService: PedidoService,
  ) {}

  facturacionTotal(): number {
    return this.pedidos.listar().reduce((acc, p) => acc + this.pedidoService.calcularTotal(p), 0);
  }

  cantidadVendidaPorProducto(): Record<string, number> {
    const resultado: Record<string, number> = {};
    for (const pedido of this.pedidos.listar()) {
      for (const item of pedido.items) {
        const nombre = this.productos.buscarPorId(item.productoId)!.nombre;
        resultado[nombre] = (resultado[nombre] ?? 0) + item.cantidad;
      }
    }
    return resultado;
  }

  productoMasVendido(): { producto: string; cantidad: number } {
    const ventas = Object.entries(this.cantidadVendidaPorProducto());
    if (ventas.length === 0) throw new NoEncontradoError('Todavía no hay ventas registradas');
    const [producto, cantidad] = ventas.reduce((max, actual) => (actual[1] > max[1] ? actual : max));
    return { producto, cantidad };
  }
}

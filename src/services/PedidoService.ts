import { PedidoRepository } from '../repositories/PedidoRepository';
import { ProductoRepository } from '../repositories/ProductoRepository';
import { ESTADOS_VALIDOS, EstadoPedido, ItemPedido, Pedido, PedidoConTotal } from '../models/Pedido';
import { NoEncontradoError, ValidacionError } from './errors';

export class PedidoService {
  constructor(
    private pedidos: PedidoRepository,
    private productos: ProductoRepository,
  ) {}

  /** Total = suma de calcularPrecio() * cantidad de cada ítem. */
  calcularTotal(pedido: Pedido): number {
    return pedido.items.reduce((total, item) => {
      const producto = this.productos.buscarPorId(item.productoId);
      if (!producto) throw new NoEncontradoError(`Producto ${item.productoId} no encontrado`);
      return total + producto.calcularPrecio() * item.cantidad;
    }, 0);
  }

  private conTotal(pedido: Pedido): PedidoConTotal {
    return { ...pedido, total: this.calcularTotal(pedido) };
  }

  crear(body: any): PedidoConTotal {
    const items = this.validarItems(body?.items);
    const estado = this.validarEstado(body?.estado);
    const pedido = this.pedidos.crear({ items, estado });
    return this.conTotal(pedido);
  }

  listar(): PedidoConTotal[] {
    return this.pedidos.listar().map((p) => this.conTotal(p));
  }

  obtener(id: number): PedidoConTotal {
    const pedido = this.pedidos.buscarPorId(id);
    if (!pedido) throw new NoEncontradoError(`Pedido ${id} no encontrado`);
    return this.conTotal(pedido);
  }

  private validarItems(items: any): ItemPedido[] {
    if (!Array.isArray(items) || items.length === 0) {
      throw new ValidacionError('El pedido debe tener al menos un ítem');
    }
    return items.map((item) => {
      if (!Number.isInteger(item?.productoId)) {
        throw new ValidacionError('productoId debe ser un número entero');
      }
      if (!Number.isInteger(item?.cantidad) || item.cantidad <= 0) {
        throw new ValidacionError('cantidad debe ser un entero mayor a 0');
      }
      if (!this.productos.buscarPorId(item.productoId)) {
        throw new NoEncontradoError(`Producto ${item.productoId} no encontrado`);
      }
      return { productoId: item.productoId, cantidad: item.cantidad };
    });
  }

  private validarEstado(estado: any): EstadoPedido {
    if (estado === undefined) return 'pendiente';
    if (!ESTADOS_VALIDOS.includes(estado)) {
      throw new ValidacionError(`estado inválido. Valores posibles: ${ESTADOS_VALIDOS.join(', ')}`);
    }
    return estado;
  }
}

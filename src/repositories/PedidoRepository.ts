import { Pedido } from '../models/Pedido';

export class PedidoRepository {
  private pedidos: Pedido[] = [];
  private siguienteId = 1;

  crear(datos: Omit<Pedido, 'id'>): Pedido {
    const pedido: Pedido = { id: this.siguienteId++, ...datos };
    this.pedidos.push(pedido);
    return pedido;
  }

  listar(): Pedido[] {
    return [...this.pedidos];
  }

  buscarPorId(id: number): Pedido | undefined {
    return this.pedidos.find((p) => p.id === id);
  }
}

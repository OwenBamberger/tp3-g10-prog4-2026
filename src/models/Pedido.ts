export type EstadoPedido = 'pendiente' | 'en preparación' | 'entregado';

export const ESTADOS_VALIDOS: EstadoPedido[] = ['pendiente', 'en preparación', 'entregado'];

export interface ItemPedido {
  productoId: number;
  cantidad: number;
}

export interface Pedido {
  id: number;
  items: ItemPedido[];
  estado: EstadoPedido;
}

/** Pedido + total calculado (lo que devuelve la API). */
export interface PedidoConTotal extends Pedido {
  total: number;
}

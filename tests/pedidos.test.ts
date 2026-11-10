import { describe, it, expect, beforeEach } from 'vitest';
import { ProductoRepository } from '../src/repositories/ProductoRepository';
import { PedidoRepository } from '../src/repositories/PedidoRepository';
import { PedidoService } from '../src/services/PedidoService';
import { NoEncontradoError, ValidacionError } from '../src/services/errors';

// ids: 1 = Expreso Pocillo Brasil ($5020), 4 = Expreso Mediano Brasil ($6280),
// 19 = Muffin ($2500), 20 = Torta ($4200)
describe('PedidoService', () => {
  let service: PedidoService;

  beforeEach(() => {
    const productos = new ProductoRepository();
    service = new PedidoService(new PedidoRepository(), productos);
  });

  it('calcula el total como suma de calcularPrecio() x cantidad', () => {
    const pedido = service.crear({
      items: [
        { productoId: 1, cantidad: 2 }, // 10040
        { productoId: 19, cantidad: 3 }, // 7500
      ],
    });
    expect(pedido.total).toBe(17540);
  });

  it('el estado por defecto es "pendiente"', () => {
    expect(service.crear({ items: [{ productoId: 1, cantidad: 1 }] }).estado).toBe('pendiente');
  });

  it('asigna ids incrementales', () => {
    const a = service.crear({ items: [{ productoId: 1, cantidad: 1 }] });
    const b = service.crear({ items: [{ productoId: 1, cantidad: 1 }] });
    expect(b.id).toBe(a.id + 1);
  });

  it('listar devuelve todos los pedidos con su total', () => {
    service.crear({ items: [{ productoId: 20, cantidad: 1 }] });
    service.crear({ items: [{ productoId: 19, cantidad: 2 }] });
    const lista = service.listar();
    expect(lista).toHaveLength(2);
    expect(lista.map((p) => p.total)).toEqual([4200, 5000]);
  });

  it('obtener devuelve el pedido pedido por id', () => {
    const creado = service.crear({ items: [{ productoId: 4, cantidad: 1 }] });
    expect(service.obtener(creado.id).total).toBe(6280);
  });

  it('obtener lanza NoEncontradoError si no existe', () => {
    expect(() => service.obtener(99)).toThrow(NoEncontradoError);
  });

  it('rechaza pedidos sin ítems', () => {
    expect(() => service.crear({ items: [] })).toThrow(ValidacionError);
    expect(() => service.crear({})).toThrow(ValidacionError);
  });

  it('rechaza cantidades inválidas', () => {
    expect(() => service.crear({ items: [{ productoId: 1, cantidad: 0 }] })).toThrow(ValidacionError);
    expect(() => service.crear({ items: [{ productoId: 1, cantidad: -2 }] })).toThrow(ValidacionError);
    expect(() => service.crear({ items: [{ productoId: 1, cantidad: 1.5 }] })).toThrow(ValidacionError);
  });

  it('rechaza productos inexistentes', () => {
    expect(() => service.crear({ items: [{ productoId: 999, cantidad: 1 }] })).toThrow(NoEncontradoError);
  });

  it('rechaza estados inválidos', () => {
    expect(() =>
      service.crear({ items: [{ productoId: 1, cantidad: 1 }], estado: 'cancelado' }),
    ).toThrow(ValidacionError);
  });
});

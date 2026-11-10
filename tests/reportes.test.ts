import { describe, it, expect, beforeEach } from 'vitest';
import { ProductoRepository } from '../src/repositories/ProductoRepository';
import { PedidoRepository } from '../src/repositories/PedidoRepository';
import { PedidoService } from '../src/services/PedidoService';
import { ReporteService } from '../src/services/ReporteService';
import { NoEncontradoError } from '../src/services/errors';

describe('ReporteService', () => {
  let pedidos: PedidoService;
  let reportes: ReporteService;

  beforeEach(() => {
    const productoRepo = new ProductoRepository();
    const pedidoRepo = new PedidoRepository();
    pedidos = new PedidoService(pedidoRepo, productoRepo);
    reportes = new ReporteService(pedidoRepo, productoRepo, pedidos);
  });

  describe('sin ventas', () => {
    it('facturación = 0', () => {
      expect(reportes.facturacionTotal()).toBe(0);
    });
    it('cantidad vendida = {}', () => {
      expect(reportes.cantidadVendidaPorProducto()).toEqual({});
    });
    it('más vendido lanza NoEncontradoError', () => {
      expect(() => reportes.productoMasVendido()).toThrow(NoEncontradoError);
    });
  });

  describe('con ventas', () => {
    beforeEach(() => {
      pedidos.crear({ items: [{ productoId: 1, cantidad: 2 }, { productoId: 19, cantidad: 1 }] }); // 10040 + 2500
      pedidos.crear({ items: [{ productoId: 19, cantidad: 4 }] }); // 10000
      pedidos.crear({ items: [{ productoId: 20, cantidad: 1 }] }); // 4200
    });

    it('facturación total suma los totales de todos los pedidos', () => {
      expect(reportes.facturacionTotal()).toBe(26740);
    });

    it('cantidad vendida por producto acumula entre pedidos', () => {
      expect(reportes.cantidadVendidaPorProducto()).toEqual({
        'Expreso Pocillo Brasil': 2,
        'Muffin de chocolate': 5,
        'Torta selva negra': 1,
      });
    });

    it('producto más vendido sale del resultado anterior', () => {
      expect(reportes.productoMasVendido()).toEqual({ producto: 'Muffin de chocolate', cantidad: 5 });
    });
  });
});

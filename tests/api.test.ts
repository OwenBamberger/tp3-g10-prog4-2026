import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import { createApp } from '../src/app';

describe('API Cafetería Origen', () => {
  let app: ReturnType<typeof createApp>;

  beforeEach(() => {
    app = createApp();
  });

  describe('GET /productos', () => {
    it('lista los 20 productos con su precio', async () => {
      const res = await request(app).get('/productos');
      expect(res.status).toBe(200);
      expect(res.body).toHaveLength(20);
      expect(res.body[0]).toEqual({
        id: 1,
        nombre: 'Expreso Pocillo Brasil',
        precioBase: 2500,
        precio: 5020,
      });
    });
  });

  describe('GET /productos/:id', () => {
    it('devuelve el producto pedido', async () => {
      const res = await request(app).get('/productos/20');
      expect(res.status).toBe(200);
      expect(res.body).toEqual({ id: 20, nombre: 'Torta selva negra', precioBase: 4200, precio: 4200 });
    });
    it('404 si no existe', async () => {
      expect((await request(app).get('/productos/999')).status).toBe(404);
    });
    it('400 si el id no es numérico', async () => {
      expect((await request(app).get('/productos/abc')).status).toBe(400);
    });
  });

  describe('POST /pedidos', () => {
    it('crea el pedido y devuelve el total calculado', async () => {
      const res = await request(app)
        .post('/pedidos')
        .send({ items: [{ productoId: 1, cantidad: 2 }, { productoId: 19, cantidad: 1 }] });
      expect(res.status).toBe(201);
      expect(res.body).toEqual({
        id: 1,
        items: [{ productoId: 1, cantidad: 2 }, { productoId: 19, cantidad: 1 }],
        estado: 'pendiente',
        total: 12540,
      });
    });
    it('400 con body inválido', async () => {
      const res = await request(app).post('/pedidos').send({ items: [] });
      expect(res.status).toBe(400);
      expect(res.body.error).toBeDefined();
    });
    it('404 si algún producto no existe', async () => {
      const res = await request(app).post('/pedidos').send({ items: [{ productoId: 999, cantidad: 1 }] });
      expect(res.status).toBe(404);
    });
    it('400 con JSON malformado', async () => {
      const res = await request(app)
        .post('/pedidos')
        .set('Content-Type', 'application/json')
        .send('{ no es json');
      expect(res.status).toBe(400);
    });
  });

  describe('GET /pedidos y GET /pedidos/:id', () => {
    it('lista vacía al inicio', async () => {
      const res = await request(app).get('/pedidos');
      expect(res.status).toBe(200);
      expect(res.body).toEqual([]);
    });
    it('lista los pedidos creados y permite buscarlos por id', async () => {
      await request(app).post('/pedidos').send({ items: [{ productoId: 20, cantidad: 1 }] });
      await request(app).post('/pedidos').send({ items: [{ productoId: 19, cantidad: 2 }] });

      const lista = await request(app).get('/pedidos');
      expect(lista.body).toHaveLength(2);

      const uno = await request(app).get('/pedidos/2');
      expect(uno.status).toBe(200);
      expect(uno.body.total).toBe(5000);
    });
    it('404 si el pedido no existe', async () => {
      expect((await request(app).get('/pedidos/42')).status).toBe(404);
    });
  });

  describe('GET /reportes', () => {
    beforeEach(async () => {
      await request(app).post('/pedidos').send({ items: [{ productoId: 1, cantidad: 2 }] }); // 10040
      await request(app).post('/pedidos').send({ items: [{ productoId: 19, cantidad: 3 }] }); // 7500
    });

    it('/facturacion devuelve cuánto se facturó', async () => {
      const res = await request(app).get('/reportes/facturacion');
      expect(res.status).toBe(200);
      expect(res.body).toEqual({ facturacionTotal: 17540 });
    });

    it('/mas-vendido devuelve el producto más vendido', async () => {
      const res = await request(app).get('/reportes/mas-vendido');
      expect(res.status).toBe(200);
      expect(res.body).toEqual({ producto: 'Muffin de chocolate', cantidad: 3 });
    });

    it('/mas-vendido da 404 si no hay ventas', async () => {
      const vacia = createApp();
      expect((await request(vacia).get('/reportes/mas-vendido')).status).toBe(404);
    });
  });
});

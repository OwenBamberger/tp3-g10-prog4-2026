import { describe, it, expect, beforeEach } from 'vitest';
import { Expreso } from '../src/models/Expreso';
import { Filtrado } from '../src/models/Filtrado';
import { Pasteleria } from '../src/models/Pasteleria';
import { Producto } from '../src/models/Producto';
import { Tamano, Variedad } from '../src/models/Cafe';
import { ProductoRepository } from '../src/repositories/ProductoRepository';

describe('calcularPrecio() — tabla de precios del enunciado', () => {
  const expresos: [Tamano, Variedad, number][] = [
    ['Pocillo', 'Brasil', 5020],
    ['Pocillo', 'Colombia', 5740],
    ['Pocillo', 'Etiopía', 6820],
    ['Mediano', 'Brasil', 6280],
    ['Mediano', 'Colombia', 7360],
    ['Mediano', 'Etiopía', 8980],
    ['Taza grande', 'Brasil', 7540],
    ['Taza grande', 'Colombia', 8980],
    ['Taza grande', 'Etiopía', 11140],
  ];
  const filtrados: [Tamano, Variedad, number][] = [
    ['Pocillo', 'Brasil', 4040],
    ['Pocillo', 'Colombia', 4280],
    ['Pocillo', 'Etiopía', 4640],
    ['Mediano', 'Brasil', 5300],
    ['Mediano', 'Colombia', 5900],
    ['Mediano', 'Etiopía', 6800],
    ['Taza grande', 'Brasil', 6700],
    ['Taza grande', 'Colombia', 7700],
    ['Taza grande', 'Etiopía', 9200],
  ];

  it.each(expresos)('Expreso %s %s = $%i', (tamano, variedad, esperado) => {
    expect(new Expreso(1, tamano, variedad).calcularPrecio()).toBe(esperado);
  });

  it.each(filtrados)('Filtrado %s %s = $%i', (tamano, variedad, esperado) => {
    expect(new Filtrado(1, tamano, variedad).calcularPrecio()).toBe(esperado);
  });

  it('Muffin de chocolate = $2500', () => {
    expect(new Pasteleria(19, 'Muffin de chocolate', 2500).calcularPrecio()).toBe(2500);
  });

  it('Torta selva negra = $4200', () => {
    expect(new Pasteleria(20, 'Torta selva negra', 4200).calcularPrecio()).toBe(4200);
  });
});

describe('Polimorfismo', () => {
  it('todos son Producto y calcularPrecio() depende del tipo', () => {
    const productos: Producto[] = [
      new Expreso(1, 'Pocillo', 'Brasil'),
      new Filtrado(2, 'Pocillo', 'Brasil'),
      new Pasteleria(3, 'Muffin de chocolate', 2500),
    ];
    expect(productos.map((p) => p.calcularPrecio())).toEqual([5020, 4040, 2500]);
  });

  it('cada producto tiene id, nombre y precioBase', () => {
    const e = new Expreso(7, 'Mediano', 'Etiopía');
    expect(e.id).toBe(7);
    expect(e.nombre).toBe('Expreso Mediano Etiopía');
    expect(e.precioBase).toBe(2500);
  });
});

describe('ProductoRepository', () => {
  const repo = new ProductoRepository();

  it('tiene 20 productos (9 expresos, 9 filtrados, 2 pastelerías)', () => {
    expect(repo.listar()).toHaveLength(20);
  });

  it('los ids son únicos', () => {
    const ids = repo.listar().map((p) => p.id);
    expect(new Set(ids).size).toBe(20);
  });

  it('buscarPorId devuelve el producto o undefined', () => {
    expect(repo.buscarPorId(1)?.nombre).toBe('Expreso Pocillo Brasil');
    expect(repo.buscarPorId(999)).toBeUndefined();
  });
});

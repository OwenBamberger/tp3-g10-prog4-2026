import { ValidacionError } from '../services/errors';

/** Convierte un parámetro de ruta en id entero o lanza ValidacionError. */
export function parseId(valor: string | string[] | undefined): number {
  const id = Number(valor);
  if (valor === undefined || Array.isArray(valor) || valor.trim() === '' || !Number.isInteger(id)) {
    throw new ValidacionError('El id debe ser un número entero');
  }
  return id;
}

import { Router } from 'express';
import { ProductoController } from '../controllers/ProductoController';

export function productosRouter(controller: ProductoController): Router {
  const router = Router();

  router.get('/', controller.listar);
  router.get('/:id', controller.obtener);

  return router;
}

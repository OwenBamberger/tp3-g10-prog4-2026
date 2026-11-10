import { Router } from 'express';
import { PedidoController } from '../controllers/PedidoController';

export function pedidosRouter(controller: PedidoController): Router {
  const router = Router();

  router.post('/', controller.crear);
  router.get('/', controller.listar);
  router.get('/:id', controller.obtener);

  return router;
}

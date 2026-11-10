import { Router } from 'express';
import { ReporteController } from '../controllers/ReporteController';

export function reportesRouter(controller: ReporteController): Router {
  const router = Router();

  router.get('/facturacion', controller.facturacion);
  router.get('/mas-vendido', controller.masVendido);

  return router;
}

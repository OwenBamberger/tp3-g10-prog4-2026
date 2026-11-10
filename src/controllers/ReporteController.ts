import { Request, Response } from 'express';
import { ReporteService } from '../services/ReporteService';

export class ReporteController {
  constructor(private service: ReporteService) {}

  facturacion = (_req: Request, res: Response) => {
    res.json({ facturacionTotal: this.service.facturacionTotal() });
  };

  masVendido = (_req: Request, res: Response) => {
    res.json(this.service.productoMasVendido());
  };
}

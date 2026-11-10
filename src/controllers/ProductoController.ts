import { Request, Response } from 'express';
import { ProductoService } from '../services/ProductoService';
import { parseId } from '../utils/parseId';

export class ProductoController {
  constructor(private service: ProductoService) {}

  listar = (_req: Request, res: Response) => {
    res.json(this.service.listar());
  };

  obtener = (req: Request, res: Response) => {
    const id = parseId(req.params.id);
    res.json(this.service.obtener(id));
  };
}

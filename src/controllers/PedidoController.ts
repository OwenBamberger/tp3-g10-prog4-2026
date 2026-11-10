import { Request, Response } from 'express';
import { PedidoService } from '../services/PedidoService';
import { parseId } from '../utils/parseId';

export class PedidoController {
  constructor(private service: PedidoService) {}

  crear = (req: Request, res: Response) => {
    res.status(201).json(this.service.crear(req.body));
  };

  listar = (_req: Request, res: Response) => {
    res.json(this.service.listar());
  };

  obtener = (req: Request, res: Response) => {
    const id = parseId(req.params.id);
    res.json(this.service.obtener(id));
  };
}

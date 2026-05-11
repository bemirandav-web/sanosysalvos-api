/**
 * Controlador de Mascotas
 * Endpoints CRUD para /api/mascotas
 */

import { Router, Request, Response } from 'express';
import { MascotaService } from '../services/MascotaService';

export function createMascotaController(mascotaService: MascotaService): Router {
  const router = Router();

  /** GET /api/mascotas */
  router.get('/', async (_req: Request, res: Response) => {
    try {
      const mascotas = await mascotaService.obtenerTodasLasMascotas();
      res.json(mascotas);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  /** GET /api/mascotas/estado/:estado */
  router.get('/estado/:estado', async (req: Request, res: Response) => {
    try {
      const mascotas = await mascotaService.obtenerMascotasPorEstado(req.params.estado);
      res.json(mascotas);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  /** GET /api/mascotas/:id */
  router.get('/:id', async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        res.status(400).json({ error: 'ID inválido' });
        return;
      }
      const mascota = await mascotaService.obtenerMascotaPorId(id);
      if (!mascota) {
        res.status(404).json({ error: 'Mascota no encontrada' });
        return;
      }
      res.json(mascota);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  /** POST /api/mascotas */
  router.post('/', async (req: Request, res: Response) => {
    try {
      const mascota = await mascotaService.guardarMascota(req.body);
      res.status(201).json(mascota);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  /** PUT /api/mascotas/:id */
  router.put('/:id', async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id, 10);
      const mascota = await mascotaService.actualizarMascota(id, req.body);
      res.json(mascota);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  /** DELETE /api/mascotas/:id */
  router.delete('/:id', async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id, 10);
      await mascotaService.eliminarMascota(id);
      res.status(204).send();
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  return router;
}

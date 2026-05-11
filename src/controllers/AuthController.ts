/**
 * Controlador de Autenticación
 * Endpoints: POST /api/auth/login, POST /api/auth/register
 */

import { Router, Request, Response } from 'express';
import { AuthService } from '../services/AuthService';

export function createAuthController(authService: AuthService): Router {
  const router = Router();

  /** POST /api/auth/login */
  router.post('/login', async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        res.status(400).json({ error: 'Email y contraseña son obligatorios' });
        return;
      }
      const response = await authService.login({ email, password });
      res.json(response);
    } catch (error: any) {
      res.status(401).json({ error: error.message });
    }
  });

  /** POST /api/auth/register */
  router.post('/register', async (req: Request, res: Response) => {
    try {
      const { email, password, nombre } = req.body;
      const result = await authService.register({ email, password, nombre });
      res.status(201).json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  return router;
}

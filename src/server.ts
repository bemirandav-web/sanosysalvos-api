import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import { ServiceFactory } from './factories/ServiceFactory';
import { createAuthController } from './controllers/AuthController';
import { createMascotaController } from './controllers/MascotaController';
import { createReporteController } from './controllers/ReporteController';
import { createMensajeController } from './controllers/MensajeController';
import { createSoporteTicketController } from './controllers/SoporteTicketController';
import { authMiddleware, adminMiddleware } from './middleware/authMiddleware';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());

const authService = ServiceFactory.createAuthService();
const mascotaService = ServiceFactory.createMascotaService();
const reporteService = ServiceFactory.createReporteService();
const mensajeService = ServiceFactory.createMensajeService();
const soporteTicketService = ServiceFactory.createSoporteTicketService();

app.use('/api/auth', createAuthController(authService));
app.use('/api/mascotas', createMascotaController(mascotaService));
app.use('/api/reportes', createReporteController(reporteService));
app.use('/api/mensajes', createMensajeController(mensajeService));

app.use('/api/soporte', authMiddleware, createSoporteTicketController(soporteTicketService));

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'Sanos y Salvos API',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
  });
});

app.get('/', (_req, res) => {
  res.json({
    message: 'Bienvenido a la API de Sanos y Salvos',
    docs: '/api/health',
    endpoints: {
      auth: '/api/auth/login | /api/auth/register',
      mascotas: '/api/mascotas',
      reportes: '/api/reportes',
      mensajes: '/api/mensajes',
      soporte: '/api/soporte (requiere autenticacion)',
    },
  });
});

app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('Error no manejado:', err.message);
  res.status(500).json({ error: 'Error interno del servidor' });
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Sanos y Salvos API corriendo en http://localhost:${PORT}`);
    console.log(`Health check: http://localhost:${PORT}/api/health`);
  });
}

export default app;

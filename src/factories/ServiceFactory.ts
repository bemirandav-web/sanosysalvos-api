/**
 * ============================================================
 * PATRÓN DE DISEÑO: FACTORY PATTERN
 * ============================================================
 * 
 * Problema que resuelve:
 *   Centraliza la creación de servicios y sus dependencias,
 *   desacoplando el código cliente de las implementaciones concretas.
 *   Permite cambiar fácilmente las implementaciones (ej: pasar de
 *   Supabase a otro proveedor, o usar mocks para testing).
 * 
 * Beneficios:
 *   - Single Responsibility: la creación está en un solo lugar
 *   - Dependency Inversion: los controladores dependen de interfaces
 *   - Fácil inyección de dependencias para testing
 *   - Centraliza la configuración de dependencias
 * ============================================================
 */

import { MascotaRepository, IMascotaRepository } from '../repositories/MascotaRepository';
import { UsuarioRepository, IUsuarioRepository } from '../repositories/UsuarioRepository';
import { ReporteRepository, IReporteRepository } from '../repositories/ReporteRepository';
import { MensajeRepository, IMensajeRepository } from '../repositories/MensajeRepository';
import { SoporteTicketRepository, ISoporteTicketRepository } from '../repositories/SoporteTicketRepository';
import { MascotaService } from '../services/MascotaService';
import { AuthService } from '../services/AuthService';
import { ReporteService } from '../services/ReporteService';
import { MensajeService } from '../services/MensajeService';
import { SoporteTicketService } from '../services/SoporteTicketService';
import {
  NotificationService,
  EmailNotificationStrategy,
  SmsNotificationStrategy,
  PushNotificationStrategy,
  INotificationStrategy,
} from '../strategies/NotificationStrategy';

/** Tipo de entorno para configurar las implementaciones */
type Environment = 'production' | 'development' | 'test';

/**
 * Factory central para crear servicios con sus dependencias inyectadas
 */
export class ServiceFactory {
  private static env: Environment = (process.env.NODE_ENV as Environment) || 'development';

  /** Permite sobreescribir el entorno (útil para testing) */
  static setEnvironment(env: Environment): void {
    ServiceFactory.env = env;
  }

  // ── Repositorios ──────────────────────────────────────

  static createMascotaRepository(): IMascotaRepository {
    return new MascotaRepository();
  }

  static createUsuarioRepository(): IUsuarioRepository {
    return new UsuarioRepository();
  }

  static createReporteRepository(): IReporteRepository {
    return new ReporteRepository();
  }

  static createMensajeRepository(): IMensajeRepository {
    return new MensajeRepository();
  }

  static createSoporteTicketRepository(): ISoporteTicketRepository {
    return new SoporteTicketRepository();
  }

  // ── Servicios ─────────────────────────────────────────

  static createMascotaService(repo?: IMascotaRepository): MascotaService {
    return new MascotaService(repo || ServiceFactory.createMascotaRepository());
  }

  static createAuthService(repo?: IUsuarioRepository): AuthService {
    return new AuthService(repo || ServiceFactory.createUsuarioRepository());
  }

  static createReporteService(repo?: IReporteRepository): ReporteService {
    return new ReporteService(repo || ServiceFactory.createReporteRepository());
  }

  static createMensajeService(repo?: IMensajeRepository): MensajeService {
    return new MensajeService(repo || ServiceFactory.createMensajeRepository());
  }

  static createSoporteTicketService(repo?: ISoporteTicketRepository): SoporteTicketService {
    return new SoporteTicketService(repo || ServiceFactory.createSoporteTicketRepository());
  }

  // ── Estrategias de Notificación ───────────────────────

  static createNotificationService(channel: string = 'email'): NotificationService {
    let strategy: INotificationStrategy;
    switch (channel) {
      case 'sms':
        strategy = new SmsNotificationStrategy();
        break;
      case 'push':
        strategy = new PushNotificationStrategy();
        break;
      case 'email':
      default:
        strategy = new EmailNotificationStrategy();
        break;
    }
    return new NotificationService(strategy);
  }
}

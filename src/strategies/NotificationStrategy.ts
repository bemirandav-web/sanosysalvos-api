/**
 * ============================================================
 * PATRÓN DE DISEÑO: STRATEGY PATTERN
 * ============================================================
 * 
 * Problema que resuelve:
 *   Permite definir una familia de algoritmos de notificación
 *   (email, SMS, push) intercambiables en tiempo de ejecución
 *   sin modificar el código del servicio que los usa.
 * 
 * Beneficios:
 *   - Open/Closed Principle: agregar nuevas estrategias sin modificar código existente
 *   - Elimina condicionales complejos (if/else para cada tipo)
 *   - Facilita testing de cada estrategia de forma aislada
 *   - Permite cambiar el comportamiento en runtime
 * ============================================================
 */

/** Datos de la notificación */
export interface NotificationData {
  to: string;
  subject: string;
  body: string;
  metadata?: Record<string, unknown>;
}

/** Resultado de envío */
export interface NotificationResult {
  success: boolean;
  channel: string;
  message: string;
  timestamp: string;
}

/**
 * Interfaz Strategy: define el contrato para todas las estrategias de notificación
 */
export interface INotificationStrategy {
  readonly channel: string;
  send(data: NotificationData): Promise<NotificationResult>;
}

/**
 * Estrategia concreta: Notificación por Email
 */
export class EmailNotificationStrategy implements INotificationStrategy {
  readonly channel = 'email';

  async send(data: NotificationData): Promise<NotificationResult> {
    // En producción se integraría con un servicio como SendGrid, Resend, etc.
    console.log(`📧 [EMAIL] Enviando a ${data.to}: ${data.subject}`);
    return {
      success: true,
      channel: this.channel,
      message: `Email enviado a ${data.to}`,
      timestamp: new Date().toISOString(),
    };
  }
}

/**
 * Estrategia concreta: Notificación por SMS
 */
export class SmsNotificationStrategy implements INotificationStrategy {
  readonly channel = 'sms';

  async send(data: NotificationData): Promise<NotificationResult> {
    // En producción se integraría con Twilio, etc.
    console.log(`📱 [SMS] Enviando a ${data.to}: ${data.body.substring(0, 160)}`);
    return {
      success: true,
      channel: this.channel,
      message: `SMS enviado a ${data.to}`,
      timestamp: new Date().toISOString(),
    };
  }
}

/**
 * Estrategia concreta: Notificación Push
 */
export class PushNotificationStrategy implements INotificationStrategy {
  readonly channel = 'push';

  async send(data: NotificationData): Promise<NotificationResult> {
    console.log(`🔔 [PUSH] Enviando a ${data.to}: ${data.subject}`);
    return {
      success: true,
      channel: this.channel,
      message: `Push notification enviada a ${data.to}`,
      timestamp: new Date().toISOString(),
    };
  }
}

/**
 * Contexto: Servicio de Notificaciones que usa la estrategia seleccionada
 */
export class NotificationService {
  private strategy: INotificationStrategy;

  constructor(strategy: INotificationStrategy) {
    this.strategy = strategy;
  }

  /** Permite cambiar la estrategia en runtime */
  setStrategy(strategy: INotificationStrategy): void {
    this.strategy = strategy;
  }

  getCurrentChannel(): string {
    return this.strategy.channel;
  }

  /** Envía notificación usando la estrategia actual */
  async notify(data: NotificationData): Promise<NotificationResult> {
    return this.strategy.send(data);
  }

  /** Envía notificación por múltiples canales a la vez */
  static async notifyAll(
    strategies: INotificationStrategy[],
    data: NotificationData
  ): Promise<NotificationResult[]> {
    return Promise.all(strategies.map((s) => s.send(data)));
  }
}
// Strategy Pattern implementation v1.0

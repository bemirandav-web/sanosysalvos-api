/**
 * ============================================================
 * PATRÓN DE DISEÑO: BUILDER PATTERN
 * ============================================================
 * 
 * Problema que resuelve:
 *   Simplifica la creación de objetos complejos (como Reporte)
 *   que tienen múltiples campos opcionales y requieren validación.
 *   Evita constructores con muchos parámetros y permite construir
 *   objetos paso a paso con una API fluida.
 * 
 * Beneficios:
 *   - Código más legible al construir objetos complejos
 *   - Validación centralizada antes de crear el objeto
 *   - Inmutabilidad del objeto final
 *   - Fácil de extender con nuevos campos
 * ============================================================
 */

import { Reporte } from '../models';

export class ReporteBuilder {
  private reporte: Partial<Reporte> = {};

  constructor() {
    // Valores por defecto
    this.reporte.fecha_reporte = new Date().toISOString();
  }

  setUbicacion(ubicacion: string): ReporteBuilder {
    this.reporte.ubicacion_aproximada = ubicacion;
    return this;
  }

  setDescripcion(descripcion: string): ReporteBuilder {
    this.reporte.descripcion = descripcion;
    return this;
  }

  setTipoReporte(tipo: string): ReporteBuilder {
    this.reporte.tipo_reporte = tipo;
    return this;
  }

  setMascotaId(mascotaId: number): ReporteBuilder {
    this.reporte.mascota_id = mascotaId;
    return this;
  }

  setUsuarioId(usuarioId: number): ReporteBuilder {
    this.reporte.usuario_id = usuarioId;
    return this;
  }

  setFechaReporte(fecha: string): ReporteBuilder {
    this.reporte.fecha_reporte = fecha;
    return this;
  }

  /**
   * Valida y construye el objeto Reporte final
   * @throws Error si faltan campos obligatorios
   */
  build(): Partial<Reporte> {
    // Validaciones
    if (!this.reporte.descripcion || this.reporte.descripcion.trim() === '') {
      throw new Error('La descripción del reporte es obligatoria');
    }
    if (!this.reporte.tipo_reporte) {
      throw new Error('El tipo de reporte es obligatorio');
    }
    const tiposValidos = ['perdido', 'encontrado', 'avistamiento', 'maltrato', 'emergencia'];
    if (!tiposValidos.includes(this.reporte.tipo_reporte)) {
      throw new Error(`Tipo de reporte inválido. Tipos válidos: ${tiposValidos.join(', ')}`);
    }
    if (!this.reporte.ubicacion_aproximada) {
      throw new Error('La ubicación aproximada es obligatoria');
    }

    // Retorna copia inmutable
    return { ...this.reporte };
  }
}

/**
 * Director: configura builders para tipos comunes de reportes
 */
export class ReporteDirector {
  static crearReportePerdido(
    descripcion: string,
    ubicacion: string,
    mascotaId: number,
    usuarioId: number
  ): Partial<Reporte> {
    return new ReporteBuilder()
      .setTipoReporte('perdido')
      .setDescripcion(descripcion)
      .setUbicacion(ubicacion)
      .setMascotaId(mascotaId)
      .setUsuarioId(usuarioId)
      .build();
  }

  static crearReporteEncontrado(
    descripcion: string,
    ubicacion: string,
    usuarioId: number
  ): Partial<Reporte> {
    return new ReporteBuilder()
      .setTipoReporte('encontrado')
      .setDescripcion(descripcion)
      .setUbicacion(ubicacion)
      .setUsuarioId(usuarioId)
      .build();
  }

  static crearReporteEmergencia(
    descripcion: string,
    ubicacion: string,
    usuarioId: number
  ): Partial<Reporte> {
    return new ReporteBuilder()
      .setTipoReporte('emergencia')
      .setDescripcion(descripcion)
      .setUbicacion(ubicacion)
      .setUsuarioId(usuarioId)
      .build();
  }
}
// Builder Pattern implementation v1.0

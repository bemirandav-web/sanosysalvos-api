/**
 * Configuración de Supabase como base de datos
 * Singleton Pattern: garantiza una única instancia del cliente Supabase
 */
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

class SupabaseConfig {
  private static instance: SupabaseClient | null = null;

  private constructor() {}

  /**
   * Singleton: retorna siempre la misma instancia del cliente Supabase
   */
  public static getClient(): SupabaseClient {
    if (!SupabaseConfig.instance) {
      const url = process.env.SUPABASE_URL || '';
      const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || '';

      if (!url || !key) {
        console.warn('⚠️ Supabase credentials not configured. Using mock mode.');
      }

      SupabaseConfig.instance = createClient(url, key, {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      });
    }
    return SupabaseConfig.instance;
  }

  /** Reset para testing */
  public static resetInstance(): void {
    SupabaseConfig.instance = null;
  }
}

export default SupabaseConfig;

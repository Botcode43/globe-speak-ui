import { pipeline, env } from '@huggingface/transformers';

// Configure transformers.js
env.allowLocalModels = false;
env.useBrowserCache = true;

interface TranslationResult {
  text: string;
  confidence?: number;
}

class TranslationService {
  private onlineTranslator: any = null;
  private offlineTranslator: any = null;
  private isInitialized = false;

  async initializeOfflineTranslator() {
    if (this.offlineTranslator) return;
    
    try {
      console.log('Initializing offline translator...');
      this.offlineTranslator = await pipeline(
        'translation',
        'Xenova/opus-mt-en-es',
        { device: 'webgpu' }
      );
      console.log('Offline translator ready');
    } catch (error) {
      console.warn('Failed to initialize offline translator:', error);
      // Fallback to CPU if WebGPU fails
      try {
        this.offlineTranslator = await pipeline(
          'translation',
          'Xenova/opus-mt-en-es'
        );
        console.log('Offline translator ready (CPU fallback)');
      } catch (cpuError) {
        console.error('Failed to initialize offline translator even with CPU:', cpuError);
      }
    }
  }

  async translateOnline(text: string, sourceLang: string = 'en', targetLang: string = 'es'): Promise<TranslationResult> {
    // Mock online translation for demo
    // In real app, this would call your translation API
    return new Promise((resolve) => {
      setTimeout(() => {
        const translations: { [key: string]: string } = {
          'Hello, how are you today?': 'Hola, ¿cómo estás hoy?',
          'Good morning': 'Buenos días',
          'Thank you very much': 'Muchas gracias',
          'Where is the bathroom?': '¿Dónde está el baño?',
          'I need help': 'Necesito ayuda',
          'How much does this cost?': '¿Cuánto cuesta esto?',
          'What time is it?': '¿Qué hora es?',
          'Nice to meet you': 'Mucho gusto en conocerte'
        };
        
        resolve({
          text: translations[text] || `[Online] Traducción de: ${text}`,
          confidence: 0.95
        });
      }, 1000);
    });
  }

  async translateOffline(text: string): Promise<TranslationResult> {
    if (!this.offlineTranslator) {
      await this.initializeOfflineTranslator();
    }

    if (!this.offlineTranslator) {
      throw new Error('Offline translator not available');
    }

    try {
      const result = await this.offlineTranslator(text);
      return {
        text: result[0]?.translation_text || text,
        confidence: result[0]?.score || 0.8
      };
    } catch (error) {
      console.error('Offline translation failed:', error);
      throw error;
    }
  }

  async translate(text: string, isOnline: boolean = true): Promise<TranslationResult> {
    if (isOnline && navigator.onLine) {
      try {
        return await this.translateOnline(text);
      } catch (error) {
        console.warn('Online translation failed, falling back to offline:', error);
        return await this.translateOffline(text);
      }
    } else {
      return await this.translateOffline(text);
    }
  }

  isOfflineReady(): boolean {
    return !!this.offlineTranslator;
  }
}

export const translationService = new TranslationService();
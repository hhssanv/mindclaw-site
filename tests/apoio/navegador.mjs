import { chromium } from 'playwright';
import { iniciarServidor } from './servidor.mjs';

/** Sobe o servidor de dist/ e um Chromium sem interface; devolve os dois e um fechar(). */
export async function ambiente() {
  const servidor = await iniciarServidor();
  const navegador = await chromium.launch();
  return {
    base: servidor.base,
    navegador,
    fechar: async () => {
      await navegador.close();
      await servidor.fechar();
    },
  };
}

import { textos, type Idioma } from '../i18n';

/**
 * Dados do site que aparecem em mais de uma página e não mudam com o idioma.
 * Contato e nome vêm da assinatura de e-mail da marca (Drive › Logo › Z – Assinatura).
 * Textos (posicionamento, descrição, confidencialidade, nota sobre ganhos) ficam em src/i18n/.
 */
export const site = {
  nome: 'Hans MindClaw',
  pessoa: 'Hans Spiller',
  url: 'https://hansmindclaw.com',

  email: 'hans@hansmindclaw.com',
  /** Preencha para exibir no Sobre e no rodapé (ex.: 'https://www.linkedin.com/in/...'). */
  linkedin: undefined as string | undefined,
  /** Cidade e estado, se quiser exibir (ex.: 'Sorocaba, SP'). */
  localizacao: undefined as string | undefined,
  whatsapp: {
    numero: '5515998349373',
    exibicao: '+55 15 99834-9373',
  },
} as const;

export function urlAbsoluta(caminho: string): string {
  return new URL(caminho, site.url).href;
}

/** Imagem de compartilhamento (Open Graph): /og/<nome>.png em português, /og/<idioma>/<nome>.png nos demais. */
export function imagemOg(idioma: Idioma, nome = 'padrao'): string {
  return idioma === 'pt-BR' ? `/og/${nome}.png` : `/og/${idioma}/${nome}.png`;
}

/**
 * Título da área como assunto de frase: "Dados, BI e dashboards" → "dados, BI e dashboards".
 * Siglas ficam: "IA aplicada" e "AI agents" não mudam.
 */
export function assuntoDe(titulo: string): string {
  return /^[A-Z]{2}/.test(titulo) ? titulo : titulo.charAt(0).toLowerCase() + titulo.slice(1);
}

/** Mensagem inicial do WhatsApp, no idioma da página, citando a área de onde a pessoa veio. */
export function mensagemWhatsApp(idioma: Idioma, assunto?: string): string {
  return textos[idioma].geral.mensagemWhatsApp(assunto);
}

export function linkWhatsApp(texto?: string): string {
  const base = `https://wa.me/${site.whatsapp.numero}`;
  return texto ? `${base}?text=${encodeURIComponent(texto)}` : base;
}

/**
 * Dados do site que aparecem em mais de uma página.
 * Contato e nome vêm da assinatura de e-mail da marca (Drive › Logo › Z – Assinatura).
 */
export const site = {
  nome: 'Hans MindClaw',
  pessoa: 'Hans Spiller',
  url: 'https://hansmindclaw.com',
  idioma: 'pt-BR',
  locale: 'pt_BR',

  posicionamento:
    'Processos complexos, sistemas desconectados e trabalho manual transformados em automações, integrações, sistemas inteligentes e operações auditáveis.',
  descricao:
    'Capacity, BI, automação, IA aplicada, segurança e infraestrutura para operações que dependem de trabalho manual, com controle humano e registro de tudo.',
  /** Linha de credencial, vinda do dossiê profissional. */
  trajetoria: 'Mais de uma década em ambientes corporativos',
  areasResumo: 'Infraestrutura, dados, automação, segurança e IA aplicada',

  email: 'hans@hansmindclaw.com',
  /** Preencha para exibir no Sobre e no rodapé (ex.: 'https://www.linkedin.com/in/...'). */
  linkedin: undefined as string | undefined,
  /** Cidade e estado, se quiser exibir (ex.: 'Sorocaba, SP'). */
  localizacao: undefined as string | undefined,
  whatsapp: {
    numero: '5515998349373',
    exibicao: '+55 15 99834-9373',
  },

  navegacao: [
    { rotulo: 'Soluções', href: '/solucoes/' },
    { rotulo: 'Projetos', href: '/projetos/' },
    { rotulo: 'Sobre', href: '/sobre/' },
  ],
  contato: { rotulo: 'Contato', href: '/contato/' },

  confidencialidade:
    'Nenhum nome de cliente, dado real ou detalhe de implementação é publicado aqui. O seu projeto recebe o mesmo tratamento.',
} as const;

/**
 * O ganho é proporcional a cada ambiente. Nenhum percentual é prometido no site:
 * o diagnóstico mede a situação atual e define como o resultado vai ser medido.
 */
export const notaGanho =
  'Quanto cada ponto melhora depende do ambiente: volume, estrutura e maturidade dos dados. Por isso nenhum percentual é prometido aqui. O diagnóstico mede a situação atual e define, antes de começar, como o ganho vai ser medido.';

export function urlAbsoluta(caminho: string): string {
  return new URL(caminho, site.url).href;
}

/** Título da área como assunto de frase: "Dados, BI e dashboards" → "dados, BI e dashboards". Siglas ficam. */
export function assuntoDe(titulo: string): string {
  return /^[A-Z]{2}/.test(titulo) ? titulo : titulo.charAt(0).toLowerCase() + titulo.slice(1);
}

/** Mensagem inicial do WhatsApp, citando a área de onde a pessoa veio. */
export function mensagemWhatsApp(assunto?: string): string {
  return assunto
    ? `Olá, Hans! Vim pelo site e quero conversar sobre ${assunto}.`
    : 'Olá, Hans! Vim pelo site e quero conversar sobre um projeto.';
}

export function linkWhatsApp(texto?: string): string {
  const base = `https://wa.me/${site.whatsapp.numero}`;
  return texto ? `${base}?text=${encodeURIComponent(texto)}` : base;
}

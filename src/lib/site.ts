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
    'Automação, integração e IA aplicada para operações que dependem de trabalho manual e sistemas que não conversam, sempre com controle humano e registro do que acontece.',

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
    { rotulo: 'Cases', href: '/cases/' },
    { rotulo: 'Serviços', href: '/servicos/' },
    { rotulo: 'Sobre', href: '/sobre/' },
  ],
  contato: { rotulo: 'Contato', href: '/contato/' },

  confidencialidade:
    'Nenhum nome de cliente, dado real ou detalhe de implementação é publicado aqui. O seu projeto recebe o mesmo tratamento.',
} as const;

export const rotuloTipo = {
  producao: 'Produção',
  demonstracao: 'Demonstração',
} as const;

export const descricaoTipo = {
  producao: 'Sistema real em operação',
  demonstracao: 'Modelo com dados sintéticos',
} as const;

export function urlAbsoluta(caminho: string): string {
  return new URL(caminho, site.url).href;
}

export function linkWhatsApp(texto?: string): string {
  const base = `https://wa.me/${site.whatsapp.numero}`;
  return texto ? `${base}?text=${encodeURIComponent(texto)}` : base;
}

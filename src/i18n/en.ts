import type { Textos } from './pt-BR';

/**
 * Interface text in English. Same keys as pt-BR.ts (TypeScript checks it)
 * and the same voice: no first person, short sentences, gains without percentages.
 */
const textos: Textos = {
  site: {
    posicionamento:
      'Complex processes, disconnected systems and manual work turned into automations, integrations, intelligent systems and auditable operations.',
    descricao:
      'Capacity planning, BI, automation, applied AI, security and infrastructure for operations that rely on manual work, with human control and a record of everything.',
    trajetoria: 'More than a decade in corporate environments',
    areasResumo: 'Infrastructure, data, automation, security and applied AI',
    confidencialidade:
      'No client names, real data or implementation details are published here. Your project gets the same treatment.',
    notaGanho:
      'How much each point improves depends on the environment: volume, structure and data maturity. That is why no percentage is promised here. The assessment measures the current situation and defines, before any work starts, how the gain will be measured.',
    rotuloNotaGanho: 'About the gains',
    pais: 'Brazil',
  },

  navegacao: {
    inicio: 'Home',
    solucoes: 'Solutions',
    projetos: 'Projects',
    sobre: 'About',
    contato: 'Contact',
    privacidade: 'Privacy',
  },

  geral: {
    pularConteudo: 'Skip to content',
    conversarWhatsApp: 'Chat on WhatsApp',
    novaAbaWhatsApp: '(opens WhatsApp in a new tab)',
    nota: 'Note',
    legenda: 'Legend',
    mensagemWhatsApp: (assunto?: string) =>
      assunto
        ? `Hi Hans! I found your website and would like to talk about ${assunto}.`
        : 'Hi Hans! I found your website and would like to talk about a project.',
  },

  topo: {
    inicioAria: (nome: string) => `${nome}, home page`,
    menu: 'Menu',
    navPrincipal: 'Main',
    preferencias: 'Language and theme',
    temaEscuro: 'Dark theme',
    temaClaro: 'Light theme',
    temaEscuroAtivado: 'Dark theme on.',
    temaClaroAtivado: 'Light theme on.',
  },

  rodape: {
    mapa: 'Site map',
    solucoes: 'Solutions',
    contato: 'Contact',
    confidencialidade: 'Confidentiality',
  },

  cta: {
    rotulo: 'Contact',
    alternativa: 'Prefer email? Other ways to get in touch',
  },

  confidencialidade: {
    rotulo: 'Confidentiality',
    titulo: 'How your work is handled',
    lead: 'Confidentiality as a method, not a clause. The projects on this site follow the same rule applied to every client engagement.',
    compromissos: [
      {
        titulo: 'No client names',
        texto: 'Not in the portfolio, in published projects, in conversations with third parties or in file metadata.',
      },
      {
        titulo: 'Examples are always fictitious',
        texto: 'Anything shown in public uses synthetic data. Real screenshots never leave the project.',
      },
      {
        titulo: 'What is yours stays with you',
        texto: 'Code, files and credentials stay in your environment and are never reused for another client.',
      },
      {
        titulo: 'Agreement before access',
        texto: 'A non-disclosure agreement can be signed before any access to data.',
      },
    ],
  },

  vizinhos: {
    anterior: 'Previous',
    proxima: 'Next',
  },

  projetoCard: {
    areas: 'Areas',
    demonstracao: 'Demo model',
    contexto: 'Context',
    atuacao: 'Approach',
    resultado: 'Outcome',
    tecnologias: 'Technologies and methods',
  },

  solucaoCard: {
    ganhos: 'What usually improves',
    ver: 'See the solution',
  },

  diagrama: {
    rotulo: 'Architecture',
    regra: 'The rule that shapes the design',
    responsabilidade: 'Responsibility: ',
    restricao: 'Constraint',
  },

  painel: {
    estados: { ok: 'On target', atencao: 'Watch', alerta: 'At risk' },
    painelExecutivo: 'Executive dashboard',
    selo: 'Fictitious company and data',
    receitaMes: 'Revenue this month',
    sobre: (variacao: string, periodo: string) => `${variacao} vs. ${periodo}`,
    arr: 'Annual recurring revenue',
    em12Meses: (variacao: string) => `${variacao} over 12 months`,
    margemBruta: 'Gross margin',
    churn3Meses: 'Customer churn (3 months)',
    meta: (valor: string) => `target ${valor}`,
    teto: (valor: string) => `ceiling ${valor}`,
    margemEbitda: 'EBITDA margin',
    churn: 'Customer churn',
    taxaGanho: 'Proposal win rate',
    crescimentoAno: 'Revenue growth this year',
    mesAno: (mes: string, ano: number) => `${mes} ${ano}`,
    realizado: 'Actual',
    previsao: 'Forecast',
    orcamento: 'Budget',
    graficoTitulo: (ano: number) => `Monthly revenue in ${ano}, US$`,
    graficoAria: (d: { ano: number; real: string; prev: string; previsto: string; orcado: string }) =>
      `Monthly revenue in ${d.ano}: actual from ${d.real}, forecast from ${d.prev} and the budget for the year. The year is projected at ${d.previsto} against ${d.orcado} in the budget.`,
    intervalo: (de: string, ate: string) => `${de} to ${ate}`,
    marcaPrevisao: 'forecast →',
    pontoAria: (mes: string, real: string | null, prev: string | null, orc: string) =>
      `${mes}: ${real !== null ? `actual ${real}` : `forecast ${prev}`}, budget ${orc}`,
    resumoAntes: 'Projected year: ',
    resumoDepois: (orcado: string, diferenca: string) => ` against ${orcado} in the budget (${diferenca}).`,
    atencaoTitulo: 'Needs management attention',
    checagens: (passando: number, total: number) => `${passando} of ${total} reconciliation checks passing`,
    regras: (total: number, alvo: number, atencao: number, acao: number) =>
      `${total} automatic alert rules: ${alvo} on target, ${atencao} on watch, ${acao} requiring action`,
    verTabela: 'View the chart data as a table',
    mes: 'Month',
    legendaFigura: (empresa: string) =>
      `Dashboard recreated from a demo model with 12 report pages and 9 source tables. ${empresa} does not exist; clients, people and figures are synthetic.`,
  },

  capacidade: {
    hora: (h: number) => (h < 12 ? `${h}am` : h === 12 ? '12pm' : `${h - 12}pm`),
    horaFrase: (h: number) => (h < 12 ? `${h}am` : h === 12 ? '12pm' : `${h - 12}pm`),
    situacao: (diferenca: number) =>
      diferenca > 0 ? `${diferenca} short` : diferenca < 0 ? `${-diferenca} extra` : 'exact match',
    horaAria: (hora: string, necessidade: number, escala: number, situacao: string) =>
      `${hora}: ${necessidade} people needed, ${escala} scheduled, ${situacao}`,
    eyebrow: 'Illustration with fictitious data',
    titulo: 'Hourly need versus a schedule built on the average',
    necessidade: 'Need (forecast)',
    falta: 'Coverage gap',
    escalaMedia: (pessoas: number) => `Average-based schedule (${pessoas} people)`,
    graficoAria: (d: { inicio: string; fim: string; escala: number; descobertas: number }) =>
      `Illustration: people needed per hour, from ${d.inicio} to ${d.fim}, against a fixed schedule of ${d.escala} people. ${d.descobertas} hours are left uncovered at the peak, and there are too many people at the start and end of the day.`,
    dica: 'Hover over the hours or move through them with the keyboard to see the numbers.',
    leitura: (d: { escalaTotal: number; necessidade: number; descobertas: number; faltam: number; sobram: number }) =>
      `The average-based schedule adds up to ${d.escalaTotal} person-hours and the need to ${d.necessidade}: in total, it almost matches. But ${d.descobertas} hours are left uncovered at the peak (${d.faltam} person-hours short) and ${d.sobram} are left over at the edges of the day. An hourly forecast shows where to move people before hiring or paying overtime.`,
    verTabela: 'View the data as a table',
    colunas: { hora: 'Hour', necessidade: 'Need', escalados: 'Scheduled', diferenca: 'Difference' },
  },

  inicio: {
    titulo: (nome: string) => `${nome} · Automation, data and applied AI`,
    eyebrow: 'Technology, data and automation',
    h1Antes: 'From manual work to ',
    h1Destaque: 'automated, auditable operations.',
    lead: 'Complex processes, disconnected systems and manual work turned into automations, integrations and intelligent systems, with human approval where it matters and a record of everything that happens.',
    verSolucoes: 'See the solutions',
    solucoesRotulo: 'Solutions',
    solucoesTitulo: 'Where help makes a difference',
    solucoesLead: 'Areas described by the problem they solve. Many problems cut across more than one.',
    todasSolucoes: 'All solutions',
    naoEncontrou: 'Don’t see your area?',
    naoEncontrouTexto: 'Problems that cut across systems, data and people rarely fit into a single area.',
    conteProblema: 'Describe the problem',
    resultadoRotulo: 'Results',
    resultadoTitulo: 'Gains measured in your operation, not promised on a website',
    resultadoTexto:
      'Capacity planning and forecasting can cut costs sharply in one operation and only slightly in another. It depends on volume, structure and data maturity. That is why no ready-made percentage appears here.',
    medicao: [
      { titulo: 'Assessment first', texto: 'The current situation is measured before any proposal.' },
      { titulo: 'Criteria before starting', texto: 'What counts as success is written into the scope.' },
      { titulo: 'Gains measured on your data', texto: 'The result is compared against the operation’s own data.' },
    ],
    projetosRotulo: 'Projects',
    projetosTitulo: 'Real work, described without exposing anyone',
    projetosLead: 'Anonymized projects: context, outcome and the area they fit into.',
    todosProjetos: 'All projects',
    formaRotulo: 'How it works',
    formaTitulo: 'Way of working',
    sobrePerfil: 'About the profile',
    ctaTitulo: 'Is there a process that depends on someone copying, checking or remembering?',
    ctaTexto:
      'Describe the problem the way it shows up day to day. The first conversation is for understanding the situation and saying honestly whether and how help is possible.',
  },

  solucoes: {
    titulo: (nome: string) => `Solutions · ${nome}`,
    descricao:
      'Capacity and forecasting, payroll and HR, BI, automation, applied AI, security and infrastructure: the problem each area solves and what usually improves.',
    eyebrow: 'Solutions',
    h1: 'Where help makes a difference',
    lead: 'Seven areas, described by the problem they solve and what usually improves. Many problems cut across more than one, and that is where a profile connecting infrastructure, data, automation and security makes a difference.',
    areasAria: 'Areas of work',
    naoEncontrou: 'Don’t see your area?',
    naoEncontrouTexto:
      'Problems that cut across systems, data and people rarely fit into a single area. Describe how it shows up.',
    conteProblema: 'Describe the problem',
    formasRotulo: 'How to engage',
    formasTitulo: 'Four ways to work together',
    formasLead:
      'This is not a price list: the cost depends on the scope, and the scope is agreed in writing before work starts.',
    entra: 'What’s included',
    naoEntra: 'What’s not included',
    foraRotulo: 'Scope limits',
    foraTitulo: 'What stays out',
    foraLead: 'Saying what is not included is part of the work too.',
    foraDoEscopo: [
      {
        titulo: 'Off-the-shelf products or software licenses',
        texto: 'Each delivery is built for the client’s process, not sold off the shelf.',
      },
      {
        titulo: 'Penetration testing or certification audits',
        texto: 'Governance, access reviews and hardening, yes. Pentests and formal certification, no.',
      },
      {
        titulo: 'Automation that acts alone where mistakes are costly',
        texto: 'Any external action with real impact goes through human approval, always.',
      },
      {
        titulo: 'Undocumented deliveries',
        texto: 'A system that only works while the person who built it is around is not a delivery.',
      },
    ],
    ctaTitulo: 'Not sure which area to start with?',
    ctaTexto: 'It almost always starts with an assessment. Describe the problem and the format is defined together.',
  },

  solucao: {
    trilha: 'Breadcrumb',
    ganhos: 'What usually improves',
    sinaisRotulo: 'Diagnosis',
    sinaisTitulo: 'Signs this solves your problem',
    entregasRotulo: 'Delivery',
    entregasTitulo: 'What gets done',
    ferramentas: 'Most-used tools',
    exemploRotulo: 'Example',
    projetosRotulo: 'Projects',
    projetosTitulo: (quantidade: number) => (quantidade === 1 ? 'Related project' : 'Related projects'),
    projetosLead: 'Described anonymously: context, approach and outcome, without exposing the client or the implementation.',
    ctaTitulo: 'Recognize any of these signs?',
    ctaTexto:
      'Describe how the problem shows up day to day. The first conversation is for understanding the situation and saying honestly whether and how help is possible.',
    outras: 'Other solutions',
  },

  projetos: {
    titulo: (nome: string) => `Projects · ${nome}`,
    descricao:
      'Capacity, BI, automation, applied AI, security and infrastructure projects, described anonymously: context, approach, outcome and technologies.',
    eyebrow: 'Portfolio',
    h1: 'Projects',
    lead: 'Work described anonymously and grouped by type of problem: the context, what was done, the outcome and the technologies. No client names and no implementation details. The only demo model is labeled as such.',
    listaAria: 'Project list',
    filtroAria: 'Filter projects by area',
    filtroRotulo: 'Filter by area',
    todas: 'All',
    exibidoUm: '{n} project shown',
    exibidosVarios: '{n} projects shown',
    ctaTitulo: 'Have a problem like one of these?',
    ctaTexto: 'The projects show the kind of problem, not the limit of what can be done. Describe what is holding things up.',
  },

  sobre: {
    titulo: (nome: string) => `About · ${nome}`,
    descricao:
      'More than a decade in corporate environments, bringing together infrastructure, security, data, automation and applied AI in end-to-end projects.',
    eyebrow: 'About',
    bio: [
      'Hans Spiller brings together skills that usually sit in separate IT teams: infrastructure, security, data, automation, governance and applied AI. Rather than looking only at the tool, the work covers the whole process: data source, business rule, infrastructure, security, user, automation, evidence and ongoing support.',
      'This profile makes a difference when the cause of a problem is not in a single system. Many projects cut across technology, operations, HR, databases, spreadsheets, networks and integrations: understanding the operation, investigating the problem, organizing the data, building the solution, adjusting access, validating the result and documenting the new process.',
      'The approach is practical and evidence-driven: find the real bottleneck, reduce manual work, protect the critical points and leave a clear trail. In critical environments, changes are small and reversible, and human validation stays wherever the risk calls for it.',
    ],
    linkedin: 'LinkedIn profile',
    fotoAlt: 'Hans Spiller, with red hair and beard and a black T-shirt, in front of a bookshelf.',
    stackRotulo: 'Stack',
    stackTitulo: 'Technologies and skills by area',
    formaRotulo: 'Way of working',
    formaTitulo: 'Eight principles in every project',
    formaLead: 'From assessment to solution design, implementation, validation, documentation and ongoing support.',
    ctaTitulo: 'Want to talk about a specific process?',
    ctaTexto:
      'The first conversation is about understanding the problem. If it makes sense, the next step is a fixed-scope assessment.',
  },

  contato: {
    titulo: (nome: string) => `Contact · ${nome}`,
    descricao:
      'Describe the problem the way it shows up day to day. The conversation starts on WhatsApp or by email, with no sign-up and no form stored on a server.',
    eyebrow: 'Contact',
    h1: 'Describe what is holding things up',
    lead: 'In the words of whoever lives with the problem, no need to know the solution. The reply brings a first reading and, if it makes sense, a proposal for a fixed-scope assessment.',
    canais: 'Direct channels',
    whatsappRotulo: 'WhatsApp · fastest reply',
    emailRotulo: 'Email',
    copiar: 'Copy',
    copiarComplemento: ' the email address',
    copiado: 'Copied',
    copiadoStatus: 'Email address copied.',
    copiarFalhou: 'Select and copy',
    formulario: 'Contact form',
    opcional: 'optional',
    nome: 'Name',
    retorno: 'Company or other contact',
    retornoAjuda: 'Company, role or an email for the reply, if you prefer.',
    area: 'Closest area',
    areaEscolha: 'Choose the closest option',
    areaOutro: 'Other / not sure yet',
    areaOutroValor: 'Other',
    descricaoCampo: 'What is happening?',
    descricaoAjuda: 'Who is affected, how often and what has already been tried. Do not include sensitive data.',
    descricaoErro: 'Describe the problem in a few lines.',
    enviarWhatsApp: 'Send via WhatsApp',
    enviarEmail: 'Send by email',
    nota: 'The form stores nothing: it opens your WhatsApp (or your email) with the message ready, and you decide whether to send it.',
    semJs: 'With JavaScript turned off, the form cannot build the message. Use the direct channels instead.',
    linhaNome: 'Name',
    linhaContato: 'Contact',
    linhaArea: 'Area',
    assunto: 'Website contact',
  },

  privacidade: {
    titulo: (nome: string) => `Privacy · ${nome}`,
    descricao:
      'How this site handles data: no cookies, no third-party analytics, and a contact form that stores nothing on a server.',
    eyebrow: 'Privacy',
    h1: 'Privacy',
    lead: 'This site was built to collect as little as possible. In practice, that means the following.',
    secoes: [
      {
        titulo: 'What the site does not do',
        texto:
          'It uses no cookies, has no third-party analytics or advertising tools and does not log who visits. Fonts and images are served by the site itself, with no calls to external services.',
      },
      {
        titulo: 'Preferences in your browser',
        texto:
          'If you choose a theme (light or dark) or a language, the choice is saved in your browser’s local storage so it applies on future visits. It never leaves your device and does not identify you. To erase it, clear the site data in your browser.',
      },
      {
        titulo: 'Hosting',
        texto:
          'The site is hosted on GitHub Pages. Like any server, GitHub may log technical access data, such as IP addresses, under its own privacy policy.',
      },
      {
        titulo: 'Contact form',
        texto:
          'The form sends nothing to a server. It builds the message and opens your email app or WhatsApp with the text ready; you decide whether to send it. From then on, the message follows the rules of the service you chose.',
      },
      {
        titulo: 'Use of messages',
        texto:
          'Whatever you send is used only to reply to you and to carry on any resulting work conversation. It is not shared with third parties or used in the portfolio.',
      },
    ],
    seusDadosTitulo: 'Your data',
    seusDadosTexto: 'To request access to, correction of or deletion of any message you have sent, write to',
  },

  naoEncontrada: {
    titulo: (nome: string) => `Page not found · ${nome}`,
    descricao:
      'The page you are looking for does not exist or has moved. The menu leads to the solutions, the projects and the contact page.',
    eyebrow: 'Error 404',
    h1: 'This page does not exist',
    lead: 'The address may have changed, or the link was incomplete.',
    verSolucoes: 'See the solutions',
    voltar: 'Back to home',
  },

  og: {
    solucao: 'SOLUTION',
    chamada: 'From manual work to automated, auditable operations.',
  },
};

export default textos;

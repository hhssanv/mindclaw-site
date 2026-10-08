/**
 * Textos de interface em português (idioma principal do site).
 * O conteúdo das soluções, projetos, princípios, serviços e stack fica em content/.
 * en.ts precisa ter exatamente as mesmas chaves: o TypeScript confere.
 */
const textos = {
  site: {
    posicionamento:
      'Processos complexos, sistemas desconectados e trabalho manual transformados em automações, integrações, sistemas inteligentes e operações auditáveis.',
    descricao:
      'IA aplicada, automação, BI, capacity, segurança e infraestrutura para operações que dependem de trabalho manual, com controle humano e registro de tudo.',
    /** Linha de credencial, vinda do dossiê profissional. */
    trajetoria: 'Mais de uma década em ambientes corporativos',
    areasResumo: 'IA aplicada, automação, dados, segurança e infraestrutura',
    confidencialidade:
      'Nenhum nome de cliente, dado real ou detalhe de implementação é publicado aqui. O seu projeto recebe o mesmo tratamento.',
    /**
     * O ganho é proporcional a cada ambiente. Nenhum percentual é prometido no site:
     * o diagnóstico mede a situação atual e define como o resultado vai ser medido.
     */
    notaGanho:
      'Quanto cada ponto melhora depende do ambiente: volume, estrutura e maturidade dos dados. Por isso nenhum percentual é prometido aqui. O diagnóstico mede a situação atual e define, antes de começar, como o ganho vai ser medido.',
    rotuloNotaGanho: 'Sobre os ganhos',
    pais: 'Brasil',
  },

  navegacao: {
    inicio: 'Início',
    solucoes: 'Soluções',
    projetos: 'Projetos',
    sobre: 'Sobre',
    contato: 'Contato',
    privacidade: 'Privacidade',
  },

  geral: {
    pularConteudo: 'Pular para o conteúdo',
    conversarWhatsApp: 'Conversar no WhatsApp',
    novaAbaWhatsApp: '(abre o WhatsApp em nova aba)',
    nota: 'Nota',
    legenda: 'Legenda',
    /** Mensagem inicial do WhatsApp, citando a área de onde a pessoa veio. */
    mensagemWhatsApp: (assunto?: string) =>
      assunto
        ? `Olá, Hans! Vim pelo site e quero conversar sobre ${assunto}.`
        : 'Olá, Hans! Vim pelo site e quero conversar sobre um projeto.',
  },

  topo: {
    inicioAria: (nome: string) => `${nome}, página inicial`,
    menu: 'Menu',
    navPrincipal: 'Principal',
    preferencias: 'Idioma e tema',
    /** O botão mostra o tema para o qual ele leva. */
    temaEscuro: 'Tema escuro',
    temaClaro: 'Tema claro',
    temaEscuroAtivado: 'Tema escuro ativado.',
    temaClaroAtivado: 'Tema claro ativado.',
  },

  rodape: {
    mapa: 'Mapa do site',
    solucoes: 'Soluções',
    contato: 'Contato',
    confidencialidade: 'Confidencialidade',
  },

  cta: {
    rotulo: 'Contato',
    alternativa: 'Prefere e-mail? Outras formas de contato',
  },

  confidencialidade: {
    rotulo: 'Confidencialidade',
    titulo: 'Como o seu trabalho é tratado',
    lead: 'Confidencialidade como método, não como cláusula. Os projetos deste site seguem a mesma regra aplicada a cada trabalho de cliente.',
    compromissos: [
      {
        titulo: 'Nenhum nome de cliente',
        texto: 'Não aparece em portfólio, projeto publicado, conversa com terceiros ou metadado de arquivo.',
      },
      {
        titulo: 'Exemplos sempre fictícios',
        texto: 'O que é mostrado em público usa dados sintéticos. Captura real não sai do projeto.',
      },
      {
        titulo: 'O que é seu fica com você',
        texto: 'Código, arquivos e credenciais ficam no seu ambiente e não são reaproveitados em outro cliente.',
      },
      {
        titulo: 'Acordo antes do acesso',
        texto: 'Um acordo de confidencialidade pode ser assinado antes de qualquer acesso a dados.',
      },
    ],
  },

  vizinhos: {
    anterior: 'Anterior',
    proxima: 'Próxima',
  },

  projetoCard: {
    areas: 'Áreas',
    demonstracao: 'Modelo de demonstração',
    contexto: 'Contexto',
    atuacao: 'Atuação',
    resultado: 'Resultado',
    tecnologias: 'Tecnologias e métodos',
  },

  solucaoCard: {
    ganhos: 'O que costuma melhorar',
    ver: 'Ver a solução',
  },

  diagrama: {
    rotulo: 'Arquitetura',
    regra: 'Regra que decide o desenho',
    responsabilidade: 'Responsabilidade: ',
    restricao: 'Restrição',
  },

  painel: {
    estados: { ok: 'No alvo', atencao: 'Atenção', alerta: 'Em risco' },
    painelExecutivo: 'Painel executivo',
    selo: 'Empresa e dados fictícios',
    receitaMes: 'Receita do mês',
    sobre: (variacao: string, periodo: string) => `${variacao} sobre ${periodo}`,
    arr: 'Receita recorrente anual',
    em12Meses: (variacao: string) => `${variacao} em 12 meses`,
    margemBruta: 'Margem bruta',
    churn3Meses: 'Churn de clientes (3 meses)',
    meta: (valor: string) => `meta ${valor}`,
    teto: (valor: string) => `teto ${valor}`,
    margemEbitda: 'Margem EBITDA',
    churn: 'Churn de clientes',
    taxaGanho: 'Taxa de ganho de propostas',
    crescimentoAno: 'Crescimento da receita no ano',
    /** "jul/2025" */
    mesAno: (mes: string, ano: number) => `${mes}/${ano}`,
    realizado: 'Realizado',
    previsao: 'Previsão',
    orcamento: 'Orçamento',
    graficoTitulo: (ano: number) => `Receita mensal de ${ano}, em US$`,
    graficoAria: (d: { ano: number; real: string; prev: string; previsto: string; orcado: string }) =>
      `Receita mensal de ${d.ano}: realizado de ${d.real}, previsão de ${d.prev} e orçamento do ano. Ano projetado em ${d.previsto} contra ${d.orcado} no orçamento.`,
    /** "janeiro a julho" */
    intervalo: (de: string, ate: string) => `${de} a ${ate}`,
    marcaPrevisao: 'previsão →',
    pontoAria: (mes: string, real: string | null, prev: string | null, orc: string) =>
      `${mes}: ${real !== null ? `realizado ${real}` : `previsão ${prev}`}, orçamento ${orc}`,
    resumoAntes: 'Ano projetado: ',
    resumoDepois: (orcado: string, diferenca: string) => ` contra ${orcado} no orçamento (${diferenca}).`,
    atencaoTitulo: 'Atenção da gestão',
    checagens: (passando: number, total: number) => `${passando} de ${total} checagens de reconciliação passando`,
    regras: (total: number, alvo: number, atencao: number, acao: number) =>
      `${total} regras de alerta automáticas: ${alvo} no alvo, ${atencao} em atenção, ${acao} exigindo ação`,
    verTabela: 'Ver os dados do gráfico em tabela',
    mes: 'Mês',
    legendaFigura: (empresa: string) =>
      `Painel recriado a partir de um modelo de demonstração com 12 páginas de relatório e 9 tabelas de origem. A empresa ${empresa} não existe; clientes, pessoas e valores são sintéticos.`,
  },

  capacidade: {
    /** Rótulo do eixo: "08h". */
    hora: (h: number) => `${String(h).padStart(2, '0')}h`,
    /** Hora no meio de uma frase: "8h". */
    horaFrase: (h: number) => `${h}h`,
    situacao: (diferenca: number) =>
      diferenca > 0 ? `faltam ${diferenca}` : diferenca < 0 ? `sobram ${-diferenca}` : 'escala exata',
    horaAria: (hora: string, necessidade: number, escala: number, situacao: string) =>
      `${hora}: necessidade de ${necessidade} pessoas, ${escala} escaladas, ${situacao}`,
    eyebrow: 'Ilustração com dados fictícios',
    titulo: 'Necessidade por hora contra escala pela média',
    necessidade: 'Necessidade (forecast)',
    falta: 'Falta de cobertura',
    escalaMedia: (pessoas: number) => `Escala pela média (${pessoas} pessoas)`,
    graficoAria: (d: { inicio: string; fim: string; escala: number; descobertas: number }) =>
      `Ilustração: necessidade de pessoas por hora, das ${d.inicio} às ${d.fim}, contra uma escala fixa de ${d.escala} pessoas. ${d.descobertas} horas ficam descobertas no pico e sobra gente no início e no fim do dia.`,
    dica: 'Passe o cursor ou navegue pelas horas com o teclado para ver os números.',
    leitura: (d: { escalaTotal: number; necessidade: number; descobertas: number; faltam: number; sobram: number }) =>
      `A escala pela média soma ${d.escalaTotal} horas-pessoa e a necessidade, ${d.necessidade}: no total quase fecha. Mas ${d.descobertas} horas ficam descobertas no pico (faltam ${d.faltam} horas-pessoa) e sobram ${d.sobram} nas pontas do dia. O forecast por hora mostra onde mover gente antes de contratar ou pagar hora extra.`,
    verTabela: 'Ver os dados em tabela',
    colunas: { hora: 'Hora', necessidade: 'Necessidade', escalados: 'Escalados', diferenca: 'Diferença' },
  },

  inicio: {
    titulo: (nome: string) => `${nome} · Automação, dados e IA aplicada`,
    eyebrow: 'Tecnologia, dados e automação',
    h1Antes: 'Do trabalho manual à ',
    h1Destaque: 'operação automatizada e auditável.',
    lead: 'Processos complexos, sistemas desconectados e trabalho manual transformados em automações, integrações e sistemas inteligentes, com aprovação humana onde importa e registro de tudo o que acontece.',
    verSolucoes: 'Ver as soluções',
    solucoesRotulo: 'Soluções',
    solucoesTitulo: 'Onde a operação costuma travar',
    solucoesLead: 'Áreas descritas pelo problema que resolvem. Muitos problemas atravessam mais de uma delas.',
    todasSolucoes: 'Todas as soluções',
    naoEncontrou: 'Não encontrou a sua área?',
    naoEncontrouTexto: 'Problemas que atravessam sistemas, dados e pessoas costumam não caber em uma área só.',
    conteProblema: 'Conte o problema',
    resultadoRotulo: 'Resultado',
    resultadoTitulo: 'Ganho medido na sua operação, não prometido no site',
    resultadoTexto:
      'Em qualquer área, o ganho depende do ponto de partida: quanto mais trabalho manual, retrabalho e informação desencontrada houver, maior costuma ser o resultado. Por isso nenhum percentual pronto aparece aqui.',
    medicao: [
      { titulo: 'Diagnóstico primeiro', texto: 'A situação atual é medida antes de qualquer proposta.' },
      { titulo: 'Critério antes de começar', texto: 'O que conta como sucesso fica escrito no escopo.' },
      { titulo: 'Ganho medido na sua base', texto: 'O resultado é comparado com os dados da própria operação.' },
    ],
    projetosRotulo: 'Portfólio',
    projetosTitulo: 'Projetos em operação, sem dados sensíveis',
    projetosLead: 'Casos reais, descritos pelo problema que resolveram: o contexto, o resultado e a área de cada um.',
    todosProjetos: 'Todos os projetos',
    formaRotulo: 'Como funciona',
    formaTitulo: 'Forma de trabalhar',
    sobrePerfil: 'Sobre o perfil',
    ctaTitulo: 'Tem um processo que depende de alguém copiando, conferindo ou lembrando?',
    ctaTexto:
      'Conte o problema do jeito que ele aparece no dia a dia. A primeira conversa serve para entender o cenário e dizer, com franqueza, se e como dá para ajudar.',
  },

  solucoes: {
    titulo: (nome: string) => `Soluções · ${nome}`,
    descricao:
      'IA aplicada, automação, BI, capacity e forecast, folha e RH, segurança e infraestrutura: o problema que cada área resolve e o que costuma melhorar.',
    eyebrow: 'Soluções',
    h1: 'Onde a operação costuma travar',
    lead: 'Sete áreas, descritas pelo problema que resolvem e pelo que costuma melhorar. Muitos problemas atravessam mais de uma delas, e é aí que um perfil que conecta infraestrutura, dados, automação e segurança faz diferença.',
    areasAria: 'Áreas de atuação',
    naoEncontrou: 'Não encontrou a sua área?',
    naoEncontrouTexto:
      'Problemas que atravessam sistemas, dados e pessoas costumam não caber em uma área só. Conte como ele aparece.',
    conteProblema: 'Conte o problema',
    formasRotulo: 'Como contratar',
    formasTitulo: 'Quatro formas de contratação',
    formasLead: 'Não é tabela de preço: o valor depende do escopo, e o escopo é fechado por escrito antes de começar.',
    entra: 'O que entra',
    naoEntra: 'O que não entra',
    foraRotulo: 'Limite de escopo',
    foraTitulo: 'O que fica de fora',
    foraLead: 'Dizer o que não está incluído também é parte do trabalho.',
    foraDoEscopo: [
      {
        titulo: 'Produto pronto ou licença de software',
        texto: 'Cada entrega é construída para o processo do cliente, não vendida de prateleira.',
      },
      {
        titulo: 'Teste de invasão ou auditoria de certificação',
        texto: 'Governança, revisão de acessos e hardening, sim. Pentest e certificação formal, não.',
      },
      {
        titulo: 'Automação que age sozinha onde o erro custa caro',
        texto: 'Ação externa com impacto real passa por aprovação humana, sempre.',
      },
      {
        titulo: 'Entrega sem documentação',
        texto: 'Um sistema que só funciona enquanto quem o construiu está por perto não é uma entrega.',
      },
    ],
    ctaTitulo: 'Não sabe por qual área começar?',
    ctaTexto: 'Quase sempre começa por um diagnóstico. Conte o problema e o formato é definido junto.',
  },

  solucao: {
    trilha: 'Trilha',
    ganhos: 'O que costuma melhorar',
    sinaisRotulo: 'Diagnóstico',
    sinaisTitulo: 'Sinais de que isso resolve o seu problema',
    entregasRotulo: 'Entrega',
    entregasTitulo: 'O que é feito',
    ferramentas: 'Ferramentas mais usadas',
    exemploRotulo: 'Exemplo',
    projetosRotulo: 'Projetos',
    projetosTitulo: (quantidade: number): string => (quantidade === 1 ? 'Projeto relacionado' : 'Projetos relacionados'),
    projetosLead: 'Descritos de forma anonimizada: contexto, atuação e resultado, sem expor cliente nem implementação.',
    ctaTitulo: 'Reconheceu algum desses sinais?',
    ctaTexto:
      'Conte como o problema aparece no dia a dia. A primeira conversa serve para entender o cenário e dizer, com franqueza, se e como dá para ajudar.',
    outras: 'Outras soluções',
  },

  projetos: {
    titulo: (nome: string) => `Projetos · ${nome}`,
    descricao:
      'Projetos de IA aplicada, automação, BI, capacity, segurança e infraestrutura, descritos de forma anonimizada: contexto, atuação, resultado e tecnologias.',
    eyebrow: 'Portfólio',
    h1: 'Projetos',
    lead: 'Trabalhos descritos de forma anonimizada, agrupados pelo tipo de problema: o contexto, o que foi feito, o resultado e as tecnologias. Sem nome de cliente e sem detalhe de implementação. O único modelo de demonstração está identificado.',
    listaAria: 'Lista de projetos',
    filtroAria: 'Filtrar projetos por área',
    filtroRotulo: 'Filtrar por área',
    todas: 'Todas',
    /** Anunciado a cada filtro; o script troca {n} pelo total. */
    exibidoUm: '{n} projeto exibido',
    exibidosVarios: '{n} projetos exibidos',
    ctaTitulo: 'Tem um problema parecido com algum desses?',
    ctaTexto: 'Os projetos mostram o tipo de problema, não o limite do que dá para fazer. Conte o que está travando.',
  },

  sobre: {
    titulo: (nome: string) => `Sobre · ${nome}`,
    descricao:
      'Mais de uma década em ambientes corporativos, unindo infraestrutura, segurança, dados, automação e IA aplicada em projetos de ponta a ponta.',
    eyebrow: 'Sobre',
    bio: [
      'Hans Spiller reúne competências que normalmente ficam em áreas separadas de TI: infraestrutura, segurança, dados, automação, governança e IA aplicada. Em vez de tratar só a ferramenta, o trabalho olha o processo completo: origem do dado, regra de negócio, infraestrutura, segurança, usuário, automação, evidência e sustentação.',
      'Esse perfil faz diferença onde a causa de um problema não está em um único sistema. Boa parte dos projetos cruza tecnologia, operação, RH, banco de dados, planilhas, redes e integrações: entender a operação, investigar o problema, organizar os dados, construir a solução, ajustar acessos, validar o resultado e documentar o novo processo.',
      'A abordagem é prática e orientada a evidência: localizar o gargalo real, reduzir trabalho manual, proteger os pontos críticos e deixar rastreabilidade. Mudanças são pequenas e reversíveis em ambiente crítico, e a validação humana permanece onde o risco exige.',
    ],
    linkedin: 'Perfil no LinkedIn',
    fotoAlt:
      'Hans Spiller, de cabelo e barba ruivos e camiseta preta, olhando para o lado, diante de um fundo escuro com formas angulares em vermelho e azul.',
    stackRotulo: 'Stack',
    stackTitulo: 'Tecnologias e conhecimentos por área',
    formaRotulo: 'Forma de trabalhar',
    formaTitulo: 'Oito princípios em todo projeto',
    formaLead: 'Do diagnóstico ao desenho da solução, implementação, validação, documentação e sustentação.',
    ctaTitulo: 'Quer conversar sobre um processo específico?',
    ctaTexto:
      'A primeira conversa é para entender o problema. Se fizer sentido, o próximo passo é um diagnóstico com escopo fechado.',
  },

  contato: {
    titulo: (nome: string) => `Contato · ${nome}`,
    descricao:
      'Conte o problema do jeito que ele aparece no dia a dia. A conversa começa pelo WhatsApp ou por e-mail, sem cadastro e sem formulário guardado em servidor.',
    eyebrow: 'Contato',
    h1: 'Conte o que está travando',
    lead: 'Na linguagem de quem vive o problema, sem precisar saber a solução. A resposta traz uma primeira leitura e, se fizer sentido, uma proposta de diagnóstico com escopo fechado.',
    canais: 'Canais diretos',
    whatsappRotulo: 'WhatsApp · resposta mais rápida',
    emailRotulo: 'E-mail',
    copiar: 'Copiar',
    copiarComplemento: ' o endereço de e-mail',
    copiado: 'Copiado',
    copiadoStatus: 'Endereço de e-mail copiado.',
    copiarFalhou: 'Selecione e copie',
    formulario: 'Formulário de contato',
    opcional: 'opcional',
    nome: 'Nome',
    retorno: 'Empresa ou outro contato',
    retornoAjuda: 'Empresa, cargo ou um e-mail para resposta, se preferir.',
    area: 'Área mais próxima',
    areaEscolha: 'Escolha a opção mais próxima',
    areaOutro: 'Outro / ainda não sei',
    areaOutroValor: 'Outro',
    descricaoCampo: 'O que está acontecendo?',
    descricaoAjuda: 'Quem sofre com o problema, com que frequência e o que já foi tentado. Não inclua dados sensíveis.',
    descricaoErro: 'Descreva o problema em poucas linhas.',
    enviarWhatsApp: 'Enviar pelo WhatsApp',
    enviarEmail: 'Enviar por e-mail',
    nota: 'O formulário não guarda nada: ele abre o seu WhatsApp (ou o seu e-mail) com a mensagem pronta, e você decide se envia.',
    semJs: 'Com o JavaScript desligado o formulário não monta a mensagem. Use os canais diretos ao lado.',
    /** Linhas da mensagem montada pelo formulário. */
    linhaNome: 'Nome',
    linhaContato: 'Contato',
    linhaArea: 'Área',
    assunto: 'Contato pelo site',
  },

  privacidade: {
    titulo: (nome: string) => `Privacidade · ${nome}`,
    descricao:
      'Como este site trata dados: sem cookies, sem ferramentas de análise de terceiros, e um formulário de contato que não guarda nada em servidor.',
    eyebrow: 'Privacidade',
    h1: 'Privacidade',
    lead: 'Este site foi feito para coletar o mínimo possível. Na prática, isso significa o seguinte.',
    secoes: [
      {
        titulo: 'O que o site não faz',
        texto:
          'Não usa cookies, não tem ferramentas de análise ou publicidade de terceiros e não registra quem visita. As fontes e imagens são servidas pelo próprio site, sem chamadas a serviços externos.',
      },
      {
        titulo: 'Preferências no seu navegador',
        texto:
          'Se você escolher o tema (claro ou escuro) ou o idioma, a escolha fica guardada no armazenamento local do seu navegador, para valer nas próximas visitas. Ela não sai do seu aparelho e não identifica você. Para apagar, basta limpar os dados do site no navegador.',
      },
      {
        titulo: 'Hospedagem',
        texto:
          'O site é hospedado no GitHub Pages. Como qualquer servidor, o GitHub pode registrar dados técnicos de acesso, como endereço IP, conforme a política de privacidade dele.',
      },
      {
        titulo: 'Formulário de contato',
        texto:
          'O formulário não envia nada para um servidor. Ele monta a mensagem e abre o seu aplicativo de e-mail ou o WhatsApp com o texto pronto; você decide se envia. A partir daí, a mensagem segue as regras do serviço que você escolheu.',
      },
      {
        titulo: 'Uso das mensagens',
        texto:
          'O que você enviar é usado só para responder ao seu contato e conduzir uma eventual conversa de trabalho. Não é compartilhado com terceiros nem usado em portfólio.',
      },
    ],
    seusDadosTitulo: 'Seus dados',
    seusDadosTexto:
      'Para pedir acesso, correção ou exclusão de qualquer mensagem que você tenha enviado, escreva para',
  },

  naoEncontrada: {
    titulo: (nome: string) => `Página não encontrada · ${nome}`,
    descricao:
      'A página procurada não existe ou mudou de endereço. Pelo menu dá para chegar às soluções, aos projetos e ao contato.',
    eyebrow: 'Erro 404',
    h1: 'Esta página não existe',
    lead: 'O endereço pode ter mudado, ou o link estava incompleto.',
    verSolucoes: 'Ver as soluções',
    voltar: 'Voltar ao início',
  },

  og: {
    solucao: 'SOLUÇÃO',
    chamada: 'Do trabalho manual à operação automatizada e auditável.',
  },
};

export type Textos = typeof textos;
export default textos;

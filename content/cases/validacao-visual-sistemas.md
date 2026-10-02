---
slug: validacao-visual-sistemas
titulo: Validação cruzada entre sistemas que não conversam
subtitulo: Dois sistemas que não conversam, comparados automaticamente na tela, com a divergência apontada durante a operação e sem integrar nenhum dos dois.
eyebrow: [Visão computacional, Controle de processo, Automação]
tipo: producao
ordem: 2
destaque: true
resumo: Leitura automática de duas telas, comparação por regras explícitas e alerta durante a operação, sem integrar nenhum dos sistemas.

capacidades: [Leitura de tela por visão computacional, Regras de comparação explícitas, Alerta durante a operação]
metricas:
  - valor: "2"
    rotulo: sistemas comparados sem integração
  - valor: tempo real
    rotulo: alerta durante a operação
  - valor: "0"
    rotulo: alterações nos sistemas de origem
disclaimer: Sistema em operação sobre ambientes reais. Nenhuma tela, nome de sistema ou dado operacional é exibido; os exemplos usam situações fictícias.

problemas:
  - titulo: Conferência no olho
    texto: A checagem dependia de um operador olhar duas telas e perceber a diferença, a cada operação, o dia inteiro.
  - titulo: Divergência descoberta tarde
    texto: Quando a diferença aparecia, era no fechamento ou no relatório do dia seguinte, com a operação já concluída.
  - titulo: Nenhuma integração disponível
    texto: Nenhum dos dois sistemas oferecia integração que permitisse cruzar as informações automaticamente.
  - titulo: Erro sem rastro
    texto: Uma divergência não deixava registro. Não havia como analisar padrão, frequência ou causa depois.
construido:
  - titulo: Comparação automática e normalizada
    texto: O texto reconhecido nas duas telas é normalizado e comparado automaticamente, sem depender da atenção de alguém.
  - titulo: Alerta no instante da operação
    texto: A divergência é apontada ao operador enquanto a operação ainda está aberta e pode ser corrigida.
  - titulo: Leitura direto da tela
    texto: As informações são lidas do que já está em tela, então nenhum dos sistemas precisa oferecer integração ou ser alterado.
  - titulo: Regras de comparação explícitas
    texto: Cada verificação segue uma regra escrita, então toda divergência apontada tem um motivo identificável e pode ser analisada depois.
limiteEscopo: É uma camada de verificação sobre sistemas existentes. Não substitui integração oficial, não altera nenhum dos sistemas comparados e não deve ser o controle único de um processo de risco alto.

metodo:
  fases:
    - nome: Observar
      etapas:
        - titulo: Mapa de telas e campos relacionados
          detalhe: Quais informações aparecem nos dois sistemas e em que momento da operação.
        - titulo: Catálogo de divergências relevantes
          detalhe: Quais diferenças importam de verdade e quais são só formatação.
        - titulo: Critério de aceite com a operação
          detalhe: O que o operador precisa ver, e quando, para conseguir agir.
    - nome: Comparar
      etapas:
        - titulo: Leitura confiável da tela
          detalhe: Reconhecimento de texto apenas nas áreas que interessam à conferência.
        - titulo: Normalização
          detalhe: Formatos, espaços e variações padronizados antes de qualquer comparação.
        - titulo: Regras de comparação escritas
          detalhe: Cada tipo de divergência com a sua regra, revisável por quem conhece o processo.
    - nome: Alertar
      etapas:
        - titulo: Alerta durante a operação
          detalhe: Aviso visível ao operador enquanto ainda dá para corrigir.
        - titulo: Validação com situações conhecidas
          detalhe: Casos com resultado esperado conhecido, testados antes de a ferramenta valer para todos.
        - titulo: Documentação de uso e limites
          detalhe: O que a ferramenta verifica, o que não verifica e o que fazer quando ela avisa.
  teste: A divergência aparece antes de a operação terminar, ou só no relatório do dia seguinte?

prova:
  tipo: tabela
  titulo: Divergências que a verificação aponta
  lead: Cada tipo de divergência tem um sinal que a dispara e uma ação sugerida ao operador. Os exemplos são genéricos; as regras reais não são publicadas.
  colunas: [Tipo de divergência, Sinal que dispara, Ação sugerida]
  linhas:
    - [Valor diferente entre as telas, O mesmo campo mostra conteúdos diferentes nos dois sistemas, Conferir a origem antes de concluir a operação]
    - [Registro ausente em um dos lados, A informação existe em um sistema e não aparece no outro, Verificar se o lançamento foi feito no lugar certo]
    - [Formato fora do padrão, O conteúdo não segue o formato esperado para aquele campo, Revisar o preenchimento antes de seguir]
    - [Leitura inconclusiva, O texto da tela não pôde ser reconhecido com segurança, Conferir manualmente; a ferramenta não decide sozinha]
  nota: Quando a leitura não é confiável, a ferramenta avisa em vez de adivinhar. Um falso alerta custa um olhar; uma divergência perdida custa a operação.

principios:
  - titulo: Somente leitura
    texto: A verificação observa os sistemas e nunca escreve neles. Nenhuma alteração nos sistemas de origem.
  - titulo: Avisar em vez de adivinhar
    texto: Leitura duvidosa vira alerta para conferência humana, nunca uma conclusão automática.
  - titulo: Regras explícitas e revisáveis
    texto: Cada comparação segue uma regra escrita, que quem conhece o processo consegue ler e questionar.
  - titulo: Camada adicional, não controle único
    texto: A ferramenta reforça a conferência. Não substitui integração oficial nem o controle de um processo de risco alto.

entregaveis:
  - rotulo: Diagnóstico
    nome: Para saber se vale a pena
    itens: [Mapa de telas e campos relacionados, Catálogo de divergências relevantes, Avaliação de viabilidade da leitura, Critério de aceite com a operação]
  - rotulo: Construção
    nome: Para colocar na operação
    itens: [Leitura automática da tela, Normalização e regras de comparação, Alerta ao operador, Teste com situações conhecidas]
  - rotulo: Sustentação
    nome: Para continuar confiável
    itens: [Ajuste de regras quando a tela muda, Revisão periódica de alertas falsos, Documentação de uso e limites, Suporte à operação]
melhorEncaixe:
  - Conferência entre sistemas
  - Automação de desktop
  - Sistema legado sem API
  - Controle operacional em tempo real
  - Visão computacional aplicada a processo

seo:
  title: Validação cruzada entre sistemas que não conversam — case
  description: Como comparar automaticamente dois sistemas sem integração, lendo a tela e apontando a divergência durante a operação, sem alterar nenhum dos sistemas.
  ogImage: /og/validacao-visual-sistemas.png
---

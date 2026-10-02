---
# RASCUNHO: estrutura provisória até a tradução do deck em inglês.
# Métricas e título vêm da especificação; o restante deve ser substituído
# pelo conteúdo do deck (o limite de escopo, traduzido ao pé da letra).
slug: consolidacao-dados-rh
titulo: Consolidação de dados de RH e integridade de indicadores
subtitulo: Cinco bases de pessoas que não batiam entre si, reconciliadas por regras escritas até que o efetivo ativo tivesse uma única definição.
eyebrow: [Engenharia de dados, Qualidade de dados, Indicadores de RH]
tipo: demonstracao
ordem: 4
destaque: false
rascunho: true
resumo: Cinco fontes de dados de pessoas reconciliadas, nove regras de validação e uma definição escrita de efetivo ativo.

capacidades: [Reconciliação de bases, Regras de validação, Definição única de indicador]
metricas:
  - valor: "5"
    rotulo: fontes reconciliadas
  - valor: "9"
    rotulo: regras de validação
  - valor: "1"
    rotulo: regra escrita de efetivo ativo
disclaimer: Modelo de demonstração com dados sintéticos de uma empresa fictícia. Nenhuma pessoa, cargo ou número corresponde a dados reais.

problemas:
  - titulo: Cada base, um número
    texto: Folha, ponto, cadastro e planilhas de área davam totais diferentes para a mesma pergunta.
  - titulo: Efetivo sem definição
    texto: Quem conta como ativo? Afastado, em aviso, temporário? Cada área respondia de um jeito.
  - titulo: Erro que se propaga
    texto: Um cadastro errado em uma base contaminava todos os indicadores que dependiam dela.
  - titulo: Conferência manual a cada ciclo
    texto: O fechamento dependia de alguém cruzar planilhas à mão e decidir na hora qual número valia.
construido:
  - titulo: Reconciliação das cinco fontes
    texto: As bases cruzadas por uma chave comum, com cada divergência explicada ou corrigida na origem.
  - titulo: Definição escrita de efetivo ativo
    texto: Uma regra única, escrita e aprovada, que todas as áreas passam a usar.
  - titulo: Nove regras de validação
    texto: Verificações que barram o dado inconsistente antes que ele chegue ao indicador.
  - titulo: Fechamento reproduzível
    texto: O mesmo processo, com o mesmo resultado, a cada ciclo, sem decisão improvisada.
limiteEscopo: É um modelo de demonstração com dados sintéticos de uma empresa fictícia. Não é sistema de folha de pagamento, não substitui o sistema de RH e não é consultoria trabalhista. O que o case demonstra é método de reconciliação e integridade de dados.

metodo:
  fases:
    - nome: Mapear
      etapas:
        - titulo: Inventário das fontes
          detalhe: As cinco bases, com o que cada uma registra e quem mantém.
        - titulo: Dicionário de campos
          detalhe: O que cada campo significa em cada base.
        - titulo: Chave de reconciliação
          detalhe: Como reconhecer a mesma pessoa em bases diferentes.
    - nome: Reconciliar
      etapas:
        - titulo: Cruzamento entre bases
          detalhe: Onde as fontes concordam e onde divergem.
        - titulo: Tratamento de divergências
          detalhe: Cada divergência explicada ou corrigida na origem.
        - titulo: Definição de efetivo ativo
          detalhe: Uma regra escrita, aprovada por quem usa o número.
    - nome: Garantir
      etapas:
        - titulo: Regras de validação
          detalhe: Verificações que barram o dado inconsistente.
        - titulo: Indicadores rastreáveis
          detalhe: Cada número com origem identificável.
        - titulo: Fechamento documentado
          detalhe: O mesmo passo a passo, a cada ciclo.
  teste: Duas pessoas que rodam o fechamento separadamente chegam ao mesmo efetivo ativo?

prova:
  tipo: tabela
  titulo: Regras de validação por tipo
  lead: Quatro das nove regras do modelo, descritas pelo que verificam e não pela lógica de implementação.
  colunas: [Tipo de regra, O que verifica, Problema que evita]
  linhas:
    - [Unicidade, Cada pessoa aparece uma única vez no efetivo, Duplicidade entre bases]
    - [Consistência de datas, Desligamento nunca antes da admissão, Datas trocadas ou faltantes]
    - [Vínculo ativo, Pessoa ativa precisa estar ativa em todas as fontes obrigatórias, Divergência de status]
    - [Lotação, Toda pessoa ativa tem uma lotação válida, Lotação órfã]

entregaveis:
  - rotulo: Diagnóstico
    nome: Para saber onde os números divergem
    itens: [Inventário de fontes de dados de pessoas, Mapa de divergências entre bases, Proposta de definição de efetivo, Lista de riscos nos indicadores]
  - rotulo: Consolidação
    nome: Para ter um número só
    itens: [Reconciliação entre as fontes, Regras de validação implementadas, Definição de efetivo aprovada, Indicadores recalculados]
  - rotulo: Rotina
    nome: Para continuar batendo
    itens: [Fechamento documentado, Relatório de exceções por ciclo, Treinamento de quem opera, Revisão das regras quando a operação muda]
melhorEncaixe:
  - Indicadores de RH que não batem
  - Reconciliação de bases
  - Qualidade de dados
  - Definição de métricas
  - Fechamento mensal manual

seo:
  title: Consolidação de dados de RH — case
  description: Como reconciliar cinco bases de dados de pessoas, escrever uma definição única de efetivo ativo e validar indicadores de RH antes de chegarem à gestão.
  ogImage: /og/consolidacao-dados-rh.png
---

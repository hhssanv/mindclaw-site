---
# RASCUNHO: estrutura provisória até a tradução do deck em inglês.
# Métricas e título vêm da especificação; o restante deve ser substituído
# pelo conteúdo do deck (o limite de escopo, traduzido ao pé da letra).
slug: governanca-ti-acessos
titulo: Governança de TI e revisão de acessos
subtitulo: Um ambiente de TI sem inventário vira um mapa de sistemas, identidades e acessos revisados, com cada achado atribuído a um responsável.
eyebrow: [Governança de TI, Segurança de acessos, Continuidade operacional]
tipo: demonstracao
ordem: 3
destaque: false
rascunho: true
resumo: Inventário de sistemas, revisão de identidades e acessos e plano de continuidade, com cada achado atribuído a um responsável.

capacidades: [Inventário de sistemas, Revisão de acessos, Plano de continuidade]
metricas:
  - valor: "18"
    rotulo: sistemas inventariados
  - valor: "96"
    rotulo: identidades revisadas
  - valor: "23"
    rotulo: achados com responsável
disclaimer: Modelo de demonstração com dados sintéticos de uma empresa fictícia. Nenhum sistema, pessoa ou achado corresponde a um ambiente real.

problemas:
  - titulo: Ninguém sabe o que existe
    texto: Não havia lista confiável de sistemas, de quem é dono de cada um nem do que depende de quê.
  - titulo: Acesso que nunca é revisto
    texto: Contas de quem saiu, permissões acumuladas por quem mudou de função e acessos compartilhados que ninguém lembra de ter criado.
  - titulo: Achado sem dono
    texto: Os problemas eram conhecidos, mas não tinham responsável nem prazo, então continuavam lá.
  - titulo: Continuidade no improviso
    texto: Se um sistema crítico parasse, o plano dependia de quem estivesse disponível no dia.
construido:
  - titulo: Inventário de sistemas
    texto: Lista única com dono, criticidade e dependências de cada sistema.
  - titulo: Revisão de identidades e acessos
    texto: Cada identidade cruzada com os seus acessos e confrontada com a função atual.
  - titulo: Registro de achados com responsável
    texto: Cada achado com descrição, risco, responsável e prazo, acompanhado até o fechamento.
  - titulo: Plano de continuidade
    texto: O que fazer, em que ordem e com quem, quando um sistema crítico para.
limiteEscopo: É um modelo de demonstração com dados sintéticos. Não é teste de invasão, não é auditoria de certificação e não é avaliação formal de segurança. O que o case demonstra é método de governança — inventário, revisão e acompanhamento.

metodo:
  fases:
    - nome: Inventariar
      etapas:
        - titulo: Inventário de sistemas
          detalhe: Todo sistema em uso, com dono e finalidade.
        - titulo: Mapa de dependências
          detalhe: O que para quando cada sistema para.
        - titulo: Classificação de criticidade
          detalhe: Onde uma falha custa mais, para priorizar a revisão.
    - nome: Revisar
      etapas:
        - titulo: Base de identidades consolidada
          detalhe: Uma lista única de quem tem acesso a quê.
        - titulo: Matriz de acessos por função
          detalhe: O acesso esperado para cada função, comparado ao acesso real.
        - titulo: Exceções justificadas
          detalhe: Todo acesso fora do padrão com motivo e responsável.
    - nome: Sustentar
      etapas:
        - titulo: Registro de achados
          detalhe: Cada achado com responsável e prazo, até o fechamento.
        - titulo: Plano de continuidade
          detalhe: Procedimento de retorno para os sistemas críticos.
        - titulo: Rotina de revisão periódica
          detalhe: A revisão vira calendário, não evento.
  teste: Se alguém sair da empresa hoje, em quanto tempo todos os acessos dessa pessoa estão revogados, e quem confirma?

prova:
  tipo: tabela
  titulo: Categorias de achado
  lead: O tipo de achado que a revisão encontra e o encaminhamento de cada um. Exemplos genéricos do modelo de demonstração.
  colunas: [Categoria, O que é, Encaminhamento]
  linhas:
    - [Conta órfã, Identidade ativa sem vínculo atual com a empresa, Revogar e registrar]
    - [Privilégio excessivo, Permissão acima do que a função exige, Reduzir ao mínimo necessário]
    - [Acesso compartilhado, Credencial usada por mais de uma pessoa, Individualizar e atribuir dono]
    - [Sistema sem dono, Sistema em uso sem responsável definido, Atribuir dono e criticidade]
    - [Sem plano de retorno, Sistema crítico sem procedimento de recuperação, Incluir no plano de continuidade]

entregaveis:
  - rotulo: Inventário
    nome: Para saber o que existe
    itens: [Lista de sistemas com dono, Mapa de dependências, Classificação de criticidade, Base de identidades consolidada]
  - rotulo: Revisão
    nome: Para fechar o que está aberto
    itens: [Matriz de acessos por função, Lista de achados com risco, Responsável e prazo por achado, Relatório executivo]
  - rotulo: Continuidade
    nome: Para não depender de improviso
    itens: [Plano de continuidade, Rotina de revisão periódica, Procedimento de entrada e saída de pessoas, Documentação operacional]
melhorEncaixe:
  - Inventário de TI
  - Revisão de acessos
  - Saída de colaborador sem revogação
  - Plano de continuidade
  - Governança de TI em empresa média

seo:
  title: Governança de TI e revisão de acessos — case
  description: Como transformar um ambiente de TI sem inventário em sistemas mapeados, acessos revisados e achados com responsável, com plano de continuidade definido.
  ogImage: /og/governanca-ti-acessos.png
---

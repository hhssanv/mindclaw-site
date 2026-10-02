---
# RASCUNHO: estrutura provisória até a tradução do deck em inglês.
# Métricas e título vêm da especificação; o restante deve ser substituído
# pelo conteúdo do deck (o limite de escopo, traduzido ao pé da letra).
slug: planejamento-capacidade
titulo: Planejamento de capacidade e validação de escala
subtitulo: Demanda modelada hora a hora e escala de trabalho auditada contra regras escritas, para enxergar falta de cobertura com dois a três dias de antecedência.
eyebrow: [Modelagem de demanda, Planejamento operacional, Auditoria de escala]
tipo: demonstracao
ordem: 5
destaque: false
rascunho: true
resumo: Demanda modelada hora a hora e escala validada contra dez regras, com falta de cobertura visível dias antes.

capacidades: [Modelagem de demanda, Validação de escala, Antecipação de cobertura]
metricas:
  - valor: "10"
    rotulo: regras de escala validadas
  - valor: "1 h"
    rotulo: de granularidade na demanda
  - valor: "2–3 dias"
    rotulo: de antecedência para agir
disclaimer: Modelo de demonstração com dados sintéticos de uma operação fictícia. Nenhuma escala, pessoa ou volume corresponde a dados reais.

problemas:
  - titulo: Escala feita pela média
    texto: A escala era montada olhando a média do dia, e o pico da hora ficava descoberto.
  - titulo: Regra que ninguém confere
    texto: Intervalos, descansos e limites de jornada eram conferidos a olho, quando eram.
  - titulo: Falta percebida na hora
    texto: A falta de cobertura só aparecia quando a fila já estava formada.
  - titulo: Ajuste no improviso
    texto: Sem antecedência, toda correção virava hora extra ou remanejamento de última hora.
construido:
  - titulo: Demanda hora a hora
    texto: Modelo de demanda com granularidade horária, que mostra o pico que a média escondia.
  - titulo: Escala auditada contra regras
    texto: Dez regras de escala escritas e verificadas em toda versão da escala.
  - titulo: Mapa de cobertura
    texto: Comparação entre a demanda prevista e as pessoas escaladas, hora a hora.
  - titulo: Janela de antecipação
    texto: Falta de cobertura visível com dois a três dias de antecedência, quando ainda dá para ajustar sem improviso.
limiteEscopo: É um modelo de demonstração com dados sintéticos de uma operação fictícia. Não é sistema de ponto, não é software de escala e não substitui análise jurídica de jornada. O que o case demonstra é método de modelagem e auditoria.

metodo:
  fases:
    - nome: Medir
      etapas:
        - titulo: Histórico de demanda por hora
          detalhe: O volume real, sem a suavização da média diária.
        - titulo: Padrões por dia e período
          detalhe: Onde o pico se repete e onde ele muda.
        - titulo: Premissas de atendimento
          detalhe: O que conta como cobertura suficiente, por escrito.
    - nome: Auditar
      etapas:
        - titulo: Regras de escala escritas
          detalhe: As dez regras que toda escala precisa respeitar.
        - titulo: Verificação de cada versão
          detalhe: Toda mudança na escala passa pelas mesmas regras.
        - titulo: Lista de violações com motivo
          detalhe: Cada violação apontada com a regra que quebrou.
    - nome: Antecipar
      etapas:
        - titulo: Mapa de cobertura
          detalhe: Demanda prevista contra pessoas escaladas, hora a hora.
        - titulo: Alerta de falta antecipado
          detalhe: O buraco na cobertura aparece dias antes.
        - titulo: Revisão semanal
          detalhe: Rotina curta para ajustar premissas e escala.
  teste: A falta de cobertura de quinta-feira aparece na segunda, ou só quando a fila se forma?

prova:
  tipo: faixas
  titulo: Cobertura por faixa horária
  lead: Leitura do mapa de cobertura em um dia do modelo — onde a escala acompanha a demanda e onde não acompanha.
  colunas: [Faixa, Situação, Leitura]
  linhas:
    - [08h–10h, ok, Escala acompanha a demanda]
    - [10h–12h, atencao, Cobertura no limite]
    - [12h–14h, alerta, Pico coincide com intervalos concentrados]
    - [14h–17h, ok, Escala acompanha a demanda]
    - [17h–19h, atencao, Saídas antes do segundo pico]
  nota: Dados sintéticos. O modelo trabalha hora a hora; a tabela agrupa faixas para facilitar a leitura.

entregaveis:
  - rotulo: Diagnóstico
    nome: Para ver onde a escala falha
    itens: [Curva de demanda por hora, Mapa de cobertura atual, Regras de escala levantadas, Pontos de falta recorrentes]
  - rotulo: Modelo
    nome: Para escalar pelo pico real
    itens: [Modelo de demanda hora a hora, Auditoria de escala contra regras, Mapa de cobertura, Alerta de falta antecipado]
  - rotulo: Rotina
    nome: Para não voltar ao improviso
    itens: [Revisão semanal da escala, Ajuste das premissas de demanda, Relatório de violações, Documentação para quem monta a escala]
melhorEncaixe:
  - Escala de trabalho
  - Dimensionamento de equipe
  - Previsão de demanda
  - Auditoria de jornada
  - Operação de atendimento

seo:
  title: Planejamento de capacidade e validação de escala — case
  description: Como modelar demanda hora a hora e auditar a escala contra regras escritas para enxergar falta de cobertura com dois a três dias de antecedência.
  ogImage: /og/planejamento-capacidade.png
---

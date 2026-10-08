---
slug: capacidade-forecast
ordem: 4
titulo: Planejamento de capacidade e forecast
curto: Capacity e forecast
icone: planejamento
resumo: Equipe dimensionada pela demanda real, hora a hora, com escala validada contra as regras da operação.
chamada: Previsão de demanda a partir do histórico, dimensionamento de equipe e validação de escala. Para a operação parar de escalar pela média e de descobrir a falta de gente quando a fila já se formou.

sinais:
  - A escala é montada pela média do dia, e o pico de cada hora fica descoberto.
  - Hora extra virou rotina para cobrir buracos que eram previsíveis.
  - Sobra gente em alguns horários e falta em outros.
  - O dimensionamento depende da experiência de uma pessoa e não está escrito em lugar nenhum.
  - Folgas, intervalos e regras de jornada são conferidos a olho.

entregas:
  - titulo: Base histórica tratada
    texto: Meses de volume por dia e por hora, com os dias atípicos identificados e tratados antes de qualquer previsão.
  - titulo: Forecast de demanda
    texto: Previsão por faixa horária, com a representatividade de cada horário calculada a partir do histórico.
  - titulo: Dimensionamento de capacidade
    texto: Quantas pessoas cada faixa exige, separado da previsão e da escala para que cada etapa possa ser revisada.
  - titulo: Validação de escala
    texto: A escala confrontada com a necessidade real, considerando cobertura, folgas, intervalos e regras da operação.

ganhos:
  - Escala aderente à demanda real, e não à média
  - Menos hora extra para cobrir falta previsível
  - Menos ociosidade nos horários de baixa demanda
  - Decisão de quadro justificada com dados
  - Processo replicável, que não depende de uma única pessoa

ferramentas: [Excel, Power BI, Python, Séries históricas, Workforce management]

exemplo:
  tipo: capacidade
  titulo: Como o problema aparece nos dados
  lead: A média do dia esconde o pico. Com a necessidade calculada hora a hora, fica visível onde falta e onde sobra gente.
projetos: [planejamento-capacidade]

seo:
  title: Planejamento de capacidade e forecast · Hans MindClaw
  description: Forecast de demanda, dimensionamento de equipe e validação de escala a partir do histórico da operação, para escalar pelo pico real e não pela média.
---

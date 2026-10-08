---
slug: auditoria-rh
ordem: 5
titulo: Auditoria de folha, ponto e dados de RH
curto: Folha e RH
icone: pessoas
resumo: Horas extras, ponto, absenteísmo e folha conferidos entre fontes, com cada número rastreável até o lançamento de origem.
chamada: Conferência e reconciliação de dados de pessoas entre sistema, planilha e regra de negócio. Para o total da folha ou o efetivo do mês ter explicação, e não só um valor.

sinais:
  - Ninguém consegue explicar de onde vem o total de horas extras.
  - Ponto, folha e planilhas das áreas mostram números diferentes.
  - O fechamento depende de alguém cruzar arquivos à mão todo mês.
  - Listas de colaboradores não batem entre bases por diferença de grafia.

entregas:
  - titulo: Reconciliação entre bases
    texto: Comparação completa entre fontes, com matching exato e aproximado de nomes para separar diferença real de variação de grafia.
  - titulo: Decomposição de totais
    texto: Um total consolidado reconstruído a partir dos lançamentos e distribuído por rubrica e por pessoa, em ordem de impacto.
  - titulo: Análise de jornada
    texto: Horas extras, adicional noturno, DSR, atrasos, saídas e absenteísmo analisados por colaborador e por equipe.
  - titulo: Arquivo de auditoria reutilizável
    texto: O mesmo critério aplicado nos próximos fechamentos, sem refazer a conferência do zero.

ganhos:
  - Total de folha e de horas explicável até a origem
  - Menos conferência manual no fechamento
  - Divergência real separada de erro de digitação
  - Base confiável para decisões sobre pessoas

ferramentas: [Excel, Power Query, Python, pandas, SQL]
projetos: [horas-extras, reconciliacao-pessoas]

seo:
  title: Auditoria de folha, ponto e dados de RH · Hans MindClaw
  description: Reconciliação de bases de pessoas e auditoria de horas extras, ponto e folha, com cada total rastreável até o lançamento que o gerou.
---

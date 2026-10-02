/**
 * Números do modelo de demonstração (empresa fictícia Norvexa Systems).
 * Extraídos da planilha Demo1_Norvexa_Systems_Executive.xlsx, abas 01, 08 e 10.
 * Nenhum dado real: empresa, clientes e valores são sintéticos.
 */
export const norvexa = {
  "empresa": "Norvexa Systems",
  "mesReferencia": "julho de 2026",
  "kpis": {
    "receitaMes": 1426605,
    "receitaMesVar": 0.3934,
    "arr": 16347655,
    "arrVar": 0.3912,
    "clientes": 378,
    "clientesVar": 71,
    "margemBruta": 0.6871,
    "margemBrutaMeta": 0.7,
    "margemEbitda": 0.0298,
    "margemEbitdaMeta": 0.1,
    "churn": 0.0188,
    "churnTeto": 0.012,
    "nrr": 1.0017,
    "nrrPiso": 1.05,
    "winRate": 0.1698,
    "winRateMeta": 0.25,
    "crescimentoYtd": 0.3853,
    "crescimentoMeta": 0.25
  },
  "regras": {
    "total": 16,
    "noAlvo": 3,
    "atencao": 4,
    "acao": 9
  },
  "checagens": {
    "total": 11,
    "passando": 11
  },
  "serie": [
    {
      "mes": "jan",
      "realizado": 1219744,
      "previsao": null,
      "orcamento": 1288862
    },
    {
      "mes": "fev",
      "realizado": 1353480,
      "previsao": null,
      "orcamento": 1328283
    },
    {
      "mes": "mar",
      "realizado": 1292517,
      "previsao": null,
      "orcamento": 1370871
    },
    {
      "mes": "abr",
      "realizado": 1358837,
      "previsao": null,
      "orcamento": 1396224
    },
    {
      "mes": "mai",
      "realizado": 1405295,
      "previsao": null,
      "orcamento": 1433595
    },
    {
      "mes": "jun",
      "realizado": 1360267,
      "previsao": null,
      "orcamento": 1471958
    },
    {
      "mes": "jul",
      "realizado": 1426605,
      "previsao": null,
      "orcamento": 1485890
    },
    {
      "mes": "ago",
      "realizado": null,
      "previsao": 1447673,
      "orcamento": 1529096
    },
    {
      "mes": "set",
      "realizado": null,
      "previsao": 1473436,
      "orcamento": 1582819
    },
    {
      "mes": "out",
      "realizado": null,
      "previsao": 1499027,
      "orcamento": 1623978
    },
    {
      "mes": "nov",
      "realizado": null,
      "previsao": 1524448,
      "orcamento": 1657670
    },
    {
      "mes": "dez",
      "realizado": null,
      "previsao": 1549699,
      "orcamento": 1664562
    }
  ],
  "previsaoAnual": 16911028,
  "orcamentoAnual": 17833809
} as const;

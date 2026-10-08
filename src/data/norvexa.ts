/**
 * Números do modelo de demonstração (empresa fictícia Norvexa Systems).
 * Extraídos da planilha Demo1_Norvexa_Systems_Executive.xlsx, abas 01, 08 e 10.
 * Nenhum dado real: empresa, clientes e valores são sintéticos.
 * A série vai de janeiro a dezembro de `ano`; os nomes dos meses saem no idioma da página.
 */
export const norvexa = {
  "empresa": "Norvexa Systems",
  "ano": 2026,
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
      "realizado": 1219744,
      "previsao": null,
      "orcamento": 1288862
    },
    {
      "realizado": 1353480,
      "previsao": null,
      "orcamento": 1328283
    },
    {
      "realizado": 1292517,
      "previsao": null,
      "orcamento": 1370871
    },
    {
      "realizado": 1358837,
      "previsao": null,
      "orcamento": 1396224
    },
    {
      "realizado": 1405295,
      "previsao": null,
      "orcamento": 1433595
    },
    {
      "realizado": 1360267,
      "previsao": null,
      "orcamento": 1471958
    },
    {
      "realizado": 1426605,
      "previsao": null,
      "orcamento": 1485890
    },
    {
      "realizado": null,
      "previsao": 1447673,
      "orcamento": 1529096
    },
    {
      "realizado": null,
      "previsao": 1473436,
      "orcamento": 1582819
    },
    {
      "realizado": null,
      "previsao": 1499027,
      "orcamento": 1623978
    },
    {
      "realizado": null,
      "previsao": 1524448,
      "orcamento": 1657670
    },
    {
      "realizado": null,
      "previsao": 1549699,
      "orcamento": 1664562
    }
  ],
  "previsaoAnual": 16911028,
  "orcamentoAnual": 17833809
} as const;

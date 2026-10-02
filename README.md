# mindclaw-site

Site portfólio. Ainda em estruturação — a stack será definida em seguida.

## Estrutura

```
.github/
  CODEOWNERS           revisão obrigatória do dono
  dependabot.yml       atualizações automáticas de dependências
  workflows/
    security.yml       varredura de segredos (gitleaks) em push/PR e semanal
docs/
  security-headers.md  headers HTTP e CSP para produção
.env.example           nomes das variáveis de ambiente (sem valores)
SECURITY.md            premissas de segurança e como reportar falhas
```

## Segurança

Leia [`SECURITY.md`](SECURITY.md) antes de contribuir. Resumo: nenhum segredo no
repositório, site estático por padrão, headers de segurança em produção e tudo
entra em `main` via pull request.

### Configurações do GitHub (fazer manualmente)

Em **Settings** do repositório:

- **Code security**: ativar *Dependabot alerts*, *Dependabot security updates*,
  *Secret scanning*, *Push protection* e *Private vulnerability reporting*.
- **Branches → Add rule** para `main`: exigir pull request, exigir o check
  `Varredura de segredos (gitleaks)`, bloquear force push e exclusão.
- **Actions → General**: *Workflow permissions* = *Read repository contents*.

Na conta: autenticação em dois fatores (2FA) ativa.

## Desenvolvimento local

```bash
cp .env.example .env   # preencha apenas localmente
```

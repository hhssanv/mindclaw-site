# Especificação de Segurança — GitHub + Claude Code

> Objetivo: usar o GitHub como fonte de verdade do site, permitir desenvolvimento com Claude Code em branches isoladas, testar versões antes da produção e reduzir o risco de perda de código, vazamento de credenciais ou alteração acidental do site em produção.

## 1. Modelo de segurança

```text
claude/* ou feature/*  -> desenvolvimento
staging                -> homologação / testes
main                   -> produção
```

O Claude Code deve trabalhar apenas em branches de desenvolvimento. A `main` representa somente código aprovado para produção.

## 2. Conta GitHub

- [ ] Senha exclusiva.
- [ ] 2FA ativado.
- [ ] Passkey preferencialmente ativada.
- [ ] Códigos de recuperação guardados fora do computador principal.
- [ ] Revisão periódica de sessões, apps e integrações autorizadas.
- [ ] Remoção de acessos que não sejam mais necessários.

## 3. Repositório

- [x] Repositório privado.
- [x] Branch padrão `main`.
- [x] README inicial.
- [x] `.gitignore` próprio do projeto.
- [x] `.env.example` sem segredos.
- [ ] Branch `main` protegida por ruleset/branch protection quando disponível.
- [ ] Force push bloqueado na `main`.
- [ ] Exclusão da `main` bloqueada.
- [ ] Pull Request exigido antes de merge na `main`.

## 4. Proteção da `main`

Quando disponível no plano/configuração do GitHub:

- Exigir Pull Request antes do merge.
- Exigir resolução das conversas do PR.
- Exigir status checks quando CI existir.
- Bloquear force pushes.
- Bloquear exclusão da branch.
- Não permitir bypass por automações desnecessárias.

## 5. Branch `staging`

A `staging` deve servir como homologação. O fluxo recomendado é:

```text
claude/* -> preview/testes -> PR -> staging -> validação -> PR -> main
```

Produção deve estar ligada somente à `main`.

## 6. Segredos e credenciais

Nunca versionar:

- Senhas.
- API keys.
- Tokens.
- Private keys.
- Chaves SSH.
- Credenciais de banco.
- Cookies de sessão.
- Tokens do GitHub.
- Credenciais de deploy.
- Arquivos `.env` reais.

Se uma credencial for commitada por acidente, considerá-la comprometida e rotacioná-la imediatamente. Apagar o arquivo do commit atual não torna a credencial segura novamente.

## 7. Acesso do Claude Code

Aplicar menor privilégio.

O agente normalmente precisa apenas de acesso ao código e, quando necessário, Pull Requests. Ele não precisa de administração do repositório, billing, organização, secrets administration ou exclusão de repositório.

Preferir:

- sandbox;
- acesso apenas à pasta do projeto;
- tokens fine-grained e limitados ao repositório, quando tokens forem necessários;
- credenciais com expiração;
- nenhum acesso a produção salvo necessidade explícita.

## 8. Regras do Claude Code

As regras operacionais estão em `CLAUDE.md`. Entre elas:

- sem push direto para `main`;
- sem force push;
- sem segredos no código;
- sem alteração de DNS/produção;
- sem alteração de proteções do GitHub;
- sem acesso a `.ssh` ou credenciais do sistema;
- sem `--dangerously-skip-permissions`;
- sempre revisar diff e rodar testes.

## 9. Dependências

- Ativar Dependency Graph.
- Ativar Dependabot Alerts quando disponível.
- Ativar Dependabot Security Updates quando apropriado.
- Versionar lockfiles.
- Revisar grandes atualizações antes do merge.

## 10. Secret scanning / push protection

Ativar Secret Scanning e Push Protection quando estiverem disponíveis para a conta/plano. Eles são uma camada extra, não substituem:

- `.gitignore`;
- revisão do diff;
- isolamento de segredos;
- rotação imediata de credenciais vazadas;
- menor privilégio.

## 11. Code scanning

Quando compatível com o projeto e disponível:

- ativar CodeQL/Code Scanning;
- tratar alertas críticos antes de produção;
- não silenciar alertas apenas para fazer o pipeline passar.

## 12. Deploy

```text
claude/* / feature/* -> Preview
staging              -> Homologação
main                 -> Produção
```

Regras:

- produção ligada somente à `main`;
- branches de trabalho geram apenas previews;
- previews não devem usar credenciais reais de produção quando não for necessário;
- banco de teste separado do banco de produção;
- alterações destrutivas e migrações de banco exigem revisão humana.

## 13. Checklist antes de merge em `main`

- [ ] O PR é o correto?
- [ ] O diff contém apenas alterações esperadas?
- [ ] Não há segredo ou `.env`?
- [ ] Testes passaram?
- [ ] Build passou?
- [ ] Preview foi validado?
- [ ] Desktop e mobile foram testados?
- [ ] Formulários e links principais foram testados?
- [ ] Não houve alteração inesperada em dependências?
- [ ] Não houve alteração inesperada em CI/deploy?
- [ ] Existe rollback claro?

## 14. Rollback

Cada deploy de produção deve corresponder a um commit identificável.

Se uma versão falhar:

1. identificar o último commit funcional;
2. reverter a alteração problemática;
3. fazer novo deploy;
4. não apagar o histórico;
5. investigar a causa em uma branch separada.

## 15. Política principal

> A IA pode escrever código. A IA não decide sozinha o que chega à produção.

A meta não é assumir que o agente nunca errará. A meta é limitar tecnicamente o impacto de um erro.

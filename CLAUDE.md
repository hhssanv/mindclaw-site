# Regras de Segurança para Claude Code

Este repositório usa GitHub para separar desenvolvimento, homologação e produção.

## Regra principal

A IA pode escrever código, mas não decide sozinha o que chega à produção.

## Branches

- `main`: produção.
- `staging`: homologação/testes.
- `claude/*` ou `feature/*`: desenvolvimento.

## Regras obrigatórias

1. Nunca fazer push direto para `main`.
2. Nunca fazer push direto para `staging` sem autorização explícita.
3. Criar uma branch `claude/<tarefa>` ou `feature/<tarefa>` para cada alteração.
4. Nunca usar `git push --force` ou `git push -f`.
5. Nunca reescrever o histórico de `main`.
6. Nunca apagar branches remotas sem autorização explícita.
7. Nunca fazer merge para `main` sem revisão humana.
8. Nunca fazer deploy de produção sem autorização humana.
9. Nunca alterar DNS, domínio, hosting, banco de produção ou infraestrutura sem autorização.
10. Nunca alterar configurações de segurança do GitHub.
11. Nunca desativar testes, scanners ou proteções para contornar falhas.
12. Nunca armazenar senhas, tokens, API keys, chaves privadas, cookies ou credenciais no repositório.
13. Nunca versionar arquivos `.env` reais.
14. Nunca abrir ou copiar credenciais de produção sem autorização explícita.
15. Nunca acessar arquivos fora da pasta do projeto sem autorização.
16. Nunca acessar `.ssh`, gerenciadores de senha, navegador ou credenciais do sistema.
17. Nunca executar comandos destrutivos sem explicar o impacto e obter autorização.
18. Nunca utilizar `--dangerously-skip-permissions`.
19. Sempre revisar `git status` e `git diff` antes de commit.
20. Sempre informar quais arquivos foram alterados.
21. Sempre executar os testes disponíveis antes de considerar a tarefa concluída.
22. Ao encontrar possível credencial, interromper a tarefa e avisar o responsável.

## Fluxo esperado

```text
claude/<tarefa>
      |
      v
preview / testes
      |
      v
Pull Request
      |
      v
revisão humana
      |
      v
staging
      |
      v
validação
      |
      v
main
      |
      v
produção
```

## Antes de qualquer ação de produção

Parar e pedir confirmação explícita do responsável.

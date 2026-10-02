# Política de segurança

## Reportar uma vulnerabilidade

Não abra issue pública. Use **Security → Report a vulnerability** neste
repositório (GitHub Private Vulnerability Reporting). A resposta inicial sai em
até 7 dias.

## Premissas do projeto

1. **Nenhum segredo no repositório.** Chaves, tokens e senhas vivem só em `.env`
   local (ignorado pelo git) e nas variáveis de ambiente do provedor de
   hospedagem. O `.env.example` lista apenas os nomes.
2. **Nada sensível no cliente.** Tudo que vai para o navegador é público,
   incluindo variáveis com prefixo `PUBLIC_`/`NEXT_PUBLIC_`/`VITE_`.
3. **Site estático por padrão.** Sem backend, sem banco, sem login: a menor
   superfície de ataque possível. Formulário de contato via serviço externo ou
   função serverless com validação, limite de taxa e proteção anti-spam.
4. **Headers de segurança obrigatórios** em produção — ver
   [`docs/security-headers.md`](docs/security-headers.md).
5. **Dependências mínimas e atualizadas.** Lockfile sempre commitado, Dependabot
   ativo, `npm audit` sem vulnerabilidades altas antes de publicar.
6. **CI com menor privilégio.** Workflows com `permissions: contents: read`,
   actions fixadas por SHA e varredura de segredos (gitleaks) em todo push/PR.
7. **Revisão antes do merge.** Nada entra em `main` sem pull request.
8. **Sem dados pessoais desnecessários.** Não exponha e-mail/telefone em texto
   puro se não quiser spam; evite rastreadores de terceiros.

## Se um segredo vazar

1. Revogue/rotacione a credencial **imediatamente** no serviço de origem.
2. Só depois remova do código. Apagar do histórico não basta — considere a
   chave comprometida assim que ela chegou ao GitHub.

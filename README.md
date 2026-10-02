# hansmindclaw.com

Site da Hans MindClaw: cases, serviços e contato. É um site estático gerado com [Astro](https://astro.build) e publicado no GitHub Pages. Não tem banco de dados nem CMS. O conteúdo fica em arquivos neste repositório.

## Rodar localmente

Precisa de Node 22.12 ou mais recente.

```bash
npm install
npm run dev        # http://localhost:4321, com os rascunhos visíveis
npm run build      # gera dist/ exatamente como vai para o ar
npm run preview    # serve o dist/ gerado
npm run rascunhos  # build de produção incluindo os rascunhos (para revisão)
```

## Onde fica cada coisa

```
content/cases/*.md           os cases, um arquivo por case (só frontmatter)
content/competencias.json    as áreas de competência da home
content/trabalho.json        o modelo de trabalho em oito etapas
content/servicos.json        as quatro formas de contratação
content/stack.json           áreas e capacidades da página Sobre
src/lib/site.ts              nome, contato, navegação, texto de confidencialidade
src/lib/schema.ts            regras que todo conteúdo precisa cumprir
src/lib/og.ts                imagens de compartilhamento (Open Graph)
src/styles/tokens.css        cores, tipografia e espaçamentos
src/components/              os componentes do site
src/pages/                   as rotas
public/marca/                logo e isotipo (vindos do Drive)
```

## Editar um case

Cada case é um arquivo em `content/cases/<slug>.md`. Todo o conteúdo fica no frontmatter e o corpo fica vazio. O build confere o arquivo contra `src/lib/schema.ts` e **falha** se algo estiver fora do padrão, por exemplo:

- menos ou mais de 4 problemas, 4 itens construídos e 3 métricas;
- `limiteEscopo` vazio;
- subtítulo acima de 160 caracteres ou resumo acima de 140;
- `seo.description` fora da faixa de 140 a 160 caracteres;
- case de produção sem princípios, ou case de demonstração com princípios.

A mensagem de erro diz o campo e o motivo.

### Rascunhos

Um case com `rascunho: true` aparece no `npm run dev`, com um selo amarelo de rascunho, mas **não vai para o build de produção**: não gera página, não entra no índice, no sitemap nem no rodapé. Para publicar, troque para `rascunho: false` ou remova a linha.

Hoje estão como rascunho os três cases que vêm dos decks em inglês (`governanca-ti-acessos`, `consolidacao-dados-rh`, `planejamento-capacidade`). Eles têm uma estrutura provisória com as métricas da especificação. O restante do texto deve ser substituído pela tradução do deck, com o limite de escopo traduzido ao pé da letra.

### Tipos de prova

O campo `prova.tipo` escolhe o formato da tabela:

- `tabela`: tabela comum. A primeira coluna é o cabeçalho da linha.
- `comparativo`: exatamente três colunas (aspecto, antes, depois).
- `faixas`: a segunda coluna é um estado (`ok`, `atencao` ou `alerta`) e aparece como selo com texto ("Coberto", "No limite", "Descoberto").

## Publicação

Todo push na `main` dispara `.github/workflows/publicar.yml`, que valida o conteúdo, gera o site e publica no GitHub Pages. Pull requests rodam só a validação e o build, sem publicar.

Configuração única no GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**. O domínio `hansmindclaw.com` continua configurado na mesma tela.

## Checklist antes de publicar um case

- [ ] Nenhum nome próprio de empresa, cliente ou produto proprietário no texto, nos `alt` das imagens ou nos metadados
- [ ] Capturas de tela revisadas pixel a pixel, com dados fictícios e sem barra de endereço, caminho ou nome de host
- [ ] Nenhum número apresentado como resultado de cliente sem o rótulo de tipo correspondente
- [ ] Limite de escopo específico desse case, e não um texto genérico reaproveitado
- [ ] Faixa de disclaimer presente (o template já coloca no hero e antes do CTA)
- [ ] Nenhum repositório, trecho de código ou arquivo de projeto publicado ou linkado
- [ ] Imagens sem metadados (EXIF) e com nome de arquivo neutro
- [ ] Case lido assumindo o pior leitor: um concorrente tentando reconstruir a solução, e um cliente antigo procurando o que reconhece

Este repositório é público ou pode vir a ser. Nenhum arquivo de projeto, captura não higienizada ou rascunho com nome real pode entrar nele, nem em um commit revertido depois.

## Decisões de implementação

- **Arquivos `.md`, não `.mdx`.** Os cases só têm frontmatter, então o MDX não acrescentava nada e enchia o build de avisos. Se um dia o corpo do case precisar de componentes, basta instalar `@astrojs/mdx` e trocar a extensão.
- **Duas fontes, as duas servidas pelo próprio site.** Inter (variável, 48 KB) para todo o texto e JetBrains Mono (um peso, 24 KB) só nos rótulos técnicos. A mono faz eco aos `< >` do logo.
- **Cores do logo.** Tinta `#141414`, degradê `#ff001e → #782747` e o vermelho sólido `#da0b29` da assinatura de e-mail. Todos os pares de texto e fundo passam em WCAG AA nos temas claro e escuro.
- **Formulário sem servidor.** O contato monta a mensagem e abre o e-mail ou o WhatsApp de quem está escrevendo. Não há serviço de terceiros nem dado guardado.

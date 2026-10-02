# hansmindclaw.com

Site da Hans MindClaw: soluções, projetos e contato. É um site estático gerado com [Astro](https://astro.build) e publicado no GitHub Pages. Não tem banco de dados nem CMS. O conteúdo fica em arquivos neste repositório.

## Rodar localmente

Precisa de Node 22.12 ou mais recente.

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # gera dist/ exatamente como vai para o ar
npm run preview    # serve o dist/ gerado
```

## Onde fica cada coisa

```
content/solucoes/*.md          as sete áreas de solução (só frontmatter)
content/projetos.json          projetos anonimizados (contexto, atuação, resultado)
content/forma-de-trabalhar.json os oito princípios de trabalho
content/servicos.json          as quatro formas de contratação
content/stack.json             tecnologias por área (página Sobre)
src/lib/site.ts                nome, contato, LinkedIn, navegação, nota sobre ganhos
src/lib/schema.ts              regras que todo conteúdo precisa cumprir
src/lib/og.ts                  imagens de compartilhamento (Open Graph)
src/styles/tokens.css          cores, tipografia e espaçamentos
src/components/                componentes
src/pages/                     rotas
public/marca/                  logo e isotipo (vindos do Drive)
```

## Editar uma solução

Cada área é um arquivo em `content/solucoes/<id>.md`, com todo o conteúdo no frontmatter. Os campos principais são:

- `sinais`: de 3 a 6 frases descrevendo o problema como quem o vive.
- `entregas`: de 3 a 5 itens com o que é feito.
- `ganhos`: de 3 a 5 itens com o que costuma melhorar, **sem percentual**. O ganho depende de cada ambiente, e o site diz isso explicitamente (`notaGanho` em `src/lib/site.ts`).
- `ferramentas`: as tecnologias mais usadas.
- `projetos`: ids de `content/projetos.json` que aparecem na página.
- `arquitetura` (opcional): diagrama de camadas, usado hoje só em IA aplicada.

O build confere tudo contra `src/lib/schema.ts` e **falha** com uma mensagem clara se algo estiver fora do padrão, inclusive se uma solução citar um projeto que não existe ou um projeto citar uma área que não existe.

## Adicionar um projeto

Acrescente um item em `content/projetos.json` com `contexto`, `atuacao`, `resultado`, `tecnologias` e as `areas` (ids das soluções). `destaque: true` coloca o projeto na home (os três primeiros). `demonstracao: true` marca um modelo com dados sintéticos. Nenhum nome de cliente, empresa ou sistema proprietário: o projeto é descrito pelo tipo de problema.

## Publicação

Todo push na `main` dispara `.github/workflows/publicar.yml`, que valida o conteúdo, gera o site e publica no GitHub Pages. Pull requests rodam só a validação e o build, sem publicar.

Configuração única no GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**. O domínio `hansmindclaw.com` continua configurado na mesma tela.

## Guia de voz

- **Sem primeira pessoa.** Nada de "eu faço", "eu construí", "transformo". O texto fala do problema, do resultado e do leitor: "O que é feito", "O que costuma melhorar", "A resposta traz uma primeira leitura".
- **Ganho sem percentual.** O que melhora é descrito em termos qualitativos; o quanto depende de cada ambiente e é medido no diagnóstico.
- **Bio em terceira pessoa**, só na página Sobre: "Hans Spiller trabalha…".
- **Português antes de anglicismo** quando existe termo corrente: "aprovação obrigatória" (não "gate"), "reversão" (não "rollback"), "intuição" (não "feeling"). Termos já consagrados no mercado ficam: backup, logs, case.
- **Frase curta, verbo concreto, número com rótulo específico.** "18 sistemas inventariados", nunca "muita experiência".

## Checklist antes de publicar conteúdo novo

- [ ] Nenhum nome próprio de empresa, cliente ou produto proprietário no texto, nos `alt` das imagens ou nos metadados
- [ ] Nenhum percentual de ganho apresentado como promessa
- [ ] Capturas de tela, se houver, com dados fictícios e sem barra de endereço, caminho ou nome de host
- [ ] Nenhum repositório, trecho de código ou arquivo de projeto publicado ou linkado
- [ ] Imagens sem metadados (EXIF) e com nome de arquivo neutro
- [ ] Texto lido assumindo o pior leitor: um concorrente tentando reconstruir a solução, e um cliente antigo procurando o que reconhece

Este repositório é público ou pode vir a ser. Nenhum arquivo de projeto, captura não higienizada ou rascunho com nome real pode entrar nele, nem em um commit revertido depois.

## Decisões de implementação

- **Organizado por área, não por estudo de caso.** O site mostra onde dá para ajudar e o que costuma melhorar, com projetos anonimizados curtos como prova. Passo a passo de implementação não é publicado.
- **Duas fontes, as duas servidas pelo próprio site.** Saira (variável, recortada para latim, pesos 500–800 e larguras 100–112,5%, 53 KB) nos títulos, números e rótulos: o desenho quadrado dela é o mesmo do "Hans" e do "MINDCLAW" do logo. Inter (variável, 48 KB) no texto corrido. A escala tipográfica é fixa (13 · 15 · 17 · 19 · 22 · 28 · 40 · 56 px) e está em `src/styles/tokens.css`.
- **Vermelho com parcimônia.** O acento aparece em ação (botões e links), nos números de destaque e nos elementos de marca. Índices, ícones e marcadores ficam em cinza.
- **Cores do logo.** Tinta `#141414`, degradê `#ff001e → #782747` e o vermelho sólido `#da0b29` da assinatura de e-mail. Todos os pares de texto e fundo passam em WCAG AA nos temas claro e escuro.
- **Formulário sem servidor.** O contato monta a mensagem e abre o e-mail ou o WhatsApp de quem está escrevendo. Não há serviço de terceiros nem dado guardado.

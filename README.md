# hansmindclaw.com

Site da Hans MindClaw: soluções, projetos e contato. É um site estático gerado com [Astro](https://astro.build) e publicado no GitHub Pages. Não tem banco de dados nem CMS. O conteúdo fica em arquivos neste repositório.

## Rodar localmente

Precisa de Node 22.12 ou mais recente.

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # gera dist/ exatamente como vai para o ar
npm run preview    # serve o dist/ gerado
npm test           # testes sobre o dist/ (rode o build antes)
npm run verificar  # build + testes, o mesmo que o CI faz
```

Na primeira vez, os testes precisam do Chromium do Playwright: `npx playwright install chromium`.

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
src/lib/grafico.ts             larguras de desenho dos gráficos em SVG
src/data/norvexa.ts            números do painel de exemplo (empresa fictícia)
src/styles/tokens.css          cores, tipografia e espaçamentos
src/components/                componentes (PainelExemplo e IlustracaoCapacidade são os gráficos)
src/pages/                     rotas
public/marca/                  logo, isotipo e foto
tests/                         testes automatizados (node:test + Playwright + axe-core)
```

## Editar uma solução

Cada área é um arquivo em `content/solucoes/<id>.md`, com todo o conteúdo no frontmatter. Os campos principais são:

- `sinais`: de 3 a 6 frases descrevendo o problema como quem o vive.
- `entregas`: de 3 a 5 itens com o que é feito.
- `ganhos`: de 3 a 5 itens com o que costuma melhorar, **sem percentual**. O ganho depende de cada ambiente, e o site diz isso explicitamente (`notaGanho` em `src/lib/site.ts`).
- `ferramentas`: as tecnologias mais usadas.
- `projetos`: ids de `content/projetos.json` que aparecem na página.
- `arquitetura` (opcional): diagrama de camadas, usado hoje só em IA aplicada.
- `exemplo` (opcional): um exemplo visual com dados fictícios. `painel-norvexa` mostra o painel executivo de exemplo (em Dados e BI) e `capacidade` mostra a ilustração de necessidade por hora (em Capacity e forecast).

O build confere tudo contra `src/lib/schema.ts` e **falha** com uma mensagem clara se algo estiver fora do padrão, inclusive se uma solução citar um projeto que não existe ou um projeto citar uma área que não existe.

## Adicionar um projeto

Acrescente um item em `content/projetos.json` com `contexto`, `atuacao`, `resultado`, `tecnologias` e as `areas` (ids das soluções). `destaque: true` coloca o projeto na home (os três primeiros). `demonstracao: true` marca um modelo com dados sintéticos. Nenhum nome de cliente, empresa ou sistema proprietário: o projeto é descrito pelo tipo de problema.

## Publicação

Todo push na `main` dispara `.github/workflows/publicar.yml`, que valida o conteúdo, gera o site, roda os testes e publica no GitHub Pages. Pull requests rodam a validação, o build e os testes, sem publicar. Se um teste falhar, nada vai para o ar.

Configuração única no GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**. O domínio `hansmindclaw.com` continua configurado na mesma tela.

## Testes

`npm test` roda sobre o `dist/` gerado, com um servidor local que imita o GitHub Pages:

- **links**: todo link, imagem e `srcset` interno existe, e toda âncora (`#id`) existe na página de destino;
- **higiene**: título, descrição, canonical e imagem de compartilhamento em cada página; nenhum IP, host local, caminho de máquina ou credencial no HTML; só o e-mail do site aparece; nenhuma palavra colada por quebra de linha no código;
- **acessibilidade**: axe-core (WCAG 2.2 AA e boas práticas) em todas as páginas, nos temas claro e escuro, em 1366 e 390 px de largura; um `h1` por página, sem salto de nível; sem rolagem horizontal;
- **comportamento**: filtro de projetos pelo teclado e sem JavaScript, pré-seleção da área no contato, validação e mensagem montada para o WhatsApp, cópia do e-mail, assunto do WhatsApp em cada solução, tooltip dos gráficos pelo teclado e tamanho do texto dos gráficos de 320 a 1366 px.

A lista de nomes que não podem aparecer no site **não** fica nos testes, de propósito: este repositório é público.

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
- **Tema claro e escuro.** O site segue o tema do sistema. O botão de sol/lua no cabeçalho troca o tema, e a escolha fica salva no navegador da pessoa. Escolher de novo o tema do sistema apaga a escolha e o site volta ao automático. Um script de poucas linhas no `<head>` aplica o tema antes do primeiro desenho, então a página não pisca. Em `src/styles/tokens.css`, o tema escuro aparece duas vezes, uma para o automático e outra para a escolha, com os mesmos valores. Um teste compara as cores de cada elemento nos dois casos, então se os blocos ficarem diferentes, o teste falha. As cores das séries dos gráficos também são tokens (`--serie-*`).
- **Menu no celular.** Até 720 px de largura, a navegação fica atrás do botão "Menu", que abre um painel com os links, o contato e o WhatsApp. Enquanto o painel está aberto, o resto da página fica inerte, e a tecla Esc fecha o menu. Uma linha de script no `<head>` marca que o JavaScript está ligado antes do primeiro desenho, então nada pula na tela. Sem JavaScript, a navegação aparece numa segunda linha do cabeçalho.
- **Hero em três composições.** No desktop (1100 px ou mais), o título e o texto ficam à esquerda e o isotipo grande à direita. No tablet (700 a 1099 px), o título ocupa a largura toda e o isotipo fica ao lado do texto e do botão. No celular, o isotipo vira uma marca pequena ao lado do rótulo "Hans Spiller / Tecnologia, dados e automação", com o desenho alinhado à margem do texto. A página Sobre segue a mesma lógica com a foto. Os testes de comportamento conferem esse alinhamento e o tamanho do isotipo em cada largura.
- **Home enxuta no celular.** As áreas viram linhas compactas, os projetos em destaque viram um carrossel com rolagem lateral, e os princípios e o rodapé ficam mais densos. A home no celular ficou cerca de 20% mais curta, sem perder conteúdo.
- **WhatsApp primeiro, e-mail como alternativa.** Cada botão de conversa abre o WhatsApp de quem está lendo com uma mensagem pronta que já cita a área. O formulário monta a mesma mensagem e oferece o e-mail como segunda opção, com botão para copiar o endereço (para quem usa webmail). Não há servidor, serviço de terceiros nem dado guardado.
- **Exemplos com dados fictícios.** O painel da Norvexa Systems (empresa que não existe) e a ilustração de capacidade mostram como fica uma entrega sem expor nenhum cliente. Os números do painel estão em `src/data/norvexa.ts`.
- **Gráficos em SVG gerados no build.** Cada gráfico é desenhado em seis larguras (`src/lib/grafico.ts`) e o CSS mostra só a que cabe no espaço disponível (container queries), para o texto do gráfico ficar sempre entre ~12 e ~17 px. Linhas de 2 px, um único eixo, legenda e rótulos diretos, tooltip por mouse e teclado e tabela com os dados em `<details>`. As cores das séries foram conferidas para daltonismo nos dois temas.

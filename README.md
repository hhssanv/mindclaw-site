# hansmindclaw.com

Site da Hans MindClaw: soluções, projetos e contato. É um site estático gerado com [Astro](https://astro.build) e publicado no GitHub Pages. Não tem banco de dados nem CMS. O conteúdo fica em arquivos neste repositório.

O site existe em **português** (na raiz, `/`) e em **inglês** (em `/en/`), com o mesmo conteúdo, e tem tema **claro e escuro**: segue o sistema de quem visita, e um botão no cabeçalho deixa escolher.

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
content/en/                    o mesmo conteúdo em inglês, com os mesmos ids e nomes de arquivo
src/i18n/pt-BR.ts e en.ts      textos de interface (menus, títulos, rótulos, gráficos) nos dois idiomas
src/i18n/index.ts              idiomas e endereço de cada seção em cada um (/sobre/ ↔ /en/about/)
src/lib/site.ts                nome, e-mail, WhatsApp e LinkedIn (o que não muda com o idioma)
src/lib/schema.ts              regras que todo conteúdo precisa cumprir
src/lib/conteudo.ts            leitura do conteúdo por idioma e validação cruzada
src/lib/og.ts                  imagens de compartilhamento (Open Graph)
src/lib/grafico.ts             larguras de desenho dos gráficos em SVG
src/data/norvexa.ts            números do painel de exemplo (empresa fictícia)
src/styles/tokens.css          cores dos dois temas, tipografia e espaçamentos
src/components/                componentes (PainelExemplo e IlustracaoCapacidade são os gráficos)
src/paginas/                   o conteúdo de cada página, que recebe o idioma
src/pages/                     só as rotas: cada arquivo chama uma página de src/paginas/ com o idioma
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

A versão em inglês fica em `content/en/solucoes/<id>.md`, **com o mesmo nome de arquivo**: é o nome do arquivo que liga as duas versões. O campo `slug` define só o endereço da página (`/solucoes/dados-bi/` e `/en/solutions/data-bi/`). Ordem, ícone, projetos, tipo de exemplo e número de camadas da arquitetura precisam ser iguais nos dois idiomas; só o texto muda.

O build confere tudo contra `src/lib/schema.ts` e **falha** com uma mensagem clara se algo estiver fora do padrão, inclusive se uma solução citar um projeto que não existe, se um projeto citar uma área que não existe, ou se um item faltar ou tiver estrutura diferente em um dos idiomas.

## Adicionar um projeto

Acrescente um item em `content/projetos.json` com `contexto`, `atuacao`, `resultado`, `tecnologias` e as `areas` (ids das soluções). `destaque: true` coloca o projeto na home (os três primeiros). `demonstracao: true` marca um modelo com dados sintéticos. Nenhum nome de cliente, empresa ou sistema proprietário: o projeto é descrito pelo tipo de problema.

Acrescente o mesmo projeto, com o mesmo `id`, em `content/en/projetos.json`. Se tiver `link`, o `href` em inglês aponta para a página em inglês (`/en/solutions/...`). Princípios, formas de contratação e stack seguem a mesma regra: um item em cada idioma, com o mesmo `id`.

## Idiomas

- **Endereços.** Português na raiz (`/`, `/solucoes/`, `/projetos/`, `/sobre/`, `/contato/`, `/privacidade/`) e inglês em `/en/` com endereços traduzidos (`/en/solutions/`, `/en/projects/`, `/en/about/`, `/en/contact/`, `/en/privacy/`). O mapa entre eles fica em `src/i18n/index.ts`.
- **Textos de interface.** Ficam em `src/i18n/pt-BR.ts` e `src/i18n/en.ts`. O TypeScript exige as mesmas chaves nos dois arquivos, então um texto novo em português sem tradução aparece como erro no editor.
- **Idioma do navegador.** Quem chega ao site de fora (busca, link compartilhado, endereço digitado) vai para a mesma página no idioma que escolheu no seletor ou, sem escolha, no primeiro idioma do navegador que o site oferece. Um navegador em espanhol, por exemplo, fica na página pedida. A troca leva junto os parâmetros e a âncora (`/contato/?area=dados-bi` → `/en/contact/?area=dados-bi`).
- **O que não é redirecionado.** Navegação dentro do site, buscadores e ferramentas automatizadas. Assim cada idioma é indexado no próprio endereço, e os testes veem a página que pediram.
- **Seletor de idioma.** No cabeçalho (“EN” / “PT”; no celular, dentro do menu). Leva à mesma página no outro idioma e guarda a escolha no navegador, que passa a valer nas próximas visitas.
- **Buscadores.** Cada página declara as duas versões com `hreflang` (e `x-default` apontando para o inglês), e o `sitemap.xml` lista as duas, ligadas entre si.
- **Página 404.** O GitHub Pages só usa o `404.html` da raiz. Quem pede um endereço `/en/` que não existe, ou prefere inglês, é levado à versão em inglês (`/en/404/`).

## Tema claro e escuro

Sem escolha, o site segue o tema do sistema de quem visita. O botão do cabeçalho (lua ou sol, mostrando o tema para onde leva; no celular, dentro do menu) troca o tema e guarda a escolha no navegador; escolher de novo o tema do sistema apaga a escolha. A escolha é aplicada antes do primeiro desenho, então a página não pisca. Sem JavaScript o botão não aparece e vale o tema do sistema.

Tudo o que muda entre os temas está em `src/styles/tokens.css`, inclusive as cores dos gráficos e do degradê do título da home. Os tokens escuros aparecem em dois blocos (um para o tema do sistema, outro para a escolha no botão) que precisam ser idênticos; um teste confere.

Os únicos dados guardados no navegador são essas duas escolhas (tema e idioma), e a página de Privacidade diz isso.

## Publicação

Todo push na `main` dispara `.github/workflows/publicar.yml`, que valida o conteúdo, gera o site, roda os testes e publica no GitHub Pages. Pull requests rodam a validação, o build e os testes, sem publicar. Se um teste falhar, nada vai para o ar.

Configuração única no GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**. O domínio `hansmindclaw.com` continua configurado na mesma tela.

## Testes

`npm test` roda sobre o `dist/` gerado, com um servidor local que imita o GitHub Pages:

- **links**: todo link, imagem e `srcset` interno existe, e toda âncora (`#id`) existe na página de destino;
- **higiene**: título, descrição, canonical e imagem de compartilhamento em cada página; idioma da página pelo endereço; `hreflang` das duas versões em toda página, existindo e recíproco, com o seletor de idioma apontando para a tradução; nenhum IP, host local, caminho de máquina ou credencial no HTML; só o e-mail do site aparece; nenhuma palavra colada por quebra de linha no código;
- **acessibilidade**: axe-core (WCAG 2.2 AA e boas práticas) em todas as páginas dos dois idiomas, nos temas claro e escuro, em 1366 e 390 px de largura; um `h1` por página, sem salto de nível; sem rolagem horizontal;
- **comportamento**: filtro de projetos pelo teclado e sem JavaScript, pré-seleção da área no contato, validação e mensagem montada para o WhatsApp, cópia do e-mail, assunto do WhatsApp em cada solução, tooltip dos gráficos pelo teclado e tamanho do texto dos gráficos de 320 a 1366 px, e as mesmas mensagens e números em inglês;
- **preferências**: o botão de tema troca, anuncia, guarda a escolha e volta ao sistema; o tema escolhido é idêntico ao do sistema, token a token; o idioma segue o navegador ou a escolha no seletor, sem redirecionar navegação interna nem robôs; o cabeçalho cabe de 721 a 1366 px nos dois idiomas.

A lista de nomes que não podem aparecer no site **não** fica nos testes, de propósito: este repositório é público.

## Guia de voz

- **Sem primeira pessoa.** Nada de "eu faço", "eu construí", "transformo". O texto fala do problema, do resultado e do leitor: "O que é feito", "O que costuma melhorar", "A resposta traz uma primeira leitura".
- **Ganho sem percentual.** O que melhora é descrito em termos qualitativos; o quanto depende de cada ambiente e é medido no diagnóstico.
- **Bio em terceira pessoa**, só na página Sobre: "Hans Spiller trabalha…".
- **Português antes de anglicismo** quando existe termo corrente: "aprovação obrigatória" (não "gate"), "reversão" (não "rollback"), "intuição" (não "feeling"). Termos já consagrados no mercado ficam: backup, logs, case.
- **Frase curta, verbo concreto, número com rótulo específico.** "18 sistemas inventariados", nunca "muita experiência".
- **Em inglês, as mesmas regras.** Sem "I" nem "we" ("What gets done", "What usually improves"), bio em terceira pessoa, ganho sem percentual. "Diagnóstico" vira *assessment*; "sustentação", *ongoing support*.

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
- **Menu no celular.** Até 720 px de largura, a navegação fica atrás do botão "Menu", que abre um painel com os links, o contato e o WhatsApp. Enquanto o painel está aberto, o resto da página fica inerte, e a tecla Esc fecha o menu. Uma linha de script no `<head>` marca que o JavaScript está ligado antes do primeiro desenho, então nada pula na tela. Sem JavaScript, a navegação aparece numa segunda linha do cabeçalho.
- **Home enxuta no celular.** As áreas viram linhas compactas, os projetos em destaque viram um carrossel com rolagem lateral, e os princípios e o rodapé ficam mais densos. A home no celular ficou cerca de 20% mais curta, sem perder conteúdo.
- **WhatsApp primeiro, e-mail como alternativa.** Cada botão de conversa abre o WhatsApp de quem está lendo com uma mensagem pronta que já cita a área. O formulário monta a mesma mensagem e oferece o e-mail como segunda opção, com botão para copiar o endereço (para quem usa webmail). Não há servidor, serviço de terceiros nem dado guardado.
- **Exemplos com dados fictícios.** O painel da Norvexa Systems (empresa que não existe) e a ilustração de capacidade mostram como fica uma entrega sem expor nenhum cliente. Os números do painel estão em `src/data/norvexa.ts`.
- **Dois idiomas sem duplicar páginas.** Cada página é escrita uma vez em `src/paginas/` e recebe o idioma; `src/pages/` só define as rotas. O conteúdo em inglês é validado contra o português no build, e o texto em português continua idêntico ao de antes da tradução.
- **Tema pelo sistema, com escolha opcional.** O botão mostra o tema para onde leva (lua leva ao escuro, sol ao claro), como o seletor de idioma mostra o idioma para onde leva. A escolha que coincide com o sistema é apagada, para o site voltar a acompanhar o sistema.
- **Gráficos em SVG gerados no build.** Cada gráfico é desenhado em seis larguras (`src/lib/grafico.ts`) e o CSS mostra só a que cabe no espaço disponível (container queries), para o texto do gráfico ficar sempre entre ~12 e ~17 px. Linhas de 2 px, um único eixo, legenda e rótulos diretos, tooltip por mouse e teclado e tabela com os dados em `<details>`. As cores das séries foram conferidas para daltonismo nos dois temas.

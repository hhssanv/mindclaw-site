/**
 * Preferências: botão de tema (claro/escuro, guardado entre páginas, de volta ao sistema),
 * tema escolhido idêntico ao do sistema, idioma pelo navegador ou pela escolha no seletor,
 * e cabeçalho com os dois controles cabendo em todas as larguras.
 */
import { after, before, describe, test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { ambiente } from './apoio/navegador.mjs';

let amb;
before(async () => (amb = await ambiente()));
after(async () => amb.fechar());

const caminho = (pagina) => {
  const url = new URL(pagina.url());
  return url.pathname + url.search + url.hash;
};
const fundo = (pagina) => pagina.evaluate(() => getComputedStyle(document.body).backgroundColor);
const CLARO = 'rgb(255, 255, 255)';
const ESCURO = 'rgb(13, 13, 15)';

describe('tema', () => {
  test('o botão leva ao escuro, anuncia a troca e a escolha vale nas outras páginas', async () => {
    const contexto = await amb.navegador.newContext({ colorScheme: 'light' });
    const pagina = await contexto.newPage();
    await pagina.goto(`${amb.base}/`);
    assert.equal(await fundo(pagina), CLARO);

    const botao = pagina.getByRole('button', { name: 'Tema escuro' });
    assert.ok(await botao.isVisible(), 'botão no cabeçalho, com o nome do tema para onde leva');
    await botao.click();
    assert.equal(await fundo(pagina), ESCURO);
    assert.equal(await pagina.getAttribute('html', 'data-tema'), 'escuro');
    assert.equal(await pagina.textContent('[data-tema-status]'), 'Tema escuro ativado.');
    assert.ok(await pagina.getByRole('button', { name: 'Tema claro' }).isVisible(), 'o botão agora leva ao claro');
    const barra = await pagina.$$eval('meta[name="theme-color"]', (ms) => ms.map((m) => m.content));
    assert.deepEqual(barra, ['#0d0d0f', '#0d0d0f'], 'barra do navegador no tema escolhido');

    await pagina.goto(`${amb.base}/en/projects/`);
    assert.equal(await fundo(pagina), ESCURO, 'a escolha vale em outra página e no outro idioma');
    assert.ok(await pagina.getByRole('button', { name: 'Light theme' }).isVisible());
    await contexto.close();
  });

  test('escolher de novo o tema do sistema apaga a escolha', async () => {
    const contexto = await amb.navegador.newContext({ colorScheme: 'dark' });
    const pagina = await contexto.newPage();
    await pagina.goto(`${amb.base}/sobre/`);
    assert.equal(await fundo(pagina), ESCURO, 'sem escolha, vale o sistema');

    await pagina.getByRole('button', { name: 'Tema claro' }).click();
    assert.equal(await fundo(pagina), CLARO);
    assert.equal(await pagina.evaluate(() => localStorage.getItem('tema')), 'claro');

    await pagina.getByRole('button', { name: 'Tema escuro' }).click();
    assert.equal(await fundo(pagina), ESCURO);
    assert.equal(await pagina.getAttribute('html', 'data-tema'), null, 'de volta ao sistema');
    assert.equal(await pagina.evaluate(() => localStorage.getItem('tema')), null);
    await contexto.close();
  });

  test('a escolha é aplicada antes do primeiro desenho', async () => {
    const contexto = await amb.navegador.newContext({ colorScheme: 'light' });
    await contexto.addInitScript(() => localStorage.setItem('tema', 'escuro'));
    const pagina = await contexto.newPage();
    // O script do <head> roda antes do corpo existir: no DOMContentLoaded o tema já está certo.
    await pagina.goto(`${amb.base}/`, { waitUntil: 'commit' });
    await pagina.waitForFunction(() => document.body);
    assert.equal(await pagina.getAttribute('html', 'data-tema'), 'escuro');
    await contexto.close();
  });

  // Os tokens do tema escuro existem em dois blocos em tokens.css (sistema e escolha no botão).
  // Este teste garante que os dois dão exatamente o mesmo resultado, e o mesmo para o claro.
  test('tema escolhido no botão é idêntico ao tema do sistema', async () => {
    const tokens = [...new Set([...readFileSync('src/styles/tokens.css', 'utf8').matchAll(/^\s*(--[\w-]+):/gm)].map((m) => m[1]))];
    assert.ok(tokens.length > 30, `${tokens.length} tokens lidos`);
    const ler = async (esquema, escolha) => {
      const contexto = await amb.navegador.newContext({ colorScheme: esquema });
      if (escolha) await contexto.addInitScript((t) => localStorage.setItem('tema', t), escolha);
      const pagina = await contexto.newPage();
      await pagina.goto(`${amb.base}/solucoes/dados-bi/`);
      const valores = await pagina.evaluate((nomes) => {
        const estilo = getComputedStyle(document.documentElement);
        return Object.fromEntries(nomes.map((n) => [n, estilo.getPropertyValue(n).trim()]));
      }, tokens);
      // Controles nativos (rolagem, campos) no tema escolhido, mesmo com o sistema no outro.
      const nativo = await pagina.evaluate(() => getComputedStyle(document.documentElement).colorScheme);
      await contexto.close();
      return { valores, nativo };
    };
    const escuroEscolhido = await ler('light', 'escuro');
    const claroEscolhido = await ler('dark', 'claro');
    assert.deepEqual(escuroEscolhido.valores, (await ler('dark', null)).valores, 'escuro escolhido = escuro do sistema');
    assert.deepEqual(claroEscolhido.valores, (await ler('light', null)).valores, 'claro escolhido = claro do sistema');
    assert.equal(escuroEscolhido.nativo, 'dark');
    assert.equal(claroEscolhido.nativo, 'light');
  });

  test('sem JavaScript o botão não aparece e o tema segue o sistema', async () => {
    const contexto = await amb.navegador.newContext({ javaScriptEnabled: false, colorScheme: 'dark' });
    const pagina = await contexto.newPage();
    await pagina.goto(`${amb.base}/`);
    assert.equal(await pagina.isVisible('[data-tema-botao]'), false);
    assert.equal(await fundo(pagina), ESCURO);
    await contexto.close();
  });
});

describe('idioma', () => {
  /** Navegador de uma pessoa (não automatizado) com os idiomas dados. */
  const pessoa = async (locale) => {
    const contexto = await amb.navegador.newContext({ locale });
    await contexto.addInitScript(() => Object.defineProperty(Navigator.prototype, 'webdriver', { get: () => false }));
    return contexto;
  };

  test('navegador em inglês chega pelo português e vai para a mesma página em inglês', async () => {
    const contexto = await pessoa('en-US');
    const pagina = await contexto.newPage();
    await pagina.goto(`${amb.base}/`);
    assert.equal(caminho(pagina), '/en/');
    assert.equal(await pagina.getAttribute('html', 'lang'), 'en');

    await pagina.goto(`${amb.base}/solucoes/dados-bi/#exemplo`);
    assert.equal(caminho(pagina), '/en/solutions/data-bi/#exemplo', 'mantém a página e a âncora');

    await pagina.goto(`${amb.base}/contato/?area=dados-bi`);
    assert.equal(caminho(pagina), '/en/contact/?area=dados-bi', 'mantém os parâmetros');
    assert.equal(await pagina.inputValue('#tipo'), 'Data, BI and dashboards', 'área pré-selecionada em inglês');
    await contexto.close();
  });

  test('navegador em português chega pelo inglês e vai para o português', async () => {
    const contexto = await pessoa('pt-BR');
    const pagina = await contexto.newPage();
    await pagina.goto(`${amb.base}/en/about/`);
    assert.equal(caminho(pagina), '/sobre/');
    await pagina.goto(`${amb.base}/`);
    assert.equal(caminho(pagina), '/', 'já está no idioma certo');
    await contexto.close();
  });

  test('idioma que o site não oferece: fica a página pedida', async () => {
    const contexto = await pessoa('es-ES');
    const pagina = await contexto.newPage();
    await pagina.goto(`${amb.base}/`);
    assert.equal(caminho(pagina), '/');
    await pagina.goto(`${amb.base}/en/`);
    assert.equal(caminho(pagina), '/en/');
    await contexto.close();
  });

  test('a escolha no seletor vence o idioma do navegador nas próximas visitas', async () => {
    const contexto = await pessoa('en-US');
    const pagina = await contexto.newPage();
    await pagina.goto(`${amb.base}/en/solutions/`);
    await Promise.all([pagina.waitForURL('**/solucoes/'), pagina.click('[data-idioma="pt-BR"]')]);
    assert.equal(caminho(pagina), '/solucoes/', 'o seletor leva à mesma página em português');
    assert.equal(await pagina.evaluate(() => localStorage.getItem('idioma')), 'pt-BR');

    // Nova visita de fora do site (sem página de origem), por um endereço em inglês.
    const outra = await contexto.newPage();
    await outra.goto(`${amb.base}/en/projects/`);
    assert.equal(caminho(outra), '/projetos/');
    await contexto.close();
  });

  test('navegação dentro do site não é redirecionada', async () => {
    const contexto = await pessoa('en-US');
    const pagina = await contexto.newPage();
    await pagina.goto(`${amb.base}/sobre/`, { referer: `${amb.base}/` });
    assert.equal(caminho(pagina), '/sobre/');
    await contexto.close();
  });

  test('robôs e ferramentas automatizadas recebem a página pedida', async () => {
    const automatizado = await amb.navegador.newContext({ locale: 'en-US' });
    const pagina = await automatizado.newPage();
    await pagina.goto(`${amb.base}/`);
    assert.equal(caminho(pagina), '/', 'navegador automatizado (webdriver)');
    await automatizado.close();

    const robo = await amb.navegador.newContext({
      locale: 'en-US',
      userAgent: 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
    });
    await robo.addInitScript(() => Object.defineProperty(Navigator.prototype, 'webdriver', { get: () => false }));
    const paginaRobo = await robo.newPage();
    await paginaRobo.goto(`${amb.base}/sobre/`);
    assert.equal(caminho(paginaRobo), '/sobre/', 'buscador');
    await robo.close();
  });

  test('endereço /en/ que não existe mostra a página 404 em inglês', async () => {
    const contexto = await pessoa('pt-BR');
    const pagina = await contexto.newPage();
    await pagina.goto(`${amb.base}/en/nao-existe/`);
    assert.equal(caminho(pagina), '/en/404/');
    assert.equal(await pagina.textContent('h1'), 'This page does not exist');
    await contexto.close();
  });
});

describe('cabeçalho', () => {
  test('idioma, tema e navegação cabem sem rolagem de 721 a 1366 px, nos dois idiomas', async () => {
    const pagina = await amb.navegador.newPage();
    for (const inicio of ['/', '/en/']) {
      for (const largura of [721, 768, 900, 1024, 1366]) {
        await pagina.setViewportSize({ width: largura, height: 800 });
        await pagina.goto(amb.base + inicio);
        const m = await pagina.evaluate(() => {
          const caixa = (s) => document.querySelector(s).getBoundingClientRect();
          return {
            sobra: document.documentElement.scrollWidth - innerWidth,
            marca: caixa('.topo__marca').right,
            nav: caixa('.topo__nav').left,
            contato: caixa('.topo__contato').right,
            prefs: caixa('.topo__prefs').left,
            altura: caixa('.topo').height,
          };
        });
        const onde = `${inicio} em ${largura}px`;
        assert.equal(m.sobra, 0, `${onde}: sem rolagem horizontal`);
        assert.ok(m.marca <= m.nav && m.contato <= m.prefs, `${onde}: nada se sobrepõe`);
        assert.ok(m.altura < 90, `${onde}: cabeçalho em uma linha (${m.altura}px)`);
        assert.ok(await pagina.isVisible('[data-tema-botao]'), `${onde}: botão de tema visível`);
      }
    }
    await pagina.close();
  });

  test('no celular, idioma e tema ficam no menu', async () => {
    const pagina = await amb.navegador.newPage({ viewport: { width: 390, height: 844 } });
    await pagina.goto(`${amb.base}/en/`);
    assert.equal(await pagina.isVisible('[data-tema-botao]'), false, 'escondidos com o menu fechado');
    await pagina.click('[data-menu-botao]');
    assert.ok(await pagina.getByRole('link', { name: 'Português' }).isVisible());
    assert.ok(await pagina.getByRole('button', { name: 'Dark theme' }).isVisible());
    await pagina.close();
  });
});

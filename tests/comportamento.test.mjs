/** Comportamento: filtro de projetos, formulário de contato, WhatsApp, cópia de e-mail e gráficos. */
import { after, before, describe, test } from 'node:test';
import assert from 'node:assert/strict';
import { ambiente } from './apoio/navegador.mjs';

const WHATSAPP = 'https://wa.me/5515998349373?text=';

let amb;
before(async () => (amb = await ambiente()));
after(async () => amb.fechar());

const visiveis = (pagina) => pagina.$$eval('[data-areas]', (els) => els.filter((e) => !e.hidden).length);

describe('filtro de projetos', () => {
  test('filtra pelo teclado, anuncia o total e volta para "Todas"', async () => {
    const pagina = await amb.navegador.newPage();
    await pagina.goto(`${amb.base}/projetos/`);
    const total = await visiveis(pagina);
    assert.ok(await pagina.isVisible('[data-filtro]'), 'filtro aparece com JavaScript');

    await pagina.focus('button[data-area="seguranca-acessos"]');
    await pagina.keyboard.press('Enter');
    const filtrados = await visiveis(pagina);
    assert.ok(filtrados > 0 && filtrados < total, `mostra só parte dos projetos (${filtrados} de ${total})`);
    assert.equal(await pagina.getAttribute('button[data-area="seguranca-acessos"]', 'aria-pressed'), 'true');
    assert.match((await pagina.textContent('[data-filtro-status]')) ?? '', new RegExp(`^${filtrados} projetos? exibidos?$`));

    await pagina.click('button[data-area=""]');
    assert.equal(await visiveis(pagina), total);
    await pagina.close();
  });

  test('sem JavaScript o filtro some e todos os projetos aparecem', async () => {
    const contexto = await amb.navegador.newContext({ javaScriptEnabled: false });
    const pagina = await contexto.newPage();
    await pagina.goto(`${amb.base}/projetos/`);
    assert.equal(await pagina.isVisible('[data-filtro]'), false);
    assert.ok((await visiveis(pagina)) > 0);
    await contexto.close();
  });
});

describe('contato', () => {
  test('pré-seleciona a área vinda da página de solução (?area=)', async () => {
    const pagina = await amb.navegador.newPage();
    await pagina.goto(`${amb.base}/contato/?area=capacidade-forecast`);
    assert.equal(await pagina.inputValue('#tipo'), 'Planejamento de capacidade e forecast');
    await pagina.close();
  });

  test('valida a descrição, foca o campo e envia pelo WhatsApp com a mensagem montada', async () => {
    const pagina = await amb.navegador.newPage();
    await pagina.goto(`${amb.base}/contato/?area=dados-bi`);
    await pagina.evaluate(() => {
      window.__aberto = null;
      window.open = (url) => {
        window.__aberto = url;
        return null;
      };
    });

    await pagina.click('button[data-canal="whatsapp"]');
    assert.ok(await pagina.isVisible('#descricao-erro'), 'erro aparece no envio vazio');
    assert.equal(await pagina.evaluate(() => document.activeElement?.id), 'descricao', 'foco no campo inválido');
    assert.equal(await pagina.getAttribute('#descricao', 'aria-invalid'), 'true');
    assert.equal(await pagina.evaluate(() => window.__aberto), null, 'nada é aberto com erro');

    await pagina.fill('#nome', 'Ana');
    await pagina.fill('#retorno', 'Empresa Exemplo');
    await pagina.fill('#descricao', 'Dois relatórios que precisam bater.');
    assert.equal(await pagina.isVisible('#descricao-erro'), false, 'erro some enquanto digita');

    await pagina.click('button[data-canal="whatsapp"]');
    const url = await pagina.evaluate(() => window.__aberto);
    assert.ok(url?.startsWith(WHATSAPP), `abre o WhatsApp (${url})`);
    const texto = new URL(url).searchParams.get('text');
    assert.equal(
      texto,
      'Nome: Ana\nContato: Empresa Exemplo\nÁrea: Dados, BI e dashboards\n\nDois relatórios que precisam bater.',
    );
    await pagina.close();
  });

  test('copia o e-mail e anuncia a cópia', async () => {
    const contexto = await amb.navegador.newContext({ permissions: ['clipboard-read', 'clipboard-write'] });
    const pagina = await contexto.newPage();
    await pagina.goto(`${amb.base}/contato/`);
    await pagina.click('[data-copiar]');
    assert.equal(await pagina.evaluate(() => navigator.clipboard.readText()), 'hans@hansmindclaw.com');
    assert.equal(await pagina.textContent('[data-copiar-rotulo]'), 'Copiado');
    assert.equal(await pagina.textContent('[data-copiar-status]'), 'Endereço de e-mail copiado.');
    await contexto.close();
  });

  test('o botão de conversa de cada solução já leva o assunto', async () => {
    const pagina = await amb.navegador.newPage();
    await pagina.goto(`${amb.base}/solucoes/capacidade-forecast/`);
    const hrefs = await pagina.$$eval(`a[href^="${WHATSAPP}"]`, (as) => as.map((a) => a.href));
    assert.ok(hrefs.length >= 2, 'botão no topo e no fim da página');
    for (const href of hrefs) {
      assert.match(new URL(href).searchParams.get('text') ?? '', /planejamento de capacidade e forecast/);
    }
    await pagina.close();
  });
});

describe('gráficos', () => {
  test('tooltip do painel acompanha o foco do teclado', async () => {
    const pagina = await amb.navegador.newPage({ viewport: { width: 1366, height: 900 } });
    await pagina.goto(`${amb.base}/solucoes/dados-bi/`);
    const zona = pagina.locator('.graficos > [data-w]:visible .grafico__zona').first();
    await zona.focus();
    const tooltip = pagina.locator('[data-tooltip]');
    assert.ok(await tooltip.isVisible(), 'tooltip aparece no foco');
    const texto = await tooltip.textContent();
    assert.match(texto ?? '', /jan/);
    assert.match(texto ?? '', /Realizado/);
    assert.match(texto ?? '', /Orçamento/);
    await pagina.keyboard.press('Tab');
    await pagina.keyboard.press('Shift+Tab');
    assert.ok(await tooltip.isVisible(), 'segue visível navegando entre meses');
    await pagina.close();
  });

  test('ilustração de capacidade descreve a hora em foco', async () => {
    const pagina = await amb.navegador.newPage({ viewport: { width: 1366, height: 900 } });
    await pagina.goto(`${amb.base}/solucoes/capacidade-forecast/`);
    await pagina.locator('.graficos > [data-w]:visible .hora').nth(3).focus();
    assert.equal(
      await pagina.textContent('[data-dica-saida]'),
      '11h: necessidade de 15 pessoas, 10 escaladas, faltam 5',
    );
    await pagina.close();
  });

  for (const largura of [1366, 1100, 960, 760, 600, 390, 320]) {
    test(`texto dos gráficos legível em ${largura}px`, async () => {
      const pagina = await amb.navegador.newPage({ viewport: { width: largura, height: 900 } });
      for (const caminho of ['/solucoes/dados-bi/', '/solucoes/capacidade-forecast/']) {
        await pagina.goto(amb.base + caminho);
        const medidas = await pagina.$$eval('.graficos', (grupos) =>
          grupos.map((g) => {
            const visiveis = [...g.children].filter((v) => getComputedStyle(v).display !== 'none');
            const svg = visiveis[0]?.querySelector('svg');
            if (!svg) return { visiveis: visiveis.length, px: [] };
            const escala = svg.getBoundingClientRect().width / svg.viewBox.baseVal.width;
            const px = [...svg.querySelectorAll('text')].map((t) => parseFloat(getComputedStyle(t).fontSize) * escala);
            return { visiveis: visiveis.length, px };
          }),
        );
        for (const { visiveis, px } of medidas) {
          assert.equal(visiveis, 1, `${caminho}: uma variante visível`);
          const menor = Math.min(...px);
          const maior = Math.max(...px);
          assert.ok(menor >= 11.5 && maior <= 18.5, `${caminho}: texto entre ${menor.toFixed(1)} e ${maior.toFixed(1)} px`);
        }
      }
      await pagina.close();
    });
  }
});

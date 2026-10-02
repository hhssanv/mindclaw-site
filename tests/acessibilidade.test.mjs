/**
 * Acessibilidade: axe-core (WCAG 2.2 AA + boas práticas) em todas as páginas, nos dois
 * temas e em duas larguras; um h1 por página sem salto de nível; sem rolagem horizontal.
 */
import { after, before, describe, test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { ambiente } from './apoio/navegador.mjs';
import { paginas } from './apoio/paginas.mjs';

const axe = readFileSync(createRequire(import.meta.url).resolve('axe-core/axe.min.js'), 'utf8');
const REGRAS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'];

let amb;
before(async () => (amb = await ambiente()));
after(async () => amb.fechar());

const verificarAxe = async (pagina) => {
  await pagina.addScriptTag({ content: axe });
  const resultado = await pagina.evaluate((runOnly) => window.axe.run(document, { runOnly }), REGRAS);
  return resultado.violations.map(
    (v) => `${v.id}: ${v.help} → ${v.nodes.slice(0, 3).map((n) => n.target.join(' ')).join(' | ')}`,
  );
};

for (const esquema of ['light', 'dark']) {
  test(`menu do celular aberto, tema ${esquema === 'light' ? 'claro' : 'escuro'}`, async () => {
    const pagina = await amb.navegador.newPage({
      viewport: { width: 390, height: 844 },
      colorScheme: esquema,
      reducedMotion: 'reduce',
    });
    await pagina.goto(`${amb.base}/sobre/`, { waitUntil: 'networkidle' });
    await pagina.click('[data-menu-botao]');
    assert.deepEqual(await verificarAxe(pagina), [], 'axe sem violações com o menu aberto');
    await pagina.close();
  });

  for (const largura of [1366, 390]) {
    describe(`tema ${esquema === 'light' ? 'claro' : 'escuro'}, ${largura}px`, () => {
      let pagina;
      before(async () => {
        pagina = await amb.navegador.newPage({
          viewport: { width: largura, height: 900 },
          colorScheme: esquema,
          reducedMotion: 'reduce',
        });
      });
      after(async () => pagina.close());

      for (const caminho of paginas) {
        test(caminho, async () => {
          await pagina.goto(amb.base + caminho, { waitUntil: 'networkidle' });
          assert.deepEqual(await verificarAxe(pagina), [], 'axe sem violações');

          const niveis = await pagina.$$eval('h1,h2,h3,h4,h5,h6', (els) => els.map((e) => Number(e.tagName[1])));
          assert.equal(niveis.filter((n) => n === 1).length, 1, 'um único h1');
          const saltos = niveis.flatMap((n, i) => (i && n - niveis[i - 1] > 1 ? [`h${niveis[i - 1]}→h${n}`] : []));
          assert.deepEqual(saltos, [], 'sem salto de nível de título');

          const sobra = await pagina.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
          assert.equal(sobra, 0, 'sem rolagem horizontal');
        });
      }
    });
  }
}

/**
 * Higiene do que é publicado: metadados por página, idioma e versões traduzidas ligadas
 * entre si, e nada de detalhe de ambiente (IP, host local, caminho de máquina, credencial)
 * vazando para o HTML.
 * Nomes de clientes não são listados aqui de propósito: este arquivo também é público.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { DIST } from './apoio/servidor.mjs';
import { arquivos } from './apoio/paginas.mjs';

const EMAIL_DO_SITE = 'hans@hansmindclaw.com';
const SITE = 'https://hansmindclaw.com';

/** Páginas em inglês ficam em /en/; o resto é português. */
const idiomaDe = (nome) => (nome.startsWith('en/') ? 'en' : 'pt-BR');

/** Caminho de URL (/en/about/) → arquivo em dist/. */
const arquivoDe = (caminho) => join(DIST, caminho.endsWith('/') ? `${caminho}index.html` : caminho);
const caminhoDe = (nome) => `/${nome.replace(/(^|\/)index\.html$/, '$1')}`;

const alternativas = (html) =>
  Object.fromEntries([...html.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g)].map((m) => [m[1], m[2]]));

const texto = (html) =>
  html
    .replace(/<script[\s\S]*?<\/script>/g, ' ')
    .replace(/<style[\s\S]*?<\/style>/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ');

for (const arquivo of arquivos) {
  const nome = relative(DIST, arquivo).split(sep).join('/');
  const html = readFileSync(arquivo, 'utf8');

  test(`metadados de ${nome}`, () => {
    const idioma = idiomaDe(nome);
    assert.match(html, new RegExp(`<html lang="${idioma}"`), `idioma ${idioma}`);
    assert.match(html, new RegExp(`<meta property="og:locale" content="${idioma === 'en' ? 'en_US' : 'pt_BR'}"`));
    const titulo = html.match(/<title>([^<]+)<\/title>/)?.[1] ?? '';
    assert.ok(titulo.length > 0 && titulo.length <= 70, `título com ${titulo.length} caracteres`);
    const descricao = html.match(/<meta name="description" content="([^"]+)"/)?.[1] ?? '';
    assert.ok(descricao.length >= 70 && descricao.length <= 170, `descrição com ${descricao.length} caracteres`);
    if (!html.includes('<meta name="robots" content="noindex"')) {
      assert.match(html, /<link rel="canonical" href="https:\/\/hansmindclaw\.com\//);
      const og = html.match(/<meta property="og:image" content="https:\/\/hansmindclaw\.com(\/[^"]+)"/)?.[1];
      assert.ok(og && existsSync(join(DIST, og)), `imagem OG ${og} existe`);
    }
  });

  test(`versões traduzidas de ${nome}`, () => {
    const idioma = idiomaDe(nome);
    const alt = alternativas(html);
    if (html.includes('<meta name="robots" content="noindex"')) {
      assert.deepEqual(alt, {}, 'página fora do índice não declara traduções');
      return;
    }
    assert.deepEqual(Object.keys(alt).sort(), ['en', 'pt-BR', 'x-default'], 'hreflang de cada idioma e x-default');
    assert.equal(alt[idioma], `${SITE}${caminhoDe(nome)}`, 'a versão do próprio idioma é esta página');
    assert.equal(alt['x-default'], alt.en, 'x-default aponta para o inglês');
    for (const [lingua, url] of Object.entries(alt)) {
      assert.ok(url.startsWith(`${SITE}/`), `${lingua}: ${url} no domínio do site`);
      const destino = arquivoDe(url.slice(SITE.length));
      assert.ok(existsSync(destino), `${lingua}: ${url} existe`);
      // Recíproco: a tradução aponta de volta para esta página.
      assert.deepEqual(alternativas(readFileSync(destino, 'utf8')), alt, `${url} declara as mesmas versões`);
    }
    // O seletor de idioma do cabeçalho leva à mesma página no outro idioma.
    const outro = idioma === 'en' ? 'pt-BR' : 'en';
    const seletor = html.match(new RegExp(`<a[^>]*href="([^"]+)"[^>]*data-idioma="${outro}"`))?.[1];
    assert.equal(seletor && `${SITE}${seletor}`, alt[outro], 'seletor de idioma aponta para a tradução');
  });

  test(`nada de detalhe de ambiente em ${nome}`, () => {
    const t = texto(html);
    assert.doesNotMatch(t, /\b(?:\d{1,3}\.){3}\d{1,3}\b/, 'endereço IP no texto');
    assert.doesNotMatch(html, /localhost|127\.0\.0\.1|[A-Z]:\\\\|\/home\/|\/Users\//, 'host local ou caminho de máquina');
    assert.doesNotMatch(t, /\b(?:senha|password|token|api[_-]?key|secret)\s*[:=]/i, 'credencial');
    const emails = new Set([...html.matchAll(/[\w.+-]+@[\w-]+\.[\w.]+/g)].map((m) => m[0]));
    assert.deepEqual([...emails].filter((e) => e !== EMAIL_DO_SITE), [], 'só o e-mail do site aparece');
  });

  test(`texto sem palavras coladas em ${nome}`, () => {
    // Pega o erro clássico de JSX: quebra de linha antes de {expressão} engolindo o espaço.
    const colados = [...texto(html).matchAll(/[a-zà-ú][,;:](?=[A-Za-zÀ-ú0-9])|[a-zà-ú]{3}[A-Z][a-zà-ú]{2}/g)]
      .map((m) => texto(html).slice(Math.max(0, m.index - 15), m.index + 15).trim())
      .filter((c) => !/WhatsApp|MindClaw|GitHub|PowerShell|JavaScript/.test(c));
    assert.deepEqual(colados, []);
  });
}

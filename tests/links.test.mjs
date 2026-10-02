/**
 * Links internos: todo href/src/srcset que aponta para o próprio site precisa existir em
 * dist/, e toda âncora (#id) precisa existir na página de destino. Roda sem navegador.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { DIST } from './apoio/servidor.mjs';
import { arquivos } from './apoio/paginas.mjs';

const ids = new Map();
const idsDe = (arquivo) => {
  if (!ids.has(arquivo)) {
    const html = readFileSync(arquivo, 'utf8');
    ids.set(arquivo, new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])));
  }
  return ids.get(arquivo);
};

function resolver(caminho) {
  const alvo = join(DIST, decodeURIComponent(caminho));
  if (existsSync(alvo) && statSync(alvo).isDirectory()) return join(alvo, 'index.html');
  return existsSync(alvo) ? alvo : null;
}

for (const arquivo of arquivos) {
  const nome = relative(DIST, arquivo).split(sep).join('/');
  test(`links de ${nome}`, () => {
    const html = readFileSync(arquivo, 'utf8');
    const refs = [
      ...[...html.matchAll(/\s(?:href|src)="([^"]+)"/g)].map((m) => m[1]),
      ...[...html.matchAll(/\ssrcset="([^"]+)"/g)].flatMap((m) => m[1].split(',').map((p) => p.trim().split(/\s+/)[0])),
    ];
    const quebrados = [];
    for (const ref of refs) {
      if (/^(https?:|mailto:|tel:|data:)/.test(ref)) {
        if (ref.startsWith('http:')) quebrados.push(`${ref} (sem HTTPS)`);
        continue;
      }
      const [semHash, ancora] = ref.split('#');
      const caminho = semHash.split('?')[0];
      const destino = caminho === '' ? arquivo : resolver(caminho.startsWith('/') ? caminho : join('/', nome, '..', caminho));
      if (!destino) {
        quebrados.push(`${ref} (arquivo não existe)`);
        continue;
      }
      if (ancora && destino.endsWith('.html') && !idsDe(destino).has(ancora)) quebrados.push(`${ref} (âncora não existe)`);
    }
    assert.deepEqual(quebrados, []);
  });
}

/** Lista as páginas HTML geradas em dist/, como caminhos de URL. */
import { readdirSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { DIST } from './servidor.mjs';

function htmls(pasta) {
  return readdirSync(pasta, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? htmls(join(pasta, e.name)) : e.name.endsWith('.html') ? [join(pasta, e.name)] : [],
  );
}

export const arquivos = htmls(DIST).sort();

export const paginas = arquivos.map((f) => {
  const r = relative(DIST, f).split(sep).join('/');
  if (r === 'index.html') return '/';
  return r.endsWith('/index.html') ? `/${r.slice(0, -'index.html'.length)}` : `/${r}`;
});

/**
 * Servidor estático mínimo sobre dist/, com as mesmas regras do GitHub Pages:
 * /caminho/ serve /caminho/index.html e o que não existe recebe 404.html com status 404.
 */
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

export const DIST = fileURLToPath(new URL('../../dist/', import.meta.url));

const TIPOS = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.woff2': 'font/woff2',
  '.xml': 'application/xml',
  '.txt': 'text/plain; charset=utf-8',
  '.ico': 'image/x-icon',
  '.webmanifest': 'application/manifest+json',
};

async function arquivo(caminho) {
  const alvo = normalize(join(DIST, decodeURIComponent(caminho)));
  if (!alvo.startsWith(DIST)) return null;
  try {
    const info = await stat(alvo);
    if (info.isDirectory()) return arquivo(join(caminho, 'index.html'));
    return alvo;
  } catch {
    return null;
  }
}

export async function iniciarServidor() {
  const servidor = createServer(async (req, res) => {
    const { pathname } = new URL(req.url ?? '/', 'http://localhost');
    const alvo = await arquivo(pathname);
    const final = alvo ?? join(DIST, '404.html');
    res.writeHead(alvo ? 200 : 404, { 'content-type': TIPOS[extname(final)] ?? 'application/octet-stream' });
    res.end(await readFile(final));
  });
  await new Promise((ok) => servidor.listen(0, '127.0.0.1', ok));
  const { port } = servidor.address();
  return { base: `http://127.0.0.1:${port}`, fechar: () => new Promise((ok) => servidor.close(ok)) };
}

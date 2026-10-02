import type { APIRoute } from 'astro';
import { solucoes, hrefSolucao } from '../lib/conteudo';
import { urlAbsoluta } from '../lib/site';

/** Sitemap com todas as rotas públicas. */
export const GET: APIRoute = async () => {
  const areas = await solucoes();
  const rotas = [
    '/',
    '/solucoes/',
    ...areas.map((a) => hrefSolucao(a.id)),
    '/projetos/',
    '/sobre/',
    '/contato/',
    '/privacidade/',
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${rotas.map((r) => `  <url><loc>${urlAbsoluta(r)}</loc></url>`).join('\n')}
</urlset>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};

import type { APIRoute } from 'astro';
import { casesPublicados, hrefCase } from '../lib/cases';
import { urlAbsoluta } from '../lib/site';

/** Sitemap com todas as rotas públicas. Rascunhos ficam de fora. */
export const GET: APIRoute = async () => {
  const cases = await casesPublicados();
  const rotas = [
    '/',
    '/cases/',
    ...cases.filter((c) => !c.data.rascunho).map((c) => hrefCase(c.id)),
    '/servicos/',
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

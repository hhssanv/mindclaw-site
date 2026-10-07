import type { APIRoute } from 'astro';
import { alternativasSolucoes } from '../lib/conteudo';
import { urlAbsoluta } from '../lib/site';
import { IDIOMAS, IDIOMA_PADRAO_BUSCA, alternativasDe, type Alternativas, type Secao } from '../i18n';

/** Sitemap com todas as rotas públicas, nos dois idiomas, cada uma apontando para as suas traduções. */
export const GET: APIRoute = async () => {
  const solucoes = [...(await alternativasSolucoes()).values()];
  const secoes: Secao[] = ['inicio', 'solucoes', 'projetos', 'sobre', 'contato', 'privacidade'];
  const paginas: Alternativas[] = [...secoes.slice(0, 2).map(alternativasDe), ...solucoes, ...secoes.slice(2).map(alternativasDe)];

  const links = (alt: Alternativas) =>
    [
      ...IDIOMAS.map((i) => `    <xhtml:link rel="alternate" hreflang="${i}" href="${urlAbsoluta(alt[i])}"/>`),
      `    <xhtml:link rel="alternate" hreflang="x-default" href="${urlAbsoluta(alt[IDIOMA_PADRAO_BUSCA])}"/>`,
    ].join('\n');

  const urls = IDIOMAS.flatMap((idioma) =>
    paginas.map((alt) => `  <url>\n    <loc>${urlAbsoluta(alt[idioma])}</loc>\n${links(alt)}\n  </url>`),
  );

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};

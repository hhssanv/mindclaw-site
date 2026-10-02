import type { APIRoute, GetStaticPaths } from 'astro';
import { solucoes } from '../../lib/conteudo';
import { ogSolucao, ogPadrao } from '../../lib/og';

export const getStaticPaths = (async () => {
  const areas = await solucoes();
  return [
    ...areas.map((s) => ({ params: { slug: s.id }, props: { dados: s.data } })),
    { params: { slug: 'padrao' }, props: { dados: undefined } },
  ];
}) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ props }) => {
  const png = props.dados ? await ogSolucao(props.dados) : await ogPadrao();
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};

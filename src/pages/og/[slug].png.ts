import type { APIRoute, GetStaticPaths } from 'astro';
import { casesPublicados } from '../../lib/cases';
import { ogCase, ogPadrao } from '../../lib/og';

export const getStaticPaths = (async () => {
  const cases = await casesPublicados();
  return [
    ...cases.map((c) => ({ params: { slug: c.id }, props: { dados: c.data } })),
    { params: { slug: 'padrao' }, props: { dados: undefined } },
  ];
}) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ props }) => {
  const png = props.dados ? await ogCase(props.dados) : await ogPadrao();
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};

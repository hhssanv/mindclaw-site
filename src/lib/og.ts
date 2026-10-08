import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import type { Solucao } from './schema';
import { solucoes, rotaSolucao } from './conteudo';
import { textos, type Idioma } from '../i18n';

/**
 * Imagens Open Graph (1200×630) geradas no build, no mesmo visual do hero.
 * É o card que aparece quando o link é colado no WhatsApp, LinkedIn ou e-mail.
 */

const require = createRequire(import.meta.url);
const raiz = process.cwd();

const fonte = (pacote: string, arquivo: string) =>
  fs.readFileSync(path.join(path.dirname(require.resolve(`${pacote}/package.json`)), 'files', arquivo));

const fontes = [
  { name: 'Inter', data: fonte('@fontsource/inter', 'inter-latin-400-normal.woff'), weight: 400 as const },
  { name: 'Inter', data: fonte('@fontsource/inter', 'inter-latin-500-normal.woff'), weight: 500 as const },
  { name: 'Saira', data: fonte('@fontsource/saira', 'saira-latin-600-normal.woff'), weight: 600 as const },
  { name: 'Saira', data: fonte('@fontsource/saira', 'saira-latin-700-normal.woff'), weight: 700 as const },
];

const dataUri = (arquivo: string, mime: string) =>
  `data:${mime};base64,${fs.readFileSync(path.join(raiz, arquivo)).toString('base64')}`;

const logoNegativo = dataUri('public/marca/wordmark-neg.svg', 'image/svg+xml');
const isotipo = dataUri('src/assets/og/isotipo.png', 'image/png');

const cor = {
  fundo: '#121214',
  tinta: '#f4f4f5',
  media: '#cacad0',
  fraca: '#a2a2ac',
  acento: '#ff5468',
  linha: '#303036',
  ok: '#5fd99a',
};

type No = { type: string; props: Record<string, unknown> };
type Filho = No | string | null | false;

function h(type: string, style: Record<string, unknown>, ...children: Filho[]): No {
  const filhos = children.filter(Boolean) as (No | string)[];
  return { type, props: { style: { display: 'flex', ...style }, children: filhos.length === 1 ? filhos[0] : filhos } };
}

const img = (src: string, width: number, height: number): No => ({
  type: 'img',
  props: { src, width, height, style: { width, height } },
});

const barra = () =>
  h('div', {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 10,
    backgroundImage: 'linear-gradient(90deg, #ff001e, #782747)',
  });

async function renderizar(arvore: No): Promise<Buffer> {
  const svg = await satori(arvore as never, { width: 1200, height: 630, fonts: fontes });
  return new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng();
}

export async function ogSolucao(idioma: Idioma, d: Solucao): Promise<Buffer> {
  const tamanhoTitulo = d.titulo.length > 36 ? 58 : 66;
  const arvore = h(
    'div',
    {
      position: 'relative',
      width: 1200,
      height: 630,
      flexDirection: 'column',
      padding: '56px 72px 64px',
      backgroundColor: cor.fundo,
      color: cor.tinta,
      fontFamily: 'Inter',
    },
    h(
      'div',
      { justifyContent: 'space-between', alignItems: 'center' },
      img(logoNegativo, 205, 70),
      h(
        'div',
        {
          padding: '8px 18px',
          border: `1px solid ${cor.linha}`,
          borderRadius: 999,
          fontFamily: 'Saira',
          fontWeight: 600,
          fontSize: 18,
          letterSpacing: 2,
          color: cor.media,
        },
        textos[idioma].og.solucao,
      ),
    ),
    h(
      'div',
      {
        marginTop: 64,
        maxWidth: 1000,
        fontFamily: 'Saira',
        fontSize: tamanhoTitulo,
        fontWeight: 700,
        lineHeight: 1.04,
        letterSpacing: -0.5,
      },
      d.titulo,
    ),
    h('div', { marginTop: 22, maxWidth: 960, fontSize: 25, lineHeight: 1.4, color: cor.media }, d.resumo),
    h(
      'div',
      { marginTop: 'auto', gap: 28, borderTop: `1px solid ${cor.linha}`, paddingTop: 24 },
      ...d.ganhos.slice(0, 3).map((g) =>
        h(
          'div',
          { flex: 1, gap: 12, alignItems: 'flex-start' },
          h('div', { width: 10, height: 10, marginTop: 9, flexShrink: 0, backgroundColor: cor.acento }),
          h('div', { fontSize: 21, fontWeight: 500, lineHeight: 1.35, color: cor.tinta }, g),
        ),
      ),
    ),
    barra(),
  );
  return renderizar(arvore);
}

export async function ogPadrao(idioma: Idioma): Promise<Buffer> {
  const arvore = h(
    'div',
    {
      position: 'relative',
      width: 1200,
      height: 630,
      padding: '64px 72px 72px',
      backgroundColor: cor.fundo,
      color: cor.tinta,
      fontFamily: 'Inter',
      alignItems: 'center',
      gap: 48,
    },
    h(
      'div',
      { flex: 1, flexDirection: 'column', height: '100%' },
      img(logoNegativo, 262, 89),
      h(
        'div',
        { marginTop: 'auto', fontFamily: 'Saira', fontSize: 44, fontWeight: 700, lineHeight: 1.12, color: cor.tinta },
        textos[idioma].og.chamada,
      ),
      h(
        'div',
        { marginTop: 28, fontFamily: 'Saira', fontWeight: 600, fontSize: 20, letterSpacing: 1, color: cor.fraca },
        'hansmindclaw.com',
      ),
    ),
    img(isotipo, 340, 340),
    barra(),
  );
  return renderizar(arvore);
}

/** Rotas das imagens de um idioma: uma por solução e a padrão (src/pages/og/). */
export async function caminhosOg(idioma: Idioma) {
  const areas = await solucoes(idioma);
  return [
    ...areas.map((s) => ({ params: { slug: rotaSolucao(s) }, props: { idioma, dados: s.data } })),
    { params: { slug: 'padrao' }, props: { idioma, dados: undefined } },
  ];
}

export async function respostaOg({ idioma, dados }: { idioma: Idioma; dados?: Solucao }) {
  const png = dados ? await ogSolucao(idioma, dados) : await ogPadrao(idioma);
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
}

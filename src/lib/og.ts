import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import type { Case } from './schema';
import { site, rotuloTipo, descricaoTipo } from './site';

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

export async function ogCase(d: Case): Promise<Buffer> {
  const titulo = d.titulo.length > 52 ? 54 : 62;
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
          alignItems: 'center',
          gap: 12,
          padding: '8px 18px',
          border: `1px solid ${cor.linha}`,
          borderRadius: 999,
          fontFamily: 'Saira', fontWeight: 600,
          fontSize: 18,
          letterSpacing: 1,
          color: cor.media,
        },
        h('div', {
          width: 12,
          height: 12,
          borderRadius: 999,
          backgroundColor: d.tipo === 'producao' ? cor.ok : 'transparent',
          border: d.tipo === 'producao' ? 'none' : `2px dashed ${cor.fraca}`,
        }),
        `${rotuloTipo[d.tipo].toUpperCase()} · ${descricaoTipo[d.tipo]}`,
      ),
    ),
    h(
      'div',
      { marginTop: 52, fontFamily: 'Saira', fontWeight: 600, fontSize: 19, letterSpacing: 2, color: cor.acento },
      d.eyebrow.join('  ·  ').toUpperCase(),
    ),
    h(
      'div',
      {
        marginTop: 18,
        maxWidth: 1000,
        fontFamily: 'Saira',
        fontSize: titulo,
        fontWeight: 700,
        lineHeight: 1.04,
        letterSpacing: -0.5,
      },
      d.titulo,
    ),
    h(
      'div',
      { marginTop: 'auto', borderTop: `1px solid ${cor.linha}`, paddingTop: 26 },
      ...d.metricas.map((m, i) =>
        h(
          'div',
          {
            flex: 1,
            flexDirection: 'column',
            gap: 8,
            paddingLeft: i === 0 ? 0 : 28,
            borderLeft: i === 0 ? 'none' : `1px solid ${cor.linha}`,
          },
          h('div', { fontFamily: 'Saira', fontSize: 54, fontWeight: 700, color: cor.acento, lineHeight: 1 }, m.valor),
          h('div', { fontSize: 21, color: cor.fraca, lineHeight: 1.3, maxWidth: 300 }, m.rotulo),
        ),
      ),
    ),
    barra(),
  );
  return renderizar(arvore);
}

export async function ogPadrao(): Promise<Buffer> {
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
        'Do trabalho manual à operação automatizada e auditável.',
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

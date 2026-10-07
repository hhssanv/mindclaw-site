import pt, { type Textos } from './pt-BR';
import en from './en';

/**
 * Idiomas do site. O português fica na raiz (/) e o inglês em /en/, com os endereços
 * traduzidos. Toda página existe nos dois idiomas, com o mesmo conteúdo.
 */
export const IDIOMAS = ['pt-BR', 'en'] as const;
export type Idioma = (typeof IDIOMAS)[number];
export type { Textos };

export const idiomas: Record<Idioma, { nome: string; curto: string; locale: string; intl: string }> = {
  'pt-BR': { nome: 'Português', curto: 'PT', locale: 'pt_BR', intl: 'pt-BR' },
  en: { nome: 'English', curto: 'EN', locale: 'en_US', intl: 'en-US' },
};

/** Versão indicada aos buscadores para quem não lê nenhum dos dois idiomas (hreflang x-default). */
export const IDIOMA_PADRAO_BUSCA: Idioma = 'en';

export const textos: Record<Idioma, Textos> = { 'pt-BR': pt, en };

/** Endereço de cada seção em cada idioma. Os arquivos de src/pages/ precisam estar nestes caminhos. */
const secoes = {
  'pt-BR': {
    inicio: '/',
    solucoes: '/solucoes/',
    projetos: '/projetos/',
    sobre: '/sobre/',
    contato: '/contato/',
    privacidade: '/privacidade/',
    naoEncontrada: '/404.html',
  },
  en: {
    inicio: '/en/',
    solucoes: '/en/solutions/',
    projetos: '/en/projects/',
    sobre: '/en/about/',
    contato: '/en/contact/',
    privacidade: '/en/privacy/',
    naoEncontrada: '/en/404/',
  },
} as const satisfies Record<Idioma, Record<string, string>>;

export type Secao = keyof (typeof secoes)['pt-BR'];

export const rota = (idioma: Idioma, secao: Secao): string => secoes[idioma][secao];

/** O endereço da mesma página em cada idioma: alimenta o hreflang e o seletor de idioma. */
export type Alternativas = Record<Idioma, string>;

export const alternativasDe = (secao: Secao): Alternativas =>
  Object.fromEntries(IDIOMAS.map((i) => [i, rota(i, secao)])) as Alternativas;

/** Navegação principal, na ordem do cabeçalho. */
export const navegacao = (idioma: Idioma) =>
  (['solucoes', 'projetos', 'sobre'] as const).map((secao) => ({
    rotulo: textos[idioma].navegacao[secao],
    href: rota(idioma, secao),
  }));

export const linkContato = (idioma: Idioma) => ({
  rotulo: textos[idioma].navegacao.contato,
  href: rota(idioma, 'contato'),
});

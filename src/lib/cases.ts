import { getCollection, type CollectionEntry } from 'astro:content';

export type CaseEntry = CollectionEntry<'cases'>;

/**
 * Rascunhos aparecem no `npm run dev` (e no build com MOSTRAR_RASCUNHOS=1),
 * nunca no build de produção.
 */
export const mostrarRascunhos = import.meta.env.DEV || process.env.MOSTRAR_RASCUNHOS === '1';

/** Cases publicados, com os de produção acima e depois pela ordem do frontmatter. */
export async function casesPublicados(): Promise<CaseEntry[]> {
  const todos = await getCollection('cases', (c) => mostrarRascunhos || !c.data.rascunho);
  return todos.sort((a, b) => {
    if (a.data.tipo !== b.data.tipo) return a.data.tipo === 'producao' ? -1 : 1;
    return a.data.ordem - b.data.ordem;
  });
}

/** Os três cases da home: destaques primeiro, completando com os demais se faltar. */
export async function casesEmDestaque(): Promise<CaseEntry[]> {
  const todos = await casesPublicados();
  const destaques = todos.filter((c) => c.data.destaque);
  const resto = todos.filter((c) => !c.data.destaque);
  return [...destaques, ...resto].slice(0, 3);
}

export function vizinhos(lista: CaseEntry[], id: string) {
  const i = lista.findIndex((c) => c.id === id);
  if (i === -1 || lista.length < 2) return { anterior: undefined, proximo: undefined };
  return {
    anterior: lista[(i - 1 + lista.length) % lista.length],
    proximo: lista[(i + 1) % lista.length],
  };
}

export function hrefCase(id: string) {
  return `/cases/${id}/`;
}

/** Disciplinas (eyebrow) de todos os cases, na ordem em que aparecem. */
export function disciplinas(lista: CaseEntry[]): string[] {
  return [...new Set(lista.flatMap((c) => c.data.eyebrow))];
}

/** Categorias do formulário de contato: as mesmas dos chips de melhor encaixe. */
export function categoriasDeProblema(lista: CaseEntry[]): string[] {
  return [...new Set(lista.flatMap((c) => c.data.melhorEncaixe))].sort((a, b) => a.localeCompare(b, 'pt-BR'));
}

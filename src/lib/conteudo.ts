import { getCollection, type CollectionEntry } from 'astro:content';

export type SolucaoEntry = CollectionEntry<'solucoes'>;
export type ProjetoEntry = CollectionEntry<'projetos'>;

export const hrefSolucao = (id: string) => `/solucoes/${id}/`;
export const ancoraProjeto = (id: string) => `/projetos/#${id}`;

export async function solucoes(): Promise<SolucaoEntry[]> {
  return (await getCollection('solucoes')).sort((a, b) => a.data.ordem - b.data.ordem);
}

export async function projetos(): Promise<ProjetoEntry[]> {
  return (await getCollection('projetos')).sort((a, b) => a.data.ordem - b.data.ordem);
}

/**
 * Confere as referências cruzadas entre soluções e projetos.
 * Um id digitado errado derruba o build com uma mensagem clara.
 */
export async function validarReferencias() {
  const [ss, ps] = await Promise.all([solucoes(), projetos()]);
  const idsSolucoes = new Set(ss.map((s) => s.id));
  const idsProjetos = new Set(ps.map((p) => p.id));
  const erros: string[] = [];
  for (const s of ss) {
    for (const id of s.data.projetos) {
      if (!idsProjetos.has(id)) erros.push(`solução "${s.id}" cita o projeto "${id}", que não existe em projetos.json`);
    }
  }
  for (const p of ps) {
    for (const id of p.data.areas) {
      if (!idsSolucoes.has(id)) erros.push(`projeto "${p.id}" cita a área "${id}", que não existe em content/solucoes/`);
    }
  }
  if (erros.length) throw new Error(`Referências inválidas no conteúdo:\n- ${erros.join('\n- ')}`);
}

export function vizinhos<T extends { id: string }>(lista: T[], id: string) {
  const i = lista.findIndex((x) => x.id === id);
  if (i === -1 || lista.length < 2) return { anterior: undefined, proximo: undefined };
  return {
    anterior: lista[(i - 1 + lista.length) % lista.length],
    proximo: lista[(i + 1) % lista.length],
  };
}

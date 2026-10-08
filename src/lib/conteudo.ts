import { getCollection, type CollectionEntry } from 'astro:content';
import { IDIOMAS, rota, type Alternativas, type Idioma } from '../i18n';

/** Coleção de cada tipo de conteúdo em cada idioma (ver src/content.config.ts). */
const colecoes = {
  'pt-BR': { solucoes: 'solucoes', projetos: 'projetos', principios: 'principios', servicos: 'servicos', stack: 'stack' },
  en: { solucoes: 'solucoesEn', projetos: 'projetosEn', principios: 'principiosEn', servicos: 'servicosEn', stack: 'stackEn' },
} as const satisfies Record<Idioma, Record<string, string>>;

export type SolucaoEntry = CollectionEntry<'solucoes' | 'solucoesEn'>;
export type ProjetoEntry = CollectionEntry<'projetos' | 'projetosEn'>;

/** Rótulo curto e endereço de cada área, por id: as etiquetas dos projetos usam. */
export type MapaAreas = Map<string, { curto: string; href: string }>;

const porOrdem = <T extends { ordem: number }>(a: T, b: T) => a.ordem - b.ordem;

export const rotaSolucao = (s: SolucaoEntry) => s.data.slug ?? s.id;
export const hrefSolucao = (idioma: Idioma, s: SolucaoEntry) => `${rota(idioma, 'solucoes')}${rotaSolucao(s)}/`;

export async function solucoes(idioma: Idioma): Promise<SolucaoEntry[]> {
  return (await getCollection(colecoes[idioma].solucoes)).sort((a, b) => porOrdem(a.data, b.data));
}

export async function projetos(idioma: Idioma): Promise<ProjetoEntry[]> {
  return (await getCollection(colecoes[idioma].projetos)).sort((a, b) => porOrdem(a.data, b.data));
}

export async function principios(idioma: Idioma) {
  return (await getCollection(colecoes[idioma].principios)).map((p) => p.data).sort((a, b) => a.numero - b.numero);
}

export async function servicos(idioma: Idioma) {
  return (await getCollection(colecoes[idioma].servicos)).map((s) => s.data).sort(porOrdem);
}

export async function stack(idioma: Idioma) {
  return (await getCollection(colecoes[idioma].stack)).map((s) => s.data).sort(porOrdem);
}

export const mapaAreas = (idioma: Idioma, lista: SolucaoEntry[]): MapaAreas =>
  new Map(lista.map((s) => [s.id, { curto: s.data.curto, href: hrefSolucao(idioma, s) }]));

/** O endereço de cada solução em todos os idiomas, por id. */
export async function alternativasSolucoes(): Promise<Map<string, Alternativas>> {
  const porIdioma = await Promise.all(IDIOMAS.map(async (i) => [i, await solucoes(i)] as const));
  const mapa = new Map<string, Alternativas>();
  for (const [idioma, lista] of porIdioma) {
    for (const s of lista) {
      mapa.set(s.id, { ...(mapa.get(s.id) ?? ({} as Alternativas)), [idioma]: hrefSolucao(idioma, s) });
    }
  }
  return mapa;
}

/** Rotas das páginas de solução de um idioma, com tudo o que a página precisa. */
export async function caminhosSolucoes(idioma: Idioma) {
  await validarConteudo();
  const [lista, todos, alternativas] = await Promise.all([solucoes(idioma), projetos(idioma), alternativasSolucoes()]);
  const areas = mapaAreas(idioma, lista);
  return lista.map((s) => ({
    params: { slug: rotaSolucao(s) },
    props: {
      idioma,
      s,
      relacionados: todos.filter((p) => s.data.projetos.includes(p.id)),
      areas,
      alternativas: alternativas.get(s.id)!,
      ...vizinhos(lista, s.id),
    },
  }));
}

let validacao: Promise<void> | undefined;

/**
 * Confere as referências cruzadas entre soluções e projetos e se cada item existe em todos
 * os idiomas com a mesma estrutura. Um id digitado errado ou uma tradução faltando derruba
 * o build com uma mensagem clara.
 */
export function validarConteudo(): Promise<void> {
  validacao ??= validar();
  return validacao;
}

async function validar() {
  const erros: string[] = [];
  const pasta = (idioma: Idioma) => (idioma === 'pt-BR' ? 'content/' : `content/${idioma}/`);

  const dados = await Promise.all(
    IDIOMAS.map(async (idioma) => ({
      idioma,
      solucoes: await solucoes(idioma),
      projetos: await projetos(idioma),
      principios: await principios(idioma),
      servicos: await servicos(idioma),
      stack: await stack(idioma),
    })),
  );

  for (const d of dados) {
    const idsSolucoes = new Set(d.solucoes.map((s) => s.id));
    const idsProjetos = new Set(d.projetos.map((p) => p.id));
    for (const s of d.solucoes) {
      for (const id of s.data.projetos) {
        if (!idsProjetos.has(id))
          erros.push(`${pasta(d.idioma)}solucoes/${s.id}.md cita o projeto "${id}", que não existe em ${pasta(d.idioma)}projetos.json`);
      }
    }
    for (const p of d.projetos) {
      for (const id of p.data.areas) {
        if (!idsSolucoes.has(id))
          erros.push(`projeto "${p.id}" em ${pasta(d.idioma)}projetos.json cita a área "${id}", que não existe em ${pasta(d.idioma)}solucoes/`);
      }
    }
    const slugs = d.solucoes.map(rotaSolucao);
    for (const repetido of new Set(slugs.filter((x, i) => slugs.indexOf(x) !== i))) {
      erros.push(`${pasta(d.idioma)}solucoes/: o endereço "${repetido}" aparece em mais de uma solução`);
    }
  }

  // Paridade entre idiomas: mesmos ids e mesma estrutura; só o texto muda.
  const comparar = <T>(
    tipo: string,
    pegar: (d: (typeof dados)[number]) => T[],
    chave: (x: T) => string,
    estrutura: (x: T) => unknown,
  ) => {
    const [base, ...outros] = dados;
    const referencia = new Map(pegar(base).map((x) => [chave(x), JSON.stringify(estrutura(x))]));
    for (const outro of outros) {
      const itens = new Map(pegar(outro).map((x) => [chave(x), JSON.stringify(estrutura(x))]));
      for (const id of referencia.keys()) {
        if (!itens.has(id)) erros.push(`${tipo} "${id}" existe em ${pasta(base.idioma)} e falta em ${pasta(outro.idioma)}`);
      }
      for (const [id, forma] of itens) {
        if (!referencia.has(id)) erros.push(`${tipo} "${id}" existe em ${pasta(outro.idioma)} e falta em ${pasta(base.idioma)}`);
        else if (referencia.get(id) !== forma)
          erros.push(`${tipo} "${id}" tem estrutura diferente em ${pasta(outro.idioma)}: ${forma} (esperado ${referencia.get(id)})`);
      }
    }
  };

  comparar(
    'solução',
    (d) => d.solucoes,
    (s) => s.id,
    (s) => ({
      ordem: s.data.ordem,
      icone: s.data.icone,
      projetos: s.data.projetos,
      exemplo: s.data.exemplo?.tipo ?? null,
      camadas: s.data.arquitetura?.camadas.length ?? 0,
    }),
  );
  comparar(
    'projeto',
    (d) => d.projetos,
    (p) => p.id,
    (p) => ({
      ordem: p.data.ordem,
      areas: p.data.areas,
      destaque: p.data.destaque,
      demonstracao: p.data.demonstracao,
      link: Boolean(p.data.link),
    }),
  );
  comparar('princípio', (d) => d.principios, (p) => p.id, (p) => p.numero);
  comparar('forma de contratação', (d) => d.servicos, (s) => s.id, (s) => s.ordem);
  comparar('área da stack', (d) => d.stack, (s) => s.id, (s) => s.ordem);

  if (erros.length) throw new Error(`Conteúdo inválido:\n- ${erros.join('\n- ')}`);
}

export function vizinhos<T extends { id: string }>(lista: T[], id: string) {
  const i = lista.findIndex((x) => x.id === id);
  if (i === -1 || lista.length < 2) return { anterior: undefined, proximo: undefined };
  return {
    anterior: lista[(i - 1 + lista.length) % lista.length],
    proximo: lista[(i + 1) % lista.length],
  };
}

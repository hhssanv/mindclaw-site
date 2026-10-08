import { defineCollection } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { principioSchema, projetoSchema, servicoSchema, solucaoSchema, stackSchema } from './lib/schema';

/**
 * Cada coleção existe em português (content/) e em inglês (content/en/), com o mesmo schema.
 * O id de cada item é o mesmo nos dois idiomas: é ele que liga uma página à sua tradução.
 * Nas soluções o id é o nome do arquivo; o campo `slug` é só o endereço da página.
 */
const idPeloArquivo = ({ entry }: { entry: string }) => entry.replace(/\.md$/, '');

const solucoes = (base: string) =>
  defineCollection({ loader: glob({ pattern: '*.md', base, generateId: idPeloArquivo }), schema: solucaoSchema });

export const collections = {
  solucoes: solucoes('./content/solucoes'),
  projetos: defineCollection({ loader: file('./content/projetos.json'), schema: projetoSchema }),
  principios: defineCollection({ loader: file('./content/forma-de-trabalhar.json'), schema: principioSchema }),
  servicos: defineCollection({ loader: file('./content/servicos.json'), schema: servicoSchema }),
  stack: defineCollection({ loader: file('./content/stack.json'), schema: stackSchema }),

  solucoesEn: solucoes('./content/en/solucoes'),
  projetosEn: defineCollection({ loader: file('./content/en/projetos.json'), schema: projetoSchema }),
  principiosEn: defineCollection({ loader: file('./content/en/forma-de-trabalhar.json'), schema: principioSchema }),
  servicosEn: defineCollection({ loader: file('./content/en/servicos.json'), schema: servicoSchema }),
  stackEn: defineCollection({ loader: file('./content/en/stack.json'), schema: stackSchema }),
};

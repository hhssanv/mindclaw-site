import { defineCollection } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { caseSchema, competenciaSchema, etapaSchema, servicoSchema, stackSchema } from './lib/schema';

const cases = defineCollection({
  loader: glob({ pattern: '*.md', base: './content/cases' }),
  schema: caseSchema,
});

const competencias = defineCollection({
  loader: file('./content/competencias.json'),
  schema: competenciaSchema,
});

const trabalho = defineCollection({
  loader: file('./content/trabalho.json'),
  schema: etapaSchema,
});

const servicos = defineCollection({
  loader: file('./content/servicos.json'),
  schema: servicoSchema,
});

const stack = defineCollection({
  loader: file('./content/stack.json'),
  schema: stackSchema,
});

export const collections = { cases, competencias, trabalho, servicos, stack };

import { z } from 'astro/zod';

/**
 * Validação do conteúdo. Roda em todo `astro build` e `astro dev`:
 * conteúdo fora do padrão derruba o build em vez de ir para o ar.
 */

const texto = (campo: string) => z.string().trim().min(1, `${campo} não pode ficar vazio`);

const itemTexto = z.object({
  titulo: texto('titulo'),
  texto: texto('texto'),
});

export const ICONES = [
  'ia',
  'camadas',
  'automacao',
  'visao',
  'dados',
  'governanca',
  'planejamento',
  'pessoas',
  'servidor',
] as const;

/** Uma área de atuação: o problema que resolve, o que é feito e o que costuma melhorar. */
export const solucaoSchema = z.object({
  /** Endereço da página (/solucoes/<slug>/). Sem ele, vale o nome do arquivo. */
  slug: z
    .string()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'slug: só letras minúsculas sem acento, números e hífens')
    .optional(),
  ordem: z.number().int(),
  titulo: texto('titulo'),
  /** Nome curto para etiquetas e filtros. */
  curto: texto('curto').max(24, 'curto: até 24 caracteres'),
  icone: z.enum(ICONES),
  resumo: texto('resumo').max(150, 'resumo: até 150 caracteres (aparece no card)'),
  chamada: texto('chamada').max(240, 'chamada: até 240 caracteres'),

  sinais: z.array(texto('sinais')).min(3, 'sinais: de 3 a 6 itens').max(6, 'sinais: de 3 a 6 itens'),
  entregas: z.array(itemTexto).min(3, 'entregas: de 3 a 5 itens').max(5, 'entregas: de 3 a 5 itens'),
  ganhos: z.array(texto('ganhos')).min(3, 'ganhos: de 3 a 5 itens').max(5, 'ganhos: de 3 a 5 itens'),
  ferramentas: z.array(texto('ferramentas')).min(3),
  projetos: z.array(z.string()).default([]),

  /** Exemplo visual opcional (painel ou ilustração), sempre com dados fictícios. */
  exemplo: z
    .object({
      tipo: z.enum(['painel-norvexa', 'capacidade']),
      titulo: texto('exemplo.titulo'),
      lead: texto('exemplo.lead'),
    })
    .optional(),

  /** Diagrama opcional de camadas (nome, responsabilidade, restrição). */
  arquitetura: z
    .object({
      titulo: texto('arquitetura.titulo'),
      lead: texto('arquitetura.lead'),
      regra: texto('arquitetura.regra'),
      camadas: z.array(z.tuple([texto('camada'), texto('responsabilidade'), texto('restricao')])).min(3).max(6),
    })
    .optional(),

  seo: z.object({
    title: texto('seo.title').max(60, 'seo.title: até 60 caracteres'),
    description: texto('seo.description')
      .min(120, 'seo.description: entre 120 e 160 caracteres')
      .max(160, 'seo.description: entre 120 e 160 caracteres'),
  }),
});

/** Projeto anonimizado: contexto, atuação, resultado. Sem passo a passo. */
export const projetoSchema = z.object({
  id: z.string(),
  ordem: z.number().int(),
  titulo: texto('titulo'),
  areas: z.array(z.string()).min(1),
  destaque: z.boolean().default(false),
  /** Modelo com dados sintéticos, e não trabalho real anonimizado. */
  demonstracao: z.boolean().default(false),
  contexto: texto('contexto'),
  atuacao: texto('atuacao'),
  resultado: texto('resultado'),
  tecnologias: z.array(texto('tecnologias')).min(2),
  /** Link opcional para ver o exemplo visual ligado ao projeto. */
  link: z.object({ href: z.string().startsWith('/'), rotulo: texto('link.rotulo') }).optional(),
});

export const principioSchema = z.object({
  id: z.string(),
  numero: z.number().int().min(1).max(8),
  nome: texto('nome'),
  descricao: texto('descricao'),
});

export const servicoSchema = z.object({
  id: z.string(),
  ordem: z.number().int(),
  nome: texto('nome'),
  resultado: texto('resultado'),
  entra: z.array(texto('entra')).min(3),
  naoEntra: z.array(texto('naoEntra')).min(1),
});

export const stackSchema = z.object({
  id: z.string(),
  ordem: z.number().int(),
  area: texto('area'),
  itens: z.array(texto('itens')).min(3),
});

export type Solucao = z.infer<typeof solucaoSchema>;
export type Projeto = z.infer<typeof projetoSchema>;

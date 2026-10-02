import { z } from 'astro/zod';

/**
 * Validação do conteúdo. Roda em todo `astro build` e `astro dev`:
 * um case fora do padrão derruba o build em vez de ir para o ar.
 */

const texto = (campo: string) => z.string().trim().min(1, `${campo} não pode ficar vazio`);

const itemTexto = z.object({
  titulo: texto('titulo'),
  texto: texto('texto'),
});

const listaExata = <T extends z.ZodType>(schema: T, n: number, campo: string) =>
  z.array(schema).length(n, `${campo} precisa ter exatamente ${n} itens`);

export const ESTADOS = ['ok', 'atencao', 'alerta'] as const;

const prova = z
  .object({
    tipo: z.enum(['tabela', 'comparativo', 'faixas']),
    titulo: texto('prova.titulo'),
    lead: texto('prova.lead'),
    colunas: z.array(texto('prova.colunas')).min(2),
    linhas: z.array(z.array(z.string())).min(2),
    nota: z.string().trim().optional(),
  })
  .superRefine((p, ctx) => {
    p.linhas.forEach((linha, i) => {
      if (linha.length !== p.colunas.length) {
        ctx.addIssue({
          code: 'custom',
          path: ['linhas', i],
          message: `a linha ${i + 1} tem ${linha.length} células, mas a tabela tem ${p.colunas.length} colunas`,
        });
      }
    });
    if (p.tipo === 'comparativo' && p.colunas.length !== 3) {
      ctx.addIssue({
        code: 'custom',
        path: ['colunas'],
        message: 'o comparativo usa exatamente três colunas: aspecto, antes e depois',
      });
    }
    if (p.tipo === 'faixas') {
      p.linhas.forEach((linha, i) => {
        if (!ESTADOS.includes(linha[1] as (typeof ESTADOS)[number])) {
          ctx.addIssue({
            code: 'custom',
            path: ['linhas', i, 1],
            message: `na prova em faixas, a segunda coluna deve ser um destes estados: ${ESTADOS.join(', ')}`,
          });
        }
      });
    }
  });

export const caseSchema = z
  .object({
    slug: z.string().optional(),
    titulo: texto('titulo'),
    subtitulo: texto('subtitulo').max(160, 'subtitulo: até 160 caracteres'),
    eyebrow: listaExata(texto('eyebrow'), 3, 'eyebrow'),
    tipo: z.enum(['producao', 'demonstracao']),
    ordem: z.number().int(),
    destaque: z.boolean(),
    /** Rascunho aparece em `npm run dev`, mas não vai para o build de produção. */
    rascunho: z.boolean().default(false),
    resumo: texto('resumo').max(140, 'resumo: até 140 caracteres'),

    capacidades: listaExata(texto('capacidades'), 3, 'capacidades'),
    metricas: listaExata(z.object({ valor: texto('metricas.valor'), rotulo: texto('metricas.rotulo') }), 3, 'metricas'),
    disclaimer: texto('disclaimer'),

    problemas: listaExata(itemTexto, 4, 'problemas'),
    construido: listaExata(itemTexto, 4, 'construido'),
    limiteEscopo: texto('limiteEscopo'),

    metodo: z.object({
      fases: listaExata(
        z.object({
          nome: texto('metodo.fases.nome'),
          etapas: z
            .array(z.object({ titulo: texto('etapa.titulo'), detalhe: texto('etapa.detalhe') }))
            .min(2)
            .max(4),
        }),
        3,
        'metodo.fases',
      ),
      teste: texto('metodo.teste'),
    }),

    prova,

    principios: z.array(itemTexto).min(4).max(6).optional(),

    entregaveis: listaExata(
      z.object({
        nome: texto('entregaveis.nome'),
        rotulo: texto('entregaveis.rotulo').regex(/^\S+$/, 'entregaveis.rotulo: uma palavra só'),
        itens: listaExata(texto('entregaveis.itens'), 4, 'entregaveis.itens'),
      }),
      3,
      'entregaveis',
    ),
    melhorEncaixe: z.array(texto('melhorEncaixe')).min(5, 'melhorEncaixe: de 5 a 7 itens').max(7, 'melhorEncaixe: de 5 a 7 itens'),

    seo: z.object({
      title: texto('seo.title').max(60, 'seo.title: até 60 caracteres'),
      description: texto('seo.description')
        .min(140, 'seo.description: entre 140 e 160 caracteres')
        .max(160, 'seo.description: entre 140 e 160 caracteres'),
      ogImage: texto('seo.ogImage').startsWith('/', 'seo.ogImage: caminho absoluto, começando com /'),
    }),
  })
  .superRefine((c, ctx) => {
    if (c.tipo === 'producao' && !c.principios) {
      ctx.addIssue({ code: 'custom', path: ['principios'], message: 'case de produção precisa de 4 a 6 princípios' });
    }
    if (c.tipo === 'demonstracao' && c.principios) {
      ctx.addIssue({
        code: 'custom',
        path: ['principios'],
        message: 'princípios de engenharia só aparecem em case de produção',
      });
    }
  });

export const competenciaSchema = z.object({
  id: z.string(),
  ordem: z.number().int(),
  nome: texto('nome'),
  descricao: texto('descricao'),
  icone: z.enum(['ia', 'camadas', 'automacao', 'visao', 'dados', 'governanca', 'planejamento']),
  casesRelacionados: z.array(z.string()).min(1),
});

export const etapaSchema = z.object({
  id: z.string(),
  numero: z.number().int().min(1).max(8),
  nome: texto('nome'),
  resumo: texto('resumo').max(90, 'resumo da etapa: uma linha, até 90 caracteres'),
  descricao: texto('descricao'),
});

export const servicoSchema = z.object({
  id: z.string(),
  ordem: z.number().int(),
  nome: texto('nome'),
  resultado: texto('resultado'),
  entra: z.array(texto('entra')).min(3),
  naoEntra: z.array(texto('naoEntra')).min(1),
  cases: z.array(z.string()).min(1),
});

export const stackSchema = z.object({
  id: z.string(),
  ordem: z.number().int(),
  area: texto('area'),
  itens: z.array(texto('itens')).min(3),
});

export type Case = z.infer<typeof caseSchema>;
export type Estado = (typeof ESTADOS)[number];

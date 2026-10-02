/** Formatação numérica em pt-BR para os painéis de exemplo. */

const pct1 = new Intl.NumberFormat('pt-BR', { style: 'percent', minimumFractionDigits: 1, maximumFractionDigits: 1 });
const pct2 = new Intl.NumberFormat('pt-BR', { style: 'percent', minimumFractionDigits: 2, maximumFractionDigits: 2 });
const dec2 = new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const dec1 = new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
const inteiro = new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 0 });

/** 1426605 → "US$ 1,43 mi"; 16347655 → "US$ 16,3 mi". */
export function moedaMi(valor: number): string {
  const mi = valor / 1_000_000;
  return `US$ ${mi >= 10 ? dec1.format(mi) : dec2.format(mi)} mi`;
}

export const pct = (v: number) => pct1.format(v);
export const pctFino = (v: number) => pct2.format(v);
export const num = (v: number) => inteiro.format(v);

/** Variação com sinal explícito: 0.3934 → "+39,3%". */
export const variacao = (v: number) => `${v >= 0 ? '+' : '−'}${pct1.format(Math.abs(v))}`;

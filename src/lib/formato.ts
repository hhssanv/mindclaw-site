import { idiomas, type Idioma } from '../i18n';

/** Formatação numérica e de datas dos painéis de exemplo, no idioma da página. */
export function formato(idioma: Idioma) {
  const local = idiomas[idioma].intl;
  const pct1 = new Intl.NumberFormat(local, { style: 'percent', minimumFractionDigits: 1, maximumFractionDigits: 1 });
  const pct2 = new Intl.NumberFormat(local, { style: 'percent', minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const dec2 = new Intl.NumberFormat(local, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const dec1 = new Intl.NumberFormat(local, { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  const inteiro = new Intl.NumberFormat(local, { maximumFractionDigits: 0 });
  const mesCurto = new Intl.DateTimeFormat(local, { month: 'short', timeZone: 'UTC' });
  const mesLongo = new Intl.DateTimeFormat(local, { month: 'long', timeZone: 'UTC' });
  const mesEAno = new Intl.DateTimeFormat(local, { month: 'long', year: 'numeric', timeZone: 'UTC' });
  const pt = idioma === 'pt-BR';

  /** 1426605 → "1,43 mi" / "1.43M"; 16347655 → "16,3 mi" / "16.3M". Sem moeda: rótulos de eixo e de linha. */
  const milhoes = (valor: number, casas?: 1 | 2) => {
    const mi = valor / 1_000_000;
    const n = (casas ?? (mi >= 10 ? 1 : 2)) === 1 ? dec1.format(mi) : dec2.format(mi);
    return pt ? `${n} mi` : `${n}M`;
  };

  return {
    milhoes,
    /** 1426605 → "US$ 1,43 mi" / "$1.43M". */
    moedaMi: (valor: number) => (pt ? `US$ ${milhoes(valor)}` : `$${milhoes(valor)}`),
    /** 1219744 → "US$ 1.219.744" / "$1,219,744". */
    moeda: (valor: number) => (pt ? `US$ ${inteiro.format(valor)}` : `$${inteiro.format(valor)}`),
    pct: (v: number) => pct1.format(v),
    pctFino: (v: number) => pct2.format(v),
    num: (v: number) => inteiro.format(v),
    /** Variação com sinal explícito: 0.3934 → "+39,3%" / "+39.3%". */
    variacao: (v: number) => `${v >= 0 ? '+' : '−'}${pct1.format(Math.abs(v))}`,
    /** Mês 0–11 → "jan" / "Jan" (sem o ponto de abreviação do português). */
    mesCurto: (mes: number, ano: number) => mesCurto.format(Date.UTC(ano, mes, 1)).replace('.', ''),
    /** Mês 0–11 → "janeiro" / "January". */
    mesLongo: (mes: number, ano: number) => mesLongo.format(Date.UTC(ano, mes, 1)),
    /** "julho de 2026" / "July 2026". */
    mesEAno: (mes: number, ano: number) => mesEAno.format(Date.UTC(ano, mes, 1)),
  };
}

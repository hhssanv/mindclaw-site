import { site, urlAbsoluta } from './site';
import { hrefCase, type CaseEntry } from './cases';

/** Dados estruturados mínimos: Person, CreativeWork e BreadcrumbList. Nada além disso. */

export function jsonLdPessoa(areas: string[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: site.pessoa,
    alternateName: site.nome,
    url: site.url,
    email: `mailto:${site.email}`,
    image: urlAbsoluta('/marca/isotipo-480.webp'),
    description: site.posicionamento,
    knowsAbout: areas,
  };
}

export function jsonLdCase(c: CaseEntry) {
  const d = c.data;
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: d.titulo,
    headline: d.titulo,
    abstract: d.subtitulo,
    about: d.eyebrow.map((name) => ({ '@type': 'Thing', name })),
    keywords: d.melhorEncaixe.join(', '),
    inLanguage: site.idioma,
    url: urlAbsoluta(hrefCase(c.id)),
    image: urlAbsoluta(d.seo.ogImage),
    author: { '@type': 'Person', name: site.pessoa, url: site.url },
  };
}

export function jsonLdBreadcrumb(c: CaseEntry) {
  const itens = [
    { nome: 'Início', href: '/' },
    { nome: 'Cases', href: '/cases/' },
    { nome: c.data.titulo, href: hrefCase(c.id) },
  ];
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: itens.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.nome,
      item: urlAbsoluta(item.href),
    })),
  };
}

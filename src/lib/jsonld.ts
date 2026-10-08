import { site, urlAbsoluta } from './site';
import { hrefSolucao, type SolucaoEntry } from './conteudo';
import { textos, type Idioma } from '../i18n';

/** Dados estruturados mínimos: Person, Service e BreadcrumbList, no idioma da página. */

const autor = () => ({ '@type': 'Person', name: site.pessoa, url: site.url });

export function jsonLdPessoa(idioma: Idioma, areas: string[]) {
  const t = textos[idioma].site;
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: site.pessoa,
    alternateName: site.nome,
    url: site.url,
    email: `mailto:${site.email}`,
    image: urlAbsoluta('/marca/hans-spiller-480.webp'),
    description: `${t.trajetoria}. ${t.posicionamento}`,
    knowsAbout: areas,
    ...(site.linkedin ? { sameAs: [site.linkedin] } : {}),
  };
}

export function jsonLdServico(idioma: Idioma, s: SolucaoEntry) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: s.data.titulo,
    description: s.data.chamada,
    serviceType: s.data.titulo,
    url: urlAbsoluta(hrefSolucao(idioma, s)),
    inLanguage: idioma,
    areaServed: { '@type': 'Country', name: textos[idioma].site.pais },
    provider: autor(),
  };
}

export function jsonLdBreadcrumb(itens: { nome: string; href: string }[]) {
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

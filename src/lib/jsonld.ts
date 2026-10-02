import { site, urlAbsoluta } from './site';
import { hrefSolucao, type SolucaoEntry } from './conteudo';

/** Dados estruturados mínimos: Person, Service e BreadcrumbList. */

const autor = () => ({ '@type': 'Person', name: site.pessoa, url: site.url });

export function jsonLdPessoa(areas: string[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: site.pessoa,
    alternateName: site.nome,
    url: site.url,
    email: `mailto:${site.email}`,
    image: urlAbsoluta('/marca/isotipo-480.webp'),
    description: `${site.trajetoria}. ${site.posicionamento}`,
    knowsAbout: areas,
    ...(site.linkedin ? { sameAs: [site.linkedin] } : {}),
  };
}

export function jsonLdServico(s: SolucaoEntry) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: s.data.titulo,
    description: s.data.chamada,
    serviceType: s.data.titulo,
    url: urlAbsoluta(hrefSolucao(s.id)),
    areaServed: { '@type': 'Country', name: 'Brasil' },
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

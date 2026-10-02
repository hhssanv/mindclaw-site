# Headers HTTP de segurança

Aplique estes headers em todas as respostas de produção. Onde configurar depende
da hospedagem (`public/_headers` no Netlify/Cloudflare Pages, `vercel.json` na
Vercel etc.) — o conteúdo é o mesmo.

| Header | Valor recomendado | Para quê |
| --- | --- | --- |
| `Content-Security-Policy` | ver abaixo | Bloqueia scripts injetados (XSS) |
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` | Força HTTPS |
| `X-Content-Type-Options` | `nosniff` | Impede MIME sniffing |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Limita vazamento de URL |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=(), interest-cohort=()` | Desliga APIs não usadas |
| `X-Frame-Options` | `DENY` | Anti-clickjacking (legado; CSP `frame-ancestors` cobre) |
| `Cross-Origin-Opener-Policy` | `same-origin` | Isola a janela |

## CSP inicial (site estático)

```
default-src 'self';
script-src 'self';
style-src 'self';
img-src 'self' data:;
font-src 'self';
connect-src 'self';
form-action 'self';
frame-ancestors 'none';
base-uri 'self';
object-src 'none';
upgrade-insecure-requests
```

Adicione domínios só quando forem realmente necessários (ex.: endpoint do
formulário de contato em `connect-src`/`form-action`). Evite `'unsafe-inline'`
e `'unsafe-eval'`; se o framework exigir scripts inline, prefira nonces ou
hashes.

## Verificação

Depois de publicar, confira em <https://securityheaders.com> e
<https://observatory.mozilla.org>. Meta: nota A ou superior.

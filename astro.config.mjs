// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://hansmindclaw.com',
  trailingSlash: 'always',
  build: {
    // CSS inline em cada página: uma requisição a menos antes do primeiro paint.
    inlineStylesheets: 'always',
  },
  devToolbar: { enabled: false },
});

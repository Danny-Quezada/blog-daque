import { defineConfig } from 'astro/config';
import markdownIntegration from '@astropub/md'
import remarkToc from 'remark-toc';
import node from '@astrojs/node';
// https://astro.build/config
export default defineConfig({
    output : "server",
    integrations:[
        markdownIntegration()
    ],
    markdown: {
        remarkPlugins : [remarkToc],
        render: [
            '@astrojs/markdown-remark',
            {
              syntaxHighlight: 'shiki',
              shikiConfig: {
                theme: 'nord',
                langs: ['js', 'html', 'css', 'astro'],
                wrap: false,
              },
            },
          ],
    },
    adapter: node({
      mode: 'standalone',
    }),
});

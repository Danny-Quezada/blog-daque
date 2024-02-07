import { defineConfig } from 'astro/config';
import markdownIntegration from '@astropub/md';
import remarkToc from 'remark-toc';
import node from '@astrojs/node';

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  output: "server",
  integrations: [markdownIntegration(), react()],
  markdown: {
    remarkPlugins: [remarkToc],
    render: ['@astrojs/markdown-remark', {
      syntaxHighlight: 'shiki',
      shikiConfig: {
        experimentalThemes: {
          light: 'github-light',
          dark: 'github-dark'
        },
        theme: 'dracula',
        langs: ['js', 'html', 'css', 'astro'],
        wrap: false
      }
    }]
  },
  adapter: node({
    mode: 'standalone'
  })
});
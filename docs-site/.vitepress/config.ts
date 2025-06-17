import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'Swivify',
  description: 'Modern Node.js backend toolkit, inspired by Vite',
  themeConfig: {
    logo: '/logo.svg',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
      { text: 'CLI', link: '/cli/' },
      { text: 'Inspector', link: '/inspector/' },
      { text: 'Examples', link: '/examples/' },
      { text: 'DX', link: '/dx/' },
      { text: 'Security', link: '/security/' },
      { text: 'VSCode', link: '/vscode/' },
      { text: 'API', link: '/api/' },
      { text: 'Community', link: '/community/' },
    ],
    sidebar: {
      '/guide/': [
        { text: 'Getting Started', link: '/guide/' },
        { text: 'Features & Plugins', link: '/guide/features' },
        { text: 'Config & Env', link: '/guide/config' },
        { text: 'Recipes', link: '/guide/recipes' },
        { text: 'Advanced Guides', link: '/guide/advanced' },
        { text: 'Migration Guide', link: '/guide/migration' },
        { text: 'FAQ & Troubleshooting', link: '/guide/faq' },
      ],
      '/cli/': [{ text: 'CLI Usage', link: '/cli/' }],
      '/inspector/': [{ text: 'Inspector Dashboard', link: '/inspector/' }],
      '/examples/': [{ text: 'Example Projects', link: '/examples/' }],
      '/dx/': [{ text: 'DX Features', link: '/dx/' }],
      '/security/': [{ text: 'Security Best Practices', link: '/security/' }],
      '/vscode/': [
        { text: 'VSCode Extension', link: '/vscode/' },
        { text: 'Extension Details', link: '/vscode/extension' },
      ],
      '/api/': [
        { text: 'API Reference', link: '/api/' },
        { text: 'Core', link: '/api/core' },
        { text: 'CLI', link: '/api/cli' },
        { text: 'Inspector', link: '/api/inspector' },
        { text: 'Plugins', link: '/api/plugins' },
        { text: 'Templates', link: '/api/templates' },
      ],
      '/community/': [
        { text: 'Community & Contributing', link: '/community/' },
      ],
    },
  },
});

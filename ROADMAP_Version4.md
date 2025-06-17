# Swivify - Roadmap Version 4 (Post-MVP & Advanced Features)

This roadmap lists all remaining and advanced features to complete after the core MVP.

---

## 🟢 High Priority (Recommended Next)

- [x] **Publish CLI to npm**
  - Package CLI as npm bin (swivify)
  - Publish create-swivify for scaffolding
- [x] **Testing & Type Safety**
  - Integrate test runner (Vitest or Jest)
  - Add CLI support: swivify test
  - Support watch mode
  - Enable fast, non-blocking type checking (tsc --noEmit)
  - Show type errors in CLI
- [x] **Linting & formatting**
  - Recommend or pre-integrate ESLint/Prettier
  - Optionally auto-run before build
- [x] **More documentation**
  - Plugin API reference
  - Advanced usage and guides
  - Example projects

## 🟡 Medium Priority (DX & Ecosystem)

- [x] **Add more templates**
  - GraphQL backend starter
  - Fastify backend starter
  - Prisma, etc.
- [x] **Example projects**
  - Add advanced usage and plugin authoring examples in /examples
- [x] **Config auto-reload**
  - Restart dev server when config file changes
- [x] **Live reload UI**
  - Integrate WebSocket for browser reload (SSR scenarios)
  - Provide reload messages or CLI indicators
- [x] **Recipe/Integration system**
  - CLI command to scaffold integrations (e.g., `swivify add docker`, `swivify add prisma`)
- [x] **DX for environment variables**
  - Add conventions for safe env variable exposure or validation

## 🟠 Nice-to-Have / Advanced

- [x] **Routing & middleware conventions**
  - Auto-register routes from a routes/ folder
  - Provide default middleware (logging, error handler, CORS)
- [x] **Monorepo/workspace compatibility**
  - Ensure smooth operation in advanced monorepo environments
  - CLI commands for managing multiple apps/packages
  - Workspace-aware plugin loading
- [x] **Deployment integration**
  - Add plugins or recipes for Docker, Vercel, AWS Lambda, etc.
- [x] **Security best practices**
  - Document and encourage secure defaults: helmet, rate limiting, .env safety
- [x] **Error overlays**
  - Display pretty error overlays or outputs in the terminal
- [x] **Plugin marketplace/registry**
  - Encourage community plugins, or build a simple registry page
- [x] **CLI auto-completion**
  - Generate shell completions for the CLI
- [x] **SSR/frontend, VSCode extension, debug dashboard**
  - Defer to post-MVP or as plugins
- [x] **Advanced HMR/Stateful Reload**
  - Explore state-preserving reloads for advanced users
- [x] **DX for Fullstack/SSR**
  - Helpers for integrating with frontend Vite projects, or SSR utilities

---

# Next Steps

- Prioritize features based on user feedback and project needs
- Use this file as a checklist for contributors and maintainers
- Update as features are completed or new needs arise

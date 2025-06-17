# Swivify Docs Site Structure

- `/site` — React+Vite+Tailwind homepage (main landing page, `/`)
- `/` — VitePress documentation (served at `/docs`)

## How to Run

### React Homepage

```
cd site
npm install
npm run dev
```

Visit http://localhost:5173/

### VitePress Docs

```
npm install
npm run dev
```

Visit http://localhost:5173/docs/

## Deployment

- Deploy both builds together, with `/` for React and `/docs` for VitePress.
- You can use a proxy, static host, or monorepo deploy setup.

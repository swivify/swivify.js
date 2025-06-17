# Swivify Template Example: TypeScript Starter

This is an example of what a single template (TypeScript backend starter) should look like under `/packages/create-swivify/templates/ts/`.

---

## Folder Structure

```
/packages/create-swivify/templates/ts/
├── package.json
├── tsconfig.json
├── src/
│   └── server.ts
├── .env.example
└── README.md
```

---

## Sample File Contents

### package.json

```json name=package.json
{
  "name": "swivify-ts-app",
  "version": "0.0.1",
  "private": true,
  "type": "module",
  "main": "dist/server.js",
  "scripts": {
    "dev": "swivify dev",
    "build": "swivify build",
    "preview": "swivify preview"
  },
  "dependencies": {},
  "devDependencies": {
    "typescript": "^5.0.0"
  }
}
```

---

### tsconfig.json

```json name=tsconfig.json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "Node",
    "esModuleInterop": true,
    "outDir": "dist",
    "rootDir": "src",
    "strict": true,
    "skipLibCheck": true
  },
  "include": ["src"]
}
```

---

### src/server.ts

```typescript name=src/server.ts
import http from 'http';

const PORT = process.env.PORT || 3000;
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello from Swivify TypeScript template!\n');
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
```

---

### .env.example

```dotenv name=.env.example
# Copy this file to .env and set your environment variables
PORT=3000
```

---

### README.md

````markdown name=README.md
# Swivify TypeScript Starter

A minimal Node.js backend powered by Swivify.

## Getting Started

1. Install dependencies:
   ```sh
   npm install
   # or
   pnpm install
   ```
2. Start in development:
   ```sh
   npm run dev
   ```
3. Build for production:

   ```sh
   npm run build
   ```

4. Preview the production build:
   ```sh
   npm run preview
   ```

## Environment Variables

- Copy `.env.example` to `.env` and set your variables as needed.

---

Built with [Swivify](https://github.com/yourname/swivify)
````

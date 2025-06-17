import express, { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import os from 'os';
import fetch from 'node-fetch';
import child_process from 'child_process';

const app = express();
const PORT = process.env.INSPECTOR_PORT
  ? Number(process.env.INSPECTOR_PORT)
  : 4321;

// Allow backend base URL for health checks
const BACKEND_BASE_URL =
  process.env.INSPECTOR_BACKEND_URL || 'http://localhost:3000';
const INSPECTOR_VERSION = '0.0.1'; // Update as needed

// --- Build/Lint/Test Status ---
function getBuildStatus() {
  // Try to read build/lint/test status from logs or status files
  const buildLog = path.resolve(process.cwd(), 'logs', 'build.log');
  const lintLog = path.resolve(process.cwd(), 'logs', 'lint.log');
  const testLog = path.resolve(process.cwd(), 'logs', 'test.log');
  const status = {} as any;
  if (fs.existsSync(buildLog))
    status.build = fs
      .readFileSync(buildLog, 'utf-8')
      .split('\n')
      .slice(-5)
      .join('\n');
  if (fs.existsSync(lintLog))
    status.lint = fs
      .readFileSync(lintLog, 'utf-8')
      .split('\n')
      .slice(-5)
      .join('\n');
  if (fs.existsSync(testLog))
    status.test = fs
      .readFileSync(testLog, 'utf-8')
      .split('\n')
      .slice(-5)
      .join('\n');
  return status;
}

// --- API health check ---
interface ApiHealthResult {
  route: string;
  status: string;
  code?: number;
  time?: number;
}

async function getApiHealth(
  routesByTemplate: { template: string; routes: string[] }[],
  port: number,
): Promise<Record<string, ApiHealthResult>> {
  const results: Record<string, ApiHealthResult> = {};
  for (const tpl of routesByTemplate) {
    for (const route of tpl.routes) {
      const url = `${BACKEND_BASE_URL}/${route}`;
      const start = Date.now();
      try {
        const res = await fetch(url, { method: 'GET', timeout: 2000 });
        results[`${tpl.template}:${route}`] = {
          route: `/${route}`,
          status: res.ok ? 'healthy' : 'error',
          code: res.status,
          time: Date.now() - start,
        };
      } catch (e) {
        results[`${tpl.template}:${route}`] = {
          route: `/${route}`,
          status: 'unreachable',
        };
      }
    }
  }
  return results;
}

// --- API hit monitoring ---
const apiHitCounts: Record<string, number> = {};
app.post('/__inspector/hit', express.json(), (req, res) => {
  const { route } = req.body as { route?: string };
  if (route) {
    apiHitCounts[route] = (apiHitCounts[route] || 0) + 1;
  }
  res.json({ ok: true });
});

// --- Inspector middleware snippets ---
const expressMiddleware = `// Express Inspector middleware\napp.use((req, res, next) => {\n  fetch('http://localhost:4321/__inspector/hit', {\n    method: 'POST',\n    headers: { 'Content-Type': 'application/json' },\n    body: JSON.stringify({ route: req.path })\n  }).catch(() => {});\n  next();\n});`;
const fastifyMiddleware = `// Fastify Inspector middleware\nfastify.addHook('onRequest', async (request, reply) => {\n  try {\n    await fetch('http://localhost:4321/__inspector/hit', {\n      method: 'POST',\n      headers: { 'Content-Type': 'application/json' },\n      body: JSON.stringify({ route: request.routerPath })\n    });\n  } catch {}\n});`;

function getProjectInfo() {
  const pkgPath = path.resolve(process.cwd(), 'package.json');
  if (fs.existsSync(pkgPath)) {
    try {
      const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
      return {
        name: pkg.name,
        version: pkg.version,
        description: pkg.description || '',
      };
    } catch (e) {
      return {
        error: 'Could not parse package.json',
        details: e instanceof Error ? e.message : String(e),
      };
    }
  }
  return { error: 'package.json not found' };
}

function getNodeInfo() {
  return {
    node: process.version,
    platform: process.platform,
    arch: process.arch,
    os: `${os.type()} ${os.release()}`,
    uptime: process.uptime().toFixed(0) + 's',
    pid: process.pid,
  };
}

function getConfig() {
  const configPath = path.resolve(process.cwd(), 'swivify.config.js');
  if (fs.existsSync(configPath)) {
    try {
      return require(configPath).default || {};
    } catch (e) {
      return {
        error: '(error loading config)',
        details: e instanceof Error ? e.message : String(e),
      };
    }
  }
  return {};
}

function getPluginsDetail(): string {
  const config = getConfig();
  if (Array.isArray(config.plugins)) {
    return config.plugins
      .map((p: any, i: number) => {
        const name = p.name || 'anonymous';
        const details = Object.keys(p)
          .filter((k) => k !== 'name' && typeof p[k] !== 'function')
          .map((k) => `${k}: ${JSON.stringify(p[k])}`)
          .join(', ');
        return `<li>${name}${details ? ' (' + details + ')' : ''}</li>`;
      })
      .join('');
  }
  return '<li>(none found)</li>';
}

function getRoutes(): { template: string; routes: string[] }[] {
  // Scan all templates for routes
  const templatesDir = path.resolve(
    process.cwd(),
    'packages',
    'create-swivify',
    'templates',
  );
  if (!fs.existsSync(templatesDir)) return [];
  return fs
    .readdirSync(templatesDir)
    .filter((tpl) =>
      fs.existsSync(path.join(templatesDir, tpl, 'src', 'routes')),
    )
    .map((tpl) => {
      const routesDir = path.join(templatesDir, tpl, 'src', 'routes');
      const routes = fs
        .readdirSync(routesDir)
        .filter((f) => f.endsWith('.ts') || f.endsWith('.js'))
        .map((f) => f.replace(/\.(ts|js)$/, ''));
      return { template: tpl, routes };
    });
}

function getEnvSummary() {
  return {
    count: Object.keys(process.env).length,
    keys: Object.keys(process.env).slice(0, 10), // show first 10 keys
    nodeEnv: process.env.NODE_ENV || 'not set',
  };
}

function getDatabaseInfo() {
  // Scan for Prisma or DB config in templates
  const templatesDir = path.resolve(
    process.cwd(),
    'packages',
    'create-swivify',
    'templates',
  );
  if (!fs.existsSync(templatesDir)) return [];
  return fs.readdirSync(templatesDir).map((tpl) => {
    let db = null;
    let orm = null;
    let schema = null;
    // Check for Prisma
    const prismaSchema = path.join(
      templatesDir,
      tpl,
      'prisma',
      'schema.prisma',
    );
    if (fs.existsSync(prismaSchema)) {
      orm = 'Prisma';
      schema = fs
        .readFileSync(prismaSchema, 'utf-8')
        .split('\n')
        .filter((l) => l.trim().startsWith('model '))
        .map((l) => l.trim().replace('model ', ''));
      db = 'sqlite/postgres/mysql (see schema.prisma)';
    }
    // Check for MongoDB or Postgres in package.json
    const pkgPath = path.join(templatesDir, tpl, 'package.json');
    if (fs.existsSync(pkgPath)) {
      const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
      if (pkg.dependencies) {
        if (pkg.dependencies['mongoose']) {
          db = 'MongoDB';
          orm = 'Mongoose';
        }
        if (pkg.dependencies['pg']) {
          db = 'Postgres';
          orm = pkg.dependencies['drizzle-orm'] ? 'Drizzle ORM' : 'pg';
        }
      }
    }
    return { template: tpl, db, orm, schema };
  });
}

function getProcessInfo() {
  return {
    pid: process.pid,
    memory: (process.memoryUsage().rss / 1024 / 1024).toFixed(1) + ' MB',
    uptime: process.uptime().toFixed(0) + 's',
    cwd: process.cwd(),
  };
}

function getRecentLogs() {
  // Try to read logs/app.log from project root
  const logPath = path.resolve(process.cwd(), 'logs', 'app.log');
  if (fs.existsSync(logPath)) {
    const lines = fs.readFileSync(logPath, 'utf-8').split('\n');
    return lines.slice(-20).join('\n'); // last 20 lines
  }
  return '(No logs found at logs/app.log)';
}

let recentConsoleLogs: string[] = [];
const MAX_CONSOLE_LOGS = 20;
const origStdoutWrite = process.stdout.write.bind(process.stdout);
process.stdout.write = (chunk: any, encoding?: any, cb?: any) => {
  if (typeof chunk === 'string') {
    recentConsoleLogs.push(chunk.trim());
    if (recentConsoleLogs.length > MAX_CONSOLE_LOGS) recentConsoleLogs.shift();
  }
  return origStdoutWrite(chunk, encoding, cb);
};

app.get('/', async (req, res) => {
  const project = getProjectInfo();
  const node = getNodeInfo();
  const config = getConfig();
  const routesByTemplate = getRoutes();
  const envSummary = getEnvSummary();
  const dbInfo = getDatabaseInfo();
  const proc = getProcessInfo();
  const logs = getRecentLogs();
  const consoleLogs = recentConsoleLogs.slice(-MAX_CONSOLE_LOGS).join('<br>');
  const apiHealth = await getApiHealth(routesByTemplate, PORT);
  const buildStatus = getBuildStatus();
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Swivify Inspector Dashboard</title>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
      <style>
        body { background: #f8fafc; }
        .card { margin-bottom: 1.5rem; }
        .badge-healthy { background: #22c55e; }
        .badge-error { background: #ef4444; }
        .badge-unreachable { background: #f59e42; }
        .badge-hit { background: #2563eb; }
        pre { background: #f3f4f6; padding: 1em; border-radius: 6px; }
        .collapsible { cursor: pointer; }
      </style>
    </head>
    <body class="container py-4">
      <h1 class="mb-4">🚦 Swivify Inspector Dashboard <span class="badge bg-secondary">v${INSPECTOR_VERSION}</span></h1>
      <div class="row">
        <div class="col-md-6">
          <div class="card">
            <div class="card-header">Project</div>
            <div class="card-body">
              <b>${project.name || ''}</b> <small>v${project.version || ''}</small><br>${project.description || ''}
            </div>
          </div>
          <div class="card">
            <div class="card-header">Node & Process</div>
            <div class="card-body">
              Node.js: ${node.node} (${node.platform}/${node.arch})<br>
              OS: ${node.os}<br>
              PID: ${node.pid}, Uptime: ${node.uptime}<br>
              Memory: ${proc.memory}<br>
              CWD: ${proc.cwd}
            </div>
          </div>
          <div class="card">
            <div class="card-header">Environment</div>
            <div class="card-body">
              NODE_ENV=${envSummary.nodeEnv}<br>
              ${envSummary.count} vars (first 10: ${envSummary.keys.join(', ')})
              <button class="btn btn-link btn-sm collapsible" type="button" data-bs-toggle="collapse" data-bs-target="#envVars">Show All</button>
              <div class="collapse" id="envVars"><pre>${JSON.stringify(process.env, null, 2)}</pre></div>
            </div>
          </div>
          <div class="card">
            <div class="card-header">Loaded Plugins</div>
            <div class="card-body">
              <ul>${getPluginsDetail()}</ul>
            </div>
          </div>
          <div class="card">
            <div class="card-header">Build/Lint/Test Status</div>
            <div class="card-body">
              <b>Build:</b> <pre>${buildStatus.build || 'No build log found.'}</pre>
              <b>Lint:</b> <pre>${buildStatus.lint || 'No lint log found.'}</pre>
              <b>Test:</b> <pre>${buildStatus.test || 'No test log found.'}</pre>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="card">
            <div class="card-header">Templates & Routes</div>
            <div class="card-body">
              <ul>
                ${
                  routesByTemplate.length
                    ? routesByTemplate
                        .map(
                          (tpl) =>
                            `<li><b>${tpl.template}</b>: ${
                              tpl.routes.length
                                ? tpl.routes
                                    .map((route) => {
                                      const health =
                                        apiHealth[`${tpl.template}:${route}`];
                                      let badge = '';
                                      if (health) {
                                        if (health.status === 'healthy')
                                          badge = `<span class='badge badge-healthy ms-2'>Healthy (${health.code}, ${health.time}ms)</span>`;
                                        else if (health.status === 'error')
                                          badge = `<span class='badge badge-error ms-2'>Error (${health.code})</span>`;
                                        else
                                          badge = `<span class='badge badge-unreachable ms-2'>Unreachable</span>`;
                                      }
                                      const hits =
                                        apiHitCounts[`/${route}`] || 0;
                                      const hitBadge = hits
                                        ? `<span class='badge badge-hit ms-2'>Hits: ${hits}</span>`
                                        : '';
                                      return `${route} ${badge} ${hitBadge}`;
                                    })
                                    .join(', ')
                                : '(none found)'
                            }</li>`,
                        )
                        .join('')
                    : '(none found)'
                }
              </ul>
            </div>
          </div>
          <div class="card">
            <div class="card-header">Database/ORM</div>
            <div class="card-body">
              <ul>
                ${dbInfo.length ? dbInfo.map((tpl) => `<li><b>${tpl.template}</b>: ${tpl.db || '(none)'}${tpl.orm ? ' via ' + tpl.orm : ''}${tpl.schema && tpl.schema.length ? ' (models: ' + tpl.schema.join(', ') + ')' : ''}</li>`).join('') : '(none found)'}
              </ul>
            </div>
          </div>
          <div class="card">
            <div class="card-header">Config</div>
            <div class="card-body">
              <pre>${JSON.stringify(config, null, 2)}</pre>
            </div>
          </div>
          <div class="card">
            <div class="card-header">Recent logs (logs/app.log)</div>
            <div class="card-body">
              <pre>${logs}</pre>
            </div>
          </div>
          <div class="card">
            <div class="card-header">Recent Inspector console output</div>
            <div class="card-body">
              <pre>${consoleLogs}</pre>
            </div>
          </div>
          <div class="card">
            <div class="card-header">Inspector Middleware Snippets</div>
            <div class="card-body">
              <b>Express:</b>
              <pre>${expressMiddleware}</pre>
              <b>Fastify:</b>
              <pre>${fastifyMiddleware}</pre>
            </div>
          </div>
          <div class="card">
            <div class="card-header">Module Graph <span class="badge bg-info">Beta</span></div>
            <div class="card-body">
              <pre id="module-graph">Loading...</pre>
            </div>
          </div>
          <div class="card">
            <div class="card-header">API Endpoints <span class="badge bg-info">Beta</span></div>
            <div class="card-body">
              <pre id="api-endpoints">Loading...</pre>
            </div>
          </div>
          <div class="card">
            <div class="card-header">Error Overlay <span class="badge bg-danger">Live</span></div>
            <div class="card-body">
              <pre id="error-overlay">Loading...</pre>
            </div>
          </div>
        </div>
      </div>
      <footer class="mt-4 text-center text-muted">
        <a href="https://github.com/your-org/swivify" target="_blank">Swivify Docs</a> |
        <a href="https://github.com/your-org/swivify/releases" target="_blank">Inspector Updates</a>
        <br>Edit <code>packages/inspector/src/index.ts</code> to expand the dashboard.
      </footer>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
      <script>
        // Fetch and display module graph
        fetch('/__inspector/module-graph').then(r => r.json()).then(data => {
          document.getElementById('module-graph').textContent = JSON.stringify(data, null, 2);
        });
        // Fetch and display API endpoints
        fetch('/__inspector/api-endpoints').then(r => r.json()).then(data => {
          document.getElementById('api-endpoints').textContent = JSON.stringify(data, null, 2);
        });
        // Fetch and display error overlay
        fetch('/__inspector/error-overlay').then(r => r.json()).then(data => {
          document.getElementById('error-overlay').textContent = JSON.stringify(data.errors, null, 2);
        });
      </script>
    </body>
    </html>
  `);
});

// --- Module Graph Endpoint ---
app.get('/__inspector/module-graph', (req, res) => {
  // Placeholder: In a real system, analyze imports/exports for a module graph
  // Here, just return a static example
  res.json({
    nodes: [
      { id: 'server.ts', label: 'server.ts' },
      { id: 'routes.ts', label: 'routes.ts' },
      { id: 'auth.ts', label: 'auth.ts' },
    ],
    edges: [
      { from: 'server.ts', to: 'routes.ts' },
      { from: 'server.ts', to: 'auth.ts' },
    ],
  });
});

// --- API Endpoints Listing ---
app.get('/__inspector/api-endpoints', (req, res) => {
  const routesByTemplate = getRoutes();
  res.json(routesByTemplate);
});

// --- Error Overlay (Inspector endpoint) ---
app.get('/__inspector/error-overlay', (req, res) => {
  // Placeholder: In a real system, collect recent errors from logs or memory
  res.json({
    errors: recentConsoleLogs
      .filter((l) => l.toLowerCase().includes('error'))
      .slice(-5),
  });
});

app.listen(PORT, () => {
  console.log(`Swivify Inspector running at http://localhost:${PORT}`);
});

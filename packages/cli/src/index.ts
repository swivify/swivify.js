#!/usr/bin/env node
import { Command } from 'commander';
// eslint-disable-next-line n/no-missing-import -- monorepo import, false positive
import { loadPlugins, runHook, SwivifyPlugin } from '@swivify/core';
// eslint-disable-next-line n/no-missing-import -- local import, false positive
import { log } from './logger.js';
import fs from 'fs';
import path from 'path';
import chokidar from 'chokidar';
import { spawn, ChildProcess } from 'child_process';
import esbuild from 'esbuild';
import dotenv from 'dotenv';

const program = new Command();
program
  .name('swivify')
  .description('Swivify - Modern Node.js backend toolkit')
  .version('0.1.0');

// --- Load .env file support ---
try {
  dotenv.config();
  log.info('Loaded environment variables from .env');
} catch {
  // dotenv not installed or .env not present
}

// --- Project config loader ---
async function loadProjectConfig() {
  const cwd = process.cwd();
  const jsConfig = path.join(cwd, 'project.config.js');
  let config = {};
  if (fs.existsSync(jsConfig)) {
    config = await import(jsConfig);
    log.success('Loaded config from project.config.js');
  } else {
    log.warn(
      'No project.config.js found. Only .js config is supported in ESM CLI.',
    );
  }
  return config;
}

// Example: load config at startup
let projectConfig = {};
loadProjectConfig().then((cfg) => {
  projectConfig = cfg;
});

// Pass projectConfig to commands as needed

// --- Plugin system integration ---
const plugins: SwivifyPlugin[] = loadPlugins(projectConfig);

// Example: run onStart for all plugins at CLI startup
runHook(plugins, 'onStart');

program
  .command('dev')
  .description('Start the dev server with file watching and hot reload')
  .action(() => {
    log.info('Starting dev server...');
    runHook(plugins, 'onStart');
    // --- Dev server with file watching and restart ---
    let serverProcess: ChildProcess | null = null;
    const entry = path.resolve(process.cwd(), 'src/server.ts');
    if (!fs.existsSync(entry)) {
      log.error(
        'Entry file src/server.ts not found. Please create it to use dev mode.',
      );
      process.exit(1);
    }
    function startServer() {
      if (serverProcess) {
        serverProcess.kill();
      }
      serverProcess = spawn(
        process.execPath,
        ['--loader', 'ts-node/esm', entry],
        { stdio: 'inherit' },
      );
    }
    // Initial start
    startServer();

    // Watch for changes in src/
    const watcher = chokidar.watch('src', { ignoreInitial: true });
    watcher.on('all', (event: string, filePath: string) => {
      log.warn(`[swivify] File changed: ${filePath}. Restarting server...`);
      startServer();
    });

    function exitWithCode(code: number = 0) {
      // eslint-disable-next-line n/no-process-exit -- CLI tool, exiting intentionally
      process.exit(code);
    }

    process.on('SIGINT', () => {
      watcher.close();
      if (serverProcess) serverProcess.kill();
      exitWithCode();
    });
  });

program
  .command('build')
  .description('Bundle the app for production')
  .action(async () => {
    log.info('Building for production...');
    runHook(plugins, 'onBuild');
    const entry = path.resolve(process.cwd(), 'src/server.ts');
    if (!fs.existsSync(entry)) {
      log.error(
        'Entry file src/server.ts not found. Please create it to use build mode.',
      );
      process.exit(1);
    }
    try {
      await esbuild.build({
        entryPoints: [entry],
        bundle: true,
        platform: 'node',
        target: ['node18'],
        outfile: path.resolve(process.cwd(), 'dist/server.js'),
        sourcemap: true,
        external: [], // Add external dependencies if needed
      });
      log.success('Build complete. Output: dist/server.js');
    } catch (err) {
      log.error('Build failed:');
      log.error(err instanceof Error ? err.stack || err.message : String(err));
      process.exit(1);
    }
  });

program
  .command('preview')
  .description('Preview the production build')
  .action(() => {
    log.info('Previewing production build...');
    const entry = path.resolve(process.cwd(), 'dist/server.js');
    if (!fs.existsSync(entry)) {
      log.error(
        'Build output dist/server.js not found. Please run build first.',
      );
      process.exit(1);
    }
    const serverProcess: ChildProcess = spawn(entry, [], {
      stdio: 'inherit',
    });
    serverProcess.on('exit', (code) => {
      process.exit(code ?? 0);
    });
    process.on('SIGINT', () => {
      serverProcess.kill();
      process.exit();
    });
  });

// Ensure exit code 0 when showing help (no command provided)
if (!process.argv.slice(2).length) {
  program.outputHelp();
  // eslint-disable-next-line n/no-process-exit -- CLI tool, exiting intentionally
  process.exit(0);
}

program.parse(process.argv);

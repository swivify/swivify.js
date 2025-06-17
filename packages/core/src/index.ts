import fs from 'fs';
import path from 'path';
import chokidar from 'chokidar';

export function helloCore() {
  return 'Hello from Swivify Core!';
}

// --- Swivify Plugin System ---
/**
 * SwivifyPlugin defines the contract for all Swivify plugins.
 * Plugins can hook into various lifecycle events and extend the system.
 */
export interface SwivifyPlugin {
  /** Unique plugin name */
  name: string;
  /** Called before the main process starts */
  beforeStart?: () => void | Promise<void>;
  /** Called when the main process starts */
  onStart?: () => void | Promise<void>;
  /** Called after the main process starts */
  afterStart?: () => void | Promise<void>;
  /** Called before build */
  beforeBuild?: () => void | Promise<void>;
  /** Called on build */
  onBuild?: () => void | Promise<void>;
  /** Called after build */
  afterBuild?: () => void | Promise<void>;
  /** Called on restart (e.g., HMR) */
  onRestart?: () => void | Promise<void>;
  /** Called on dev server start */
  onDev?: () => void | Promise<void>;
  /** Called when config is loaded */
  onConfig?: (config: Record<string, any>) => void | Promise<void>;
  /** Called to validate config; return true or error string */
  onValidateConfig?: (
    config: Record<string, any>,
  ) => boolean | string | Promise<boolean | string>;
  /** Called to load plugin-specific resources */
  onLoad?: (context: any) => void | Promise<void>;
  /** Called on error; receives error object */
  onError?: (error: Error) => void | Promise<void>;
}

/**
 * Loads plugins from config.
 */
export function loadPlugins(config: {
  plugins?: SwivifyPlugin[];
}): SwivifyPlugin[] {
  return Array.isArray(config.plugins) ? config.plugins : [];
}

/**
 * Runs a lifecycle hook for all plugins.
 */
export async function runHook(
  plugins: SwivifyPlugin[],
  hook: keyof SwivifyPlugin,
  ...args: any[]
) {
  for (const plugin of plugins) {
    if (typeof plugin[hook] === 'function') {
      try {
        await (plugin[hook] as (...args: any[]) => any)?.(...args);
      } catch (error) {
        if (typeof plugin.onError === 'function') {
          await plugin.onError(error as Error);
        } else {
          throw error;
        }
      }
    }
  }
}

/**
 * Validates plugin configs and returns an array of error messages.
 */
export async function validatePluginsConfig(
  plugins: SwivifyPlugin[],
  config: any,
): Promise<string[]> {
  const errors: string[] = [];
  for (const plugin of plugins) {
    if (typeof plugin.onValidateConfig === 'function') {
      const result = await plugin.onValidateConfig(config);
      if (result !== true) {
        errors.push(
          typeof result === 'string'
            ? `[${plugin.name}] ${result}`
            : `[${plugin.name}] Invalid config.`,
        );
      }
    }
  }
  return errors;
}

/**
 * Loads environment variables from multiple .env files and supports prefixing.
 * @param envConfig Object with env file paths or array of paths, and optional prefix.
 */
export function loadEnv(
  envConfig: string | string[] | { files: string[]; prefix?: string },
) {
  let files: string[] = [];
  let prefix = '';
  if (typeof envConfig === 'string') {
    files = [envConfig];
  } else if (Array.isArray(envConfig)) {
    files = envConfig;
  } else if (typeof envConfig === 'object' && envConfig.files) {
    files = envConfig.files;
    prefix = envConfig.prefix || '';
  }
  for (const file of files) {
    const envPath = path.resolve(process.cwd(), file);
    if (fs.existsSync(envPath)) {
      const lines = fs.readFileSync(envPath, 'utf-8').split('\n');
      for (const line of lines) {
        const match = line.match(/^([A-Z0-9_]+)=(.*)$/);
        if (match) {
          const key = prefix ? `${prefix}${match[1]}` : match[1];
          if (!process.env[key]) {
            process.env[key] = match[2];
          }
        }
      }
    }
  }
}

/**
 * Starts a file watcher for HMR/live reload. Calls onRestart hooks on change.
 * @param plugins Array of SwivifyPlugin
 * @param watchPaths Array of paths to watch
 */
export function startHMR(
  plugins: SwivifyPlugin[],
  watchPaths: string[] = ['src'],
) {
  const watcher = chokidar.watch(watchPaths, { ignoreInitial: true });
  watcher.on('all', async () => {
    await runHook(plugins, 'onRestart');
    console.log('[Swivify] HMR: Restarted due to file change.');
  });
  return watcher;
}

/**
 * SSR/middleware helper: wraps a handler for SSR.
 */
export function ssrHandler(handler: (req: any, res: any) => void) {
  return (req: any, res: any, next: () => void) => {
    if (req.url.startsWith('/ssr')) {
      handler(req, res);
    } else {
      next();
    }
  };
}

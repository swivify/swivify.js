// Example: How to load and run Swivify plugins with hooks
import config from './swivify.config.js';
import { loadPlugins, runHook, validatePluginsConfig } from './packages/core/src/index.js';

async function main() {
    const plugins = loadPlugins(config);

    // Validate plugin config
    const errors = await validatePluginsConfig(plugins, config);
    if (errors.length > 0) {
        console.error('Plugin config errors:', errors);
        process.exit(1);
    }

    // Run lifecycle hooks
    await runHook(plugins, 'onStart');
    await runHook(plugins, 'onBuild');
    // ...run other hooks as needed
}

main();

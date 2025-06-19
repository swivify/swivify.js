#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import readline from 'readline';
import { spawnSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function prompt(question: string): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) =>
    rl.question(question, (ans) => {
      rl.close();
      resolve(ans);
    }),
  );
}

function copyDir(src: string, dest: string) {
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

async function main() {
  const templatesDir = path.resolve(__dirname, '../templates');
  const availableTemplates = fs
    .readdirSync(templatesDir)
    .filter((f) => fs.statSync(path.join(templatesDir, f)).isDirectory());

  let targetDir = process.argv[2];
  let template = process.argv[3];

  if (!targetDir) {
    targetDir = await prompt('Project directory name: ');
  }
  if (!template || !availableTemplates.includes(template)) {
    console.log('Available templates:', availableTemplates.join(', '));
    template = await prompt('Template to use: ');
    if (!availableTemplates.includes(template)) {
      console.error(`Template '${template}' not found.`);
      process.exit(1);
    }
  }

  // Interactive DB selection for backend templates
  const dbTemplates = {
    rest: ['rest-postgres', 'rest-mongodb'],
    graphql: ['graphql-prisma'],
    express: ['express', 'express-prisma'],
  };
  if (Object.keys(dbTemplates).includes(template)) {
    const dbChoices = dbTemplates[template as keyof typeof dbTemplates];
    let dbChoice = dbChoices[0];
    if (dbChoices.length > 1) {
      dbChoice = await prompt(`Select database (${dbChoices.join('/')}): `);
      if (!dbChoices.includes(dbChoice)) {
        console.error(`Database option '${dbChoice}' not supported.`);
        process.exit(1);
      }
    }
    template = dbChoice;
  }

  // Interactive feature selection
  const featureTemplates = {
    'rest-postgres': ['auth', 'file-upload'],
    'rest-mongodb': ['auth', 'file-upload'],
    'graphql-prisma': ['auth', 'file-upload'],
    'express-prisma': ['auth', 'file-upload'],
    // Add more templates and features as needed
  };
  let selectedFeatures: string[] = [];
  const featureTemplateKeys = Object.keys(featureTemplates) as Array<
    keyof typeof featureTemplates
  >;
  if (featureTemplateKeys.includes(template as keyof typeof featureTemplates)) {
    const features =
      featureTemplates[template as keyof typeof featureTemplates];
    const featurePrompt = `Select features to include (comma separated, options: ${features.join(
      ', ',
    )}), or leave blank for none: `;
    const featureInput = await prompt(featurePrompt);
    if (featureInput.trim()) {
      selectedFeatures = featureInput
        .split(',')
        .map((f) => f.trim())
        .filter((f) => features.includes(f));
    }
  }

  // --- Recipe/Integration selection ---
  const availableRecipes = ['docker', 'ci-cd', 'cloud'];
  const recipePrompt = `Select integrations to include (comma separated, options: ${availableRecipes.join(
    ', ',
  )}), or leave blank for none: `;
  const recipeInput = await prompt(recipePrompt);
  let selectedRecipes: string[] = [];
  if (recipeInput.trim()) {
    selectedRecipes = recipeInput
      .split(',')
      .map((r) => r.trim())
      .filter((r) => availableRecipes.includes(r));
  }

  // Fullstack template special handling
  if (template === 'fullstack') {
    const frontendChoices = ['react', 'vue', 'svelte'];
    let frontend = await prompt(
      `Frontend framework (${frontendChoices.join('/')}): `,
    );
    if (!frontendChoices.includes(frontend)) {
      console.error(`Frontend '${frontend}' not supported.`);
      process.exit(1);
    }
    let backendFolder = await prompt(
      'Backend folder name (default: backend): ',
    );
    if (!backendFolder) backendFolder = 'backend';
    let frontendFolder = await prompt(
      'Frontend folder name (default: frontend): ',
    );
    if (!frontendFolder) frontendFolder = 'frontend';

    // Scaffold backend
    const backendTemplateDir = path.join(templatesDir, 'ts');
    const backendDestDir = path.resolve(
      process.cwd(),
      targetDir,
      backendFolder,
    );
    copyDir(backendTemplateDir, backendDestDir);

    // Scaffold frontend using Vite official template
    const viteTemplate = `${frontend}-ts`;
    const frontendDestDir = path.resolve(
      process.cwd(),
      targetDir,
      frontendFolder,
    );
    console.log(`Scaffolding frontend with Vite (${viteTemplate})...`);
    spawnSync(
      'npm',
      [
        'create',
        'vite@latest',
        frontendFolder,
        '--',
        '--template',
        viteTemplate,
      ],
      {
        cwd: path.resolve(process.cwd(), targetDir),
        stdio: 'inherit',
        shell: true,
      },
    );

    // Print next steps
    console.log(
      `\nFullstack project created at ${path.resolve(process.cwd(), targetDir)}`,
    );
    console.log('Next steps:');
    console.log(`  cd ${targetDir}`);
    console.log(
      `  cd ${backendFolder} && npm install && npm run dev # in one terminal`,
    );
    console.log(
      `  cd ${frontendFolder} && npm install && npm run dev # in another terminal`,
    );
    return;
  }

  const templateDir = path.join(templatesDir, template);
  const destDir = path.resolve(process.cwd(), targetDir);
  copyDir(templateDir, destDir);

  // Copy selected features if present
  if (selectedFeatures.length > 0) {
    const featuresDir = path.join(templateDir, 'features');
    const destFeaturesDir = path.join(destDir, 'src', 'features');
    if (fs.existsSync(featuresDir)) {
      if (!fs.existsSync(destFeaturesDir))
        fs.mkdirSync(destFeaturesDir, { recursive: true });
      for (const feature of selectedFeatures) {
        const featurePath = path.join(featuresDir, feature);
        if (fs.existsSync(featurePath)) {
          copyDir(featurePath, path.join(destFeaturesDir, feature));
        }
      }
    }
    console.log(`Included features: ${selectedFeatures.join(', ')}`);
  }

  // Copy selected recipes/integrations
  if (selectedRecipes.length > 0) {
    const recipesDir = path.join(templatesDir, '_recipes');
    for (const recipe of selectedRecipes) {
      const recipePath = path.join(recipesDir, recipe);
      if (fs.existsSync(recipePath)) {
        copyDir(recipePath, destDir);
        console.log(`Included integration: ${recipe}`);
      }
    }
  }

  console.log(`\nProject created at ${destDir}`);
  console.log('Next steps:');
  console.log(`  cd ${targetDir}`);
  console.log('  npm install');
  console.log('  npm run dev');

  // Always scaffold a starter swivify.config.js in the new project
  const configPath = path.join(destDir, 'swivify.config.js');
  if (!fs.existsSync(configPath)) {
    fs.writeFileSync(configPath, `export default {\n  plugins: [],\n};\n`);
    console.log('Scaffolded swivify.config.js');
  }
}

// --- CLI Auto-completion Stub ---
if (process.argv.includes('--generate-completion')) {
  // Output a simple bash completion script (stub)
  console.log(`_swivify_complete() {
  COMPREPLY=( $(compgen -W "create build dev test" -- \"\${COMP_WORDS[1]}\") )
}
complete -F _swivify_complete swivify`);
  process.exit(0);
}

main();

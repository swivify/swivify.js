import { describe, it, expect } from 'vitest';
import { execa } from 'execa';
import path from 'path';
import fs from 'fs';

const CLI_PATH = path.resolve(__dirname, 'index.ts');
const SERVER_PATH = path.resolve(__dirname, 'server.ts');
const DIST_PATH = path.resolve(__dirname, '../dist/server.js');

describe('swivify CLI', () => {
  it('shows help output with no arguments', async () => {
    const { stdout, exitCode } = await execa(
      'node',
      ['--loader', 'ts-node/esm', CLI_PATH],
      { reject: false },
    );
    expect(stdout).toMatch(/Swivify - Modern Node.js backend toolkit/);
    expect(exitCode).toBe(0);
  });

  it('shows error for unknown command', async () => {
    const { stdout, stderr, exitCode } = await execa(
      'node',
      ['--loader', 'ts-node/esm', CLI_PATH, 'unknowncmd'],
      { reject: false },
    );
    expect(stdout + stderr).toMatch(/Unknown command/i);
    expect(exitCode).not.toBe(0);
  });

  it('errors if src/server.ts is missing for dev', async () => {
    if (fs.existsSync(SERVER_PATH))
      fs.renameSync(SERVER_PATH, SERVER_PATH + '.bak');
    const { stdout, stderr, exitCode } = await execa(
      'node',
      ['--loader', 'ts-node/esm', CLI_PATH, 'dev'],
      { reject: false },
    );
    expect(stdout + stderr).toMatch(/Entry file src\/server\.ts not found/);
    expect(exitCode).toBe(1);
    if (fs.existsSync(SERVER_PATH + '.bak'))
      fs.renameSync(SERVER_PATH + '.bak', SERVER_PATH);
  });

  it('errors if src/server.ts is missing for build', async () => {
    if (fs.existsSync(SERVER_PATH))
      fs.renameSync(SERVER_PATH, SERVER_PATH + '.bak');
    const { stdout, stderr, exitCode } = await execa(
      'node',
      ['--loader', 'ts-node/esm', CLI_PATH, 'build'],
      { reject: false },
    );
    expect(stdout + stderr).toMatch(/Entry file src\/server\.ts not found/);
    expect(exitCode).toBe(1);
    if (fs.existsSync(SERVER_PATH + '.bak'))
      fs.renameSync(SERVER_PATH + '.bak', SERVER_PATH);
  });

  it('errors if dist/server.js is missing for preview', async () => {
    if (fs.existsSync(DIST_PATH)) fs.renameSync(DIST_PATH, DIST_PATH + '.bak');
    const { stdout, stderr, exitCode } = await execa(
      'node',
      ['--loader', 'ts-node/esm', CLI_PATH, 'preview'],
      { reject: false },
    );
    expect(stdout + stderr).toMatch(/Build output dist\/server\.js not found/);
    expect(exitCode).toBe(1);
    if (fs.existsSync(DIST_PATH + '.bak'))
      fs.renameSync(DIST_PATH + '.bak', DIST_PATH);
  });
});

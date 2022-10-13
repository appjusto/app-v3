/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const { spawn, spawnSync } = require('child_process');
const { version } = require('../version.json');
const { ENV, FLAVOR } = process.env;

// Usage: ENV=staging FLAVOR=courier npm run update

const run = async () => {
  if (!ENV) {
    console.error('ENV indefinido');
    process.exit(-1);
  }

  if (!FLAVOR) {
    console.error('FLAVOR indefinido');
    process.exit(-1);
  }

  // update .env
  spawnSync('cp', [`.${ENV}.env`, '.env']);

  // check current branch
  const { stdout } = spawnSync('git', ['rev-parse', '--abbrev-ref', 'HEAD']);
  const branch = stdout.toString().trim();
  if (branch !== ENV) {
    console.warn(`Atenção: a branch atual (${branch}) não é a branch do ambiente ${ENV}.`);
    await new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });
  }

  // update
  const channel = `v${version.slice(0, version.indexOf('.'))}`;
  spawnSync('npm', ['run', 'prepare-env']);
  spawn('eas', ['update', '--branch', channel], {
    stdio: 'inherit',
  });
};

run()
  .then(() => null)
  .catch(console.error);

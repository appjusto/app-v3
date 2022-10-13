/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const { spawn, spawnSync } = require('child_process');
const { version } = require('../version.json');
const { ENV, FLAVOR, PLATFORM, DISTRIBUTION } = process.env;
// require('dotenv').config();

// Usage: ENV=dev FLAVOR=courier npm run build
// Usage: ENV=staging FLAVOR=courier PLATFORM=ios npm run build
// Usage: ENV=live FLAVOR=courier DISTRIBUTION=store npm run build

const run = async () => {
  if (!ENV) {
    console.error('ENV indefinido');
    process.exit(-1);
  }

  if (!FLAVOR) {
    console.error('FLAVOR indefinido');
    process.exit(-1);
  }

  if (!PLATFORM) {
    console.warn('PLATFORM não definido: usando android');
  }

  // check current branch
  const { stdout } = spawnSync('git', ['rev-parse', '--abbrev-ref', 'HEAD']);
  const branch = stdout.toString().trim();
  if (branch !== ENV) {
    console.warn(`Atenção: a branch atual (${branch}) não é a branch do ambiente ${ENV}.`);
    await new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });
  }
  // update .env
  spawnSync('cp', [`.${ENV}.env`, '.env']);
  // build
  const channel = `v${version.slice(0, version.indexOf('.'))}`;
  const platform = PLATFORM ?? 'android';
  const distribution = DISTRIBUTION ?? 'internal';
  const profile = `${FLAVOR}-${channel}-${distribution}-${ENV}`;
  spawn('eas', ['build', '--platform', platform, '--profile', profile], {
    stdio: 'inherit',
  });
};

run()
  .then(() => null)
  .catch(console.error);

const chalk = require('chalk');
const semver = require('semver');

const fs = require('node:fs');

const nodeVersion = process.version;
const requiredNodeVersion = fs.readFileSync('.nvmrc', 'utf8');

const nodeVersionOk = semver.satisfies(nodeVersion, requiredNodeVersion);

if (!nodeVersionOk) {
  console.error(`
    Your ${chalk.magenta('Node')} version: ${chalk.red(nodeVersion)}
    You should be using ${chalk.magenta('Node')} version which satisfies: ${chalk.green(`${requiredNodeVersion}`)}
    If you have ${chalk.magenta('nvm')} installed, you can run <${chalk.magenta('nvm use')}> to quickly switch to this project's node version.
  `);
  process.exit(1);
}

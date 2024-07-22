import chalk from 'chalk';
import { cosmiconfigSync } from 'cosmiconfig';
import { loadConfig } from './customLoader.js';

const configLoader = cosmiconfigSync('tool', {
  loaders: {
    '.js': loadConfig,
    '.mjs': loadConfig
  }
});

export default async function getConfig() {

  const result = await configLoader.search(process.cwd());
  if (!result) {
    console.log(chalk.yellow('Could not find configuration, using default'));
    return { port: 1234 };
  } else {
    console.log('Found configuration', result.config);
    return result.config;
  }
}


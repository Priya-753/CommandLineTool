import { cosmiconfigSync } from 'cosmiconfig';
import { loadConfig } from './customLoader.js';
import { createLogger } from './logger.js';

export default async function getConfig() {

  const configLoader = cosmiconfigSync('tool', {
    loaders: {
      '.js': loadConfig,
      '.mjs': loadConfig
    }
  });


  const logger = createLogger('config:mgr');

  const result = configLoader.search(process.cwd());
  if (!result) {
    logger.warning('Could not find configuration, using default');
    return { port: 1234 };
  } else {
    logger.debug('Found configuration', await result.config);
    return result.config;
  }
}


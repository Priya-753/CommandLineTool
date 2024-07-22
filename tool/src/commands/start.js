import { createLogger } from "../config/logger.js";

const logger = createLogger('config:mgr');

export function start(config) {
  logger.highlight('  Starting the app  ');
  logger.debug('Received configuration', config);
}


#!/usr/bin/env node

import arg from 'arg';
import chalk from 'chalk';
import { start } from '../src/commands/start.js';
import getConfig from '../src/config/config-mgr.js';
import { createLogger } from '../src/config/logger.js';

const logger = createLogger('config:mgr');

(async () => {
  try {
    const args = arg({
      '--start': Boolean,
      '--build': Boolean,
    });

    logger.debug('Received args', args);

    if (args['--start']) {
      const config = await getConfig(); // Await the Promise if getConfig is async
      start(config);
    } else if (args['--build']) {
      console.log('Building the app...'); // Placeholder for build logic
    } else {
      usage();
    }
  } catch (e) {
    logger.warning(e.message);
    usage();
  }
})();

function usage() {
  console.log(`${chalk.whiteBright('tool [CMD]')}
  ${chalk.greenBright('--start')}\tStarts the app
  ${chalk.greenBright('--build')}\tBuilds the app`);
}

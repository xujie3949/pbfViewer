/* eslint-disable no-console */

import createArgv from './createArgv';

const argv = createArgv(process.argv);

console.log('hello ', argv.n);

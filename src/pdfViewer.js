/* eslint-disable no-console */

import createArgv from './createArgv';

const argv = createArgv();

console.log('hello ', argv.n);

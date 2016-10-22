import yargs from 'yargs';

function createArgv() {
  const argv = yargs
    .option('n', {
      alias: 'name',
      demand: true,
      default: 'tom',
      describe: 'your name',
      type: 'string',
    })
    .command('nodecli', 'say hello to you')
    .usage('Usage: nodecli [options]')
    .example('nodecli -n tom', 'say hello to Tom')
    .help('h')
    .alias('h', 'help')
    .epilog('copyright 2016')
    .argv;

  return argv;
}

export default createArgv;

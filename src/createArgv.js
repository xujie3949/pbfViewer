import yargs from 'yargs';

function createArgv(args) {
  const argv = yargs(args)
    .command('pbfViewer', 'view pbf file data')
    .usage('Usage: pbfViewer [options]')
    .example('pbfViewer --pf d:/test.proto', 'say hello to Tom')
    .help('h')
    .alias('h', 'help')
    .version()
    .alias('v', 'version')
    .epilog('copyright 2016')
    .option('pf', {
      alias: 'protoFile',
      demand: true,
      describe: 'the proto file',
      type: 'string',
    })
    .option('df', {
      alias: 'dataFile',
      demand: true,
      describe: 'the data file',
      type: 'string',
    })
    .argv;

  return argv;
}

export default createArgv;

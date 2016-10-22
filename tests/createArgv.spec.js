import createRewirer from 'babel-rewire-wrapper';
import { spyObject, restoreSinonObject } from './testHelper';
import createArgv from '../src/createArgv';

describe('createArgv测试用例', () => {
  it('应该暴露createArgv函数', () => {
    expect(typeof createArgv).to.equal('function');
  });

  it('createArgv函数应该返回对象', () => {
    const argv = createArgv(['--pf=pf', '--df=df']);
    expect(argv).to.be.ok;
  });

  describe('createArgv内部逻辑测试用例', () => {
    let rewirer = null;
    let sinonObj = null;

    beforeEach(() => {
      const mockYargs = {
        yargs: () => mockYargs,
        option: () => mockYargs,
        command: () => mockYargs,
        usage: () => mockYargs,
        example: () => mockYargs,
        help: () => mockYargs,
        alias: () => mockYargs,
        version: () => mockYargs,
        epilog: () => mockYargs,
      };

      sinonObj = spyObject(mockYargs);

      rewirer = createRewirer();
      rewirer = rewirer.use(createArgv, { yargs: sinonObj.yargs });
      rewirer.rewire();
    });

    afterEach(() => {
      rewirer.resetDependencies();
      restoreSinonObject(sinonObj);
    });

    it('正确调用yargs方法', () => {
      createArgv(['--pf=pf', '--df=df']);
      expect(sinonObj.yargs.callCount).to.equal(1);
      expect(sinonObj.yargs.getCall(0).args[0]).to.deep.equal([
        '--pf=pf',
        '--df=df',
      ]);
    });

    it('正确调用option方法', () => {
      createArgv(['--pf=pf', '--df=df']);
      expect(sinonObj.option.callCount).to.equal(2);
      expect(sinonObj.option.getCall(0).args).to.deep.equal([
        'pf',
        {
          alias: 'protoFile',
          demand: true,
          describe: 'the proto file',
          type: 'string',
        },
      ]);
      expect(sinonObj.option.getCall(1).args).to.deep.equal([
        'df',
        {
          alias: 'dataFile',
          demand: true,
          describe: 'the data file',
          type: 'string',
        },
      ]);
    });

    it('正确调用command方法', () => {
      createArgv();
      expect(sinonObj.command.callCount).to.equal(1);
      expect(sinonObj.command.getCall(0).args).to.deep.equal([
        'pbfViewer',
        'view pbf file data',
      ]);
    });

    it('正确调用usage方法', () => {
      createArgv();
      expect(sinonObj.usage.callCount).to.equal(1);
      expect(sinonObj.usage.getCall(0).args).to.deep.equal([
        'Usage: pbfViewer [options]',
      ]);
    });

    it('正确调用example方法', () => {
      createArgv();
      expect(sinonObj.example.callCount).to.equal(1);
      expect(sinonObj.example.getCall(0).args).to.deep.equal([
        'pbfViewer --pf d:/test.proto',
        'say hello to Tom',
      ]);
    });

    it('正确调用help方法', () => {
      createArgv();
      expect(sinonObj.help.callCount).to.equal(1);
      expect(sinonObj.help.getCall(0).args).to.deep.equal([
        'h',
      ]);
    });

    it('正确调用alias方法', () => {
      createArgv();
      expect(sinonObj.alias.callCount).to.equal(2);
      expect(sinonObj.alias.getCall(0).args).to.deep.equal([
        'h',
        'help',
      ]);
      expect(sinonObj.alias.getCall(1).args).to.deep.equal([
        'v',
        'version',
      ]);
    });

    it('正确调用version方法', () => {
      createArgv();
      expect(sinonObj.version.callCount).to.equal(1);
      expect(sinonObj.version.getCall(0).args).to.empty;
    });

    it('正确调用epilog方法', () => {
      createArgv();
      expect(sinonObj.epilog.callCount).to.equal(1);
      expect(sinonObj.epilog.getCall(0).args).to.deep.equal([
        'copyright 2016',
      ]);
    });
  });
});

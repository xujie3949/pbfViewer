import createRewirer from 'babel-rewire-wrapper';
import { spyObject, restoreSinonObject } from './testHelper';
import createArgv from '../src/createArgv';

describe('createArgv测试用例', () => {
  it('应该暴露createArgv函数', () => {
    expect(typeof createArgv).to.equal('function');
  });

  it('createArgv函数应该返回对象', () => {
    const argv = createArgv();
    expect(argv).to.be.ok;
  });

  describe('createArgv内部逻辑测试用例', () => {
    let rewirer = null;
    let sinonObj = null;

    beforeEach(() => {
      const mockYargs = {
        option: () => mockYargs,
        command: () => mockYargs,
        usage: () => mockYargs,
        example: () => mockYargs,
        help: () => mockYargs,
        alias: () => mockYargs,
        epilog: () => mockYargs,
      };

      sinonObj = spyObject(mockYargs);

      rewirer = createRewirer();
      rewirer = rewirer.use(createArgv, { yargs: mockYargs });
      rewirer.rewire();
    });

    afterEach(() => {
      rewirer.resetDependencies();
      restoreSinonObject(sinonObj);
    });

    it('正确调用yargs.option方法', () => {
      createArgv();
      expect(sinonObj.option.callCount).to.equal(1);
      expect(sinonObj.option.args[0]).to.deep.equal([
        'n',
        {
          alias: 'name',
          demand: true,
          default: 'tom',
          describe: 'your name',
          type: 'string',
        },
      ]);
    });

    it('正确调用yargs.command方法', () => {
      createArgv();
      expect(sinonObj.command.callCount).to.equal(1);
      expect(sinonObj.command.args[0]).to.deep.equal([
        'nodecli',
        'say hello to you',
      ]);
    });

    it('正确调用yargs.usage方法', () => {
      createArgv();
      expect(sinonObj.usage.callCount).to.equal(1);
      expect(sinonObj.usage.args[0]).to.deep.equal([
        'Usage: nodecli [options]',
      ]);
    });

    it('正确调用yargs.example方法', () => {
      createArgv();
      expect(sinonObj.example.callCount).to.equal(1);
      expect(sinonObj.example.args[0]).to.deep.equal([
        'nodecli -n tom',
        'say hello to Tom',
      ]);
    });

    it('正确调用yargs.help方法', () => {
      createArgv();
      expect(sinonObj.help.callCount).to.equal(1);
      expect(sinonObj.help.args[0]).to.deep.equal([
        'h',
      ]);
    });

    it('正确调用yargs.alias方法', () => {
      createArgv();
      expect(sinonObj.alias.callCount).to.equal(1);
      expect(sinonObj.alias.args[0]).to.deep.equal([
        'h',
        'help',
      ]);
    });

    it('正确调用yargs.epilog方法1', () => {
      createArgv();
      expect(sinonObj.epilog.callCount).to.equal(1);
      expect(sinonObj.epilog.args[0]).to.deep.equal([
        'copyright 2016',
      ]);
    });
  });
});

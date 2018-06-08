const serverless = require('./../serverless.test');
const should = require('should');

describe('serverless tests', () => {
  describe('parseArgs should', () => {
    let initalSetU
    let startIndex = 3;
    beforeEach(() => {
      startIndex = 3;
      process.argv = ['',''];
    });

    it('Not return any params', () => {
      serverless.parseArgs(startIndex).should.deepEqual({});
    });

    it('Return one key value param', () => {
      process.argv.push('./action', '--param', 'key', 'val');
      serverless.parseArgs(startIndex).should.deepEqual({ key: 'val' });
    });

    it('Return two key value params', () => {
      process.argv.push('./action', '--param', 'key', 'val', '--param', 'key2', 'val2');
      serverless.parseArgs(startIndex).should.deepEqual({ key: 'val', key2: 'val2' });
    });

    it('return a key with a null value', () => {
      process.argv.push('./action', '--param', 'key');
      serverless.parseArgs(startIndex).should.deepEqual({ key: undefined });
    });

    it('return a key with a null value', () => {
      process.argv.push('./action', '--param', 'key', '--param', 'hello', 'world');
      serverless.parseArgs(startIndex).should.deepEqual({ key: undefined, hello: 'world' });
    });

    it('return params from config file', () => {
      process.argv.push('./action', '--severlessConfig', './tests/config.test.json');
      serverless.parseArgs(startIndex).should.deepEqual({ config: 'test' });
    });

    it('return params from config file and cli params', () => {
      process.argv.push('./action', '--severlessConfig', './tests/config.test.json', '--param', 'extra', 'krispy');
      serverless.parseArgs(startIndex).should.deepEqual({ config: 'test', extra: 'krispy' });
    });

    it('return params from config file and cli params', () => {
      process.argv.push('./action', '--param', 'extra', 'krispy', '--severlessConfig', './tests/config.test.json');
      serverless.parseArgs(startIndex).should.deepEqual({ config: 'test', extra: 'krispy' });
    });
  });

  describe('loadAction should', () => {
    beforeEach(() => {
      process.argv = ['', '', './tests/test.function'];
    });

    it('Return a valid action function', () => {
      (typeof serverless.loadAction().actions[0] === 'function').should.be.true();
    });

    it('Return an acton of false', () => {
      process.argv[2] = '';
      serverless.loadAction().action.should.be.false();
    });

    it('Return an acton of false and a message of missing function', () => {
      process.argv[2] = './notAFile';
      serverless.loadAction().action.should.be.false();
      serverless.loadAction().message.should.equal('MODULE_NOT_FOUND');
    });

    it('Return an acton of false and a message of missing function', () => {
      process.argv[2] = './tests/test.fail';
      serverless.loadAction().action.should.be.false();
      serverless.loadAction().message.should.equal('You are missing the main function in your action file');
    });
  });

  describe('runAction should', () => {
    const test5 = [() => Promise.reject({ message: 'Oh no' }), () => ({ message: 'HELLO' })]
    const test4 = [() => ({ message: 'HELLO' }), () => Promise.reject({ message: 'Oh no' })]
    const test3 = [() => ({ message: 'HELLO' }), (params) => ({ message: 'What func said', params })];
    const test2 = [() => Promise.reject({ message: 'Oh no' })]
    const test = [() => ({ message: 'HELLO' })]
    it('Return a promise', () => {
      ('then' in serverless.runAction(test)).should.equal(true);
    });

    it('Return the last promise', () => {
      ('then' in serverless.runAction(test3)).should.equal(true);
    });

    it('Return a failed promise', () => {
      ('catch' in serverless.runAction(test2)).should.equal(true);
    });

    it('Return failed promise from last function', () => {
      ('catch' in serverless.runAction(test4)).should.equal(true);
    });

    it('Return failed promise from first function', () => {
      ('catch' in serverless.runAction(test5)).should.equal(true);
    });
  });
});
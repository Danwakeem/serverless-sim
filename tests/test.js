const serverless = require('./../serverless.test');
const should = require('should');

describe('serverless tests', () => {
  describe('parseArgs should', () => {
    let initalSetU
    beforeEach(() => { process.argv = ['','']; });

    it('Not return any params', () => {
      serverless.parseArgs().should.deepEqual({});
    });

    it('Return one key value param', () => {
      process.argv.push('./action', '--param', 'key', 'val');
      serverless.parseArgs().should.deepEqual({ key: 'val' });
    });

    it('Return two key value params', () => {
      process.argv.push('./action', '--param', 'key', 'val', '--param', 'key2', 'val2');
      serverless.parseArgs().should.deepEqual({ key: 'val', key2: 'val2' });
    });

    it('return a key with a null value', () => {
      process.argv.push('./action', '--param', 'key');
      serverless.parseArgs().should.deepEqual({ key: undefined });
    });

    it('return a key with a null value', () => {
      process.argv.push('./action', '--param', 'key', '--param', 'hello', 'world');
      serverless.parseArgs().should.deepEqual({ key: undefined, hello: 'world' });
    });
  });

  describe('loadAction should', () => {
    beforeEach(() => {
      process.argv = ['', '', './tests/test.function'];
    });

    it('Return a valid action function', () => {
      (typeof serverless.loadAction().action === 'function').should.be.true();
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
    const test = () => ({ message: 'HELLO' });
    it('Return a promise', () => {
      ('then' in serverless.runAction(test)).should.equal(true);
      ('catch' in serverless.runAction(test)).should.equal(true);
    });
  });
});
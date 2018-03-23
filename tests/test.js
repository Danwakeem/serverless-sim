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
});
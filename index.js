#!/usr/bin/env node

const fs = require('fs');
const serverlessTest = require('./serverless.test');

if (process.argv.length > 2) {
  const params = serverlessTest.parseArgs();
  const actionToRun = process.argv[2];
  try {
    const action = require(actionToRun);
    if ('main' in action) {
      serverlessTest.runAction(action.main, params);
    } else {
      console.log('You are missing the main function in your action file');
    }
  } catch (e) {
    console.log(e.code);
  }
} else {
  console.log('You are missing an action file to run');
}
#!/usr/bin/env node
const fs = require('fs');
const serverlessTest = require('./serverless.test');

if (process.argv.length > 2) {
  const params = serverlessTest.parseArgs(0);
  const action = serverlessTest.loadAction();
  if (action.actions) serverlessTest.runAction(action.actions, params);
  else console.log(action.message);
} else console.log('You are missing an action file to run');
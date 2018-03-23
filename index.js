#!/usr/bin/env node
const fs = require('fs');
const serverlessTest = require('./serverless.test');

if (process.argv.length > 2) {
  const params = serverlessTest.parseArgs();
  const action = serverlessTest.loadAction();
  if (action.action) serverlessTest.runAction(action.action, params);
  else console.log(action.message);
} else console.log('You are missing an action file to run');
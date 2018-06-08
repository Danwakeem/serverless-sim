# Serverless-sim

[![Build Status](https://travis-ci.org/Danwakeem/serverless-sim.svg?branch=master)](https://travis-ci.org/Danwakeem/serverless-sim)
[![Coverage Status](https://coveralls.io/repos/github/Danwakeem/serverless-sim/badge.svg?branch=master)](https://coveralls.io/github/Danwakeem/serverless-sim?branch=master)

This package is a [IBM Cloud Functions](https://console.bluemix.net/openwhisk/) simulation framework. It is meant to allow you to test actions on your local computer with out pushing code to your IBM Cloud Functions account.

# Installation
`npm i -g serverless-sim`

## Usage
These examples are located in the root directory for your [IBM Cloud Function](https://console.bluemix.net/openwhisk/).
#### Basic function
`serverless-sim ./main.js`

#### Function with params
You can add more `--param` keys as needed
`serverless-sim ./main.js --param key value`

#### Function params loaded via a config file
You can load params from a file in conjunction with add cli params.
`serverless-sim ./main.js --param key value --severlessConfig ./config.file.json`

### Chained functions
The output from the first function will be routed to the second function to simulate a Cloud Function sequence. It can also be used in conjunction with params.
`serverless-sim ./main.js ./main2.js --param key value --serverlessConfig ./config.file.json`

> Note: Both functions in the chain will recieve the cli and config file params. So in this example `main2.js` would recieve the output of `main.js`, the cli params, and the config file params.

## Change Log
* `0.1.0` - Added function chain and param file support
* `0.0.x` - Initial package with single function execution and param flags
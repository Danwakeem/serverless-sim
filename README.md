# Serverless-sim

[![Build Status](https://travis-ci.org/Danwakeem/serverless-sim.svg?branch=master)](https://travis-ci.org/Danwakeem/serverless-sim)
[![Coverage Status](https://coveralls.io/repos/github/Danwakeem/serverless-sim/badge.svg?branch=master)](https://coveralls.io/github/Danwakeem/serverless-sim?branch=master)

This package is a [IBM Cloud Functions](https://console.bluemix.net/openwhisk/) simulation framework. It is meant to allow you to test actions on your local computer with out pushing code to your IBM Cloud Functions account.

# Installation
`npm i -g serverless-sim`

## Usage
These examples are located in the root directory for your [IBM Cloud Function](https://console.bluemix.net/openwhisk/).
#### Without params
`serverless-sim ./main.js`

#### With params
`serverless-sim ./main.js --param key value`
# Serverless-test


This package is a testing framework for testing Node.js [IBM Cloud Functions](https://console.bluemix.net/openwhisk/) actions on your local computer.

# Installation
`npm i -g serverless-test`

## Usage
These examples are located in the root directory for your [IBM Cloud Function](https://console.bluemix.net/openwhisk/).
#### Without params
`serverless-test ./main.js`

#### With params
`serverless-test ./main.js --param key value`
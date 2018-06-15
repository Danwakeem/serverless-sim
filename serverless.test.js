const q = require('q');
const fs = require('fs');

const parseArgs = (startIndex) => {
  let params = {};
  for(var i=startIndex;i<process.argv.length;i++) {
    if (/--serverlessConfig/gi.test(process.argv[i])) {
      let file = process.argv[i+1];
      if (/\.\//gi.test(file)) file = file.replace('./', '');
      let fileName = `${process.env.PWD}/${process.argv[i+1]}`;
      let fileParams = JSON.parse(fs.readFileSync(fileName));
      params = Object.assign({}, params, fileParams);
    } else if(/--/gi.test(process.argv[i])) {
      let name = process.argv[i+1]
      let value = /--/.test(process.argv[i+2]) ? undefined : process.argv[i+2];
      params[name] = value
    }
  }
  return params;
}

const loadAction = () => {
  const actionsToRun = [];
  for(var j=2;j<process.argv.length;j++){
    try {
      if (/--/gi.test(process.argv[j])) j = process.argv.length;
      else {
        let file = process.argv[j];
        if (/\.\//gi.test(file)) file = file.replace('./', '');
        const actionToRun = `${process.env.PWD}/${file}`;
        const action = require(actionToRun);
        if ('main' in action) actionsToRun.push(action.main);
        else return { action: false, message: 'You are missing the main function in your action file' };
      }
    } catch (e) {
      return { action: false, message: e.code };
    }
  }
  return { actions: actionsToRun };
};

const runAction = (actions, params) => {
  let chain = q.when();
  let i = 0;

  for(var z=0; z < actions.length; z++) {
    chain = chain.then((output) => {
      params = Object.assign({}, output, params);
      const func = actions[i++];
      return func(params);
    });
  }

  return chain
    .then(result => console.log(result))
    .catch(error => console.error(error));
}

module.exports = {
  parseArgs,
  runAction,
  loadAction
}

const parseArgs = () => {
  const params = {};
  for(var i=3;i<process.argv.length;i++) {
    if(/--/gi.test(process.argv[i])) {
      let name = process.argv[i+1]
      let value = /--/.test(process.argv[i+2]) ? undefined : process.argv[i+2];
      params[name] = value
    }
  }
  return params;
}

const runAction = (action, params) => {
  let result = action(params);
  Promise.resolve(result)
  .then(result => console.log(result))
  .catch(error => console.error(error));
}

module.exports = {
  parseArgs,
  runAction
}
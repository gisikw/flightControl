// Object Widget
const childProcess = require('child_process');
const readline = require('readline');
const LOGFILE = `${__dirname}/../log.txt`;

console.log('Object Widget Running');
console.log('---------------------');

function deserialize(data) {
  return data
    .split('|')
    .reduce((acc, key, i) => i % 2
      ? acc.slice(0, acc.length-1).concat([[acc[acc.length-1], key]])
      : acc.concat(key)
    , [])
    .reduce((acc, pair) => Object.assign({}, acc, { [pair[0]]: pair[1] }), {});
}

readline.createInterface({ input:
  childProcess.spawn('tail', ['-f', LOGFILE], {
    stdio: [null, 'pipe', 'inherit']
  }).stdout
}).on('line', (line) => {
  console.log(deserialize(line));
});

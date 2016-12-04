// Echo Widget
const childProcess = require('child_process');
const readline = require('readline');
const LOGFILE = `${__dirname}/../log.txt`;

console.log('Echo Widget Running');
console.log('-------------------');

readline.createInterface({ input:
  childProcess.spawn('tail', ['-f', LOGFILE], {
    stdio: [null, 'pipe', 'inherit']
  }).stdout
}).on('line', (line) => {
  console.log(line);
});

// ncurses Widget
const blessed = require('blessed');
const childProcess = require('child_process');
const readline = require('readline');
const LOGFILE = `${__dirname}/../../log.txt`;
//const LOGFILE = '/mnt/ksp/Ships/Script/test.log';

const screen = blessed.screen({ smartCSR: true });
const box = blessed.box({
  top: 'center',
  left: 'center',
  width: '60%',
  height: '30%',
  content: '',
  tags: true,
  border: { type: 'line' },
  style: {
    fg: 'white',
    bg: 'black',
    border: { fg: '#bada55' },
  }
});

const bgBox = blessed.box({
  width: '100%',
  height: '100%',
  border: { type: 'line' },
  style: { border: { fg: '#bada55' } },
});

screen.append(bgBox);
screen.append(box);
screen.key(['escape', 'q', 'C-c'], () => process.exit(0));

function deserialize(data) {
  return data
    .split('|')
    .reduce((acc, key, i) => i % 2
      ? acc.slice(0, acc.length-1).concat([[acc[acc.length-1], key]])
      : acc.concat(key)
    , [])
    .reduce((acc, pair) => Object.assign({}, acc, { [pair[0]]: pair[1] }), {});
}

function format(data) {
  return Object.keys(data).reduce((str, key) => (
    str.concat(`${key.toUpperCase()}: ${data[key]}\n`)
  ), '');
}

readline.createInterface({ input:
  childProcess.spawn('tail', ['-f', LOGFILE], {
    stdio: [null, 'pipe', 'inherit']
  }).stdout
}).on('line', (line) => {
  box.content = format(deserialize(line));
  screen.render();
});

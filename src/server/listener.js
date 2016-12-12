import childProcess from 'child_process';
import readline from 'readline';
import { Server as WSServer } from 'ws';
import displayScreen from './displayScreen';

const LOGFILE = process.env.NODE_ENV === 'production'
  ? '/mnt/ksp/Ships/Script/test.log'
  : `${__dirname}/../../log.txt`;

let connections = [];

const myScreen = displayScreen();
const wss = new WSServer({port: 6400});
wss.on('connection', (conn) => connections.push(conn));
const child = childProcess.spawn('tail', ['-f', LOGFILE], {
  stdio: [null, 'pipe', null]
});

function deserialize(data) {
  return data
    .split('|')
    .reduce((acc, key, i) => i % 2
      ? acc.slice(0, acc.length-1).concat([[acc[acc.length-1], key]])
      : acc.concat(key)
    , [])
    .reduce((acc, pair) => Object.assign({}, acc, { [pair[0]]: parseFloat(pair[1]) }), {});
}

readline
  .createInterface({ input: child.stdout })
  .on('line', (line) => {
    const data = deserialize(line);
    myScreen.update(data);
    connections.forEach((conn) => {
      try {
        conn.send(JSON.stringify(data));
      } catch(e) {}
    });
  });

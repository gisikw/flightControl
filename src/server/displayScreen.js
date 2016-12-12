import blessed from 'blessed';

export default function displayScreenFactory() {
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

  function format(data) {
    return Object.keys(data).reduce((str, key) => (
      str.concat(`${key.toUpperCase()}: ${data[key]}\n`)
    ), '');
  }

  return {
    update(data) {
      box.content = format(data);
      screen.render();
    }
  };
};

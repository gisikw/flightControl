import React from 'react';
import LineChart from './components/LineChart';

const startData = [
  {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
  {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
  {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
  {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
  {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
  {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
  {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
];

class App extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = { data: startData };
  }

  componentDidMount() {
    this.handleResize();
    global.addEventListener('resize', () => this.handleResize());
    setInterval(() => {
      this.setState({
        data: this.state.data.concat({
          name: 'Fake',
          uv: Math.floor(Math.random() * 4000),
          pv: Math.floor(Math.random() * 4500),
          amt: Math.floor(Math.random() * 2500),
        }).slice(-20),
      });
    }, 1000);
  }

  handleResize() {
    this.setState({
      width: global.document.documentElement.clientWidth,
      height: global.document.documentElement.clientHeight,
    });
  }

  render() {
    const { width, height, data } = this.state;
    return (
      <div>
        <LineChart {...{width, height, data}} />
      </div>
    );
  }
}

export default App;

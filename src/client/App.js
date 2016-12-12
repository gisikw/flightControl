import React from 'react';
import LineChart from './components/LineChart';

class App extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = { data: [] };
  }

  componentDidMount() {
    this.handleResize();
    global.addEventListener('resize', () => this.handleResize());
    this.getConnection();
  }

  getConnection() {
    const w = new global.WebSocket('ws://localhost:6400');
    w.onclose = () => this.getConnection();
    w.onmessage = ({ data }) =>
      this.setState({data: this.state.data.concat(JSON.parse(data)).slice(-20) });
  }

  handleResize() {
    this.setState({
      width: global.document.documentElement.clientWidth,
      height: global.document.documentElement.clientHeight,
    });
  }

  render() {
    const { width, height, data } = this.state;
    let usefulData = data.map(datum => ({
      altitude: datum.altitude,
      apoapsis: datum.apoapsis,
      periapsis: datum.periapsis,
    }));
    console.log(JSON.stringify(usefulData[0]));
    return (
      <div>
        <LineChart {...{width, height, data: usefulData}} />
      </div>
    );
  }
}

export default App;

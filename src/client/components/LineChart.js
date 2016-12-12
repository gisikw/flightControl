import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Legend
} from 'recharts';

const colorCache = [];

function color(key) {
  if (colorCache[key]) return colorCache[key];
  colorCache[key] = `hsl(${(Object.keys(colorCache).length * 70) % 360}, 100%, 30%)`;
  return colorCache[key];
}


export default ({ width, height, data }) => (
  <LineChart margin={{top: 5, right: 30, left: 20, bottom: 5}}
             {...{width, height, data }}>
    <XAxis dataKey="name"/>
    <YAxis/>
    <CartesianGrid strokeDasharray="3 3"/>
    <Legend />
    {
      Object.keys(data[0])
        .filter(key => key !== 'name')
        .map(key => (
          <Line dot={false} type="monotone" dataKey={key} stroke={color(key)} strokeWidth={5} isAnimationActive={false} />
        ))
    }
  </LineChart>
);

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

export default ({ width, height, data }) => {
  if (!data.length) return null;
  return (
    <LineChart margin={{top: 5, right: 30, left: 20, bottom: 5}}
               {...{width, height, data }}>
      <XAxis dataKey="name"/>
      <YAxis yAxisId="left" orientation="left" />
      <YAxis yAxisId="right" orientation="right" />
      <CartesianGrid strokeDasharray="3 3"/>
      <Line dot={false} type="monotone" dataKey="altitude" stroke={color("altitude")} strokeWidth={2} isAnimationActive={false} yAxisId="left" />
      <Line dot={false} type="monotone" dataKey="apoapsis" stroke={color("apoapsis")} strokeWidth={2} isAnimationActive={false} yAxisId="left" />
      <Line dot={false} type="monotone" dataKey="periapsis" stroke={color("periapsis")} strokeWidth={2} isAnimationActive={false} yAxisId="right" />
      <Legend />
      {
        /* Object.keys(data[0])
          .map(key => (
            <Line key={key} dot={false} type="monotone" dataKey={key} stroke={color(key)} strokeWidth={5} isAnimationActive={false} />
          )) */
      }
    </LineChart>
  );
};

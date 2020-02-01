import React from 'react';
import {
  LineChart,
  Line, 
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';

const data = [
  {
    name:"2016-2017",
    team:"PHI",
    gamesPlayed:70,
    goals:11,
    assists:17,
    points:28,
    pim:49,
    ppg:3,
    ppp:4,
    gwg:0,
    otg:0,
    shots:133,
    shootingPercentage:8.3
  },
  {
    name:"2017-2018",
    team:"PHI",
    gamesPlayed:81,
    goals:24,
    assists:23,
    points:47,
    pim:46,
    ppg:1,
    ppp:3,
    gwg:6,
    otg:2,
    shots:177,
    shootingPercentage:13.6
  },
  {
    name:"2018-2019",
    team:"PHI",
    gamesPlayed:82,
    goals:24,
    assists:25,
    points:49,
    pim:40,
    ppg:4,
    ppp:8,
    gwg:3,
    otg:1,
    shots:182,
    shootingPercentage:13.2
  },
  {
    name:"2019-2020",
    team:"PHI",
    gamesPlayed:47,
    goals:17,
    assists:26,
    points:43,
    pim:20,
    ppg:3,
    ppp:15,
    gwg:2,
    otg:0,
    shots:109,
    shootingPercentage:15.6
  },
]

const ChartTest = props => {
  return (
    <div width="100%">
      <LineChart width={800} height={400} data={data}>
        <Line type="monotone" dataKey="shootingPercentage" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
      </LineChart>
    </div>
  )
}

export default ChartTest;

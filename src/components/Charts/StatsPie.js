import React from 'react';
import { Box, Text } from 'grommet';
import {
  PieChart, Pie, Sector, Cell, Tooltip
} from 'recharts';

const StatsPie = props => {
  if (!props.data){
    return null;
  }

  const data = props.data

  const RADIAN = Math.PI / 180;

  const renderCustomizedLabel = ({
    cx, cy, midAngle, innerRadius, outerRadius, percent, index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    console.log(radius, x, y);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        Text
      </text>
    );
  };

  const width = 150;
  const radius = (width * 0.4);
  const offset = (width / 2) - 5;

  return (
    <Box direction="column">
      <Box align="center" justify="center" pad={{
          top:"small"
        }}>
        <Text size="medium" weight="bold">{props.title}</Text>
      </Box>
      <Box align="center" justify="center">
        <PieChart width={width} height={(width / 2)}>
          <Pie
            data={data}
            cx={offset}
            cy={offset}
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={radius}
            fill="#8884d8"
            dataKey="value"
            startAngle={180}
            endAngle={0}
          >
            {
              data.map((entry, index) => {
                return <Cell key={`cell-${index}`} fill={entry["color"]} />
              })
            }
          </Pie>
          <Tooltip />
        </PieChart>
      </Box>
    </Box>
  )
}

export default StatsPie;

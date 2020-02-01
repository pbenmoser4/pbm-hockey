import React from 'react';
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
} from 'recharts';
import { Box, Text } from 'grommet';

const RankingsRadar = props => {
  if (!props.rankings){
    return null;
  }

  const {
    ptPctg, powerPlayPercentage,
    penaltyKillPercentage, shotsPerGame,
    shotsAllowed, faceOffWinPercentage,
    savePctRank, shootingPctRank
  } = props.rankings;

  const rankingToInt = rankString => 31 - parseInt(rankString.substring(0, rankString.length - 2));

  const data = [
    {name: "Point %", value: rankingToInt(ptPctg)},
    {name: "PP %", value: rankingToInt(powerPlayPercentage)},
    {name: "PK %", value: rankingToInt(penaltyKillPercentage)},
    {name: "Shots For", value: rankingToInt(shotsPerGame)},
    {name: "Shots Against", value: rankingToInt(shotsAllowed)},
    {name: "Faceoffs", value: rankingToInt(faceOffWinPercentage)},
    {name: "Save %", value: rankingToInt(savePctRank)},
    {name: "Shooting %", value: rankingToInt(shootingPctRank)}
  ];

  return (
    <Box direction="column">
      <Box align="center" justify="center" pad="small">
        <Text weight="bold" size="large">Rankings</Text>
      </Box>
      <RadarChart
        cx={200}
        cy={130}
        outerRadius={100}
        width={400}
        height={270}
        data={data}
        label={{"font-size": "10px"}}
        >
        <PolarGrid />
        <PolarAngleAxis dataKey="name" />
        <PolarRadiusAxis domain={[0, 31]} />
        <Radar name="Team" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
      </RadarChart>
    </Box>
  )
}

export default RankingsRadar;

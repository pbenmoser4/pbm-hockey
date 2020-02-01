import React from 'react';
import { Box, Text } from 'grommet';
import {
  BarChart,
  Bar,
  Cell,
  Legend,
  ReferenceLine,
  XAxis,
  YAxis,
  CartesianGrid
} from 'recharts';

import RankingsRadar from '../Charts/RankingsRadar';
import StatsPie from '../Charts/StatsPie';
import Gamelog from '../Charts/Gamelog';

const TeamStatsSidebar = props => {
  if (props.team){
    if (!props.team.stats) {
      return null;
    }
  } else {
    return null;
  }

  const {stats, rankings} = props.team;
  const {goalsPerGame, goalsAgainstPerGame} = stats;
  const data = [{name: "goals", GPG: parseFloat(goalsPerGame), GAPG: -parseFloat(goalsAgainstPerGame)}];
  const wloData = [
    {name: "wins", value: parseInt(stats.wins), color: "#2D999F"},
    {name: "ot", value: parseInt(stats.ot), color:"#D8D8C2"},
    {name: "losses", value: parseInt(stats.losses), color: "#F25D50"},
  ];
  const ptsData = [
    {name: "points", value: parseInt(stats.pts), color:"#2D999F"},
    {name: "missed", value: (parseInt(stats.gamesPlayed) * 2 - parseInt(stats.pts)), color: "#F25D50"}
  ];

  return (
    <Box background="light-2" direction="column" gap="small">
      <Box direction="row" gap="small" justify="center" align="center">
        <RankingsRadar rankings={rankings} />
        <Box direction="column" gap="small">
          <Box direction="row" gap="small" pad="small">
            <StatsPie title="Win/OTL/Loss" data={wloData} />
            <StatsPie title="Pts %" data={ptsData} />
          </Box>
          <Box direction="column" pad="xsmall" gap="medium">
            <Box direction="row" gap="medium">
              <Text size="small">{`Goals Per Game: ${stats.goalsPerGame}`}</Text>
              <Text size="small">{`Goals Against Per Game: ${stats.goalsAgainstPerGame}`}</Text>
            </Box>
            <Box direction="row" gap="medium">
              <Text size="small">{`Power Play: ${stats.powerPlayPercentage}%`}</Text>
              <Text size="small">{`Penalty Kill: ${stats.penaltyKillPercentage}%`}</Text>
            </Box>
            <Box direction="row" gap="medium">
              <Text size="small">{`Shots: ${stats.shotsPerGame}`}</Text>
              <Text size="small">{`Shots Against : ${stats.shotsAllowed}`}</Text>
            </Box>
            <Box direction="row" gap="medium">
              <Text size="small">{`F/O: ${stats.faceOffWinPercentage}%`}</Text>
              <Text size="small">{`SH% : ${stats.shootingPctg}%`}</Text>
              <Text size="small">{`SV% : ${100*parseFloat(stats.savePctg)}%`}</Text>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box align="center" justify="center">
        <Gamelog gameLog={props.gameLog} teamId={props.teamId}/>
      </Box>
    </Box>
  );
}

export default TeamStatsSidebar;

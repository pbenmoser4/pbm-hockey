import React from 'react';
import {
  ComposedChart, Line, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend,
} from 'recharts';

const Gamelog = props => {

  const {gameLog} = props;
  // console.log(gameLog);

  const data = gameLog.map((game, i, arr) => {
    const homeTeam = game.teams.home.team.id;
    const homeScore = parseInt(game.teams.home.score);
    const awayTeam = game.teams.away.team.id;
    const awayScore = parseInt(game.teams.away.score);
    const wentOT = game.linescore.periods.length > 3;
    const isHomeTeam = String(props.teamId) === String(homeTeam);
    const isAwayTeam = String(props.teamId) === String(awayTeam);
    const won = (isHomeTeam && homeScore > awayScore) || (isAwayTeam && awayScore > homeScore);
    const points = won ? 2 : wentOT ? 1 : 0;
    return {name: i, points: points};
  })

  const width = 800;
  const height = 200;

  return (
    <ComposedChart
      width={width}
      height={height}
      data={data}
      margin={{
        top: 20, right: 20, bottom: 20, left: 20,
      }}
    >
      <CartesianGrid stroke="#f5f5f5" />
      <XAxis />
      <Legend />
      <Bar yAxisId="left" dataKey="points" barSize={20} fill="#413ea0" />
    </ComposedChart>
  )
}

export default Gamelog;

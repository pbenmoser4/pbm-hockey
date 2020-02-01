import _ from 'lodash';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Box, Grid } from 'grommet';

import {
  getTeams, getRoster,
  getPlayer, setActiveTeam,
  getTeamStats, getLineScoresForTeam
} from '../../actions';
import TeamHeader from './TeamHeader';
import TeamRoster from './TeamRoster';
import TeamStatsSidebar from './TeamStatsSidebar';

const TeamPage = props => {
  useEffect(() => {
    if (props.team) {
      if (!props.activeTeam) {
        props.setActiveTeam(props.team);
      } else {
        if (props.activeTeam.id !== props.team.id) {
          props.setActiveTeam(props.team);
        }
      }
      if (!props.team.stats) {
        props.getTeamStats(props.match.params.id);
      }
    }
    if (!props.team) {
      props.getTeams();
    }
    if (!props.roster && props.team) {
      props.getRoster(props.team.id);
    }
    if (props.roster && props.players) {
      props.roster.forEach((player, i) => {
        props.getPlayer(player.person.id);
      });
    }
    props.getLineScoresForTeam(props.match.params.id);
  }, [props]);

  const headerLabel = "headerLabel";
  const sidebarLabel = "sidebarLabel";
  const mainLabel = "mainLabel";

  return (
    <Box direction="column">
      <Box gridArea={headerLabel}>
        <TeamHeader team={props.team} />
      </Box>
      <Box gridArea={sidebarLabel}>
        <TeamStatsSidebar team={props.team} gameLog={props.gameLog} teamId={props.match.params.id} />
      </Box>
      <Box gridArea={mainLabel}>
        <TeamRoster roster={props.roster} players={props.players}/>
      </Box>
    </Box>

  )
}

const mapStateToProps = (state, ownProps) => {
  const {id} = ownProps.match.params;
  const team = _.find(state.teams, team => String(team.id) === id);
  let roster = undefined;
  if (team) {
    roster = state.rosters[team.id];
  }
  let players = undefined;
  if (roster) {
    players = roster.map(player => {
      if (state.players[player.person.id]) {
        return state.players[player.person.id];
      } else {
        return undefined;
      }
    });
  }

  const {schedule} = state;

  const gameLog = _.filter(schedule, game => {
    const awayId = game.teams.away.team.id;
    const homeId = game.teams.home.team.id;
    const includesTeam = String(awayId) === String(id) || String(homeId) === String(id);
    const isFinal = game.status.detailedState === "Final";
    return (includesTeam && isFinal);
  });

  return {
    team: team,
    roster: roster,
    players: players,
    activeTeam: state.active["team"],
    gameLog: gameLog
  }
}

export default connect(
  mapStateToProps,
  {
    getTeams,
    getRoster,
    getPlayer,
    setActiveTeam,
    getTeamStats,
    getLineScoresForTeam
  }
)(TeamPage);

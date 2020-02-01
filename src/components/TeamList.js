import _ from 'lodash';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Box } from 'grommet';

import nhl from '../api/nhl';
import { getTeams, getDivisions, getConferences } from '../actions';
import TeamDisplay from './TeamDisplay';

const TeamList = props => {
  useEffect(() => {
    props.getTeams();
    props.getDivisions();
    props.getConferences();
  }, [props]);

  useEffect(() => {
    testApi();
  }, [])

  const testApi = async (val) => {
    // const res = await nhl.get('/teams/1/roster');
    // console.log(res.data);
  }

  const sortedFilteredTeams = teams => {
    return _.sortBy(teams, team => team.name);
  }

  const sortedTeams = sortedFilteredTeams(props.teams);

  return (
    <Box direction="column" gap="small" pad="small" background="light-3">
      {sortedTeams.map((team, teamIndex) => {
        return (
          <TeamDisplay key={teamIndex} team={team}/>
        )
      })}
    </Box>
  )
}

const mapStateToProps = state => {
  return {
    teams: state.teams,
    divisions: state.divisions,
    conferences: state.conferences,
  }
}

export default connect(
  mapStateToProps,
  { getTeams, getDivisions, getConferences }
)(TeamList);

import _ from 'lodash';

import {
  GET_TEAMS,
  GET_TEAM_STATS,
} from '../actions/types';

const baseState = [];

export default (state=baseState, action) => {
  switch (action.type) {
    case GET_TEAMS:
      let newTeamData = _.unionBy(state, action.payload, 'id');
      return newTeamData;
    case GET_TEAM_STATS:
      const {teamId, stats, rankings} = action.payload;
      const teamData = _.find(state, team => String(team.id) === teamId);
      if (teamData) {
        teamData["stats"] = stats;
        teamData["rankings"] = rankings;
        return _.unionBy(state, [teamData], 'id');
      } else {
        return state;
      }
    default:
      return state;
  }
}

/*
{
  lastFetch: Date(),
  fetching: boolean,
  data: [...teams],
}
*/

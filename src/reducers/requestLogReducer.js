import _ from 'lodash';

import {
  STATUS_GET_TEAMS,
  STATUS_GET_ROSTER,
  STATUS_GET_PLAYER,
  STATUS_GET_TEAM_STATS,
  STATUS_GET_PLAYER_STATS,
  STATUS_GET_SCHEDULE,
} from '../actions/types';

const updateStateWithAction = (state, action) => {
  const {url, fetching} = action.payload;

  let lastFetch = action.payload.lastFetch;
  let newState = {...state};

  if (url) {
    const currentStatusObject = state[url];

    if (currentStatusObject) {
      lastFetch = currentStatusObject.lastFetch;
    }
    const statusObject = {"fetching": fetching, "lastFetch": lastFetch};
    newState[url] = statusObject;
  }
  return newState;
}

export default (state = {}, action) => {
  switch (action.type) {
    case STATUS_GET_TEAMS:
      return updateStateWithAction(state, action);
    case STATUS_GET_ROSTER:
      return updateStateWithAction(state, action);
    case STATUS_GET_PLAYER:
      return updateStateWithAction(state, action);
    case STATUS_GET_TEAM_STATS:
      return updateStateWithAction(state, action);
    case STATUS_GET_PLAYER_STATS:
      return updateStateWithAction(state, action);
    case STATUS_GET_SCHEDULE:
      return updateStateWithAction(state, action);
    default:
      return state;
  }
}

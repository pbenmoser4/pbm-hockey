import _ from 'lodash';

import {
  GET_TEAMS,
  STATUS_GET_TEAMS,
  GET_TEAM_STATS,
  STATUS_GET_TEAM_STATS,
  SET_ACTIVE_TEAM,
  GET_ROSTER,
  STATUS_GET_ROSTER,
  GET_DIVISIONS,
  STATUS_GET_DIVISIONS,
  GET_CONFERENCES,
  STATUS_GET_CONFERENCES,
  GET_PLAYER,
  STATUS_GET_PLAYER,
  GET_SCHEDULE,
  STATUS_GET_SCHEDULE,
} from './types';

import nhl from '../api/nhl';

const ONE_DAY = 1000 * 60 * 60 * 24;

const getRequest = async (address, requestType, dispatch, state, params={}) => {
  let urlKey = address;
  if (params.request) {
    const paramsKeys = _.sortedUniq(Object.keys(params.request));
    paramsKeys.forEach((key) => {
      urlKey += "/";
      urlKey += String(key);
      urlKey += "/";
      urlKey += String(params.request[key]);
    });
  }
  const requestLogItem = state.requestLog[urlKey];

  if (requestLogItem) {
    const now = Date.now();
    const {lastFetch, fetching} = requestLogItem;
    if ((now - lastFetch) < ONE_DAY || fetching) {
      return null;
    }
  }

  const {request, ...dispatchParams} = params;

  const statusPayloadStart = {
    "url": urlKey,
    "params": request,
    "lastFetch": Date.now(),
    "fetching": true
  };
  const statusPayloadEnd = {
    "url": urlKey,
    "params": request,
    "fetching": false
  };

  let statusType = null;
  let dispatchData = null;

  if (requestType === GET_TEAMS) {
    statusType = STATUS_GET_TEAMS;
  } else if (requestType === GET_ROSTER) {
    statusType = STATUS_GET_ROSTER;
  } else if (requestType === GET_PLAYER) {
    statusType = STATUS_GET_PLAYER;
  } else if (requestType === GET_TEAM_STATS) {
    statusType = STATUS_GET_TEAM_STATS;
  } else if (requestType === GET_SCHEDULE) {
    statusType = STATUS_GET_SCHEDULE;
  }

  dispatch({
    type: statusType,
    payload: statusPayloadStart,
  });

  const response = await nhl.get(address, {params: request});

  if (requestType === GET_TEAMS) {
    dispatchData = response.data.teams;
  } else if (requestType === GET_ROSTER) {
    dispatchData = {...dispatchParams, "roster": response.data.roster};
  } else if (requestType === GET_PLAYER) {
    dispatchData = {...dispatchParams, "player": response.data.people[0]};
  } else if (requestType === GET_TEAM_STATS) {
    const statsArray = response.data.stats;
    const stats = statsArray[0].splits[0].stat;
    const rankings = statsArray[1].splits[0].stat;
    dispatchData={...dispatchParams, "stats": stats, "rankings": rankings};
  } else if (requestType === GET_SCHEDULE) {
    const gameLog = response.data.dates;
    let games = [];
    gameLog.forEach((date) => {
      date.games.forEach((game) => games.push(game));
    });
    dispatchData = {...dispatchParams, "games": games};
  }

  dispatch({
    type: requestType,
    payload: dispatchData,
  });
  dispatch({
    type: statusType,
    payload: statusPayloadEnd,
  })
}

// TEAMS ACTIONS

export const getTeams = () => async (dispatch, getState) => {
  getRequest('/teams', GET_TEAMS, dispatch, getState());
}

export const getTeamStats = (teamId) => async (dispatch, getState) => {
  getRequest(`/teams/${teamId}/stats`, GET_TEAM_STATS, dispatch, getState(), {"teamId": teamId});
}

export const setActiveTeam = team => dispatch => {
  dispatch({
    type: SET_ACTIVE_TEAM,
    payload: team,
  });
}

// ROSTER ACTIONS

export const getRoster = teamId => async (dispatch, getState) => {
  const address = `/teams/${teamId}/roster`;
  getRequest(address, GET_ROSTER, dispatch, getState(), {"teamId": teamId});
}

// PLAYER ACTIONS

export const getPlayer = (playerId) => async (dispatch, getState) => {
  const address = `/people/${playerId}`;
  getRequest(address, GET_PLAYER, dispatch, getState(), {"playerId": playerId});
}

// SCHEDULE ACTIONS

// export const getScheduleForTeam =

export const getLineScoresForTeam = (teamId, params={}) => async (dispatch, getState) => {
  const address = '/schedule';
  const params = {
    expand: "schedule.linescore",
    teamId: teamId,
    startDate: "2019-10-01",
    endDate: "2020-01-31",
  };
  getRequest(
    address,
    GET_SCHEDULE,
    dispatch,
    getState(),
    {"request": params},
  )
}

// DIVISION ACTIONS

export const getDivisions = () => async (dispatch, getState) => {
  const {lastFetch, fetching} = getState().divisions;
  const now = Date.now();

  if ((now - lastFetch) < ONE_DAY || fetching) {
    return false;
  }

  dispatch({
    type: STATUS_GET_DIVISIONS,
    payload: {"lastFetch": Date.now(), "fetching": true}
  });
  const response = await nhl.get('/divisions');
  const divisions = response.data.divisions;
  dispatch({
    type: GET_DIVISIONS,
    payload: divisions,
  });
  dispatch({
    type: STATUS_GET_DIVISIONS,
    payload: {"fetching": false}
  });
}

// CONFERENCE ACTIONS

export const getConferences = () => async (dispatch, getState) => {
  const {lastFetch, fetching} = getState().conferences;
  const now = Date.now();

  if ((now - lastFetch) < ONE_DAY || fetching) {
    return false;
  }

  dispatch({
    type: STATUS_GET_CONFERENCES,
    payload: {"lastFetch": Date.now(), "fetching": true}
  });
  const response = await nhl.get('/conferences');
  const conferences = response.data.conferences;
  dispatch({
    type: GET_CONFERENCES,
    payload: conferences,
  });
  dispatch({
    type: STATUS_GET_CONFERENCES,
    payload: {"fetching": false}
  });
}


// const address = '/teams';
// const requestLogItem = getState().requestLog[address];
// if (requestLogItem) {
//   const now = Date.now();
//   const {lastFetch, fetching} = requestLogItem;
//   if ((now - lastFetch) < ONE_DAY || fetching) {
//     return false;
//   }
// }
//
// dispatch({
//   type: STATUS_GET_TEAMS,
//   payload: {"lastFetch": Date.now(), "fetching": true, "url": address}
// });
// const response = await nhl.get(address);
// const teams = response.data.teams;
// dispatch({
//   type: GET_TEAMS,
//   payload: teams,
// });
// dispatch({
//   type: STATUS_GET_TEAMS,
//   payload: {"fetching": false, "url": address}
// });




// let shouldFetch = true;
//
// const {data} = getState().rosters;
// let stringTeamId = String(teamId);
//
// if (data[stringTeamId]) {
//   const rosterObject = data[stringTeamId];
//   const {fetching, lastFetch} = rosterObject;
//   if (fetching) {
//     shouldFetch = false;
//   }
//
//   if ((Date.now() - lastFetch) < ONE_DAY) {
//     shouldFetch = false;
//   }
// }
//
// if (!shouldFetch) {
//   return false;
// }
//
// dispatch({
//   type: STATUS_GET_ROSTER,
//   payload: {"url": address, "teamId": teamId, "fetching": true, "lastFetch": Date.now()}
// });
// const response = await nhl.get(address);
// const roster = response.data.roster;
// dispatch({
//   type: GET_ROSTER,
//   payload: {"teamId": teamId, "roster": roster}
// });
// dispatch({
//   type: STATUS_GET_ROSTER,
//   payload: {"url": address, "teamId": teamId, "fetching": false}
// });




// let shouldFetch = true;
//
// const {data} = getState().players;
// let stringPlayerId = String(playerId);
//
// if (data[stringPlayerId]) {
//   const playerObject = data[stringPlayerId];
//   const {fetching, lastFetch} = playerObject;
//   if (fetching) {
//     shouldFetch = false;
//   }
//
//   if ((Date.now() - lastFetch) < ONE_DAY) {
//     shouldFetch = false;
//   }
// }
//
// if (!shouldFetch) {
//   return false;
// }
//
// dispatch({
//   type: STATUS_GET_PLAYER,
//   payload: {"url": address, "playerId": playerId, "fetching": true, "lastFetch": Date.now()}
// });
// const response = await nhl.get(`/people/${playerId}`);
// const player = response.data.people[0];
// dispatch({
//   type: GET_PLAYER,
//   payload: {"playerId": playerId, "player": player}
// });
// dispatch({
//   type: STATUS_GET_PLAYER,
//   payload: {"url": address, "playerId": playerId, "fetching": false}
// });

import {
  GET_ROSTER,
  STATUS_GET_ROSTER,
} from '../actions/types'

const baseState = {
  data: {},
};

export default (state={}, action) => {
  let teamId = action.payload ? action.payload.teamId : null;
  teamId = String(teamId);
  const stateData = {...state.data};

  switch (action.type) {
    case GET_ROSTER:
      const {roster} = action.payload;
      stateData[teamId] = roster;
      return stateData;
    default:
      return state;
  }
}

import {
  GET_PLAYER,
  STATUS_GET_PLAYER,
} from '../actions/types'

const baseState = {
  data: {},
};

export default (state={}, action) => {
  let playerId = action.payload ? action.payload.playerId : null;
  playerId = String(playerId);
  const stateData = {...state};

  switch (action.type) {
    case GET_PLAYER:
      const {player} = action.payload;
      stateData[playerId] = player;
      return stateData;
    default:
      return state;
  }
}

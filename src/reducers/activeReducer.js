import { SET_ACTIVE_TEAM } from '../actions/types';

const baseState = {
  "team": null
}

export default (state=baseState, action) => {
  switch(action.type) {
    case SET_ACTIVE_TEAM:
      return {...state, "team": action.payload};
    default:
      return state;
  }
}

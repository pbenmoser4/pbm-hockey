import _ from 'lodash';

import {
  GET_CONFERENCES,
  STATUS_GET_CONFERENCES,
} from '../actions/types';

const baseState = {
  "fetching": false,
  "lastFetch": 0,
  "data": []
}

export default (state=baseState, action) => {
  switch (action.type) {
    case GET_CONFERENCES:
      const conferencesData = state.data;
      let newConferencesData = _.unionBy(conferencesData, action.payload, 'id');
      return {...state, "data": newConferencesData};
    case STATUS_GET_CONFERENCES:
      const lastFetch = action.payload.lastFetch ? action.payload.lastFetch : state.lastFetch;
      const fetching = action.payload.fetching;
      return {...state, "lastFetch": lastFetch, "fetching": fetching}
    default:
      return state;
  }
}

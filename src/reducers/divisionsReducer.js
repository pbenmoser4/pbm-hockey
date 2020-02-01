import _ from 'lodash';

import {
  GET_DIVISIONS,
  STATUS_GET_DIVISIONS,
} from '../actions/types';

const baseState = {
  "fetching": false,
  "lastFetch": 0,
  "data": []
}

export default (state=baseState, action) => {
  switch (action.type) {
    case GET_DIVISIONS:
      const divisionsData = state.data;
      let newDivisionsData = _.unionBy(divisionsData, action.payload, 'id');
      return {...state, "data": newDivisionsData};
    case STATUS_GET_DIVISIONS:
      const lastFetch = action.payload.lastFetch ? action.payload.lastFetch : state.lastFetch;
      const fetching = action.payload.fetching;
      return {...state, "lastFetch": lastFetch, "fetching": fetching}
    default:
      return state;
  }
}

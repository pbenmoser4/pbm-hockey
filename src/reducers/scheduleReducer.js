import _ from 'lodash';

import {
  GET_SCHEDULE
} from '../actions/types';

export default (state=[], action) => {
  switch(action.type) {
    case GET_SCHEDULE:
      const {games} = action.payload;
      // console.log(state);
      // console.log(action.payload);
      return _.unionBy(state, games, 'gamePk');
    default:
      return state;
  }
}

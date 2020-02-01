import { combineReducers } from 'redux';

import teamsReducer from './teamsReducer';
import rostersReducer from './rostersReducer';
import divisionsReducer from './divisionsReducer';
import conferencesReducer from './conferencesReducer';
import playersReducer from './playersReducer';
import activeReducer from './activeReducer';
import requestLogReducer from './requestLogReducer';
import scheduleReducer from './scheduleReducer';

export default combineReducers({
  teams: teamsReducer,
  rosters: rostersReducer,
  divisions: divisionsReducer,
  conferences: conferencesReducer,
  players: playersReducer,
  active: activeReducer,
  requestLog: requestLogReducer,
  schedule: scheduleReducer,
})

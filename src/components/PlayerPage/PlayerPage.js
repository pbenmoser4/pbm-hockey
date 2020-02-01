import _ from 'lodash';
import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { Box } from 'grommet';

import { getPlayer } from '../../actions';
import PlayerHeader from './PlayerHeader';
import PlayerDisplay from './PlayerDisplay';

const PlayerPage = props => {
  console.log(props.player);
  useEffect(() => {
    if (!props.player) {
      props.getPlayer(props.match.params.id);
    }
  }, [props]);

  const renderPage = player => {
    if (player) {
      return (
        <Fragment>
          <PlayerHeader player={player} />
          <PlayerDisplay player={player} />
        </Fragment>
      )
    }
  }

  return (
    <Fragment>
      {renderPage(props.player)}
    </Fragment>
  )
}

const mapStateToProps = (state, ownProps) => {
  const {id} = ownProps.match.params;
  const players = state.players;
  console.log(id);
  console.log(players);
  let player = null;
  if (players) {
    player = state.players[id];
  }

  return {
    player: player,
  }
}

export default connect(
  mapStateToProps,
  { getPlayer }
)(PlayerPage);

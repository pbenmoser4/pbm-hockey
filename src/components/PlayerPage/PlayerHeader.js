import React from 'react';
import { connect } from 'react-redux';
import { Box, Image, Text } from 'grommet';

import { teamLogo } from '../../teamLogos';

const PlayerHeader = props => {
  const {player} = props;
  const {
    fullName, primaryNumber, birthDate, currentAge,
    birthCity, birthStateProvince, birthCountry,
    height, weight, alternateCaptain, captain,
    shootsCatches, primaryPosition, id
  } = player;
  const position = primaryPosition ? primaryPosition.code : null;
  let abbreviation = null;
  if (props.activeTeam) {
    abbreviation = props.activeTeam.abbreviation;
  }
  return (
    <Box background="white" pad="small" direction="row" gap="small">
      <Box width="52px" height="52px" align="center" justify="center">
        <Image src={teamLogo(abbreviation)} fit="contain"/>
      </Box>
      <Box direction="column" gap="small">
        <Box direction="row" gap="small" align="center">
          <Text weight="bold">
              {`${fullName} ${alternateCaptain ? ' (A)' : ''} ${captain ? ' (C)': ''}`}
          </Text>
          <Text>{`${position}`}</Text>
          <Text size="small">{height}</Text>
          <Text size="small">{weight}</Text>
        </Box>
        <Box direction="row" gap="small">
          <Text size="small">{`${birthDate}, ${currentAge}`}</Text>
          <Text size="small">|</Text>
          <Text size="small">{`${birthCity}, ${birthStateProvince ? birthStateProvince : ''} ${birthCountry}`}</Text>
        </Box>
      </Box>
    </Box>
  )
}

const mapStateToProps = state => {
  return {
    activeTeam: state.active["team"]
  }
}

export default connect(
  mapStateToProps,
  {}
)(PlayerHeader);

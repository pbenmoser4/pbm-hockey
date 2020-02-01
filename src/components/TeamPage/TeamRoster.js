import _ from 'lodash';
import React from 'react';
import { Box, Text } from 'grommet';
import { Link } from 'react-router-dom';

const TeamRoster = props => {

  const renderRoster = (roster, players) => {
    if (roster && players) {
      // console.log('roster', roster);
      // console.log('players', players);
      return roster.map((rosterItem, index) => {
        const playerId = rosterItem.person.id;
        const player = _.find(players, player => {
          if (player){
            return player.id === playerId
          }
        })
        if (!player) {
          return null;
        }
        const {
          fullName, primaryNumber, birthDate, currentAge,
          birthCity, birthStateProvince, birthCountry,
          height, weight, alternateCaptain, captain,
          shootsCatches, primaryPosition, id
        } = player;
        const position = primaryPosition.code;
        return (
          <Box direction="row" justify="center" key={index}>
            <Box basis="3/4" background="white" pad="small" round="xsmall" direction="row" align="center" gap="small">
              <Box>
                <Text size="large" weight="bold">
                  {`#${primaryNumber}`}
                </Text>
              </Box>
              <Box>
                <Box direction="row" gap="small" align="center">
                  <Text weight="bold">
                    <Link to={`/players/${id}`}>
                      {`${fullName} ${alternateCaptain ? ' (A)' : ''} ${captain ? ' (C)': ''}`}
                    </Link>
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
          </Box>
        )
      })
    }
  }

  return (
    <Box background="light-1" direction="column" gap="small" pad="small">
      {renderRoster(props.roster, props.players)}
    </Box>
  )
}

export default TeamRoster;

import React from 'react';
import { Anchor, Box, Image, Text } from 'grommet';
import { Link } from 'react-router-dom';

import { teamLogo } from '../teamLogos';

const TeamDisplay = ({team}) => {
  const {
    id,
    name,
    venue,
    abbreviation,
    teamName,
    loactionName,
    firstYearOfPlay,
    division,
    conference,
    officialSiteUrl,
  } = team;
  return (
    <Box direction="row" justify="center" >
      <Box basis="3/4" background="white" pad="small" round="xsmall">
        <Box direction="row" gap="small">
          <Box width="52px" height="52px" align="center" justify="center">
            <Image src={teamLogo(abbreviation)} fit="contain"/>
          </Box>
          <Box direction="column" gap="xsmall" flex={true}>
            <Box direction="row" justify="between" align="center">
              <Text weight="bold">
                <Link to={`/teams/${id}`}>{name}</Link>
              </Text>
              <Anchor size="small" href={officialSiteUrl} label={abbreviation} target="_blank"/>
            </Box>
            <Box>
              <Text>{`${division.name} | ${conference.name}`}</Text>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default TeamDisplay;

import React from 'react';
import { Box, Image, Text } from 'grommet';

import { teamLogo } from '../../teamLogos';

const TeamHeader = props => {
  const {team} = props;
  const abbreviation = team ? team.abbreviation : null;
  const name = team ? team.name : "";
  const division = team ? team.division : {name:""};
  const conference = team ? team.conference : {name:""};
  return (
    <Box
      justify="center"
      pad={{
        top: "small",
        bottom: "small",
        left: "medium",
        right: "medium"
      }}
      >
      <Box direction="row" gap="small">
        <Box width="60px" height="60px" background="dark-1">
          <Image src={teamLogo(abbreviation)} fit="contain"/>
        </Box>
        <Box direction="column" gap="xsmall" flex={true}>
          <Box direction="row" justify="between" align="center">
            <Text weight="bold">
              {name}
            </Text>
          </Box>
          <Box>
            <Text>{`${division.name} Division | ${conference.name} Conference`}</Text>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default TeamHeader;

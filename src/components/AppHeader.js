import React from 'react';
import { Box, Header, Heading } from 'grommet';

const AppHeader = props => {
  return (
    <Header background="dark-2">
      <Box align="center" justify="center" flex={true}>
        <Heading level={2}>Ben's NHL Site</Heading>
      </Box>
    </Header>
  )
}

export default AppHeader;

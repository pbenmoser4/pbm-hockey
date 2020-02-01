import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Box, Button, Text } from 'grommet';

import { getTeams, getRoster } from '../actions';

const ApiTest = props => {
  console.log(props);

  useEffect(() => {
    props.getTeams();

    if (props.teams.data.length > 0) {
      props.teams.data.forEach((team, i) => {
        props.getRoster(team.id);
      });

    }
  }, [props])

  const onClick = async val => {
    // const res = await nhl.get('/teams/3/roster');
    // console.log(res.data.roster);

    props.getRoster(2);
    // props.getTeams();
  }

  return (
    <Box
      background="light-1"
      width="large"
      pad="small"
      margin="medium"
      >
      <Text>API Test</Text>
      <Button
        label="Click Me!"
        onClick={onClick}
        />
      <Box>
        something
      </Box>
    </Box>
  )
}

const mapStateToProps = state => {
  return {
    teams: state.teams,
    rosters: state.rosters,
  }
}

export default connect(
  mapStateToProps,
  { getTeams, getRoster }
)(ApiTest);

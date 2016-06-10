// @flow
import React from 'react';
import { Box, Button, Heading } from '../components';
import Helmet from 'react-helmet';

class Home extends React.Component {
  render() {
    return (
      <div>
        <Helmet
          title="Homepage"
        />
        <Heading>Home</Heading>
        <Box>
          <p>adfiuahdfiug</p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          </p>
          <p>
            <Button />
            <Button weight />
            <Button theme="subtle" children="Klik hier niet" />
            <Button weight theme="subtle" children="Klik hier niet" />
          </p>
        </Box>
      </div>
    );
  }
}

export default Home;

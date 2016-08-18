// @flow
import React from 'react';
import Helmet from 'react-helmet';
import { browserHistory } from 'react-router';

import {
  Box,
  Button,
  Columns,
  Container,
  Cover,
  Heading,
} from 'components';

const goTo = (path) => browserHistory.push(path);

const Home = () => (
  <div>
    <Helmet title="Argu Open Data" />
    <Cover image="/static/cover-home.jpg">
      <Container spacing="large">
        <Heading size="1" variant="light">Open Data Tweede Kamer</Heading>
      </Container>
    </Cover>
    <Container size="large">
      <Columns>
        <Box>
          <Heading>Moties</Heading>
          <p>
            Hoi. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          </p>
          <Button onClick={() => goTo('/motions')} icon="lightbulb-o" small>Bekijk moties</Button>
        </Box>
        <Box>
          <Heading>Politici</Heading>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          </p>
          <Button onClick={() => goTo('/politicians')} icon="group" small>Bekijk politici</Button>
        </Box>
      </Columns>
    </Container>
  </div>
);

export default Home;

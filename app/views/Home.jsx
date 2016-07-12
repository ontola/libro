// @flow
import React from 'react';
import { Box, Heading, Navigation, Page } from '../components';
import Helmet from 'react-helmet';

const links = [
  {
    label: 'Home',
    to: '/',
  },
  {
    label: 'Motions',
    to: '/motions',
  },
  {
    label: 'Politicians',
    to: '/politicians',
  },
];

const Home = () => (
  <Page>
    <Helmet title="Homepage" />
    <Heading>Home</Heading>
    <Navigation links={links} />
    <Box>
      <div className="Box__content">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
          dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        </p>
      </div>
    </Box>
  </Page>
);

export default Home;

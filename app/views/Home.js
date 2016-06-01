import React from 'react';
import { Box, Button, Heading, Columns } from '../components';

function Home() {
  return (
    <div>
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
      <Heading>Grid</Heading>
      <Columns>
        <div>
          <Heading size="4">Voordelen</Heading>
          <Box>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
              irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
              pariatur.
            </p>
          </Box>
        </div>
        <div>
          <Heading size="4">Nadelen</Heading>
          <Box>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
              irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
              pariatur.
            </p>
          </Box>
        </div>
      </Columns>
    </div>
  );
}

export default Home;
